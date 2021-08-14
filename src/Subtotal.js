import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './Reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  const payment = (e) => {
    e.preventDefault();

    if (basket.length !== 0) {
      history.push('/payment')
    } else {
      history.push('/')
      alert('상품을 추가해 주세요')
    }
  
    console.log(basket);
  }

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              총액 ({basket.length} items) : <string> {value}원 </string>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> 체크박스입니다
            </small>
          </>
        )}
        decimalScale={2} // 소수점 몇 째 자리까지 보여줄 것이냐
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true} // 천의 자리 마다
        prefix={'￦'}
      />
      <button onClick={payment}>결제하러 가기</button>
    </div>
  );
}

export default Subtotal;
