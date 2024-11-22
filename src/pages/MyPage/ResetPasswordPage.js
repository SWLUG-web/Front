import React, { useState } from 'react';
import { changePassword } from '../../hooks/useAuth';

const MyPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await changePassword(formData);
      alert('비밀번호가 변경되었습니다.');
      window.location.reload();
    } catch (error) {
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>마이페이지</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          placeholder="현재 비밀번호"
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
        <button type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
};

export default MyPage;
