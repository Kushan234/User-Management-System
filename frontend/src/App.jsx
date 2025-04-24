import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainForm from './Components/MainForm/MainForm'
import Header from './Components/Header/Headers'
import ViewForm from './Components/ViewForm/ViewForm'

const App = () => {
  return (
    <>
       <Header />
       <Routes >
        <Route path='/' element={<MainForm />}/>
        <Route path='/viewForm' element={<ViewForm />}/>
       </Routes>
   </>
  )
}

export default App