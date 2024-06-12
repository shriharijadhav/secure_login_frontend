import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllRoutes from './components/AllRoutes'
import { Flex } from '@chakra-ui/react'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Flex direction={'column'} w={'100vw'} overflowX={'hidden'}  >
      <AllRoutes/>
    </Flex>
  )
}

export default App
