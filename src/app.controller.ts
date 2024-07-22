import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/blocking')
  blockingIO(@Query('cpuTimeMs') cpuTimeMs: number) {
    return this.appService.blockingIO(cpuTimeMs);
  }

  @Get('/worker')
  workerIO(@Query('cpuTimeMs') cpuTimeMs: number) {
    return this.appService.workerIO(cpuTimeMs);
  }
}
