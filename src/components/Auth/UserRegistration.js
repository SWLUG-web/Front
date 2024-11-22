import React, { useState } from "react";
import PrevNextButtons from "../../components/Auth/PrevNextButtons";
import "./UserRegistration.css"; 
import "../../styles/input.css"
// import axios from 'axios'; // 백엔드 연동 시 주석 해제

const UserRegistration = ({ onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    name: "",
    email: "",
    emailAuth: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({
    idError: false,
    pwMatchError: false,
    emailAuthError: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let errors = {
      idError: !formData.id.match(/^\d{10}$/), // 예시 학번 형식 체크 (10자리 숫자)
      pwMatchError: formData.pw !== formData.pwCheck,
      emailAuthError: formData.emailAuth !== "123456", // 예시 인증번호 체크
    };

    setFormErrors(errors);

    if (!errors.idError && !errors.pwMatchError && !errors.emailAuthError) {
      onNext(formData);
    }
  };

  // 백엔드 연동 시 사용할 handleSubmit 함수
  /*
  const handleSubmit = async () => {
    let errors = {
      idError: !formData.id.match(/^\d{10}$/),
      pwMatchError: formData.pw !== formData.pwCheck,
      emailAuthError: false // 서버에서 확인
    };

    setFormErrors(errors);

    if (!errors.idError && !errors.pwMatchError) {
      try {
        const response = await axios.post(`${API_URL}/users/register`, formData);
        
        if (response.data.success) {
          onNext(response.data.user);
        } else {
          setFormErrors({
            ...errors,
            ...response.data.errors
          });
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };
  */

  // 이메일 인증 로직 (백엔드 연동 시 사용)
  /*
  const handleSendAuthCode = async () => {
    try {
      await axios.post(`${API_URL}/users/send-auth-code`, { email: formData.email }); -> api.js랑 연동되게 임시로 작성한 것
      alert('인증번호가 전송되었습니다.');
    } catch (error) {
      console.error('Error sending auth code:', error);
      alert('인증번호 전송에 실패했습니다.');
    }
  };
  */


  return (
    <form method="post" className="form">
      <h1 className="form_title">회원가입</h1>

      <div className="form_steps">
        <span className="form_step">1. 개인정보 수집 이용 약관 동의</span>
        <span className="form_step current">2. 정보 입력</span>
        <span className="form_step">3. 회원 가입 신청 완료</span>
      </div>

      <div className="info-form">
        <h1 className="info-text">입력한 정보를 기반으로 회원가입 요청이 되므로, 정확한 정보를 기입해주세요.</h1>

        <div className="info-form_field">
          <div className="input-wrapper">
            <label htmlFor="id">아이디</label>
            <input
              name="id"
              id="id"
              placeholder="아이디(학번)을 입력해주세요"
              value={formData.id}
              onChange={handleChange}
              className="info-form_input"
            />
          </div>
          {formErrors.idError && (
            <span className="info-form_error">형식이 맞지 않습니다.</span>
          )}
        </div>

        <div className="info-form_field">
          <div className="input-wrapper">
            <label htmlFor="pw">비밀번호</label>
            <input
              name="pw"
              id="pw"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={formData.pw}
              onChange={handleChange}
              className="info-form_input"
            />
          </div>
        </div>

        <div className="info-form_field">
          <div className="input-wrapper">
            <label htmlFor="pwCheck">비밀번호 확인</label>
            <input
              name="pwCheck"
              id="pwCheck"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={formData.pwCheck}
              onChange={handleChange}
              className="info-form_input"
            />
          </div>
          {formErrors.pwMatchError && (
            <span className="info-form_error">일치하지 않습니다.</span>
          )}
        </div>

        <div className="info-form_field">
          <div className="input-wrapper">
            <label htmlFor="name">닉네임</label>
            <input
              name="name"
              id="name"
              placeholder="[예시]26기_김민지"
              value={formData.name}
              onChange={handleChange}
              className="info-form_input"
            />
          </div>
        </div>

        <h1 className="info-text">본인확인을 위해 [슈러그] 네이버 카페에 가입한 이메일을 기입해주세요.</h1>

        <div className="info-form_field">
          <div className="input-wrapper">
            <label htmlFor="email">이메일</label>
            <div className="input-container">
              <input
                name="email"
                id="email"
                placeholder="swlug@naver.com"
                value={formData.email}
                onChange={handleChange}
                className="info-form_input"
              />
              <button type="button" className="auth-button">인증번호 전송</button>
              {/* 백엔드 연동 시 onClick 핸들러 추가 */}
              {/* <button type="button" className="auth-button" onClick={handleSendAuthCode}>인증번호 전송</button> */}
            </div>
          </div>
        </div>

        <div className="info-form_field">
          <div className="input-wrapper">
            <label htmlFor="emailAuth">인증 번호</label>
            <input
              name="emailAuth"
              id="emailAuth"
              placeholder=""
              value={formData.emailAuth}
              onChange={handleChange}
              className="info-form_input"
            />
          </div>
          {formErrors.emailAuthError && (
            <span className="info-form_error">인증에 실패했습니다.</span>
          )}
        </div>

        <h1 className="info-text">전화번호는 공백없이 -로 구분하여 입력해주세요.</h1>

        <div className="info-form_field">
          <div className="input-wrapper">
            <label htmlFor="phone">전화 번호</label>
            <input
              name="phone"
              id="phone"
              placeholder="010-1234-1234"
              value={formData.phone}
              onChange={handleChange}
              className="info-form_input"
            />
          </div>
        </div>
      </div>

      <PrevNextButtons onPrev={onPrev} onNext={handleSubmit} />
    </form>
  );
};

export default UserRegistration;