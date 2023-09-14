export interface UserResponse {
  id: number;
  name: string;
  username: string;
  currentStoreId: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
}

export interface RegistrationCredentials {
  id: number;
  name: string;
  username: string;
  password: string;
}

export interface UserRequest {
  name: string;
  username: string;
  password: string;
  currentStoreId: number
}