import React from 'react'
import "../../styles/input.css"
import "../../styles/common.css"
import "./info.css"

function Info() {

    return (
    <form method="post" className="form">
    <h1 className="form_title">마이 페이지</h1>
    <h4 className="form_subtitle">회원 정보</h4>

    <div className="info-form">
      <h1 className="info-exp">회원정보 수정 및 탈퇴는 운영진에게 문의해주세요</h1>

      <div className="info-form_field">
        <div className="input-wrapper">
          <label htmlFor="id">아이디</label>
          <input
            name="id"
            id="id"
            placeholder="아이디(학번)을 입력해주세요"
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
            className="info-form_input"
          />
        </div>
      </div>

      <div className="info-form_field">
        <div className="input-wrapper">
          <label htmlFor="name">닉네임</label>
          <input
            name="name"
            id="name"
            placeholder="[예시]26기_김민지"
            className="info-form_input"
          />
        </div>
      </div>
      <div className="info-form_field">
        <div className="input-wrapper">
          <label htmlFor="email">이메일</label>
          <div className="input-container">
            <input
              name="email"
              id="email"
              placeholder="swlug@naver.com"
              className="info-form_input"
            />
          </div>
        </div>
      </div>
      <div className="info-form_field">
        <div className="input-wrapper">
          <label htmlFor="phone">전화 번호</label>
          <input
            name="phone"
            id="phone"
            placeholder="010-1234-1234"
            className="info-form_input"
          />
        </div>
      </div>
    </div>
  </form>
    )
};

export default Info