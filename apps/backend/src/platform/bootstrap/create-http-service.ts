import { Type, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { PrismaService } from "../prisma/prisma.service";

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

export async function createHttpService(rootModule: Type<unknown>): Promise<void> {
  const app = await NestFactory.create(rootModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.setGlobalPrefix(process.env.API_PREFIX ?? "api");
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
