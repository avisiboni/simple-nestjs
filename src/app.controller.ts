import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AppLogger } from './logger/app-logger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: AppLogger,
  ) { }

  @Get()
  getHello(): string {
    this.logger.log('Hello');
    return this.appService.getHello();
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
