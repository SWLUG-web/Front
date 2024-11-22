// 로그인 비밀번호 재설정 페이지

import React, { useState } from 'react';
import ResetPassword from '../../components/Auth/ResetPassword';

const ResetPasswordPage = () => {
  return (
    <div>
      <h1>비밀번호 재설정</h1>
      <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;
