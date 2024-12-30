import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/Login.css";

const Login = () => {
  const [id, setId] = useState(""); // 아이디 입력 필드에 사용자가 입력한 아이디를 저장하는 상태
  const [pw, setPw] = useState(""); // 비밀번호 입력 필드에 사용자가 입력한 비밀번호를 저장하는 상태
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 or 가리기
  const pwInputRef = useRef(null); // 비밀번호 입력 필드 ref
  const navigate = useNavigate(); // 페이지 이동 함수 by React Router

  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      // json server에서 가져온 데이터를 요청함
      const response = await axios.get("http://localhost:3001/members");
      // json server에서 가져온 회원가입 정보와 입력한 데이터를 비교함
      const user = response.data.find(
        (member) => member.memId === id && member.memPw === pw
      );
      if (user) { // 로그인 성공할 경우
        alert("로그인 성공!");
        localStorage.setItem("userId", user.memId); // 로컬 스토리지에 사용자 아이디 저장
        window.location.href = "/"; // 로그인 성공 시 홈페이지로 이동함
      } else { // 로그인 실패할 경우
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) { // json server과의 통신 오류 발생하는 경우
      console.error("로그인 실패:", error);
    }
  };

  // 비밀번호 보기/가리기 토글 함수
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>로그인 화면</h1>
        <div className="loginContents">
          {/* 아이디 입력 */}
          <div className="inputWrap">
            <input
              name="item_id"
              id="item_id"
              type="text"
              placeholder="아이디 입력"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") pwInputRef.current.focus(); // 엔터 키로 비밀번호 필드로 이동
              }}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="inputWrap inputWithIcon">
            <input
              name="item_pw"
              id="item_pw"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 입력"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="input-field"
              ref={pwInputRef} // ref 연결
              onKeyPress={(e) => {
                if (e.key === "Enter") handleLogin(); // 엔터 키로 로그인 실행
              }}
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button onClick={handleLogin}>로그인</button>
        <Link to="/seoultravel/signup" className="signup-button">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;