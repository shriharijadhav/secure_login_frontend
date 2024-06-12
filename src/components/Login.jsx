import { Button, Flex, Input, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
     InputGroup,
    InputRightElement,
     IconButton,
    useDisclosure,
  } from "@chakra-ui/react";


import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { checkEmailValidity, checkFirstNameValidity, checkLastNameValidity, checkPasswordValidity, login, matchPasswords, selectLoginForm, selectSignUpForm, signup, toggleShowPassword, updateLoginFormData } from '../redux/action'
import { useNavigate } from 'react-router-dom';


const Login = () => {

 
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const loginFormData = useSelector((store) => store.loginFormData)
    const isSignUpForm = loginFormData.isSignUpForm;
    const showPassword = loginFormData.showPassword;
    const formErrors = loginFormData.formErrors;

    const isInvalidEmail = loginFormData.isInvalidEmail;
    const isInvalidFirstName = loginFormData.isInvalidFirstName;
    const isInvalidLastName = loginFormData.isInvalidLastName;



    const email = loginFormData.email;
    const firstName = loginFormData.firstName;
    const lastName = loginFormData.lastName;
    const password = loginFormData.password;
    const confirmPassword = loginFormData.confirmPassword;
    const isPoorPassword = loginFormData.isPoorPassword;
    const isPasswordNotMatching = loginFormData.isPasswordNotMatching;

    const token = useSelector((store) => store.token);
    const isUserAlreadyRegistered = useSelector((store) => store.isUserAlreadyRegistered);
    const isSignUpSuccessful = useSelector((store) => store.isSignUpSuccessful);
    const isProceedToAccountVerification = useSelector((store) => store.isProceedToAccountVerification);

    const signUpData = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    }

    const loginData = {
        email,
        password
    }

    useEffect(()=>{
        if(email.length>0){ dispatch(checkEmailValidity(email))}
        if(isSignUpForm){
            if(firstName.length>0){dispatch(checkFirstNameValidity(firstName))}
            if(lastName.length>0){dispatch(checkLastNameValidity(lastName))}
        }
        if(password.length>0){dispatch(checkPasswordValidity(password))}

        if(confirmPassword.length>0){dispatch(matchPasswords(password,confirmPassword))}

        
        if(isProceedToAccountVerification){
            navigator(`/accountVerification/${token}`)
        }

    },[email,firstName,lastName,password,confirmPassword,isProceedToAccountVerification])

    

  return (
    <Flex w={'100%'} justifyContent={'center'} alignItems={'center'} p={'30px 0px'}>
        <Flex as={'form'} display={'flex'} w={['70%','50%','30%','30%']} direction={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'} border={'1px solid gray'} borderRadius={'lg'} p={'20px 20px'}
        onSubmit={(e)=>{e.preventDefault();isSignUpForm? dispatch(signup(signUpData)) : dispatch(login(loginData))}}
        >
            
            {
                isSignUpForm && (
                    <Flex gap={'10px'}>
                    <FormControl gap={'5px'}>
                        <FormLabel>First Name</FormLabel>
                        <Input type='text' name='firstName'placeholder='Enter first name' isRequired={true} value={firstName}  onChange={(e)=>{dispatch(updateLoginFormData(e.target.name,e.target.value))}} />
                    </FormControl>
                    <FormControl gap={'5px'}>
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' name='lastName'placeholder='Enter last name' isRequired={true} value={lastName}  onChange={(e)=>{dispatch(updateLoginFormData(e.target.name,e.target.value))}} />
                    </FormControl>
                    </Flex>
                    
                )
            }
            <FormControl gap={'5px'}>
                <FormLabel>Email</FormLabel>
                <Input type='email' name='email' isRequired={true} value={email} placeholder='Enter your email'  onChange={(e)=>{dispatch(updateLoginFormData(e.target.name,e.target.value))}}/>
            </FormControl>
            <FormControl gap={'5px'}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        name='password'
                        isRequired={true}
                        value={password}
                        onChange={(e)=>{dispatch(updateLoginFormData(e.target.name,e.target.value))}} 
                    />
                    <InputRightElement width="4.5rem">
                        <IconButton
                        h="1.75rem"
                        size="sm"
                        onClick={()=>{dispatch(toggleShowPassword())}}
                        icon={showPassword ? <ViewIcon /> :<ViewOffIcon /> }
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        />
                    </InputRightElement>
                </InputGroup>

            </FormControl>
            {
                isSignUpForm && (
                    <FormControl gap={'5px'}>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter confirm password"
                                name='confirmPassword'
                                isRequired={true}
                                value={confirmPassword}
                                onChange={(e)=>{dispatch(updateLoginFormData(e.target.name,e.target.value))}} 
                            />
                            <InputRightElement width="4.5rem">
                                <IconButton
                                h="1.75rem"
                                size="sm"
                                onClick={()=>{dispatch(toggleShowPassword())}}
                                icon={showPassword ? <ViewIcon /> :<ViewOffIcon /> }
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                )
            }
            <Flex w={'100%'} p={'10px 0px'}>
            {
                isSignUpForm ? ( <Text>Already signed up? <Text as='span' cursor={'pointer'} textUnderlineOffset={'5px'} textDecoration={'underline'} onClick={()=>{dispatch(selectLoginForm())}}>Login</Text></Text>
            ):(
                <Text>Don't have account? <Text as='span' cursor={'pointer'} textUnderlineOffset={'5px'} textDecoration={'underline'} onClick={()=>{dispatch(selectSignUpForm())}}>Sign up</Text></Text>
            )
            }
            </Flex>
            <Flex w={'100%'} color={'red.500'} direction={'column'}>
                <UnorderedList>
                {
                    isInvalidEmail && (
                        <ListItem>Invalid email</ListItem>
                    )
                }
                {
                    isSignUpForm && isInvalidFirstName && (
                        <ListItem>Invalid First name</ListItem>
                    )
                }
                {
                    isSignUpForm && isInvalidLastName && (
                        <ListItem>Invalid last name</ListItem>
                    )
                }
                {
                    isPoorPassword && (
                        <Flex w={'100%'} direction={'column'}>
                        <Text>Password must</Text>
                            <UnorderedList>
                                <ListItem>be at least 8 characters long.</ListItem>
                                <ListItem>include at least 1 uppercase & lowercase letter</ListItem>
                                <ListItem>include at least 1 number & special character</ListItem>
                            </UnorderedList>

                        </Flex>
                    )
                }
                {
                    isPasswordNotMatching && 
                    (
                        <ListItem>Password & confirm password not matching</ListItem>
                    )
                }
                </UnorderedList>
            </Flex>
            <Flex w={'100%'} direction={'column'} color={'red'}>
                {
                    isSignUpForm && isUserAlreadyRegistered && (
                        <Text>User is already registered. Please login.</Text>
                    )
                }
            </Flex>
            <Flex w={'100%'}>
            {
                !isSignUpForm && (
                    <Text>Forgot password?</Text>
                )
            }
            </Flex>
            <Flex w={'100%'} direction={'column'} color={'green'} >
                {
                    isSignUpForm && isSignUpSuccessful && (
                        <Text>User registered successfully ! Proceed to Login.</Text>
                    )
                }
            </Flex>
            <Button mt={'20px'} w={'50%'} isDisabled={isSignUpForm? isInvalidEmail || isInvalidFirstName || isInvalidLastName || isPoorPassword ||isPasswordNotMatching : isInvalidEmail} 
            type='submit'
            
            >{isSignUpForm?'Sign up':'Login'}</Button>
        </Flex>
    </Flex>
  )
}

export default Login
