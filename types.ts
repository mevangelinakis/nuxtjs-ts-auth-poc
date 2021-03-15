export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: 'user' | 'admin';
  token?: string;
};
