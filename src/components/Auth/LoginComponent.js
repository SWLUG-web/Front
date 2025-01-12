import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure, setLoading } from '../../slices/authSlice';
import "../../styles/LoginComponent.css";
import "../../styles/common.css";

function LoginComponent() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      const response = await axios.post('/login', {
        userId: id,
        password: password
      });

      if (response.data.success) {
        const userInfoResponse = await axios.get('/mypage');

        dispatch(loginSuccess({
          user: {
            id: userInfoResponse.data.userId,
            nickname: userInfoResponse.data.nickname
          }
        }));
        localStorage.setItem('userId', response.data.userId);
        window.location.href = '/main';
      } else {
        dispatch(loginFailure(response.data.message));
      }
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || '로그인에 실패했습니다.'));
    }
  };

  const handleLogoClick = () => {
    window.location.href = '/main';
  };

  return (
      <div className="login-container">
        <img
            src="/img/Logo4.png"
            alt="SWLUG Logo"
            className="login_logo"
            onClick={handleLogoClick}
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
          {error && <p className="error-message">{error}</p>}
          <div className="links">
            <a href="/users/update">비밀번호 재설정</a> | <a href="/users/join">회원가입</a>
          </div>
          <button type="submit"
                  className='hover:bg-customHover hover:text-customHoverText duration-200'
                  disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
  );
}

export default LoginComponent;