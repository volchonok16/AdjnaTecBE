import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateFeedbackDto } from '../../../../modules/feedback/dto';
import { fieldLength } from '../../../constants';

@Entity({ name: 'FeedbackForm' })
export class FeedbackFormEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  // @Column({
  //   type: 'character varying',
  //   nullable: true,
  // })
  // userId: string;

  @Column({
    type: 'character varying',
    length: fieldLength.name,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'character varying',
    length: fieldLength.contacts,
    nullable: false,
  })
  mail: string;

  @Column({
    type: 'character varying',
    length: fieldLength.contacts,
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'character varying',
    length: fieldLength.comment,
    nullable: true,
  })
  comment: string | null;

  @Column({
    type: 'character varying',
    nullable: true,
    default: new Date().toISOString(),
  })
  createdAt: string | null;

  static create(dto: CreateFeedbackDto): Partial<FeedbackFormEntity> {
    return {
      // userId: dto.id,
      name: dto.name,
      mail: dto.mail,
      phone: dto.phone,
      comment: dto.comment,
    };
  }
}
