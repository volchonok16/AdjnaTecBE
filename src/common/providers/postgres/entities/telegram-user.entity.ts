import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'TelegramUser' })
export class TelegramUserEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;
}
