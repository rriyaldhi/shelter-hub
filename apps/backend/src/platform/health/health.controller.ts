import { Controller, Get, Inject } from "@nestjs/common";
import { SERVICE_NAME } from "./health.constants";
import { PrismaService } from "../prisma/prisma.service";

@Controller("health")
export class HealthController {
  constructor(
    @Inject(SERVICE_NAME) private readonly serviceName: string,
    private readonly prisma: PrismaService
  ) {}

  @Get()
  async check() {
    const database = (await this.prisma.isHealthy()) ? "up" : "down";

    return {
      status: "ok",
      service: this.serviceName,
      database
    };
  }
}
