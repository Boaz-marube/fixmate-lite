import { UserRole, BaseUser } from './user';

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: BaseUser;
  token?: string;
}

export interface AuthContextType {
  user: BaseUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  loading: boolean;
}