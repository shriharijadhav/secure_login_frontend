import { Flex, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enableOtpRegeneration } from '../redux/action';

const Countdown = ({ milliseconds }) => {
    const [time, setTime] = useState(milliseconds);

    const dispatch = useDispatch()
    const isCountDownEnded = useSelector((store)=>store.isCountDownEnded)


    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1000) {
                    clearInterval(interval);
                    dispatch(enableOtpRegeneration())
                    return 0;
                }
                return prevTime - 1000;
            });
        }, 1000);

        return () =>{
            clearInterval(interval);  
        };
    }, []);

    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return (

                <Flex w={'100%'}  alignItems={'center'}>
                     {
                        !isCountDownEnded && (
                           <Flex w={'100%'}  alignItems={'center'}>
                            <Text mr={'10px'}>Your OTP will expires in:</Text>
                            <Text> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                            <Text ml={'2px'}>s</Text>
                           </Flex>
                        )
                     }
                </Flex>
        
    );
};

export default Countdown;
