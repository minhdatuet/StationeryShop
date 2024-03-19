
import React, { useEffect, useState } from 'react';
import style from "./Product.module.scss";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import clsx from 'clsx';

export const Product = (props) => {
    console.log(props.data);
    const productData = props.data;
    const [arrStars, setArrStars] = useState([]);

    const createStars = () => {
        let tmpArr = [];
        let numStars = productData.productScore;
        let numFullStars = Math.floor(numStars);
        let numHalfStar = numStars - numFullStars > 0 ? 1 : 0;
        for(let i = 0; i < numFullStars; i++) {
            tmpArr.push(1);
        }

        if (numHalfStar === 1) {
            tmpArr.push(0);
        }

        setArrStars(tmpArr);
    }

    useEffect(() => {
        createStars();
    }, [0]);
    return (
        
        <div className={clsx(style.productContainer, )}>
            <div className={clsx(style.productImg, )}>
                <img src={productData.productImg} alt="" />
            </div>

            <div className={clsx(style.productName, )}>
                <p>{productData.productName}</p>
            </div>

            <div className={clsx(style.productDemoDes, )}>
                <div className={clsx(style.productPrice, )}>
                    <p>{productData.productPrice} $</p>
                </div>

                <div className={clsx(style.productRate, )}>
                    <div className={clsx(style.productScore, )}>
                        {
                            arrStars.map((star, index) => {
                                if(star === 1) {
                                    return (
                                        <FaStar key={index} />
                                    );
                                }
                                else if(star === 0) {
                                    return (
                                        <FaStarHalfAlt key={index} />
                                    );
                                }
                            })
                        }
                    </div>

                    <div className={clsx(style.productReview, )}>
                        <p>{productData.productRvs} {productData.productRvs > 1 ? "reviews" : "review"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
