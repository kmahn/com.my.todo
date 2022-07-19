export const USER_ROLES = ['admin', 'member'] as const;
export type UserRoleType = typeof USER_ROLES[number];

export interface User {
  _id: string;
  email: string;
  name: string;
  role: UserRoleType;
}

