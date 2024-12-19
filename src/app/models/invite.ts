import { admin } from './admin';
import { group } from './group';

export class Invite {
  id?: number;
  group_id?: 7;
  admin_id?: 1;
  group?: group;
  admin?: admin;
}
