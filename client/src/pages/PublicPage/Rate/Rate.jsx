import { Fragment, useEffect, useState } from "react";
import clsx from 'clsx';
import style from './Rate.module.scss';
import { FaStar } from "react-icons/fa";
import { apiGetBoughtHistoryByAID } from "../../../services/order";

export const Rate = () => {

    const accId = localStorage.getItem('id');
    const [pIOId, setPIOId] = useState(0);
    

    const [stars, setStars] = useState([0,0,0,0,0])
    const [numStar, setNumStar] = useState(0)

    const getProductDetail = async() => {
        const response = await apiGetBoughtHistoryByAID(accId);
    }

    const setStarsByIndex = (index) => {
        let newArr = [];
        for(let i = 0 ; i <= index; i++) {
            newArr.push(1);
        }
        for(let i = 4; i > index; i--) {
            newArr.push(0);
        }
        setStars(newArr);
    };

    const handleSubmit = () => {
        const comment = document.querySelector('.' + style.commentRateInput).value;

    }

    useEffect(() => {
        var url = new URL(window.location.href);
        var pIOIdValue = url.searchParams.get("pIOId");
        setPIOId(pIOIdValue);
    }, [0]);

    return (
        <div className={clsx(style.container)}>
            <div className={clsx(style.productDetailContainer)}>
                <div className={clsx(style.imageContainer)}>
                    
                </div>

                <div className={clsx(style.infoContainer)}>
                    <div className={clsx(style.nameContainer)}>

                    </div>

                    <div className={clsx(style.priceContainer)}>

                    </div>

                    <div className={clsx(style.descriptionContainer)}>

                    </div>
                </div>
            </div>

            <div className = {clsx(style.starRateContainer)}>
                <div className = {clsx(style.starLabel)}>
                    How much do you like this product?
                </div>

                <div className = {clsx(style.starRate)}>
                    {
                        stars.map((star, index) => {
                            if(star == 0)
                            {
                                return (
                                    <FaStar className= {clsx(style.whiteStarElement)} key={index} 
                                    onClick={() => {
                                        setStarsByIndex(index);
                                        setNumStar(index+1);
                                    }}/>
                                );
                            }
                            else {
                                return (
                                    <FaStar className= {clsx(style.yellowStarElement)} key={index} 
                                    onClick={() => {
                                        // console.log(index);
                                        setStarsByIndex(index);
                                        setNumStar(index+1);
                                    }}/>
                                );
                            }
                        }) 
                    }
                </div>
            </div>

            <div className = {clsx(style.commentRateContainer)}>
                <div className = {clsx(style.commentLabel)}>
                    Comment: 
                </div>

                <div className = {clsx(style.commentRate)}>
                    <textarea className = {clsx(style.commentRateInput)}/>
                </div>
            </div>

            <div className = {clsx(style.rateBtns)}>
                <div className = {clsx(style.submitBtn)}
                onClick={() => {
                    handleSubmit();
                }}
                >
                    Submit
                </div>

                <div className = {clsx(style.cancelBtn)}>
                    Cancel
                </div>
            </div>
        </div>
    );
}

export default Rate;