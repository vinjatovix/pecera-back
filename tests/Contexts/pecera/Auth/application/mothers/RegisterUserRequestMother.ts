import { RegisterUserRequest } from '../../../../../../src/Contexts/pecera/Auth/application/interfaces';
import { Username } from '../../../../../../src/Contexts/pecera/Auth/domain';
import {
  Email,
  StringValueObject
} from '../../../../../../src/Contexts/shared/domain/value-object';
import { random } from '../../../../fixtures/shared';
import { EmailMother } from '../../../../shared/domain/mothers/EmailMother';

export class RegisterUserRequestMother {
  static create(
    email: Email,
    username: Username,
    password: StringValueObject
  ): RegisterUserRequest {
    return {
      email: email.value,
      username: username.value,
      password: password.value
    };
  }

  static random(): RegisterUserRequest {
    return this.create(
      EmailMother.random(),
      new Username(
        random.word({ min: Username.MIN_LENGTH, max: Username.MAX_LENGTH })
      ),
      new StringValueObject('%aD3f3s.0%')
    );
  }
}
