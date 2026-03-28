import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import {
  GenericContainer,
  StartedTestContainer,
  Wait
} from "testcontainers";
import { AppModule } from "../src/app.module";

describe("Health", () => {
  jest.setTimeout(120000);

  let app: INestApplication;
  let dbContainer: StartedTestContainer;
  const originalDatabaseUrl = process.env.DATABASE_URL;

  beforeAll(async () => {
    dbContainer = await new GenericContainer("postgres:16-alpine")
      .withEnvironment({
        POSTGRES_USER: "postgres",
        POSTGRES_PASSWORD: "postgres",
        POSTGRES_DB: "shelterhub_test"
      })
      .withExposedPorts(5432)
      .withWaitStrategy(
        Wait.forLogMessage("database system is ready to accept connections")
      )
      .start();

    process.env.DATABASE_URL = `postgresql://postgres:postgres@${dbContainer.getHost()}:${dbContainer.getMappedPort(5432)}/shelterhub_test?schema=public`;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }

    if (dbContainer) {
      await dbContainer.stop();
    }

    if (originalDatabaseUrl) {
      process.env.DATABASE_URL = originalDatabaseUrl;
    } else {
      delete process.env.DATABASE_URL;
    }
  });

  it("should return healthy response for GET /api/health", async () => {
    const response = await request(app.getHttpServer()).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      service: "shelter-hub-backend",
      database: "up"
    });
  });
});
