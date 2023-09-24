import { CreateFeedbackDto } from '../../modules/feedback/dto';

export const getNotificationMessageHelper = (
  data: CreateFeedbackDto,
): string => {
  return `
Пользователь ${data.name} оставил обращение

Контактные данные: ${data.contacts}
Комментарий: ${data.comment}
  `;
};
