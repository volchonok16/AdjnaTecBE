export class TelegramUserDto {
  id: number;
  firstName: string;
  lastName: string;
  username: string;

  static create(data: any): TelegramUserDto {
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      username: data.username,
    };
  }
}
