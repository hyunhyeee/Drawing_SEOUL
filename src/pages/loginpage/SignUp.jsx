import React, { useRef, useState } from 'react'; // React 및 상태 관리(useState)와 ref 사용(useRef)을 위한 hooks
import axios from 'axios'; // HTTP 요청을 보낼 때 사용하는 라이브버리
import { useNavigate } from 'react-router-dom'; // 페이지 이동 관련 라이브러리
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 비밀번호 보기/가리기 아이콘
import '../../styles/SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const pwConfirmRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 회원가입 관련 필드 입력값 검증을 통과하면 json server로 데이터를 전송
  const onSubmit = async () => {
    const name = nameRef.current.value;
    const id = idRef.current.value;
    const pw = pwRef.current.value;
    const pwConfirm = pwConfirmRef.current.value;

    // 회원가입 관련 필드 입력값 검증 1: 모든 필드가 채워져 있어야 통과
    if (!name || !id || !pw || !pwConfirm) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    // 회원가입 관련 필드 입력값 검증 2: 비밀번호와 비밀번호 확인 필드가 동일해야 통과
    if (pw !== pwConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 관련 입력값 검증 통과하면 회원가입 완료 확인 메시지 팝업
    if (window.confirm("회원가입 하시겠습니까?")) {
      try {
        await axios.post('http://localhost:3001/members', {
          memName: name,
          memId: id,
          memPw: pw,
        });
        alert("회원가입이 완료되었습니다!");
        navigate('/seoultravel/login');
      } catch (error) {
        console.error("회원가입 실패:", error);
        alert("회원가입 중 문제가 발생했습니다.");
      }
    }
  };

  // 비밀번호 필드의 비밀번호 보기/가리기 토글 함수
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 비밀번호 확인 필드의 비밀번호 보기/가리기 토글 함수
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-page">
      <h1>회원가입 화면</h1>
      <div className="loginContents">
        <div className="inputWrap">
          <label htmlFor="item_name">이름</label>
          <input name="item_name" ref={nameRef} id="item_name" type="text" />
        </div>
        <div className="inputWrap">
          <label htmlFor="item_id">아이디</label>
          <input name="item_id" ref={idRef} id="item_id" type="text" />
        </div>
        <div className="inputWrap">
          <label htmlFor="item_pw">비밀번호</label>
          <div className="password-field">
            <input
              name="item_pw"
              ref={pwRef}
              id="item_pw"
              type={showPassword ? "text" : "password"}
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="inputWrap">
          <label htmlFor="item_pw_confirm">비밀번호 확인</label>
          <div className="password-field">
            <input
              name="item_pw_confirm"
              ref={pwConfirmRef}
              id="item_pw_confirm"
              type={showConfirmPassword ? "text" : "password"}
            />
            <span
              className="password-toggle"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
      </div>
      <button className="signup" onClick={onSubmit}>회원가입</button>
    </div>
  );
};

export default SignUp;