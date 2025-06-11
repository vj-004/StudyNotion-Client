import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    if(!token){
        navigate('/');
    }

  return children
}

export default PrivateRoute