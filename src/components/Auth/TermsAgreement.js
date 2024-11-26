import React, { useState, useEffect } from 'react';
import "../../styles/TermsAgreement.css"; // 공통 스타일 CSS 파일을 적용
import "../../styles/common.css";
import PrevNextButtons from "../../components/Auth/PrevNextButtons";

function TermsAgreement({ onNext, onPrev }) {
  const [allCheck, setAllCheck] = useState(false);
  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);
  const [thirdCheck, setThirdCheck] = useState(false);

  // 전체 동의 체크박스 이벤트
  const allBtnEvent = () => {
    const newCheckStatus = !allCheck;
    setAllCheck(newCheckStatus);
    setFirstCheck(newCheckStatus);
    setSecondCheck(newCheckStatus);
    setThirdCheck(newCheckStatus);
  };

  // 개별 체크박스 이벤트
  const firstBtnEvent = () => {
    setFirstCheck(!firstCheck);
  };

  const secondBtnEvent = () => {
    setSecondCheck(!secondCheck);
  };

  const thirdBtnEvent = () => {
    setThirdCheck(!thirdCheck);
  };

  // 모든 필수 체크박스가 체크되었는지 확인하여 전체 체크박스 상태 업데이트
  useEffect(() => {
    if (firstCheck && secondCheck) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [firstCheck, secondCheck]);

  return (
    <form method="post" className="form">
      <h1 className="form_title">회원가입</h1>

      <div className="form_steps">
        <span className="form_step current">1. 개인정보 수집 이용 약관 동의</span>
        <span className="form_step">2. 정보 입력</span>
        <span className="form_step">3. 회원 가입 신청 완료</span>
      </div>
      
      <div className="form_agreement">
        <div className="form_agreement_box">
          <div className="form_agreement_all">
            <input type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent} />
            <label htmlFor="all-check">전체동의</label>
          </div>

          <div className="form_agreement_item">
            <div className="form_agreement_label">
              <input type="checkbox" id="check1" checked={firstCheck} onChange={firstBtnEvent} />
              <label htmlFor="check1">
                <span className="required">[필수]</span> 1~~~ 
              </label>
            </div>
            <div className="agreement_text">필수 동의 관련 내용 1</div>
          </div>

          <div className="form_agreement_item">
            <div className="form_agreement_label">
              <input type="checkbox" id="check2" checked={secondCheck} onChange={secondBtnEvent} />
              <label htmlFor="check2">
                <span className="required">[필수]</span> 2~~~
              </label>
            </div>
            <div className="agreement_text">필수 동의 관련 내용 2</div>
          </div>

          <div className="form_agreement_item">
            <div className="form_agreement_label">
              <input type="checkbox" id="check3" checked={thirdCheck} onChange={thirdBtnEvent} />
              <label htmlFor="check3">[선택] 3~~~</label>
            </div>
            <div className="agreement_text">선택 동의 관련 내용</div>
          </div>
        </div>
      </div>

      <PrevNextButtons
        onPrev={onPrev}
        onNext={() => {
          if (firstCheck && secondCheck) {
            onNext();
          } else {
            alert("모든 필수 항목에 동의해 주세요.");
          }
        }}
      />
    </form>
  );
}

export default TermsAgreement;
