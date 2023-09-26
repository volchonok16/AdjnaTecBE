import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { fieldLength } from '../../../common/constants';
import { IsPhone } from '../../../common/decorators';

export class CreateFeedbackDto {
  // @ApiProperty({
  //   description:
  //     'Идентификатор зарегистрированного пользователя, в фломате UUID',
  //   example: null,
  //   required: false,
  // })
  // @IsOptional()
  // @IsString()
  // id: string;

  @ApiProperty({
    description: 'Имя, которое пользователь указал в форме обратной связи',
    example: 'Пупкин',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(fieldLength.name)
  name: string;

  @ApiProperty({
    description: 'Почта пользователя',
    example: 'somemail@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(fieldLength.contacts)
  mail: string;

  @ApiProperty({
    description:
      'Пример для RU региона +79005553535, для других регионов формат написания может отличаться. Для валидации использована библиотечка: https://www.npmjs.com/package/phone',
    example: '+79005553535',
  })
  @IsNotEmpty()
  @IsPhone()
  @IsString()
  phone: string;

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
