import { AppModule } from "./app.module";
import { createHttpService } from "./platform/bootstrap/create-http-service";

void createHttpService(AppModule);
