import { admin } from './admin';
import { group_admin } from './group_admin';
import { viewuser } from './viewuser';

export class users {
  users?: viewuser[];
  admin?: group_admin[];
}
