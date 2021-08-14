import React, { useEffect, useState } from 'react';
import './Payment.css';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from './Reducer';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import { db } from './firebase';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const [error, setError] = useState(null);

  const [disable, setdisable] = useState(true);
  // 결제하기 버튼을 위해서 만듬
  const [processing, setProcessing] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  // 보안을 위해 클라이언트의 정보를 가져옴

  const stripe = useStripe();
  const elements = useElements();
  // CardElement 를 사용하기 위해서 쓰는 것들

  useEffect(() => {
    const getClientSecret = async () => {
      const res = await axios({
        method: 'post',
        url: "/payments/create?total=" + getBasketTotal(basket) * 100
        // 소수점 2자리까지 표시하기로 했으니 그것을 해제하기 위해 100을 곱해줌
      });
      // 서버 api 에 새로 url을 만들 것이다
      setClientSecret(res.data.clientSecret);
      // 서버에서 가져온 res 의 정보중에 고객에 대한 정보를 useState 의 clientSecret 에 넣겠다
    };
    getClientSecret();
    // setClientSecret 를 한번 더 실행해 주겠다.
  }, [basket]);
  // 장바구니의 내용이 변경될 때 마다 getClientSecret 을 실행함

  console.log(clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    // 결제를 하고 버튼을 누를 때 결제 중 이라는 글이 뜨게 해줌

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // payment 에 대한 정보가 담겨 있음

        db
            .collection('users')
            // users 라는 경로를 만들어서
            .doc(user?.uid)
            // 모든 문서를 uid 로 만듬
            .collection('orders')
            // oreders 라는 경로를 만들어서
            .doc(paymentIntent.id)
            // 주문내역을 구매했을 때 아이디로 나열함
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            })
            // 

        setSucceeded(true);
        setError(null);
        setProcessing('');
        // useState 값들을 초기화 시켜줌

        dispatch({
          type: 'EMPTY_BASKET'
        })

        history.replace('/orders');
        // 페이지를 이동하게 해줌
      });
  };

  const handleChange = (event) => {
    // 결제하기 버튼은 결제하기 전 결제 중 결제 완료 상태에 따라 각각의 useState 를 받아야하기에 새로운 State 를 만들어서 사용
    setdisable(event.empty);
    // 인자에는 아무것도 안넣겠다
    setError(event.error ? event.error.message : '');
    // 만약 이벤트에서 에러가 발생하면 에러 메세지를 보낸다
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <Link to="/checkout">
          <h1>장바구니 다시 설정하기 ({basket?.length} items )</h1>
        </Link>

        <div className="payment_section">
          <div className="payment_title">
            <h3> 배달 받을 곳 </h3>
          </div>

          <div className="payment_address">
            <p>{user?.email} 님의 주소</p>
            <p>서울특별시</p>
            <p>마포구 합정동</p>
          </div>
        </div>
      </div>

      <div className="payment_section">
        <div className="payment_title">
          <h3> 상품 목록 </h3>
        </div>

        <div className="payment_items">
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      <div className="payment_section">
        <div className="payment_title">
          <h3>결제</h3>
        </div>

        <div className="payment_details">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            {/* 카드 번호 적는 것 stripe 에서 제공하는 것 */}
            <div className="payment_priceContainer">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <p>
                      총액 ({basket.length} items) :{' '}
                      <string> {value}원 </string>
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

              <button disabled={processing || disable || succeeded}>
                {/* 버튼에 상황에 따라 다르게 나오도록 함 */}
                <span>{processing ? <p>결제중입니다</p> : '결제하기'}</span>
                {/* 처리중이면 결제중입니다라고 나오고 그게 아니면 결제하기 로 나옴 */}
              </button>
            </div>

            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
