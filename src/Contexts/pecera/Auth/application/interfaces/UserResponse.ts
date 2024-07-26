import { Metadata } from '../../../../shared/domain/value-object';

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  emailValidated: boolean;
  roles: string[];
  metadata: Metadata;
  friends: string[];
}
