import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
import { AppLogger } from 'src/logger/app-logger';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    /**
     *
     */
    constructor(logger:AppLogger) {
      
    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      console.log('Before...');
  
      const now = Date.now();
      return next
        .handle()
        .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    }
  }