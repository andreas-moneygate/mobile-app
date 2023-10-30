enum USER_ROLE {
  Admin = 0,
}

export interface Client {
  name: string
  id: string
  role: USER_ROLE
}

export interface ClientBalance {
  currencyCode: string
  currentBalance: number
  availableBalance: number
}

export interface UserInfo {
  id: string
  userName: string
  phoneNumber: string
  email: string
  firstName: string
  lastName: string
  requiresPasswordChange: boolean
  clients: Array<Client>
}

export interface Tokens {
  refresh_token: string
  access_token: string
  expires_in: number
}

export interface ChangePasswordData {
  currentPassword: string
  password: string
  confirmPassword: string
  otp: string
}

export interface ChangePhoneData {
  phoneNumber: string
  otp: string
}
