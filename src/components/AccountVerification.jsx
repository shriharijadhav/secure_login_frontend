import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import Countdown from './Countdown';
import { useDispatch, useSelector } from 'react-redux';
import { disableOtpRegeneration, enableOtpRegeneration, makeApiCallToGetNewOtp } from '../redux/action';


const AccountVerification = () => {

    const isCountDownEnded = useSelector((store)=>store.isCountDownEnded)
    const isOtpRegenerated = useSelector((store)=>store.isOtpRegenerated)
    const isRegenerateOtpButtonDisabled = useSelector((store)=>store.isRegenerateOtpButtonDisabled)
    const tokenFromStore = useSelector((store)=>store.token)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const params = useParams();
    const {token}= params;
    const decoded = jwtDecode(token);
    const {userEmail} = decoded

    // const decodedToken = jwt_decode(token);
    // console.log(decoded)
    const tokenExpiresAt = decoded.tokenExpiresAt;
    const tokenWillExpiresInMS = Math.floor((tokenExpiresAt - Date.now())) ;

    // const myTime = Date.now()-tokenCreatedAT;

    // console.log(tokenWillExpiresInMS)

   console.log('isCountDownEnded',isCountDownEnded)
   console.log('isRegenerateOtpButtonDisabled',isRegenerateOtpButtonDisabled)

    useEffect(() => {
        
       if(isOtpRegenerated){
        navigator(`/accountVerification/${tokenFromStore}`)
        dispatch(disableOtpRegeneration())
    } 

        
    },[isCountDownEnded,isOtpRegenerated,tokenFromStore])
    
    
    
   
   

  return (
    <Flex w={'100%'} justifyContent={'center'} alignItems={'center'} direction={'column'} p={'20px 0px'}>
        <Flex w={'250px'} p={'20px 0px'} justifyContent={'center'} alignItems={'center'} direction={'column'} gap={'20px'}>
            <FormControl>
            <FormLabel>User Email</FormLabel>
            <Input value={userEmail} isDisabled={true} />
            </FormControl>
            <FormControl>
            <FormLabel>Enter OTP</FormLabel>
            <Input type='text' placeholder='Enter OTP from the received mail'/>
            </FormControl>
             
                    
                    <Flex w={'100%'}  alignItems={'center'}>
                         {
                            tokenWillExpiresInMS>0 &&(
                                <Countdown milliseconds={tokenWillExpiresInMS} />
                            )
                         }
                     </Flex>
             
            {
                isCountDownEnded &&(
                    <Flex w={'100%'} justifyContent={'left'} gap={'10px'} alignItems={'center'}>
                        <Text fontSize={'14px'}>Dear user, your OTP has been expired. Please re-generate.</Text>
                    </Flex>
                )
            }


            <Flex w={'100%'} justifyContent={'left'} gap={'10px'} alignItems={'center'}>
                <Text fontSize={'14px'}>Didn't get the OTP? </Text>
                <Button variant={'ghost'} isDisabled={isRegenerateOtpButtonDisabled} textDecoration={'underline'} textUnderlineOffset={'5px'} cursor={'pointer'} p={'0px 5px'}
                onClick={() =>{dispatch(makeApiCallToGetNewOtp(userEmail))}}
                >Regenerate.</Button>
            </Flex>
            
            
            <Button w={'50%'}>Verify Account</Button> 
             
        </Flex>
        
       
    </Flex>
  )
}

export default AccountVerification
