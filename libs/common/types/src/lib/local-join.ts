import { User } from "./user";

export interface LocalJoin extends Partial<User> {
  password: string;
}
