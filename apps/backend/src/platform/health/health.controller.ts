import {
  Controller,
  Get,
  Inject,
  ServiceUnavailableException
} from "@nestjs/common";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
import { SERVICE_NAME } from "./health.constants";
import { PrismaHealthIndicator } from "./prisma.health";

@Controller("health")
export class HealthController {
  constructor(
    @Inject(SERVICE_NAME) private readonly serviceName: string,
    private readonly health: HealthCheckService,
    private readonly prismaHealthIndicator: PrismaHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.runReadinessCheck();
  }

  @Get("ready")
  @HealthCheck()
  async readiness() {
    return this.runReadinessCheck();
  }

  @Get("live")
  liveness() {
    return {
      status: "ok",
      service: this.serviceName
    };
  }

  private async runReadinessCheck() {
    try {
      const result = await this.health.check([
        () => this.prismaHealthIndicator.isHealthy("database")
      ]);

      return {
        ...result,
        service: this.serviceName
      };
    } catch (error) {
      if (error instanceof ServiceUnavailableException) {
        const response = error.getResponse();

        throw new ServiceUnavailableException(
          typeof response === "object" && response !== null
            ? {
                ...response,
                service: this.serviceName
              }
            : response
        );
      }

      throw error;
    }
  }
}
