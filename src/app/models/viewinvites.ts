import { admin } from './admin';
import { group } from './group';

export class viewinvites {
  id?: number;
  group_id?: string;
  admin_id?: number;
  group?: group;
  admin?: admin;
}
