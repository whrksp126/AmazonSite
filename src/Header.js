import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
      // firebase 에서 제공하는 메서드
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <div className="header_option">
          <span className="header_optionLineOne"> 안녕하세요 !</span>
          <Link to={(!user && '/login', '/login')} className="homelogin">
            <span
              onClick={handleAuthentication}
              className="header_optionLineTwo"
            >
              {user ? '로그아웃' : '로그인'}
            </span>
          </Link>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne"> 돌아가기 !</span>
          <span className="header_optionLineTwo"> 주문내역</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne"> 반가워요 !</span>
          <span className="header_optionLineTwo"> 감사합니다</span>
        </div>

        <Link to={!user ? '/login' : '/checkout'}>
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_basketCount">
              {basket?.length}
              {/* 장바구니의 크기를 알고 싶은데 혹시 오류가 생겼을 수도 있으니 옵셔널 체이닝을 해야함 */}
              {/* 옵셔널 체이닝은 만약 basket 값이 널이거나 언디파인드이면 일반적인 프로그램은 에러를 반환하는데 이건 한번 더 검증을 해서 언디파인드를 반환하게 해줌 */}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
