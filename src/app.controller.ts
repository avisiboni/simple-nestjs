import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AppLogger } from './logger/app-logger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: AppLogger,
    private configService: ConfigService<EnvironmentVariables>
  ) { }

  @Get()
  getHello(): string {
    this.logger.log('Hello');
    const env = this.configService.get('ENVIRONMENT');
    return this.appService.getHello() + " CURRENT ENV IS = " + env;
  }

  @Get('login')
  get() {
    this.logger.log('Login');
    return "You're logged in!";
  }

  @Get('index')
  index(@Res() res) {
    this.logger.log('Index');
    res.status(302).redirect('/login');
  }

  @Get('users')
  getUsers() {
    return [{
      id: 1,
      firstName: 'Andrew',
      lastName: 'Lan'
    }]
  }
}

interface EnvironmentVariables {
  ENVIRONMENT: string;
}