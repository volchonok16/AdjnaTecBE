import { Markup } from 'telegraf';
import { buttonName } from '../../../common/constants';

export function mainActionButton() {
  return Markup.keyboard(
    [
      Markup.button.callback(buttonName.back, 'back'),
      Markup.button.callback(buttonName.get, 'list'),
      Markup.button.callback(buttonName.next, 'next'),
    ],
    {
      columns: 3,
    },
  );
}
