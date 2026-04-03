import { DynamicModule, Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "./health/health.controller";
import { SERVICE_NAME } from "./health/health.constants";
import { PrismaHealthIndicator } from "./health/prisma.health";
import { PrismaModule } from "./prisma/prisma.module";

export interface PlatformModuleOptions {
  serviceName: string;
}

@Module({})
export class PlatformModule {
  static forRoot(options: PlatformModuleOptions): DynamicModule {
    return {
      module: PlatformModule,
      imports: [PrismaModule, TerminusModule],
      controllers: [HealthController],
      providers: [
        PrismaHealthIndicator,
        {
          provide: SERVICE_NAME,
          useValue: options.serviceName
        }
      ],
      exports: [PrismaModule, SERVICE_NAME]
    };
  }
}
