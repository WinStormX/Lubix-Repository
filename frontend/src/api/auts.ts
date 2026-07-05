import api from "./axios";
import type { ForgotPasswordRequest, ResetPasswordRequest } from "../types/auts";

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  return await api.post("/auth/forgot-password-user", data);
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  return await api.post("/auth/reset-password-user", data);
};
