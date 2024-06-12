import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Flex w={'100%'} justifyContent={'center'} alignContent={'center'} p={'20px 0px'} fontSize={'xl'} bg={'teal'}>
        <Flex w={'80%'} justifyContent={'space-between'} alignItems={'center'}>
            <Flex>LOGO</Flex>
            <Flex gap={'30px'} >
            <Link to={'/home'}>Home</Link>
            <Link to={'/login'}>Login</Link>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default Navbar
