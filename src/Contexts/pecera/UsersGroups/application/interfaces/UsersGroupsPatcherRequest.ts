export interface UsersGroupsPatcherRequest {
  id: string;
  name?: string;
  description?: string;
  editionUsers?: string[];
  visualizationUsers?: string[];
  userId: string;
}
