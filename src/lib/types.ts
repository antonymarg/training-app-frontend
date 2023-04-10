// User
export type UserRole = "trainer" | "participant" | null;
export type UserProfile = {
  email: string;
  name: string;
};

export type UserCredentials = { email: string; password: string };
export type UserInfoOnSignUp = {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
};
