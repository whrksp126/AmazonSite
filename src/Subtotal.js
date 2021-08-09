import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';

function Subtotal() {
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              총액 (0 items) : <string> 0원 </string>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> 체크박스입니다
            </small>
          </>
        )}
        decimalScale={2} // 소수점 몇 째 자리까지 보여줄 것이냐
        value={0}
        displayType={'text'}
        thousandSeparator={true} // 천의 자리 마다
        prefix={'￦'}
      />
      <button>결제하기</button>
    </div>
  );
}

export default Subtotal;
