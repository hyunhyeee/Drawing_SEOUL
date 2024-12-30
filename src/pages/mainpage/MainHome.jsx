import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/MainHome.css';
import mainColor from "../../assets/images/maincolor.png";

import { FaRegFaceSmile } from "react-icons/fa6";
import { LuMousePointerClick } from "react-icons/lu";
import { GiTreasureMap } from "react-icons/gi";
import { FaDice } from "react-icons/fa";

const MainHome = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  //로컬 스토리지에서 유저 아이디 존재 확인
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  // 주사위 굴리기 버튼 클릭 시, 유저 정보가 없으면 로그인 권유, 정보가 있으면 화면 전환
  const handleButtonClick = () => {
    if (!userId) {
      alert("로그인 후 이용 가능합니다!");
      navigate("/seoultravel/login");
    } else {
      navigate("/seoultravel/random/station");
    }
  };


  return (
    <div className="mainPage-container">
      <div className="mainframe">
        <img className='maincolor' src={mainColor} />
      </div>

      <h5 className="textPhrase1"> <FaRegFaceSmile /> 어디로 여행을 떠나볼까요?</h5>
      <h6 className="textPhrase2"> <LuMousePointerClick /> 지도에 마우스를 올리면 각 자치구별 사진을 넣을 수 있어요!</h6>
      <h6 className="textPhrase3"> <GiTreasureMap /> 사진을 채워 나만의 지도를 만들어보세요</h6>

      <div className="startframe">
        <div>
          <FaDice className="dice-icon" />
        </div>
        <div>
          <h5>랜덤으로 떠나는 서울여행</h5>
        </div>
        <div>
          <button onClick={handleButtonClick}>주사위 굴리기</button>
        </div>
      </div>
    </div>
  );
};

export default MainHome;
