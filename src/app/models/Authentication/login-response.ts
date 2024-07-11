export interface LoginResponse {
  isSuccess: boolean;
  data: {
    token: string;
    expired: string;
    roles: string[];
  };
}
