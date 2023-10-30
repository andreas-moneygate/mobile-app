import { QueryFunctionContext, QueryKey } from 'react-query'
import { ChangePasswordData, ChangePhoneData, Tokens, UserInfo } from 'types/api/user'
import callApi from 'utils/callApi'
import queryKeyParse from 'utils/queryKeyParse'

interface LoginData {
  username: string
  password: string
  otp?: string
}
export const login = (loginData: LoginData): Promise<Tokens> =>
  callApi('/connect/token', {
    method: 'POST',
    body: {
      client_id: 'resource-owner',
      grant_type: 'password',
      ...loginData,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    isAuth: true,
  })

export const getUserInfo = (query: QueryFunctionContext<QueryKey>): Promise<UserInfo> =>
  callApi('/Users/Info', {
    method: 'GET',
    ...queryKeyParse(query),
  })

export const refreshToken = (refreshToken: string): Promise<Tokens> =>
  callApi('/connect/token', {
    method: 'POST',
    body: {
      client_id: 'resource-owner',
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    isAuth: true,
  })

export const logout = (): Promise<undefined> =>
  callApi('/connect/endsession', {
    method: 'GET',
    isAuth: true,
  })

export const forgotPasswordInit = (username: string) =>
  callApi('/Users/password/reset/initiate', {
    method: 'POST',
    body: { username },
  })

export const forgotPasswordExec = (
  data: Omit<ChangePasswordData, 'password'> & { username: string },
) =>
  callApi('/Users/password/reset/execute', {
    method: 'POST',
    body: data,
  })

export const changePasswordInit = () => {
  return callApi('/Users/changepass/initiate', {
    method: 'GET',
  })
}

export const changePasswordExec = (data: ChangePasswordData) => {
  return callApi('/Users/changepass/execute', {
    method: 'POST',
    body: data,
  })
}

export const changePhoneInit = () => {
  return callApi('/Users/changephonenum/initiate', {
    method: 'GET',
  })
}

export const changePhoneExec = (data: ChangePhoneData) => {
  return callApi('/Users/changephonenum/execute', {
    method: 'POST',
    body: data,
  })
}
