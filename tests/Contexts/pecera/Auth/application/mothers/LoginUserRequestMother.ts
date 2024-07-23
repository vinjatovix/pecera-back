import { LoginUserRequest } from '../../../../../../src/Contexts/pecera/Auth/application/interfaces';
import {
  Email,
  StringValueObject
} from '../../../../../../src/Contexts/shared/domain/value-object';
import { EmailMother } from '../../../../shared/domain/mothers/EmailMother';

export class LoginUserRequestMother {
  static create(email: Email, password: StringValueObject): LoginUserRequest {
    return {
      email: email.value,
      password: password.value
    };
  }

  static random(): LoginUserRequest {
    return this.create(
      EmailMother.random(),
      new StringValueObject('%aD3f3s.0%')
    );
  }
}
