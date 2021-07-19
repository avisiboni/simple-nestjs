import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from './logger/logger.config';

const logger: LoggerConfig = new LoggerConfig();

@Module({
  imports: [LoggerModule, WinstonModule.forRoot(logger.console())],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
