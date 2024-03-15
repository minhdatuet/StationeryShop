import React, { useState } from 'react'
import './Register.css'
import * as actions from '../../../store/actions'
import { useDispatch } from 'react-redux'

export const Register = () => {
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    accountName: 'Vi',
    accountPhone: '0133234',
    accountPassword: 'Minhdat1234',
    accountAddress: 'Ha Noi',
    accountType: 'CUSTOMER'
  })
  const handleSubmit = async () => {
    console.log(payload)
    dispatch(actions.register(payload))
    
  }
  return (
    <div id="register">
      Register
      <button className="btnSignIn" onClick={handleSubmit}>Xác nhận</button>
    </div>
  )
}

export default Register
