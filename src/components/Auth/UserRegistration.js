import React, { useState } from "react";
import axios from 'axios';
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
  });

  const [error, setError] = useState({
    id: "",
    pw: "",
    email: "",
    auth: "",
    form: ""
  });

  const [success, setSuccess] = useState({
    email: "",
    auth: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 비밀번호 확인 로직
    if (name === "pw") {
      const isValidFormat = validatePassword(value);
      const match = value === formData.pwCheck;

      setPasswordMatch(match);
      setError(prev => ({
        ...prev,
        pw: !isValidFormat ? "10자 이상 영문/숫자/특수문자를 사용하세요." : ""
      }));

      if (formData.pwCheck) {
        setError(prev => ({
          ...prev,
          confirmPw: !match ? "비밀번호가 일치하지 않습니다." : ""
        }));
      }
    }

    if (name === "pwCheck") {
      const match = value === formData.pw;
      setPasswordMatch(match);
      setError(prev => ({
        ...prev,
        confirmPw: !match ? "비밀번호가 일치하지 않습니다." : ""
      }));
    }
  };

  const handleRequestAuth = async () => {
    if (!formData.email) {
      setError(prev => ({ ...prev, email: "이메일을 입력해주세요." }));
      return;
    }

    try {
      setIsLoading(true);
      await axios.post('/mailSend', { email: formData.email });
      setTimer(300); // 5분
      setIsEmailSent(true);
      setSuccess(prev => ({ ...prev, email: "인증번호가 발송되었습니다." }));
      setError(prev => ({ ...prev, email: "" }));
    } catch (err) {
      setError(prev => ({
        ...prev,
        email: err.response?.data || "인증번호 발송에 실패했습니다."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAuth = async () => {
    if (!timer) {
      setError(prev => ({
        ...prev,
        auth: "인증 시간이 만료되었습니다. 다시 인증번호를 요청해주세요."
      }));
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post('/mailAuthCheck', {
        email: formData.email,
        authNum: parseInt(formData.emailAuth)
      });

      if (response.data === "ok") {
        setIsEmailVerified(true);
        setSuccess(prev => ({ ...prev, auth: "인증이 완료되었습니다." }));
        setError(prev => ({ ...prev, auth: "" }));
      } else {
        setError(prev => ({ ...prev, auth: "인증번호가 일치하지 않습니다." }));
      }
    } catch (err) {
      setError(prev => ({
        ...prev,
        auth: err.response?.data || "인증에 실패했습니다."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!isEmailVerified) {
      setError(prev => ({ ...prev, form: "이메일 인증을 완료해주세요." }));
      return;
    }

    const requestBody = {
      userId: formData.id,
      pw: formData.pw,
      confirmPw: formData.pwCheck,
      nickname: formData.name,
      email: formData.email,
      phone: formData.phone
    };

    try {
      setIsLoading(true);
      const response = await axios.post('/signup', requestBody);
      if (response.data === "success") {  // 백엔드에서 "success" 반환
        onNext({
          ...formData,
          roleType: 1  // 기본값으로 1 설정 (일반 사용자)
        });
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setError(prev => ({
          ...prev,
          form: err.response.data.message || "회원가입에 실패했습니다."
        }));
      } else {
        setError(prev => ({
          ...prev,
          form: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }));
      }
    } finally {
      setIsLoading(false);
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

          {/* ID 입력 필드 */}
          <div className="info-form_field">
            <div className="input-wrapper">
              <label>아이디</label>
              <input
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="아이디를 입력하세요"
                  className="info-form_input"
              />
            </div>
            {error.id && <div className="info-form_error">{error.id}</div>}
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="info-form_field">
            <div className="input-wrapper">
              <label>비밀번호</label>
              <input
                  type="password"
                  name="pw"
                  value={formData.pw}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력하세요"
                  className="info-form_input"
              />
            </div>
            {error.pw && <div className="info-form_error">{error.pw}</div>}
          </div>

          {/* 비밀번호 확인 필드 */}
          <div className="info-form_field">
            <div className="input-wrapper">
              <label>비밀번호 확인</label>
              <input
                  type="password"
                  name="pwCheck"
                  value={formData.pwCheck}
                  onChange={handleChange}
                  placeholder="비밀번호를 다시 입력하세요"
                  className="info-form_input"
              />
            </div>
            {error.confirmPw && <div className="info-form_error">{error.confirmPw}</div>}
          </div>

          {/* 이름 입력 필드 */}
          <div className="info-form_field">
            <div className="input-wrapper">
              <label>이름</label>
              <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력하세요"
                  className="info-form_input"
              />
            </div>
          </div>

          {/* 이메일 인증 필드 */}
          <div className="info-form_field">
            <div className="input-wrapper">
              <label>이메일</label>
              <div className="input-container">
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isEmailVerified}
                    placeholder="swlug@example.com"
                    className="info-form_input"
                />
                <button
                    type="button"
                    onClick={handleRequestAuth}
                    disabled={isLoading || !formData.email || isEmailVerified}
                    className="auth-button"
                >
                  {isLoading ? "처리중..." : isEmailSent ? "재전송" : "인증번호 요청"}
                </button>
              </div>
            </div>
            {error.email && <div className="info-form_error">{error.email}</div>}
            {success.email && <div className="info-form_success">{success.email}</div>}
          </div>

          {isEmailSent && (
              <div className="info-form_field">
                <div className="input-wrapper">
                  <label>인증번호</label>
                  <div className="input-container">
                    <input
                        name="emailAuth"
                        value={formData.emailAuth}
                        onChange={handleChange}
                        disabled={isEmailVerified}
                        placeholder="인증번호 6자리 입력"
                        className="info-form_input"
                    />
                    <button
                        type="button"
                        onClick={handleVerifyAuth}
                        disabled={isLoading || !formData.emailAuth || isEmailVerified}
                        className="auth-button"
                    >
                      확인
                    </button>
                    {timer > 0 && <span className="timer">{Math.floor(timer/60)}:{String(timer%60).padStart(2, '0')}</span>}
                  </div>
                </div>
                {error.auth && <div className="info-form_error">{error.auth}</div>}
                {success.auth && <div className="info-form_success">{success.auth}</div>}
              </div>
          )}

          {/* 전화번호 입력 필드 */}
          <div className="info-form_field">
            <div className="input-wrapper">
              <label>전화번호</label>
              <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="전화번호를 입력하세요"
                  className="info-form_input"
              />
            </div>
          </div>

          {error.form && <div className="info-form_error">{error.form}</div>}
        </div>

        <PrevNextButtons
            onPrev={onPrev}
            onNext={handleSubmit}
            disableNext={
                isLoading ||
                !isEmailVerified ||
                !passwordMatch ||
                !formData.id ||
                !formData.pw ||
                !formData.name ||
                !formData.phone
            }
        />
      </form>
  );
};

export default UserRegistration;