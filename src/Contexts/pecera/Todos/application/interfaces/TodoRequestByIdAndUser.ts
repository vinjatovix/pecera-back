import { RequestById } from '../../../../shared/application/RequestById';

export interface TodoRequestByIdAndUser extends RequestById {
  user: string;
}
