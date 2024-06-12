import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import { Flex } from '@chakra-ui/react'
import Layout from './Layout'
import AccountVerification from './AccountVerification'

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/accountVerification/:token' element={<AccountVerification/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default AllRoutes
