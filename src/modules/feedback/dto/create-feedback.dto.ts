import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { fieldLength } from '../../../common/constants/data-base-field.constant';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

export class CreateFeedbackDto {
  @ApiProperty({
    description:
      'Идентификатор зарегистрированного пользователя, в фломате UUID',
    example: null,
    required: false,
  })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Имя, которое пользователь указал в форме обратной связи',
    example: 'Пупкин',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(fieldLength.name)
  name: string;

  @ApiProperty({
    description: 'Контактные данные пользователя, почта или телефон',
    example: 'requests@2lmfa.ru',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(fieldLength.contacts)
  contacts: string;

  @ApiProperty({
    description:
      'Комментарий, оставленный пользователем в форме обратной связи ',
    example: randomStringGenerator(),
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(fieldLength.comment)
  comment: string;
}
