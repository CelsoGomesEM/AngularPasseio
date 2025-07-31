export interface ClaimViewModel {
  value: string;
  type: string;
}

export interface UserTokenViewModel {
  id: string;
  email: string;
  claims: ClaimViewModel[];
}

export interface LoginResponseViewModel {
  accessToken: string;
  expiresIn: number;
  userToken: UserTokenViewModel;
}
