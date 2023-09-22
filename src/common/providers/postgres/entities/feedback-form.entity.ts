import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { fieldLength } from '../../../constants/data-base-field.constant';
import { CreateFeedbackDto } from '../../../../modules/feedback/dto';

@Entity({ name: 'FeedbackForm' })
export class FeedbackFormEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  userId: string;

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
  contacts: string;

  @Column({
    type: 'character varying',
    length: fieldLength.comment,
    nullable: true,
  })
  comment: string;

  @Column({
    type: 'character varying',
    nullable: true,
    default: new Date().toISOString(),
  })
  createdAt: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  updatedAt: string;

  static create(dto: CreateFeedbackDto): Partial<FeedbackFormEntity> {
    return {
      userId: dto.id,
      name: dto.name,
      contacts: dto.name,
      comment: dto.comment,
    };
  }
}
