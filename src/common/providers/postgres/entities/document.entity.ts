import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Document')
export class DocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  documentType: string;

  @Column()
  url: string;
}
