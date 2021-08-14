import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe(
  'pk_test_51JNbCOAXB7OEcg4o4EhVOszP9768cFutyWwJIFlPS3KJDL23tz8CROpbB0ziC7EQCQhWwl7zagxwEEi1YaSlgpiV00qNOrQ7ic'
);

function App() {
  const [{}, dispatch] = useStateValue();
  // useStateValue 는 데이터레이어에서 user 에 대한 정보를 주고 받고 하겠다

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // 로그인한 사용자의 변화가 생기는지 감지함, authUser 에 정보를 넣음
      console.log('현재 사용자는' + authUser + '입니다' );
      if (authUser) {
        // user 를 authUser 를 할지 null 로 할지 레이어 전역에 쏴 줌
        dispatch({ type: 'SET_USER', user: authUser });
        // authUser 에 해당 타입에 authUser 인지 reducer 에쏨
      } else {
        dispatch({ type: 'SET_USER', user: null });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            {/* exact 는 페이지의 링크가 정확히 / 이것 이여야만 이동이 가능하다 */}
            <Header />
            <Home />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              {/* 카드 정보가 암호화 될서 왔다갔다 할 수 있게 해줌  stripe 에서 제공하는 기능 */}
              <Payment />
            </Elements>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// https://gh-ddc43.web.app