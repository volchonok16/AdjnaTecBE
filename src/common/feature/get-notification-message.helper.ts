import { FeedbackFormEntity } from '../providers/postgres/entities';

export const getNotificationMessageHelper = (
  data: FeedbackFormEntity,
): string => {
  const contact = [];
  if (data.phone) {
    contact.push(`Телефон: ${data.phone}`);
  }
  if (data.mail) {
    contact.push(`Почта: ${data.mail}`);
  }

  return `
Пользователь ${data.name} оставил обращение 
№${data.id}

${contact.join(`
`)}
Комментарий: ${data.comment}
  `;
};
