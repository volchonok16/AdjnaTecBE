import { Markup } from 'telegraf';
import { buttonName } from '../../../common/constants';

export function clientButton() {
  return Markup.inlineKeyboard([
    Markup.button.callback(buttonName.put, 'back'),
  ]);
}
