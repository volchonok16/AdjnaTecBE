import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'TelegramUser' })
export class TelegramUserEntity {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  username: string;
}
