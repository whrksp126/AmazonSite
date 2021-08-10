import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, image, title, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={image} alt="" />

      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>￦ </small>
          <strong>{price}</strong>
          <small> 원</small>
        </p>
        <div className="checkoutProduct_rating">
          {Array(rating)
            .fill() // 배열 안을 채울 것 이다
            .map((_, i) => (
              // rating 수 만큼 반복해서
              <p>★</p>
            ))}
        </div>
        <button onClick={removeFromBasket}>장바구니에서 제거하기</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
