import { Module } from "@nestjs/common";
import { PlatformModule } from "./platform/platform.module";

@Module({
  imports: [
    PlatformModule.forRoot({
      serviceName: process.env.SERVICE_NAME ?? "shelter-hub-backend"
    })
  ]
})
export class AppModule {}
