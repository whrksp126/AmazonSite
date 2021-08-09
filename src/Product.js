import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>

        <p className="product_price">
          <small>가격 </small>
          <strong>{price}</strong>
          <small> 원</small>
        </p>

        <div className="product_rating">
          {Array(rating)
            .fill() // 배열 안을 채울 것 이다
            .map((_, i) => (
              // rating 수 만큼 반복해서
              <p>★</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />
      <button onClick={addToBasket}>장바구니 담기</button>
    </div>
  );
}

export default Product;
