import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthcheckController {
  constructor() {}

  @Get()
  getHello(): string {
    console.log('healthcheck');
    return JSON.stringify({ success: true });
  }
}
