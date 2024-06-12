export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signupUser = {
    SIGNUP_API : BASE_URL + '/signup',
}

export const loginUser = {
    LOGIN_API : BASE_URL + '/login',
}

export const reGenerateOTPObj = {
    REGENERATE_OTP : BASE_URL + '/reGenerateOTP',
}