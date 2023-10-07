import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { fieldLength } from '../../../common/constants';

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
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.mail !== '')
  @IsEmail()
  @MaxLength(fieldLength.contacts)
  mail: string;

  @ApiProperty({
    example: '+79005553535',
  })
  @IsOptional()
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
