import { Injectable } from '@nestjs/common';

/**
 * App service is the base service for every service
 */
@Injectable()
export class AppService {

  /**
   * Printing Hello World
   * @returns string
   */
  getHello(): string {
    return 'Hello World!';
  }
}
