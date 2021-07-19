import { Injectable, Logger, Scope } from "@nestjs/common";

/**
 * A custom logger implementation
 */

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends Logger {
  customLog() {
    this.log('Please feed the cat!');
  }
  setContext(context: string) {
    this.context = context;
  }
}
