import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/RandomStation.css';
import stations from './StationData';
import seoulmap from '../../assets/topography/서울지형.png';
import dice from '../../assets/images/dice.png';

const RandomStation = () => {
  const [selectedStation, setSelectedStation] = useState(''); //현재 랜덤으로 선택된 역 이름
  const [savedStations, setSavedStations] = useState([]); // 로컬스토리지에서 불러온, 저장된 역 목록
  const [availableStations, setAvailableStations] = useState([]);  // 저장되지 않은, 랜덤 선택 가능 역 목록
  const [selectedIcons, setSelectedIcons] = useState([]); // 선택된 노선 아이콘들 경로 배열
  const [isAnimating] = useState(false); // 애니메이션 비활성화 상태
  const navigate = useNavigate();

  // 로컬 스토리지에서 userId 가져오기
  const userId = localStorage.getItem('userId'); // 로그인 후 userId가 로컬 스토리지에 저장되어 있다고 가정

  useEffect(() => {
    // userId로 저장된 역 목록 가져오기
    const storedStations = JSON.parse(localStorage.getItem(`${userId}_storedStations`)) || [];
    setSavedStations(storedStations);

    // 전체 역 목록에서 저장된 역을 제외한 역 목록
    const allStations = Object.values(stations).flat();
    const filteredStations = allStations.filter(
      (station) => !storedStations.includes(station.name)
    );
    setAvailableStations(filteredStations);
  }, [userId, navigate]);

  const handleRandomStation = () => {
    const diceElement = document.querySelector('.dice-icon');

    diceElement.classList.add('animate');

    // 주사위 굴리는 애니메이션 시간 (1초) 후에 랜덤 역 선택
    setTimeout(() => {
      diceElement.classList.remove('animate');

      // 저장된 역을 제외한 필터링된 역들 중에서 랜덤 선택
      if (availableStations.length === 0) {
        alert('모든 역이 저장되었습니다.');
        return;
      }

      const randomStation =
        availableStations[Math.floor(Math.random() * availableStations.length)];
      setSelectedStation(randomStation.name);

      // 선택된 역에 해당하는 모든 노선 아이콘 설정
      const stationLines = [];
      Object.keys(stations).forEach((lineKey) => {
        stations[lineKey].forEach((station) => {
          if (station.name === randomStation.name) {
            stationLines.push(station.icon);
          }
        });
      });
      setSelectedIcons(stationLines);
    }, 1000);
  };

  const handleSaveStation = () => {
    if (!userId) {
      alert("로그인 후 이용 가능합니다.");
      navigate('/seoultravel/login');
      return;
    }

    if (selectedStation && !savedStations.includes(selectedStation)) {
      // 로컬스토리지에 userId 기반으로 저장
      const updatedSavedStations = [...savedStations, selectedStation];
      localStorage.setItem(`${userId}_storedStations`, JSON.stringify(updatedSavedStations));

      // 상태 업데이트
      setSavedStations(updatedSavedStations);

      // 필터링된 역 목록에서 해당 역을 제외
      setAvailableStations((prevAvailableStations) =>
        prevAvailableStations.filter((station) => station.name !== selectedStation)
      );

      // 상태 초기화
      setSelectedStation('');
      setSelectedIcons([]);

      navigate('/seoultravel/station/memo');
    } else if (savedStations.includes(selectedStation)) {
      alert('이미 저장된 역입니다.');
    }
  };

  return (
    <div className="randomstation-page">
      <main className="randomstation-content">
        <div className="randomstation-container">
          <img
            src={seoulmap}
            alt="Seoul Map"
            className="seoul-map"
          />
        </div>
        <div className="random-station-container">
          <h2 className="title">랜덤으로 떠나는 서울여행</h2>
          <h5 className="description">주사위를 굴려보세요!</h5>
          <div className="dice-button-container">
            <img
              src={dice}
              alt="랜덤으로 역을 선택하는 주사위 아이콘"
              className={`dice-icon ${isAnimating ? 'animate' : ''}`}
              role="button"
              aria-label="랜덤 역 선택"
              onClick={handleRandomStation}
            />
          </div>
          {selectedStation && (
            <>
              <div className="station-description">
                <div className="station-name">{selectedStation}</div>
              </div>
              <div className="station-information">
                <p>
                  이번 역은 <strong>{selectedStation}</strong> 입니다.
                </p>
              </div>
              <div className="station-icons">
                {selectedIcons.map((icon, index) => (
                  <img
                    key={index}
                    src={require(`../../assets/station_data/${icon}`)}
                    alt={`${selectedStation} 아이콘`}
                    className="line-icon"
                  />
                ))}
              </div>
              <div className="save-btn-container">
                <button onClick={handleSaveStation} className="save-btn">
                  역 저장하기
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default RandomStation;
