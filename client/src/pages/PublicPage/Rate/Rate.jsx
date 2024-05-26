import { Fragment, useEffect, useState } from "react";
import clsx from 'clsx';
import style from './Rate.module.scss';
import { FaStar } from "react-icons/fa";
import { apiGetDetailProductByPIOID } from "../../../services/order";
import { apiCreateNewFeedback, apiGetFeedback, apiUpdateRate } from "../../../services/product";
import { useNavigate } from "react-router-dom";

export const Rate = () => {

    let url = new URL(window.location.href);
    let pIOIdValue = url.searchParams.get("pIOId");
    let isRated = url.searchParams.get("isRated");

    const navigate = useNavigate();
    const accId = localStorage.getItem('id');
    const [pIOId, setPIOId] = useState(0);
    const [productDetail, setProductDetail] = useState(
        {
            Product: {
                productImage: "",
                productName: "",
                productCost: "",
                productDescription: ""
            },
            productId: ''
        }
    );

    const [stars, setStars] = useState([0,0,0,0,0]);
    const [numStar, setNumStar] = useState(0);

    const getProductDetail = async(data) => {
        const response = await apiGetDetailProductByPIOID(data);
        // console.log(response.data[0]);
        setProductDetail(response.data[0]);
    };

    const getFeedback = async(pIOId) => {
        const response = await apiGetFeedback(pIOId);
        console.log(response);
        setStarsByIndex(response.data.response.rateScore - 1);
        setNumStar(response.data.response.rateScore);
        // console.log(numStar);
        document.querySelector('.'+ style.commentRateInput).value = response.data.response.productFeedback;
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

    const handleSubmit = async() => {
        const comment = document.querySelector('.' + style.commentRateInput).value;
        // call api
        console.log(numStar + "   " + comment);

        try {
            if(isRated == 1) {
                const payload = {pIOId, numStar, comment};
                const response = await apiUpdateRate(payload);
                if(response.status = 200) {
                    alert('Update Successfully')
                    navigate('/personal');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      })
                }
            }
            else if (isRated == 0) {
                const payload = {
                    pId: productDetail.Product.id,
                    accId,
                    pIOId,
                    numStar,
                    comment
                };
                const response = await apiCreateNewFeedback(payload);
                if(response.status = 200) {
                    alert('Create Successfully')
                    navigate('/personal');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        
        if(isRated == 1) {
            getFeedback(pIOIdValue);
        }
        setPIOId(pIOIdValue);
        getProductDetail(pIOIdValue);
    }, [0]);

    return (
        <div className={clsx(style.container)}>
            <div className={clsx(style.productDetailContainer)}>
                <div className={clsx(style.imageContainer)}>
                    <img src= {productDetail.Product.productImage} alt="" />
                </div>

                <div className={clsx(style.infoContainer)}>
                    <div className={clsx(style.nameContainer)}>
                        {productDetail.Product.productName}
                    </div>

                    <div className={clsx(style.priceContainer)}>
                        Cost: {productDetail.Product.productCost} $
                    </div>

                    <div className={clsx(style.descriptionContainer)}>
                        {productDetail.Product.productDescription}
                    </div>
                </div>

                <div className={clsx(style.viewDetailContainer)}>
                    <div className={clsx(style.viewDetailBtn)}
                    onClick={() => {
                        navigate("/product/" + productDetail.productId)
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })
                    }}
                    >
                        View Detail
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

                <div className = {clsx(style.cancelBtn)}
                onClick={() => {
                    navigate('/personal');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }}
                >
                    Cancel
                </div>
            </div>
        </div>
    );
}

export default Rate;