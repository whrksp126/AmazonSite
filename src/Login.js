import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  
  const singIn = (e) => {
    e.preventDefault();
    // 데이터가 맞는지 확인하는 메서드
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push('/');
      })
      .catch((error) => alert(error.message()));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      // firebase 에서 제공하는 메서드, 만드는 것
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // 만약에  auth 가 true 면 ( 성공적으로 생성이 됐으면) 페이지를 옴겨라 '/' 로
        if (auth) {
          history.push('/');
          alert("회원가입을 축하드립니다.")
        }
      })
      .catch((error) => alert(error));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2880px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login_container">
        <h1>로그인</h1>
        <form>
          <h5>이메일</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>비밀번호</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login_signInButton" onClick={singIn}>
            로그인 하기
          </button>
        </form>
        <p>이용 약관 동의하십니끼?</p>
        <button className="login_registerButton" onClick={register}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Login;
