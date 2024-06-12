import { SELECT_SIGNUP_FORM,SELECT_LOGIN_FORM, UPDATE_LOGIN_FORM, TOGGLE_SHOW_PASSWORD, VALID_EMAIL, INVALID_EMAIL, INVALID_FIRST_NAME, INVALID_LAST_NAME, INVALID_PASSWORD, MATCH_PASSWORDS, USER_ALREADY_REGISTERED, SIGNUP_SUCCESSFUL, PROCEED_TO_ACCOUNT_VERIFICATION, ENABLE_OTP_REGENERATION, OTP_REGENERATION_SUCCESSFUL, DISABLE_OTP_REGENERATION } from "./actionTypes";

const initialState = {
    loginFormData :{
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
        isPoorPassword:false,
        isPasswordNotMatching:false,
        isSignUpForm:true,
        showPassword:false,
        isInvalidEmail:false,
        isInvalidFirstName:false,
        isInvalidLastName:false,
        isPasswordNotMatching:false,

        formErrors:[]
    },
    isUserAlreadyRegistered:false,
    isSignUpSuccessful:false,
    token:null,
    isProceedToAccountVerification:false,
    isCountDownEnded:false,
    enableOTPRegenerate:false,
    isOtpRegenerated:false,
    isRegenerateOtpButtonDisabled:true,
    

}

export const reducer = (state=initialState,action) =>{
    switch (action.type) {
        case UPDATE_LOGIN_FORM:
            return {
                ...state,loginFormData:{...state.loginFormData,[action.fieldName]:action.payload}
            }
            break;
        case SELECT_LOGIN_FORM:
            return{
                ...state,loginFormData:{...state.loginFormData,isSignUpForm:false}
            }
        break;
        case SELECT_SIGNUP_FORM:
            return{
                ...state,loginFormData:{...state.loginFormData,isSignUpForm:true}
            }
        break;
        case TOGGLE_SHOW_PASSWORD:
            return{
                ...state,loginFormData:{...state.loginFormData,showPassword:!state.loginFormData.showPassword}
            }
        break;
        case INVALID_EMAIL:
            return{
                ...state,loginFormData:{...state.loginFormData,isInvalidEmail:action.payload}
            }
        break;
        case INVALID_FIRST_NAME:
            return{
                ...state,loginFormData:{...state.loginFormData,isInvalidFirstName:action.payload}
            }
        break;
        case INVALID_LAST_NAME:
            return{
                ...state,loginFormData:{...state.loginFormData,isInvalidLastName:action.payload}
            }
        break;
        case INVALID_PASSWORD:
            return{
                ...state,loginFormData:{...state.loginFormData,isPoorPassword:action.payload}
            }
        break;
        case MATCH_PASSWORDS:
            return{
                ...state,loginFormData:{...state.loginFormData,isPasswordNotMatching:action.payload}
            }
        break;
        case USER_ALREADY_REGISTERED:
            return{
                ...state,isUserAlreadyRegistered:action.payload,
            }
        break;
        case SIGNUP_SUCCESSFUL:
            return{
                ...state,isSignUpSuccessful:action.payload
            }
        break;
        case PROCEED_TO_ACCOUNT_VERIFICATION:
            return{
                ...state,isProceedToAccountVerification:true,token:action.payload,enableOTPRegenerate:true
            }
        break;
        case ENABLE_OTP_REGENERATION:
            return{
                ...state,isCountDownEnded:true,isRegenerateOtpButtonDisabled:false
            }
        break;
        case DISABLE_OTP_REGENERATION:
            return{
                ...state,isRegenerateOtpButtonDisabled:true
            }
        break;
        case OTP_REGENERATION_SUCCESSFUL:
            return{
                ...state,isOtpRegenerated:true,token:action.payload,isCountDownEnded:false,isRegenerateOtpButtonDisabled:false
            }
        break;
    
        default:
            return state
            break;
    }
}