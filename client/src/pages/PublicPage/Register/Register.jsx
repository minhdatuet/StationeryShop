import React, { useEffect, useState} from 'react'
import './Register.css'
import * as actions from '../../../store/actions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TEInput, TERipple } from "tw-elements-react";

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { isLogged } = useSelector(state => state.auth)
  const { userData } = useSelector(state => state.user)

  const [payload, setPayload] = useState({
    accountName: '',
    accountPhone: '',
    accountPassword: '',
    accountAddress: '',
    accountType: 'CUSTOMER'
  })

  const [errorPhoneMessage, setErrorPhoneMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [errorNameMessage, setErrorNameMessage] = useState('');
  const [errorAddressMessage, setErrorAddressMessage] = useState('');

  useEffect(() => {
    isLogged && navigate('/') 
    
  }, [isLogged])

  const handleSubmit = async () => {
    try {
      if (!payload.accountName) {
        setErrorNameMessage('Vui lòng nhập tên của bạn!');
      } else {
        setErrorNameMessage('');
      }
      if (!payload.accountPhone) {
        setErrorPhoneMessage('Vui lòng nhập số điện thoại!');
      } else if (payload.accountPhone[0] !== '0' || !(payload.accountPhone.match('[0-9]{10}'))) {
        setErrorPhoneMessage('Số điện thoại không hợp lệ!');
      } else {
        setErrorPhoneMessage('');
      }
      if (!payload.accountPassword) {
        setErrorPasswordMessage('Vui lòng nhập mật khẩu!');
      } else {
        setErrorPasswordMessage('');
      }
      if (!payload.accountAddress) {
        setErrorAddressMessage('Vui lòng nhập địa chỉ của bạn!');
      } else {
        setErrorAddressMessage('');
      }
      if (!payload.accountName || !payload.accountPhone || !payload.accountPassword|| !payload.accountAddress) return;
      const response = dispatch(actions.register(payload))

      setTimeout(() => {
        if (!window.localStorage.getItem('persist:auth').isLogged) {
          setErrorPhoneMessage('Số điện thoại đã được đăng ký');
        }
      }, 500)
    } catch (error) {
      console.log('Đã xảy ra lỗi khi đăng ký!');
    }
  }
  return (
    <div className="p-10">
    <h1 className="mb-8 font-extrabold text-4xl">Register</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div>
            <div>
                <label className="block font-semibold" for="name">Name</label>
                <input value={payload.accountName}
                            onChange={(e) => setPayload(prev => ({ ...prev, accountName: e.target.value }))}
                             className="w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white" id="name" type="text" name="name" required="required" autofocus="autofocus" />
                {errorNameMessage && (
            <p style={{ color: 'red', marginTop: '5px' }}>{errorNameMessage}</p>
            )}
            </div>

            <div className="mt-4">
                <label className="block font-semibold" for="phone">Phone</label>
                <input value={payload.accountPhone}
                            onChange={(e) => setPayload(prev => ({ ...prev, accountPhone: e.target.value }))}
                             className="w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white" id="phone" type="text" name="phone" required="required" />
                {errorPhoneMessage && (
            <p style={{ color: 'red', marginTop: '5px' }}>{errorPhoneMessage}</p>
            )}
            </div>

            <div className="mt-4">
                <label className="block font-semibold" for="password">Password</label>
                <input value={payload.accountPassword}
                            onChange={(e) => setPayload(prev => ({ ...prev, accountPassword: e.target.value }))}
                             className="w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white" id="password" type="password" name="password" required="required" autocomplete="new-password"/>
                {errorPasswordMessage && (
            <p style={{ color: 'red', marginTop: '5px' }}>{errorPasswordMessage}</p>
            )}
            </div>

            <div className="mt-4">
                <label className="block font-semibold" for="address">Address</label>
                <input value={payload.accountAddress}
                            onChange={(e) => setPayload(prev => ({ ...prev, accountAddress: e.target.value }))}
                             className="w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white" id="address" type="text" name="address" required="required"/>
                {errorAddressMessage && (
            <p style={{ color: 'red', marginTop: '5px' }}>{errorAddressMessage}</p>
            )}
            </div>

            <div className="flex items-center justify-between mt-8">
                <button onClick={handleSubmit} className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">Register</button>
                <a className="font-semibold">
                    Already registered?
                </a>
            </div>
        </div>

        <aside className="">
            <div className="bg-gray-100 p-8 rounded">
                <h2 className="font-bold text-2xl">Instructions</h2>
                <ul className="list-disc mt-4 list-inside">
                    <li>All users must provide a valid email address and password to create an account.</li>
                    <li>Users must not use offensive, vulgar, or otherwise inappropriate language in their username or profile information</li>
                    <li>Users must not create multiple accounts for the same person.</li>
                </ul>
            </div>
        </aside>

    </div>
</div>
  );
}