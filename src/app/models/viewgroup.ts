import { admin } from './admin';

export class viewgroup {
  id?: number;
  name?: string;
  admin_id?: number;
  numberOfMembers?: number;
  numberOfFiles?: number;
  admin?: admin;
}
