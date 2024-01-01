import React, { useEffect } from 'react'
import { useDispatch  } from 'react-redux'
import { logOut } from './authSlice'
import { useSingoutQuery} from './authApiSlice'
import { Navigate, useLocation } from 'react-router-dom'

const Logout = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { isSuccess } = useSingoutQuery()

  const handleLogout = async () => {
    if(isSuccess) dispatch(logOut())
  }

  useEffect(() => {
   handleLogout();
  },[])


  return <Navigate to="/login" state={{from: location}} replace />;
}

export default Logout