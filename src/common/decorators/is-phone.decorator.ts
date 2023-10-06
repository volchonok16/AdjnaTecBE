import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { phone, PhoneResult } from 'phone';

// Валидация перенесена на сторону клиента
@ValidatorConstraint({ name: 'IsPhone', async: true })
@Injectable()
export class IsPhoneConstraint implements ValidatorConstraintInterface {
  async validate(value: string) {
    const result: PhoneResult = phone(value);

    return result.isValid;
  }
  defaultMessage(args: ValidationArguments) {
    return `Incorrect ${args.property}.`;
  }
}

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneConstraint,
    });
  };
}
