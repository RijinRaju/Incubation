import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import AdminLogin from '../AdminLogin/AdminLogin'
import Dashboard from '../Dashboard/Dashboard'

function Admin() {

const navigate = useNavigate()

  useEffect(()=>{
  localStorage.getItem("authTokensAdmin") ? navigate('/admin') :navigate('/admin_login')
  },[])
  
  return (
    <div>
     
      <Dashboard/>
    
    </div>
  )
}

export default Admin
