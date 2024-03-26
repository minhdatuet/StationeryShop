import React, { useEffect, useState} from 'react'
import './Product.css'
import QuantityInput from '../../../components/QuantityInput/QuantityInput'

const Product = () => {
    const [product, setProduct] = useState({
        productName: 'Pen',
        catalogId: 1,
        productCost: 1000.0,
        productImage: 'https://m.media-amazon.com/images/I/71LbzzDezeL._AC_UF894,1000_QL80_.jpg',
        productQuantity: 1000,
        productDescription: 'This is beautiful pen',
      })
      const [quantity, setQuantity] = useState(null);
      const handleQuantityChange = (value) => {
        setQuantity(value);
      };
      useEffect(() => {
        console.log(quantity)
      },[quantity])
    return(
        <div id="product">
            <div className="image">
                <img src={product.productImage} alt="" />
            </div>
            <div className="infor">
                <div className="name">
                    {product.productName}
                </div>
                <div className="cost">
                    Cost: {product.productCost} VNĐ
                </div>
                <div className="inventory">
                    Inventory: {product.productQuantity}
                </div>
                <div className="desc">
                    Description: {product.productDescription}
                </div>
                <div className="quantity">
                 <div>Quantity: </div>
                 <div id='quantityInput'><QuantityInput value={quantity} onChange={handleQuantityChange}/></div>
                </div>
            </div>
        </div>
    )
}

export default Product