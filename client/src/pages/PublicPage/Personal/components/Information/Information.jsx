import { Fragment } from "react";
import clsx from 'clsx';
import style from './Information.module.scss'


export const Information = (props) => {

    const isValidName = () => {
        
    }

    return (
        <Fragment>
            <div className={style.nameContainer}>
                <label htmlFor={style.nameInp}>Customer Name: </label>
                <input type="text" className={style.nameInp}
                defaultValue={props.aName}
                placeholder="Enter your name"></input>
            </div>

            <div className={clsx(style.fieldErr, style.nameErr)}>
                <p>Invalid Name!</p>
            </div>
            
            <div className={style.phoneContainer}>
                <label htmlFor={style.phoneInp}>Customer Phone: </label>
                <input type="text" className={style.phoneInp}
                defaultValue={props.aPhone}
                placeholder="Enter your phone number"></input>
            </div>

            <div className={clsx(style.fieldErr, style.PhoneErr)}>
                <p>Invalid Phone Number!</p>
            </div>

            <div className={style.emailContainer}>
                <label htmlFor={style.mailInp}>Email: </label>
                <input type="text" className={style.mailInp} 
                defaultValue={props.aEmail}
                placeholder="Enter your email"></input>
            </div>

            <div className={clsx(style.fieldErr, style.emailErr)}>
                <p>Invalid Email!</p>
            </div>

            <div className={style.addressContainer}>
                <label htmlFor={style.addressInp}>Address: </label>
                <input type="text" className={style.addressInp} 
                defaultValue={props.aAddress}
                placeholder="Enter your address"></input>
            </div>

            <div className={clsx(style.fieldErr, style.addressErr)}>
                <p>Invalid Address!</p>
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