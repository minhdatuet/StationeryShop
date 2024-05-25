
import React, { useEffect, useState } from 'react';
import style from "./Product.module.scss";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import clsx from 'clsx';
import { color } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export const Product = (props) => {
    // console.log(props.data);
    const productData = props.data;
    const [arrStars, setArrStars] = useState([]);
    const navigate = useNavigate();

    const createStars = () => {
        let tmpArr = [];
        console.log(productData);
        if(productData.Product_Rates.length > 0) {
            let numStars = productData.Product_Rates[0].avgScore;
            let numFullStars = Math.floor(numStars);
            let numHalfStar = numStars - numFullStars > 0 ? 1 : 0;
            for(let i = 0; i < numFullStars; i++) {
                tmpArr.push(1);
            }

            if (numHalfStar === 1) {
                tmpArr.push(0);
            }
            // console.log(tmpArr);
            setArrStars(tmpArr);
        }
        else {

        }
    }

    useEffect(() => {
        createStars();
    }, [0]);
    return (
        
        <div className={clsx(style.productContainer, )}
        onClick={()=> {
            navigate(`/product/${productData.id}`);
        }}
        >
            <div className={clsx(style.productImg, )}>
                <img src={productData.productImage} alt="" />
            </div>

            <div className={clsx(style.productName, )}>
                <p>{productData.productName}</p>
            </div>

            <div className={clsx(style.productDemoDes, )}>
                <div className={clsx(style.productPrice, )}>
                    <p>{productData.productCost} $</p>
                </div>

                <div className={clsx(style.productRate, )}>
                    <div className={clsx(style.productScore, )}>
                        {
                            arrStars.map((star, index) => {
                                if(star === 1) {
                                    return (
                                        <FaStar style={{color: 'yellow'}} key={index} />
                                    );
                                }
                                else if(star === 0) {
                                    return (
                                        <FaStarHalfAlt style={{color: 'yellow'}} key={index} />
                                    );
                                }
                            })
                        }
                    </div>

                    <div className={clsx(style.productReview, )}>
                        <p>{productData.Product_Rates.length != 0 ? productData.Product_Rates[0].productRvs : 0} {productData.Product_Rates.length != 0 ? (productData.Product_Rates[0].productRvs > 1 ? "reviews" : "review") : "review"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
