import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import '../../styles/SeoulMap.css';

import seoulMapImage from '../../assets/topography/서울지형.png';
import gangbukImage from '../../assets/topography/강북구.png';
import seongbukImage from '../../assets/topography/성북구.png';
import gangnamImage from '../../assets/topography/강남구.png';
import dobongImage from '../../assets/topography/도봉구.png';
import nowonImage from '../../assets/topography/노원구.png';
import jungnangImage from '../../assets/topography/중랑구.png';
import dongdaemunImage from '../../assets/topography/동대문구.png';
import kwangjinImage from '../../assets/topography/광진구.png';
import seongdongImage from '../../assets/topography/성동구.png';
import jungImage from '../../assets/topography/중구.png';
import jongnoImage from '../../assets/topography/종로구.png';
import yongsanImage from '../../assets/topography/용산구.png';
import mapoImage from '../../assets/topography/마포구.png';
import seodaemunImage from '../../assets/topography/서대문구.png';
import eunpyeongImage from '../../assets/topography/은평구.png';
import songpaImage from '../../assets/topography/송파구.png';
import gangdongImage from '../../assets/topography/강동구.png';
import seochoImage from '../../assets/topography/서초구.png';
import dongjakImage from '../../assets/topography/동작구.png';
import kwanakImage from '../../assets/topography/관악구.png';
import geumcheonImage from '../../assets/topography/금천구.png';
import guroImage from '../../assets/topography/구로구.png';
import yangcheonImage from '../../assets/topography/양천구.png';
import yeongdeungpoImage from '../../assets/topography/영등포구.png';
import gangseoImage from '../../assets/topography/강서구.png';

const districtImages = {
  gangbuk: gangbukImage,
  seongbuk: seongbukImage,
  gangnam: gangnamImage,
  dobong: dobongImage,
  nowon: nowonImage,
  jungnang: jungnangImage,
  dongdaemun: dongdaemunImage,
  kwangjin: kwangjinImage,
  seongdong: seongdongImage,
  jung: jungImage,
  jongno: jongnoImage,
  yongsan: yongsanImage,
  mapo: mapoImage,
  seodaemun: seodaemunImage,
  eunpyeong: eunpyeongImage,
  songpa: songpaImage,
  gangdong: gangdongImage,
  seocho: seochoImage,
  dongjak: dongjakImage,
  kwanak: kwanakImage,
  geumcheon: geumcheonImage,
  guro: guroImage,
  yangcheon: yangcheonImage,
  yeongdeungpo: yeongdeungpoImage,
  gangseo: gangseoImage,
};

const SeoulMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [clippedImageSrcs, setClippedImageSrcs] = useState(() => {
    const initialSrcs = {};
    Object.keys(districtImages).forEach((district) => {
      initialSrcs[district] = localStorage.getItem(`clippedImageSrc_${district}`) || null;
    });
    return initialSrcs;
  });
  const canvasRefs = useRef({});
  const mapContainerRef = useRef(null); // 전체 영역 캡쳐용 ref
  const navigate = useNavigate();


  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    localStorage.setItem('lastSelectedDistrict', district);
    navigate('/seoultravel/edit/map', { state: { district } });
  };

  // 모든 사진 초기화 함수
  const handleResetAll = () => {
    Object.keys(clippedImageSrcs).forEach((district) => {
      localStorage.removeItem(`clippedImageSrc_${district}`);
    });
    setClippedImageSrcs(() => {
      const resetSrcs = {};
      Object.keys(districtImages).forEach((district) => {
        resetSrcs[district] = null;
      });
      return resetSrcs;
    });
  };

  // 전체 영역을 캡쳐하여 저장하는 함수
  const handleSaveImage = () => {
    const mapContainer = mapContainerRef.current;

    if (!mapContainer) {
      console.error('mapContainer가 존재하지 않습니다.');
      return;
    }

    html2canvas(mapContainer, {
      useCORS: true, // 외부 이미지 처리
      scale: 2, // 캡처 해상도를 3배로 증가
      scrollX: 0, // 스크롤 위치 무시
      scrollY: 0,
    })
      .then((canvas) => {
        const imageURL = canvas.toDataURL('image/png'); // 캡처한 이미지를 URL로 변환
        const link = document.createElement('a');
        link.download = 'seoul_map.png'; // 다운로드 파일 이름 설정
        link.href = imageURL; // URL 설정
        link.click(); // 다운로드 실행
      })
      .catch((error) => {
        console.error('html2canvas 캡처 중 오류 발생:', error);
      });
  };



  useEffect(() => {
    Object.keys(districtImages).forEach((district) => {
      if (clippedImageSrcs[district]) {
        const img = new Image();
        img.src = clippedImageSrcs[district];
        img.onload = () => {
          const canvas = canvasRefs.current[district];
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        img.onerror = () => {
          console.error(`이미지 로드 실패: ${clippedImageSrcs[district]}`);
        };
      }
    });
  }, [clippedImageSrcs]);

  return (
    <div className="seoulmap-page">
      <div className="map-container" ref={mapContainerRef}>
        <img src={seoulMapImage} alt="서울 지형" className="map-image" />

        {Object.keys(districtImages).map((district) => (
          <div
            key={district}
            className={`district ${district}`}
            onClick={() => handleDistrictClick(district)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleDistrictClick(district);
            }}
            aria-label={`Select ${district}`}
          >
            <div
              className={`${district}-hover-image hover-image ${clippedImageSrcs[district] ? 'uploaded' : ''
                }`}
            >
              {clippedImageSrcs[district] ? (
                <img
                  src={clippedImageSrcs[district]}
                  alt={`클립핑된 ${district} 이미지`}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <canvas ref={(el) => (canvasRefs.current[district] = el)} style={{ display: 'none' }}></canvas>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="seoulmap-button-container">
        <button onClick={handleResetAll} className="reset-button">
          모두 초기화
        </button>
        <button onClick={handleSaveImage} className="save-button">
          사진 저장
        </button>
      </div>
    </div>
  );
};

export default SeoulMap;

