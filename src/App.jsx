import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes , Navigate} from 'react-router-dom'

import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import CityList from './Componenets/CityList'
import CountryList from './Componenets/CountryList'
import City from './Componenets/City'
import Form from './Componenets/Form'
import { CitiesProvider } from './contexts/CitiesContexts'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'


export default function App() {
  return(
    <AuthProvider>
   <CitiesProvider>
  <BrowserRouter>
  <Routes>
    <Route path='/' element = {<Homepage/>}/>
    <Route path='product' element ={ <Product/>}/>
    <Route path='pricing' element ={<Pricing/>}/>
    <Route path='/login' element ={<Login/>}/>
    <Route path='app' 
    element ={
    <ProtectedRoute>
      <AppLayout/>
      </ProtectedRoute>
    }>
      <Route index element = {<Navigate replace to = "cities"/>}/>
      <Route path='cities' element ={<CityList />}/> 
   <Route path = "cities/:id" element = {<City/>}/>
   <Route path='countries' element = {<CountryList />}
  />
   <Route path='form' element = {<Form/>}
  />
   </Route>
    <Route path='*' element ={<PageNotFound/>}/>
  </Routes>
  </BrowserRouter>
  
  </CitiesProvider>
  </AuthProvider>
  )

}