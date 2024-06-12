import { apiConnector } from "../services/apiConnector"
import { loginUser, reGenerateOTPObj, signupUser } from "../services/apis"
import { DISABLE_OTP_REGENERATION, ENABLE_OTP_REGENERATION, INVALID_EMAIL, INVALID_FIRST_NAME, INVALID_LAST_NAME, INVALID_PASSWORD, MATCH_PASSWORDS, OTP_REGENERATION_SUCCESSFUL, PROCEED_TO_ACCOUNT_VERIFICATION, SELECT_LOGIN_FORM, SELECT_SIGNUP_FORM, SIGNUP_SUCCESSFUL, TOGGLE_SHOW_PASSWORD, UPDATE_LOGIN_FORM, USER_ALREADY_REGISTERED, VALID_EMAIL } from "./actionTypes"

export const updateLoginFormData = (fieldName,data) => {
    return{
        type:UPDATE_LOGIN_FORM,fieldName:fieldName,payload:data
    }
}

export const selectLoginForm = () => {
    return{
        type:SELECT_LOGIN_FORM
    }
}
export const selectSignUpForm = () => {
    return{
        type:SELECT_SIGNUP_FORM
    }
}

export const toggleShowPassword = () => {
    return{
        type:TOGGLE_SHOW_PASSWORD
    }
}


export function checkEmailValidity(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return {
            type:INVALID_EMAIL,payload:true
        }
    }else{
        return {
            type:INVALID_EMAIL,payload:false
        } 
    }
}

export function checkFirstNameValidity(name) {
    // Regular expression to match valid names (only alphabets, no spaces, and not empty)
    const nameRegex = /^[A-Za-z]+$/;
  
    // Check if the name matches the regular expression
     if(!nameRegex.test(name) && name.trim().length > 0){
        return {
            type:INVALID_FIRST_NAME,payload:true
        }
    }else{
        return {
            type:INVALID_FIRST_NAME,payload:false
        } 
    }
}

export function checkLastNameValidity(name) {
    // Regular expression to match valid names (only alphabets, no spaces, and not empty)
    const nameRegex = /^[A-Za-z]+$/;
  
    // Check if the name matches the regular expression
     if(!nameRegex.test(name) && name.trim().length > 0){
        return {
            type:INVALID_LAST_NAME,payload:true
        }
    }else{
        return {
            type:INVALID_LAST_NAME,payload:false
        } 
    }
}

export const checkPasswordValidity = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!passwordRegex.test(password)){
        return {
            type:INVALID_PASSWORD,payload:true
        }
    }else{
        return {
            type:INVALID_PASSWORD,payload:false
        } 
    }
}

export const matchPasswords = (password,confirmPassword) => {
   
    if(password !== confirmPassword){
        return {
            type:MATCH_PASSWORDS,payload:true
        }
    }else{
        return {
            type:MATCH_PASSWORDS,payload:false
        } 
    }
}

export const userAlreadyRegistered = (flag) => {
    return{
        type:USER_ALREADY_REGISTERED,payload:flag
    }

}
export const signupSuccessful = (flag)=>{
    return{
        type:SIGNUP_SUCCESSFUL,payload:flag
    } 
}


export const proceedToAccountVerification = (data) => {
    return{
        type:PROCEED_TO_ACCOUNT_VERIFICATION,payload:data
    }
}


export const signup = (signUpData) =>{
    console.log('signUpData',signUpData)
    return async(dispatch)=>{
        try {
            const response = await apiConnector('post', signupUser.SIGNUP_API, signUpData,null, null);
            console.log(response)

            if(response?.data?.isUserAlreadyExist){
                dispatch(userAlreadyRegistered(true));
            }

            if(response?.data?.success){
                dispatch(signupSuccessful(true));
                console.log(response.data)
                dispatch(proceedToAccountVerification(response.data.token))
            }else{
                dispatch(signupSuccessful(false))

            }


        } catch (error) {
            
        }
    }
}

export const login = (loginData) =>{
    return async(dispatch)=>{
        try {
          const response = await apiConnector('post',loginUser.LOGIN_API, loginData,null, null);
          dispatch(saveLoginResponse(response?.data))
          console.log(response?.data)
        } catch (error) {
          console.log('failed')  
        }
    }
}


export const enableOtpRegeneration= () =>{
    return{
        type:ENABLE_OTP_REGENERATION
    }
}
export const disableOtpRegeneration= () =>{
    return{
        type:DISABLE_OTP_REGENERATION
    }
}

export const otpRegenerationSuccessful = (data) =>{
    return{
        type:OTP_REGENERATION_SUCCESSFUL,payload:data
    }
}

export const makeApiCallToGetNewOtp = (userEmail) =>{
    return async (dispatch) =>{
        try {
            const response = await apiConnector('post', reGenerateOTPObj.REGENERATE_OTP,{userEmail},null, null);
            console.log(response.data)
            dispatch(otpRegenerationSuccessful(response.data.token))
        } catch (error) {
           console.log('OTP regenerate API call failed: ') 
        }        
    }
}
