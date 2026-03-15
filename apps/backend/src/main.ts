import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

function getAllowedCorsOrigins(): string[] {
  const configuredOrigins = process.env.CORS_ORIGINS;
  if (!configuredOrigins) {
    return [];
  }

  return configuredOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );
  const allowedOrigins = getAllowedCorsOrigins();
  if (allowedOrigins.length > 0) {
    app.enableCors({
      origin: allowedOrigins
    });
  }

  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await app.listen(port);
}

void bootstrap();
