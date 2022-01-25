import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * App controller
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Displaying simply Hello
   * @returns 
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
