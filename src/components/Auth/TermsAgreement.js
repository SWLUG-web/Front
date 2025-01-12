import React, { useState, useEffect } from 'react';
import "../../styles/TermsAgreement.css";
import "../../styles/common.css";
import PrevNextButtons from "../../components/Auth/PrevNextButtons";

function TermsAgreement({ onNext, onPrev }) {
  const [allCheck, setAllCheck] = useState(false);
  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);

  const allBtnEvent = () => {
    const newCheckStatus = !allCheck;
    setAllCheck(newCheckStatus);
    setFirstCheck(newCheckStatus);
    setSecondCheck(newCheckStatus);
  };

  const firstBtnEvent = () => {
    setFirstCheck(!firstCheck);
  };

  const secondBtnEvent = () => {
    setSecondCheck(!secondCheck);
  };

  useEffect(() => {
    setAllCheck(firstCheck && secondCheck);
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
                  <span className="required">[필수]</span> 이용약관 동의
                </label>
              </div>
              <div className="agreement_text">
                <div className="agreement_section">
                  <strong className="section_title">[제 1장 총칙]</strong>
                  <div className="section_content">
                    <strong>제 1조 (목적)</strong>
                    <p>- 본 약관은 본 웹사이트를 통해 제공되는 소학회의 정보 및 서비스 이용에 대한 동아리와 이용자의 권리, 의무, 책임을 규정하는 것을 목적으로 합니다.</p>

                    <strong>제 2조 (용어 정의)</strong>
                    <ul>
                      <li>• <strong>"서비스"</strong>: 소학회가 제공하는 모든 웹사이트 서비스</li>
                      <li>• <strong>"웹사이트"</strong>: 소학회가 운영하는 가상의 온라인 공간 (URL: 슈러그 웹 사이트 주소)</li>
                      <li>• <strong>"회원"</strong>: 소학회에 가입하여 본 약관에 동의하고 이용자 계정을 생성한 자</li>
                      <li>• <strong>"아이디(ID)"</strong>: 회원 식별을 위해 회원이 설정하고 소학회가 승인한 고유한 코드</li>
                      <li>• <strong>"비밀번호"</strong>: 회원이 설정한 개인정보 보호를 위한 문자와 숫자의 조합</li>
                    </ul>

                    <strong>제 3조 (약관의 효력 및 변경)</strong>
                    <ul>
                      <li>- 본 약관은 회원이 웹사이트에 가입 시 동의함으로써 효력이 발생합니다.</li>
                      <li>- 소학회는 약관을 변경할 수 있으며, 변경 시 웹사이트에 공지합니다.</li>
                      <li>- 변경된 약관에 동의하지 않는 회원은 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="form_agreement_item">
              <div className="form_agreement_label">
                <input type="checkbox" id="check2" checked={secondCheck} onChange={secondBtnEvent} />
                <label htmlFor="check2">
                  <span className="required">[필수]</span> 개인정보 수집 및 이용 동의
                </label>
              </div>
              <div className="agreement_text">
                <p><strong>SWLUG(이하 '소학회')</strong>는 회원가입 신청 시 다음과 같은 개인정보를 수집합니다.</p>
                <ul>
                  <li>- 개인 식별 및 동아리 활동 관련 공지사항 전달</li>
                  <li>- 운영 관련 설문조사</li>
                  <li>- 소학회 행사, 교육, 워크숍 정보 전송</li>
                </ul>
                <p>※ 개인정보 수집 및 이용 동의를 거부할 권리가 있으나, 이 경우 서비스 이용이 제한됩니다.</p>
              </div>
            </div>
          </div>
        </div>

        <PrevNextButtons
            onPrev={onPrev}
            onNext={onNext}
            disableNext={!firstCheck || !secondCheck}
        />
      </form>
  );
}

export default TermsAgreement;
