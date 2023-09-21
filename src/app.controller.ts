import { Body, Controller, Post } from '@nestjs/common';
import { endpoints } from './common/constants';

@Controller(endpoints.default)
export class AppController {
  @Post(endpoints.telegram)
  async forTelegramHook(@Body() payload: any) {
    console.log(payload);

    //this.handleTelegramUpdateUseCase.execute(payload);

    return { status: 'success' };
  }
}
