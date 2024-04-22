import { Fragment, useEffect, useState } from "react";
import clsx from 'clsx';
import style from './Information.module.scss'
import { apiGetDetailInfoByID } from "../../../../../services/user";


export const Information = (props) => {

    const [info, setInfo] = useState({
        aId: "",
        aName: "",
        aPhone: "",
        aEmail: null,
        aAddress: "",
        aPassword: "",
    });

    const [isValidName, setIsValidName] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidAddress, setIsValidAddress] = useState(true);
    const [isValidPass, setIsValidPass] = useState(true);
    const [isValidCfPass, setIsValidCfPass] = useState(true);

    const [inputForm, setInputForm] = useState({
        id: "",
        name: "",
        phone: "",
        email: null,
        address: "",
        oldPassword: "",
        newPassword: "",
        cfPassword: ""
    });

    const getInformationData = async() => {
        try {
            const response = await apiGetDetailInfoByID(props.pData);
            console.log(response.data.response.accountName);
            setInfo({
                aId: response.data.response.id,
                aName: response.data.response.accountName,
                aPhone: response.data.response.accountPhone,
                aEmail: response.data.response.accountEmail,
                aAddress: response.data.response.accountAddress,
                aPassword: response.data.response.accountPassword,
            });

            setInputForm({
                id: response.data.response.id,
                name: response.data.response.accountName,
                phone: response.data.response.accountPhone,
                email: response.data.response.accountEmail,
                address: response.data.response.accountAddress,
                oldPassword: "",
                newPassword: "",
                cfPassword: ""
            })
        } catch (error) {
            console.log(error);
        }
    }

    
    const checkValidName = () => {
        if(inputForm.name != "") {
            setIsValidName(true);
        }
        else {
            setIsValidName(false);
        }
    };

    const checkValidPhone = () => {
        const phoneRegex = /^0\d{9}$/;
        console.log(inputForm.phone);
        setIsValidPhone(phoneRegex.test(inputForm.phone)); 
    };

    const checkValidAddress = () => {
        
        if(inputForm.address != "") {
            setIsValidAddress(true);
        }
        else {
            setIsValidAddress(false);
        }
    };

    const checkValidEmail = () => {
        if(inputForm.email === null) {
            setIsValidEmail(true);
        }
        else if (inputForm.email === "") {
            if (info.aEmail === null) {
                setIsValidAddress(true)
            }
            else {
                setIsValidAddress(false);
            }
        }
        else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsValidEmail(emailRegex.test(inputForm.email));
        }
    };

    const handleChangeInputForm = (e) => {
        setInputForm((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        });
        // console.log(inputForm);
    }

    

    useEffect(() => {
        getInformationData();
    }, [1]);

    return (
        <Fragment>
            <div className={style.nameContainer}>
                <label htmlFor={style.nameInp}>Customer Name: </label>
                <input type="text" className={style.nameInp}
                defaultValue={info.aName}
                name="name"
                onBlur={checkValidName}
                onFocus={() => {
                    setIsValidName(true);
                }}
                onInput={(e) => {
                    handleChangeInputForm(e)
                }}
                placeholder="Enter your name"></input>
            </div>

            <div className={clsx(style.fieldErr, style.nameErr, )}>
                <p className={clsx({[style.disableErr]: isValidName})}>Invalid Name!</p>
            </div>
            
            <div className={style.phoneContainer}>
                <label htmlFor={style.phoneInp}>Customer Phone: </label>
                <input type="text" className={style.phoneInp}
                defaultValue={info.aPhone}
                name="phone"
                onBlur={checkValidPhone}
                onFocus={() => {
                    setIsValidPhone(true);
                }}
                onInput={(e) => {
                    handleChangeInputForm(e)
                }}
                placeholder="Enter your phone number"></input>
            </div>

            <div className={clsx(style.fieldErr, style.PhoneErr)}>
                <p className={clsx({[style.disableErr]: isValidPhone})}>Invalid Phone Number!</p>
            </div>

            <div className={style.emailContainer}>
                <label htmlFor={style.mailInp}>Email: </label>
                <input type="text" className={style.mailInp} 
                defaultValue={info.aEmail}
                name="email"
                onBlur={checkValidEmail}
                onFocus={() => {
                    setIsValidEmail(true);
                }}
                onInput={(e) => {
                    handleChangeInputForm(e)
                }}
                placeholder="Enter your email"></input>
            </div>

            <div className={clsx(style.fieldErr, style.emailErr)}>
                <p className={clsx({[style.disableErr] : isValidEmail})}>Invalid Email!</p>
            </div>

            <div className={style.addressContainer}>
                <label htmlFor={style.addressInp}>Address: </label>
                <input type="text" className={style.addressInp} 
                defaultValue={info.aAddress}
                name="address"
                onBlur={checkValidAddress}
                onFocus={() => {
                    setIsValidAddress(true);
                }}
                onInput={(e) => {
                    handleChangeInputForm(e)
                }}
                placeholder="Enter your address"></input>
            </div>

            <div className={clsx(style.fieldErr, style.addressErr)}>
                <p className={clsx({[style.disableErr] : isValidAddress})}>Invalid Address!</p>
            </div>

            <div className={style.changePasswordContainer}>
                <div className={style.oldPass}>
                    <label htmlFor={style.oldPassInp}>Old Password: </label>
                    <input type="password" className={style.oldPassInp} 
                    placeholder="Enter your old password"></input>
                </div>

                <div className={clsx(style.fieldErr, style.oldPassErr)}>
                    <p>Invalid Password!</p>
                </div>

                <div className={style.newPass}>
                    <label htmlFor={style.newPassInp}>New Password: </label>
                    <input type="password" className={style.newPassInp} 
                    placeholder="Enter your new password"></input>
                </div>

                <div className={clsx(style.fieldErr, style.newPassErr)}>
                    <p>Invalid Password!</p>
                </div>

                <div className={style.confirmPass}>
                    <label htmlFor={style.cfPassInp}>Confirm Password: </label>
                    <input type="password" className={style.cfPassInp} 
                    placeholder="Enter your confirm password"></input>
                </div>

                <div className={clsx(style.fieldErr, style.cfPassErr)}>
                    <p>Invalid Confirm Password!</p>
                </div>
            </div>
        </Fragment>
    );
}

export default Information;