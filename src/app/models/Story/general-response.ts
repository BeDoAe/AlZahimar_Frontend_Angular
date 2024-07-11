export interface GeneralResponse<T = any> {
  isSuccess: boolean;
  data: T;
}
