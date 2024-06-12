import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <Flex w={'100%'} direction={'column'}>
        <Navbar/>
        <Outlet/>
    </Flex>
  )
}

export default Layout
