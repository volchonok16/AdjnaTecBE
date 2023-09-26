import { FeedbackFormEntity } from '../providers/postgres/entities';

export const getNotificationMessageHelper = (
  data: FeedbackFormEntity,
): string => {
  return `
Пользователь ${data.name} оставил обращение №${data.id}

Телефон: ${data.phone}
Почта: ${data.mail}
Комментарий: ${data.comment}
  `;
};
