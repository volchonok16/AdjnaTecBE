export class TelegramUserDto {
  id: number;
  firstName: string | null;
  lastName: string | null;
  username: string;

  static create(data: any): TelegramUserDto {
    return {
      id: data.id,
      firstName: data.first_name ?? null,
      lastName: data.last_name ?? null,
      username: data.username,
    };
  }
}
