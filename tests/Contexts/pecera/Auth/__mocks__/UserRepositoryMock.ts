import {
  User,
  UserPatch,
  UserRepository
} from '../../../../../src/Contexts/pecera/Auth/domain';
import { Nullable } from '../../../../../src/Contexts/shared/domain/Nullable';
import {
  Email,
  StringValueObject,
  Uuid
} from '../../../../../src/Contexts/shared/domain/value-object';

import { UserMother } from '../domain/mothers/UserMother';

export class UserRepositoryMock implements UserRepository {
  private saveMock: jest.Mock;
  private updateMock: jest.Mock;
  private searchMock: jest.Mock;
  private findByIdMock: jest.Mock;
  private password: StringValueObject = new StringValueObject(
    '$2a$12$mZgfH4D7z4dZcZHDKyogqOOnEWS6XHLdczPJktzD88djpvlr3Bq1C'
  );
  private findByUsernameMock: jest.Mock;

  constructor({ exists }: { exists: boolean }) {
    if (exists) {
      this.searchMock = jest.fn().mockImplementation((email: string) => {
        return UserMother.create({
          email: new Email(email),
          password: this.password
        });
      });
      this.findByUsernameMock = jest
        .fn()
        .mockImplementation((username: string) => {
          return UserMother.create({
            username: new StringValueObject(username),
            password: this.password
          });
        });
      this.findByIdMock = jest.fn().mockImplementation((id: string) => {
        return UserMother.create({
          password: this.password,
          id: new Uuid(id)
        });
      });
    } else {
      this.findByUsernameMock = jest.fn().mockReturnValue(null);
      this.searchMock = jest.fn().mockReturnValue(null);
      this.findByIdMock = jest.fn().mockReturnValue(null);
    }
    this.saveMock = jest.fn();
    this.updateMock = jest.fn();
  }

  async save(user: User): Promise<void> {
    this.saveMock(user);
  }

  assertSaveHasBeenCalledWith(expected: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  async update(user: UserPatch): Promise<void> {
    this.updateMock(user);
  }

  assertUpdateHasBeenCalledWith(expected: UserPatch): void {
    expect(this.updateMock).toHaveBeenCalledWith(expected);
  }

  async search(email: string): Promise<Nullable<User>> {
    return this.searchMock(email);
  }

  assertSearchHasBeenCalledWith(expected: string): void {
    expect(this.searchMock).toHaveBeenCalledWith(expected);
  }

  async findById(id: string): Promise<Nullable<User>> {
    return this.findByIdMock(id);
  }

  assertFindByIdHasBeenCalledWith(expected: string): void {
    expect(this.searchMock).toHaveBeenCalledWith(expected);
  }

  findByUsername(username: string): Promise<Nullable<User>> {
    return this.findByUsernameMock(username);
  }

  assertFindByUsernameHasBeenCalledWith(expected: string): void {
    expect(this.findByUsernameMock).toHaveBeenCalledWith(expected);
  }
}
