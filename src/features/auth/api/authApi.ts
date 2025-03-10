import { LoginArgs } from "features/auth/api/authApi.types"
import { instance } from "common/instance"
import { BaseResponse } from "common/types"

export const authApi = {
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("/auth/me")
  },
  login(payload: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("/auth/login", payload)
  },
  logout() {
    return instance.delete<BaseResponse>("/auth/login")
  },
}
