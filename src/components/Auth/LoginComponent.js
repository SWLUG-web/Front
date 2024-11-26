import React, { useState } from 'react';
import "../../styles/LoginComponent.css";
import "../../styles/common.css";
import { login } from '../../services/api';

function LoginComponent() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [tryCount, setTryCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tryCount >= 5) {
      setErrorMessage('비밀번호 입력 제한 초과. 관리자에게 문의하세요.');
      return;
    }

    try {
      const response = await login({ id, pw: password, try: tryCount + 1 });
      if (response.status === 200) {
        //alert('로그인 성공!');
        window.location.href = '/main'; // 메인 페이지로 이동
      } else {
        setTryCount((prev) => prev + 1);
        setErrorMessage('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (err) {
      setTryCount((prev) => prev + 1);
      setErrorMessage('로그인 중 문제가 발생했습니다.');
    }
  };

  const handleLogoClick = () => {
    window.location.href = '/main'; // 로고 클릭 시 메인 페이지로 이동
  };

  return (
    <div className="login-container">
      <img
        src="/img/Logo4.png"
        alt="SWLUG Logo"
        className="login_logo"
        onClick={handleLogoClick} // 로고 클릭 이벤트 핸들러 추가
      />
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder=" 아이디(학번)를 입력해주세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder=" 비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="links">
          <a href="/users/update">비밀번호 재설정</a> | <a href="/users/join">회원가입</a>
        </div>
        <button type="submit"
          className='hover:bg-customHover hover:text-customHoverText duration-200'
        >로그인</button>
      </form>
    </div>
  );
}

export default LoginComponent;
