import React from 'react'
import { Routes,Route } from 'react-router-dom'
import App from './App'
import RecommendationsPage from './components/RecommendationsPage/RecommendationsPage'

function Zero() {
  return (
   <Routes>
    <Route path='/' element={<App/>}/>
    <Route path='/RecommendationsPage' element={<RecommendationsPage/>}/>
   </Routes>
  )
}

export default Zero