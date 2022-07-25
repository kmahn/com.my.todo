export const USER_ROLES = ['admin', 'member'] as const;
export type UserRoleType = typeof USER_ROLES[number];

export interface UserProfile {
  _id: string;
  role: UserRoleType
}

export interface User extends UserProfile {
  email: string;
  name: string;
  auth: string;
}

