import { FeedbackFormEntity } from '../providers/postgres/entities';

export const getNotificationMessageHelper = (
  data: FeedbackFormEntity,
): string => {
  return `
Пользователь ${data.name} оставил обращение №${data.id}

Контактные данные: ${data.contacts}
Комментарий: ${data.comment}
  `;
};
