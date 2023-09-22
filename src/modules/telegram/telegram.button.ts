import { Markup } from 'telegraf';
import { buttonName } from '../../common/constants/button-name.constant';

export function actionButton() {
  return Markup.keyboard(
    [
      Markup.button.callback(buttonName.get, 'list'),
      Markup.button.callback(buttonName.put, 'edit'),
    ],
    {
      columns: 2,
    },
  );
}
