import { NestFactory } from "@nestjs/core";
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities
} from "nest-winston";
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import * as winston from "winston";
import { ElasticsearchTransport, ElasticsearchTransportOptions } from "winston-elasticsearch";

async function bootstrap() {
  const esTransportOpts: ElasticsearchTransportOptions = {
    level: 'info',
    clientOpts: {
      node: 'http://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'changeme'
      }
    }
  };
  const logger = WinstonModule.createLogger({
    // options (same as WinstonModule.forRoot() options)
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike(),
        )
      }),
      // new LogstashTransport({ host: "localhost", port: 5044 })
      // new ElasticsearchTransport(esTransportOpts)
    ]
  });


  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger }
  );
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(process.env.PORT || 3000,'0.0.0.0');
}

bootstrap();
