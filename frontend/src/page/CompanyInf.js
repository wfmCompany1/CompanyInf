import React, { useRef, useState } from "react";
import "../css/companyinf.css";
import axios from "axios"; // ✅ 추가
import { useNavigate } from "react-router-dom";

export default function CompanyInf() {
  const API = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  // 주소 / 상세주소 DOM 참조
  const addressRef = useRef(null);
  const addressDetailRef = useRef(null);

  // 모달 닫기
  const handleClose = () => {
    console.log("modal close");
    // TODO: 부모에서 props로 받은 onClose 있으면 호출
    // onClose?.();
  };

  // 📮 주소 검색 버튼 클릭
  const handleSearchAddress = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("주소 검색 스크립트를 불러오지 못했습니다.\n페이지를 새로고침 해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        const addr = data.roadAddress || data.jibunAddress || "";

        // ✅ React 상태 업데이트
        setFormData((prev) => ({
          ...prev,
          address: addr,
        }));

        // ✅ 상세주소로 포커스 이동
        if (addressDetailRef.current) {
          addressDetailRef.current.focus();
        }
      },
    }).open();
  };



  const [formData, setFormData] = useState({

    loginId: "",
    businessRegNo: "",
    companyName: "",
    contactPerson: "",
    contactPhoneNumber: "",
    contactEmail: "",

    address: "",
    addressDetail: "",

    targetNoAccidentDays: "",
    targetIncident: "",
    targetLaw: "",
    targetEtc: "",

    mainProcess: "",

    hasRequiredDocs: ""

  });

  const handlerInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ 확인 팝업
    const ok = window.confirm("제출 하시겠습니까?");
    if (!ok) {
      // 사용자가 '취소' 눌렀을 때 → 그냥 종료
      return;
    }

    // ✅ '예'를 눌렀을 때만 실제 제출 진행
    axios
      .post(`${API}/insertCompany`, formData, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then(() => {
        alert("제출이 완료되었습니다");
        navigate("/complete");
      })
      .catch((error) => {
        console.error(error);
        alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <main className="companyinf-page">
      <div className="backdrop" role="presentation">
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label="업체 정보 입력"
        >
          {/* 헤더 영역 */}
          <div className="header">
            <h3 className="title">업체 정보 입력</h3>
          </div>

          {/* 폼 본문 */}
          <form className="body" onSubmit={handleSubmit}>
            {/* 기본 정보 */}
            <div className="fieldGrid">
              {/* 아이디 */}
              <label className="field">
                <span className="label">아이디</span>
                <input
                  className="input"
                  name="loginId"
                  value={formData.loginId}
                  onChange={handlerInputChange}
                  placeholder="로그인에 사용할 아이디"
                  required
                />
              </label>

              {/* 사업자등록번호 */}
              <label className="field">
                <span className="label">사업자등록번호</span>
                <input
                  className="input"
                  name="businessRegNo"
                  value={formData.businessRegNo}
                  onChange={handlerInputChange}
                  placeholder="예) 123-45-67890"
                  required
                />
              </label>

              {/* 업체명 */}
              <label className="field">
                <span className="label">업체명</span>
                <input
                  className="input"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handlerInputChange}
                  placeholder="예) 트로이스"
                  required
                />
              </label>

              {/* 담당자 */}
              <label className="field">
                <span className="label">담당자</span>
                <input
                  className="input"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handlerInputChange}
                  placeholder="예) 홍길동"
                  required
                />
              </label>

              {/* 담당자 연락처 */}
              <label className="field">
                <span className="label">담당자 연락처</span>
                <input
                  className="input"
                  name="contactPhoneNumber"
                  value={formData.contactPhoneNumber}
                  onChange={handlerInputChange}
                  placeholder="010-1234-5678"
                  required
                />
              </label>

              {/* 이메일 */}
              <label className="field">
                <span className="label">이메일</span>
                <input
                  className="input"
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handlerInputChange}
                  placeholder="name@example.com"
                  required
                />
              </label>

              {/* 주소 + 주소 검색 버튼 */}
              <label className="field">
                <span className="label">주소</span>
                <div className="addressRow">
                  <input
                    className="input"
                    name="address"
                    value={formData.address}
                    // 주소는 직접 타이핑 안 하고, 팝업에서 선택만 하게 할 거면 onChange 제거
                    readOnly
                    placeholder="도로명 주소를 검색해주세요"
                    ref={addressRef}
                  />
                  <button
                    type="button"
                    className="searchAddressBtn"
                    onClick={handleSearchAddress}
                  >
                    주소 검색
                  </button>
                </div>
              </label>

              {/* 상세 주소 */}
              <label className="field">
                <span className="label">상세주소</span>
                <input
                  className="input"
                  name="addressDetail"
                  value={formData.addressDetail}
                  onChange={handlerInputChange}
                  ref={addressDetailRef}
                  placeholder="예) 301동 1203호"
                />
              </label>
            </div>

            {/* 대시보드 목표 수치 */}
            <section
              className="fieldGroup"
              aria-label="대시보드 목표 수치"
              style={{ marginTop: "20px" }}
            >
              <h4 className="groupTitle">대시보드 목표 수치</h4>
              <div className="grid4">
                {/* 무재해 일수 */}
                <label className="field">
                  <span className="label">무재해 일수</span>
                  <div className="inputWithSuffix">
                    <input
                      className="input"
                      type="number"
                      min="0"
                      name="targetNoAccidentDays"
                      value={formData.targetNoAccidentDays}
                      onChange={handlerInputChange}
                      placeholder="예) 365"
                    />
                    <span className="suffix">일</span>
                  </div>
                </label>

                {/* 사건/사고 Target */}
                <label className="field">
                  <span className="label">사건/사고 Target</span>
                  <div className="inputWithSuffix">
                    <input
                      className="input"
                      type="number"
                      min="0"
                      name="targetIncident"
                      value={formData.targetIncident}
                      onChange={handlerInputChange}
                      placeholder="예) 0"
                    />
                    <span className="suffix">건</span>
                  </div>
                </label>

                {/* 법률/규정 Target */}
                <label className="field">
                  <span className="label">법률/규정 Target</span>
                  <div className="inputWithSuffix">
                    <input
                      className="input"
                      type="number"
                      min="0"
                      name="targetLaw"
                      value={formData.targetLaw}
                      onChange={handlerInputChange}
                      placeholder="예) 0"
                    />
                    <span className="suffix">건</span>
                  </div>
                </label>

                {/* 기타 Target */}
                <label className="field">
                  <span className="label">기타 Target</span>
                  <div className="inputWithSuffix">
                    <input
                      className="input"
                      type="number"
                      value={formData.targetEtc}
                      onChange={handlerInputChange}
                      min="0"
                      name="targetEtc"
                      placeholder="예) 0"
                    />
                    <span className="suffix">건</span>
                  </div>
                </label>
              </div>
            </section>

            {/* 주요 공정 */}
            <section
              className="fieldGroup"
              aria-label="주요 공정"
              style={{ marginTop: "20px" }}
            >
              <h4 className="groupTitle">주요 공정</h4>
              <label className="field">
                <span className="label">주요 공정</span>
                <textarea
                  className="input"
                  name="mainProcess"
                  value={formData.mainProcess}
                  onChange={handlerInputChange}
                  rows="3"
                  placeholder="예) 배관 설치, 전기 배선, 장비 설치 등"
                />
              </label>
            </section>

            {/* 필수 제출 서류 여부 */}
            <section
              className="fieldGroup"
              aria-label="필수 제출 서류 여부"
              style={{ marginTop: "20px" }}
            >
              <h4 className="groupTitle">필수 제출 서류 사용 여부</h4>
              <label className="field">
                <span className="label">필수 제출 서류 사용 여부</span>
                <select
                  className="input"
                  name="hasRequiredDocs"
                  value={formData.hasRequiredDocs}
                  onChange={handlerInputChange}
                  required
                >
                  <option value="" disabled>
                    선택해주세요
                  </option>
                  <option value="1. 제출 서류 등록 x">1. 제출 서류 등록 x</option>
                  <option value="2. 표시된 서류중 필요 항목만 선택">2. 표시된 서류중 필요 항목만 선택</option>
                  <option value="3. 추후에 제출 서류 추가">3. 추후에 제출 서류 추가</option>
                </select>
              </label>
            </section>

            {/* 버튼 영역 */}
            <div className="actions">
              <button type="button" className="ghostBtn" onClick={handleClose}>
                취소
              </button>
              <button type="submit" className="submitBtn">
                제출
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
