import { Body, Controller, Post } from '@nestjs/common';
import { telegramEndpoints } from '../../common/constants/endpoints';

@Controller(telegramEndpoints.default)
export class TelegramController {
  @Post(telegramEndpoints.telegram)
  async forTelegramHook(@Body() payload: any) {
    console.log(payload);

    //this.handleTelegramUpdateUseCase.execute(payload);

    return { status: 'success' };
  }
}
