import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { CiMemoPad } from "react-icons/ci";
import { GiPerspectiveDiceSixFacesRandom, GiTreasureMap } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";
import '../styles/Header.css';

import logo from '../assets/images/mainlogo.png';

const Header = () => {
  const [homeLink, setHomeLink] = useState('/');
  const [userId, setUserId] = useState(null); // 유저 아이디 상태
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 유저 아이디 확인
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []); // 최초 렌더링 시 로컬 스토리지 값 가져오기

  const handleLogout = () => {
    localStorage.removeItem('userId'); // 로컬 스토리지에서 유저 아이디 삭제
    setUserId(null); // 유저 상태 초기화
    window.location.reload();
    alert("로그아웃 되었습니다.");
    navigate('/'); // 로그아웃 후 홈으로 이동
  };

  return (
    <header className="header">
      <div className="logo-container">
        <span className="logo-text">그리다,</span>
        <img src={logo} alt="로고" className="logo" />
        <span className="logo-text">서울</span>
      </div>
      <nav className="nav-links">
        <Link className="nav-link home" to={homeLink}><IoHome className="icon" />홈</Link>
        <Link className="nav-link" to="/seoultravel/seoulmap"><GiTreasureMap className="icon" />서울맵</Link>
        <Link className="nav-link" to="/seoultravel/random/station"><GiPerspectiveDiceSixFacesRandom className="icon" />랜덤 역</Link>
        <Link className="nav-link" to="/seoultravel/station/memo"><CiMemoPad className="icon" />역 메모장</Link>

        {/* 로그인 상태에 따라 렌더링 */}
        {userId ? (
          <div className="user-info">
            <span className="welcome-message">{userId}님</span>
            <button className="logout-button" onClick={handleLogout}>로그아웃</button>
          </div>
        ) : (
          <Link className="nav-link login-link" to="/seoultravel/login"><CiLogin className="icon" />로그인</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;