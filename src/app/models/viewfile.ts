import { admin } from "./admin";

export class viewfile {
    id?: number;
    file_name?: string;
    state?: number;
    owner_id?: number;
    versions?: number;
    file_owner?:admin
  }
  