import React, { useState } from "react";
import { register } from '../../services/api';
import PrevNextButtons from "../../components/Auth/PrevNextButtons";
import "../../styles/UserRegistration.css"; 
import "../../styles/input.css"

const UserRegistration = ({ onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    name: "",
    email: "",
    emailAuth: "",
    phone: "",
    privacyCheck: true
  });

  const [formErrors, setFormErrors] = useState({
    idError: false,
    idErrorMessage: "",
    pwFormatError: false,
    pwMatchError: false,
    emailAuthError: false,
  });

  const [authButtonText, setAuthButtonText] = useState("인증번호 전송"); // 버튼 텍스트 상태

  const [passwordMatch, setPasswordMatch] = useState(false);

  const [authSuccess, setAuthSuccess] = useState(false); // 이메일 인증 성공 상태

  // 에러 메시지 상태를 분리
  const [pwFormatError, setPwFormatError] = useState("");
  const [pwMatchError, setPwMatchError] = useState("");

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    // 영문, 숫자, 특수문자 포함 10자 이상
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 비밀번호 확인 로직
    if (name === "pw") {
      const isValidFormat = validatePassword(value);
      const match = value === formData.pwCheck;
      
      setPasswordMatch(match);
      setFormErrors(prev => ({
        ...prev,
        pwFormatError: !isValidFormat,
        pwMatchError: !match && formData.pwCheck !== ''
      }));
      
      setPwFormatError(!isValidFormat ? "10자 이상 영문/숫자/특수문자를 사용하세요." : "");
      setPwMatchError(formData.pwCheck !== '' && !match ? "비밀번호가 일치하지 않습니다." : "");
    } else if (name === "pwCheck") {
      const match = value === formData.pw;
      setPasswordMatch(match);
      setFormErrors(prev => ({
        ...prev,
        pwMatchError: !match && value !== ''
      }));
      setPwMatchError(value !== '' && !match ? "비밀번호가 일치하지 않습니다." : "");
    }

    // 인증 번호 확인 로직
    if (name === "emailAuth") {
      const isAuthSuccess = value === "123456";
      setAuthSuccess(isAuthSuccess);
      setFormErrors(prev => ({
        ...prev,
        emailAuthError: !isAuthSuccess && value !== ''
      }));
    }
  };

  const handleAuthButtonClick = () => {
    setAuthButtonText("인증번호 재전송"); // 버튼 텍스트 변경
  };

  const handleSubmit = async () => {
    let errors = {
      idError: !formData.id.match(/^\d{10}$/),
      pwFormatError: !validatePassword(formData.pw),
      pwMatchError: formData.pw !== formData.pwCheck,
      emailAuthError: !authSuccess,
    };
    
    setFormErrors(errors);
  
    if (!errors.idError && !errors.pwMatchError && !errors.emailAuthError) {
      try {
        const submitData = {
          id: formData.id,
          pw: formData.pw,
          pwCheck: formData.pw === formData.pwCheck,
          name: formData.name,
          email: formData.email,
          emailAuth: authSuccess,
          phone: formData.phone,
          privacyCheck: true
        };
        
        const response = await register(submitData);
        if (response.status === 200) {
          onNext({
            ...formData,
            roleType: response.data.roleType
          });
        }
      } catch (error) {
        console.error('Registration error:', error);
        
        if (error.response && error.response.status === 400) {
          // 백엔드에서 400 에러를 발생시킨 경우
          if (error.response.data.message === "이미 사용중인 ID입니다.") {
            setFormErrors(prev => ({
              ...prev,
              idError: true
            }));
          } else {
            alert("회원가입 중 오류가 발생했습니다: " + error.response.data.message);
          }
        } else {
          alert("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      }
    }
  };

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
            <span className="info-form_error">{formErrors.idErrorMessage || "형식이 맞지 않습니다."}</span>
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
          {pwFormatError && <div className="info-form_error">{pwFormatError}</div>}
        </div>

        <div className="info-form_field">
          <div className="input-wrapper">
            <label htmlFor="pwCheck">비밀번호 확인</label>
            <div className="input-container">
              <input
                name="pwCheck"
                id="pwCheck"
                type="password"
                value={formData.pwCheck}
                onChange={handleChange}
                className="info-form_input"
              />
              {passwordMatch && (
                <img 
                  src="/pwCheck.png" 
                  alt="check" 
                  className="check-icon"
                />
              )}
            </div>
          </div>
          {pwMatchError && <div className="info-form_error">{pwMatchError}</div>}
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
              <button
                type="button"
                className="auth-button"
                onClick={handleAuthButtonClick} // 버튼 클릭 핸들러 추가
              >
                {authButtonText} {/* 버튼 텍스트 상태 */}
              </button>
            </div>
          </div>
        </div>

        <div className="info-form_field">
          <div className="input-wrapper">
            <label htmlFor="emailAuth">인증 번호</label>
            <div className="input-container">
              <input
                name="emailAuth"
                id="emailAuth"
                placeholder="인증번호를 입력하세요"
                value={formData.emailAuth}
                onChange={handleChange}
                className="info-form_input"
              />
              {/* 인증 성공 상태일 때 아이콘 표시 */}
              {authSuccess && (
                <img 
                  src="/pwCheck.png" 
                  alt="check" 
                  className="check-icon"
                />
              )}
            </div>
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