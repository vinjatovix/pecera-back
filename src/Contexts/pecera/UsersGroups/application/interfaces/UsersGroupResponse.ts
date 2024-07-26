import { MetadataType } from '../../../../shared/application/MetadataType';

export interface UsersGroupResponse {
  id: string;
  name: string;
  description: string;
  editionUsers: string[];
  visualizationUsers: string[];
  metadata: MetadataType;
}
