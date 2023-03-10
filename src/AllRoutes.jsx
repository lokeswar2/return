import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './screens/Login'
import QRPage from './screens/QRPage'
import Questions from './screens/Questions'


const AllRoutes = () => {
    return ( 
      <Routes>
          <Route path='/' element={<QRPage/>}/>
          <Route path='/questions/:id' element={<Questions/> }/>
          <Route path='/login' element={<Login /> }/>
      </Routes>
    )
  }
  
  export default AllRoutes