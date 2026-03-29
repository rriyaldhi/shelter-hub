import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import {
  GenericContainer,
  StartedTestContainer
} from "testcontainers";
import { PlatformModule } from "../src/platform/platform.module";

describe("Platform Health", () => {
  jest.setTimeout(120000);

  let app: INestApplication;
  let dbContainer: StartedTestContainer;
  const originalDatabaseUrl = process.env.DATABASE_URL;
  const originalServiceName = process.env.SERVICE_NAME;

  beforeAll(async () => {
    dbContainer = await new GenericContainer("postgres:16-alpine")
      .withEnvironment({
        POSTGRES_USER: "postgres",
        POSTGRES_PASSWORD: "postgres",
        POSTGRES_DB: "shelterhub_test"
      })
      .withExposedPorts(5432)
      .start();

    process.env.SERVICE_NAME = "platform-health-test";
    process.env.DATABASE_URL = `postgresql://postgres:postgres@${dbContainer.getHost()}:${dbContainer.getMappedPort(5432)}/shelterhub_test?schema=public`;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PlatformModule.forRoot({
          serviceName: process.env.SERVICE_NAME
        })
      ]
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

    if (originalServiceName) {
      process.env.SERVICE_NAME = originalServiceName;
    } else {
      delete process.env.SERVICE_NAME;
    }
  });

  it("should return healthy response for GET /api/health", async () => {
    const response = await request(app.getHttpServer()).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      service: "platform-health-test",
      database: "up"
    });
  });

  it("should return database down response for GET /api/health when database is disconnected", async () => {
    await dbContainer.stop();

    const response = await request(app.getHttpServer()).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      service: "platform-health-test",
      database: "down"
    });
  });
});
