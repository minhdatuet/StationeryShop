import React, { useEffect, useState } from 'react';
import './Login.css';
import * as actions from '../../../store/actions';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged } = useSelector(state => state.auth);
  const { userData } = useSelector(state => state.user);

  const [payload, setPayload] = useState({
    accountPhone: '',
    accountPassword: ''
  });

  const [additionalInfo, setAdditionalInfo] = useState({
    accountPhone: '',
    accountAddress: ''
  });

  const [errorPhoneMessage, setErrorPhoneMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [errorAdditionalPhoneMessage, setErrorAdditionalPhoneMessage] = useState('');
  const [errorAddressMessage, setErrorAddressMessage] = useState('');
  const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);
  const [googleCredential, setGoogleCredential] = useState('');

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        dispatch(actions.getUser());
      }, 100);
    }
  }, [isLogged]);

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        if (!(Object.keys(userData).length === 0) && !(userData.length === 0)) {
          localStorage.setItem('id', userData.id);
          localStorage.setItem('name', userData.accountName);
          localStorage.setItem('type', userData.accountType);
          dispatch(actions.getCart(localStorage.getItem('id')));
          const userType = localStorage.getItem('type');
          if (userType === 'ADMIN') { navigate('/admin'); } else { navigate('/'); }
        }
      }, 200);

      console.log(userData);
    }
  }, [userData]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component is mounted
  }, []);

  const handleSubmit = async () => {
    try {
      if (!payload.accountPhone) {
        setErrorPhoneMessage('Vui lòng nhập số điện thoại!');
        return;
      } else if (payload.accountPhone[0] !== '0' || !(payload.accountPhone.match(/^\d{10}$/))) {
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
      const response = await dispatch(actions.login(payload));

      if (response.data.err) {
        console.log(response)
        if (!window.localStorage.getItem('persist:auth').isLogged) {
          setErrorPasswordMessage('Số điện thoại hoặc mật khẩu không chính xác!');
          return;
        } else {
          setErrorPasswordMessage('');
        }
      };

    } catch (error) {
      console.log('Đã xảy ra lỗi khi đăng nhập!');
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);

    try {
      const response = await dispatch(actions.googleLogin(credentialResponse.credential));
      console.log(response);
      const data = response.data;
      console.log(data);
      if (data.needAdditionalInfo) {
        setGoogleCredential(credentialResponse.credential);
        setShowAdditionalInfoForm(true);
      } else {
        localStorage.setItem('id', data.user.id);
        localStorage.setItem('name', data.user.accountName);
        localStorage.setItem('type', data.accountType);
        const userType = localStorage.getItem('type');
        if (userType === 'ADMIN') { navigate('/admin'); } else { navigate('/'); }
      }
    } catch (error) {
      console.log('Google login failed!', error);
    }
  };

  const handleCompleteProfile = async () => {
    try {
      if (!additionalInfo.accountPhone) {
        setErrorAdditionalPhoneMessage('Vui lòng nhập số điện thoại!');
        return;
      } else if (additionalInfo.accountPhone[0] !== '0' || !(additionalInfo.accountPhone.match(/^\d{10}$/))) {
        setErrorAdditionalPhoneMessage('Số điện thoại không hợp lệ!');
        return;
      } else {
        setErrorAdditionalPhoneMessage('');
      }
      if (!additionalInfo.accountAddress) {
        setErrorAddressMessage('Vui lòng nhập địa chỉ!');
        return;
      } else {
        setErrorAddressMessage('');
      }

      const response = await dispatch(actions.completeProfile({
        ...additionalInfo,
        googleCredential
      }));
      console.log(response);
      if (response) {
        const data = response.data;
        localStorage.setItem('id', data.user.id);
        localStorage.setItem('name', data.user.accountName);
        localStorage.setItem('type', data.accountType);
        const userType = localStorage.getItem('type');
        if (userType === 'ADMIN') { navigate('/admin'); } else { navigate('/'); }
      }
    } catch (error) {
      console.log('Failed to complete profile', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign In
            </h1>
            <div className="w-full flex-1 mt-8">
              {!showAdditionalInfoForm ? (
                <>
                  <div className="flex flex-col items-center">
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                      text="signin_with"
                      theme="filled_blue"
                      size="large"
                      width="315"
                    />
                  </div>

                  <div className="my-12 border-b text-center">
                    <div
                      className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or sign in with your account
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
                      type="password" placeholder="Password" name="password" />
                    {errorPasswordMessage && (
                      <p style={{ color: 'red', marginTop: '5px' }}>{errorPasswordMessage}</p>
                    )}
                    <button
                      onClick={handleSubmit}
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">
                        Sign In
                      </span>
                    </button>
                    <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700">
                        Register
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                <div className="mx-auto max-w-xs">
                  <input
                    value={additionalInfo.accountPhone}
                    onChange={(e) => setAdditionalInfo({ ...additionalInfo, accountPhone: e.target.value })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text" placeholder="Phone" name="phone" />
                  {errorAdditionalPhoneMessage && (
                    <p style={{ color: 'red', marginTop: '5px' }}>{errorAdditionalPhoneMessage}</p>
                  )}
                  <input
                    value={additionalInfo.accountAddress}
                    onChange={(e) => setAdditionalInfo({ ...additionalInfo, accountAddress: e.target.value })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text" placeholder="Address" name="address" />
                  {errorAddressMessage && (
                    <p style={{ color: 'red', marginTop: '5px' }}>{errorAddressMessage}</p>
                  )}
                  <button
                    onClick={handleCompleteProfile}
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <span className="ml-3">
                      Complete Profile
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
