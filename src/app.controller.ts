import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHealth(): string {
    return 'Drone API is up and running!';
  }
}
