import {client} from './api-client';

export function fetchConfigs() {
  return client('/api/get-configs');
}
