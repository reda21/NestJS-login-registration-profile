// src/auth/pipes/login.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'; // ArgumentMetadata,
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any) {
    //metadata: ArgumentMetadata
    const obj = plainToInstance(LoginDto, value);
    const errors = await validate(obj);

    console.log('errors', errors);

    if (errors.length > 0) {
      const errorMessages = errors.reduce((acc, err) => {
        acc[err.property] = Object.values(err.constraints || {});
        return acc;
      }, {});
      throw new BadRequestException({
        statusCode: 400,
        message: 'The given data was invalid.',
        errors: errorMessages,
      });
    }

    return obj;
  }
}
