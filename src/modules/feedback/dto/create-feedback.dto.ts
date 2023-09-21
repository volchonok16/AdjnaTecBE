import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { dtoFieldLength } from '../../../common/constants/data-base-field.constant';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

export class CreateFeedbackDto {
  @ApiProperty({
    description:
      'Идентификатор зарегистрированного пользователя, в фломате UUID',
    example: null,
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
  @MaxLength(dtoFieldLength.name)
  name: string;

  @ApiProperty({
    description: 'Контактные данные пользователя, почта или телефон',
    example: 'requests@2lmfa.ru',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(dtoFieldLength.name)
  contacts: string;

  @ApiProperty({
    description:
      'Комментарий, оставленный пользователем в форме обратной связи ',
    example: randomStringGenerator(),
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(dtoFieldLength.name)
  comment: string;
}
