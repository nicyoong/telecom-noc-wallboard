export type Role = 'noc_lead' | 'engineer' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  shift: 'day' | 'night';
  station: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, _password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (_requiredRole: Role) => boolean;
  isLoading: boolean;
}
