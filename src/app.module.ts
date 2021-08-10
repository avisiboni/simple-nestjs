import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from './logger/logger.config';
import { ConfigModule } from '@nestjs/config';

const logger: LoggerConfig = new LoggerConfig();

@Module({
  imports: [LoggerModule,
    WinstonModule.forRoot(logger.console()),
    ConfigModule.forRoot({
      cache:true,
      envFilePath:`${process.env.NODE_ENV}.env`,
      isGlobal:true
    })
  ],

  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule { }
