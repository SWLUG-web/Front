// 로그인의 비밀번호 재설정 폼 구현

import React, { useState } from 'react';
// import { resetPassword } from '../../hooks/useAuth'; // 실제 API 호출 함수 (주석 처리)

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    authCode: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [mockResponse, setMockResponse] = useState(null); // Mock 응답 데이터를 위한 상태

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // Mock 테스트용 코드
    const mockApiCall = async () => {
      // Mock 응답 데이터
      const mockData = {
        status: 200,
        message: '비밀번호가 성공적으로 재설정되었습니다.',
      };

      return new Promise((resolve) =>
        setTimeout(() => resolve(mockData), 1000) // Mock 응답 시간 시뮬레이션 (1초)
      );
    };

    try {
      // 실제 서버 연결 시 사용
      // const response = await resetPassword(formData);

      // Mock 데이터 사용
      const response = await mockApiCall();

      if (response.status === 200) {
        setMockResponse(response.message);
        alert(response.message); // Mock 성공 메시지
        window.location.href = '/users/login'; // 로그인 페이지로 이동
      } else {
        alert('비밀번호 재설정에 실패했습니다.');
      }
    } catch (error) {
      alert('비밀번호 재설정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>비밀번호 재설정</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="아이디"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          onChange={handleChange}
        />
        <input
          type="text"
          name="authCode"
          placeholder="인증번호"
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="새 비밀번호"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          onChange={handleChange}
        />
        <button type="submit">변경 내용 저장</button>
      </form>
      {mockResponse && <p>{mockResponse}</p>} {/* Mock 응답 메시지 표시 */}
    </div>
  );
};

export default ResetPassword;
