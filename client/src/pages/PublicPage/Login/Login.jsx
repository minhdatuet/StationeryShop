import React, { useEffect, useState} from 'react'
import './Login.css'
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
    accountPhone: '',
    accountPassword: ''
  })


  const [errorPhoneMessage, setErrorPhoneMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');

  useEffect(() => {
    isLogged && navigate('/')
  }, [isLogged])

  const handleSubmit = async () => {
    try {
      if (!payload.accountPhone) {
        setErrorPhoneMessage('Vui lòng nhập số điện thoại!');
        return;
      } else if (payload.accountPhone[0] !== '0' || !(payload.accountPhone.match('[0-9]{10}'))) {
        setErrorPhoneMessage('Số điện thoại không hợp lệ!');
        return;
      } else {
        setErrorPhoneMessage('');
      }
      if (!payload.accountPassword) {
        setErrorPasswordMessage('Vui lòng nhập mật khẩu!');
        return;
      } else {
        setErrorPasswordMessage('');
      }
      const response = dispatch(actions.login(payload))

      setTimeout(() => {
        if (!window.localStorage.getItem('persist:auth').isLogged ) {
          setErrorPasswordMessage('Số điện thoại hoặc mật khẩu không chính xác!');
          return;
        } else {
          setErrorPasswordMessage('');
        }
      }, 500)
      
    } catch (error) {
      console.log('Đã xảy ra lỗi khi đăng nhập!');
    }
  }
  return (

<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                    Sign up
                </h1>
                <div className="w-full flex-1 mt-8">
                    <div className="flex flex-col items-center">
                        <button
                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                            <div className="bg-white p-2 rounded-full">
                                <svg className="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                        fill="#4285f4" />
                                    <path
                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                        fill="#34a853" />
                                    <path
                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                        fill="#fbbc04" />
                                    <path
                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                        fill="#ea4335" />
                                </svg>
                            </div>
                            <span className="ml-4">
                                Sign Up with Google
                            </span>
                        </button>
                    </div>

                    <div className="my-12 border-b text-center">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign up with your account
                        </div>
                    </div>

                    <div className="mx-auto max-w-xs">
                        <input
                            value={payload.accountPhone}
                            onChange={(e) => setPayload(prev => ({ ...prev, accountPhone: e.target.value }))}
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="text" placeholder="Phone" name="phone" />
                        {errorPhoneMessage && (
                          <p style={{ color: 'red', marginTop: '5px' }}>{errorPhoneMessage}</p>
                          )}
                        <input
                            value={payload.accountPassword}
                            onChange={(e) => setPayload(prev => ({ ...prev, accountPassword: e.target.value }))}
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password" name="password"/>
                        {errorPasswordMessage && (
                          <p style={{ color: 'red', marginTop: '5px' }}>{errorPasswordMessage}</p>
                          )}
                        <button
                            onClick={handleSubmit}
                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">
                                Sign Up
                            </span>
                        </button>
                        <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
                  </a>
                </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}