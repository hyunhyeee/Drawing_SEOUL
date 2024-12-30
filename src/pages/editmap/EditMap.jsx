import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/EditMap.css';
import uploadIcon from '../../assets/images/upload.png';
import tablerMapStar from '../../assets/images/tabler_map-star.png';
import pinkLine from '../../assets/images/Pink_Line.png';
import ellipseImage from '../../assets/images/Ellipse.png';

// 각 구역별 이미지 파일 가져오기
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

// 구역별 이미지 매핑
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

// 구역별 한글 이름 매핑
const districtNames = {
  gangbuk: '강북구',
  seongbuk: '성북구',
  gangnam: '강남구',
  dobong: '도봉구',
  nowon: '노원구',
  jungnang: '중랑구',
  dongdaemun: '동대문구',
  kwangjin: '광진구',
  seongdong: '성동구',
  jung: '중구',
  jongno: '종로구',
  yongsan: '용산구',
  mapo: '마포구',
  seodaemun: '서대문구',
  eunpyeong: '은평구',
  songpa: '송파구',
  gangdong: '강동구',
  seocho: '서초구',
  dongjak: '동작구',
  kwanak: '관악구',
  geumcheon: '금천구',
  guro: '구로구',
  yangcheon: '양천구',
  yeongdeungpo: '영등포구',
  gangseo: '강서구',
};

const EditMap = () => {
  const location = useLocation(); // 현재 위치 정보 가져오기
  const navigate = useNavigate();
  const district = location.state?.district || localStorage.getItem('lastSelectedDistrict'); // 선택된 구역 가져오기
  const [clippedImageSrc, setClippedImageSrc] = useState(() => {
    return localStorage.getItem(`clippedImageSrc_${district}`) || null; // 저장된 이미지 불러오기
  });
  const canvasRef = useRef(null);

  // 이미지 업로드 시 실행되는 함수
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && district) {
      setClippedImageSrc(null);

      const reader = new FileReader(); // 파일 읽기 위해 사용
      reader.onload = () => {
        const imageSrc = reader.result;
        applyImageToDistrict(district, imageSrc); // 이미지 적용
      };
      reader.readAsDataURL(file);
    }
  };

  // 업로드한 이미지를 해당 구역에 적용
  const applyImageToDistrict = (district, imageSrc) => {
    const canvas = canvasRef.current;
    if (!canvas || !districtImages[district]) return;

    const ctx = canvas.getContext('2d');
    const districtImage = new Image();
    districtImage.src = districtImages[district];
    const uploaded = new Image();
    uploaded.src = imageSrc;

    districtImage.onload = () => {
      canvas.width = 450;
      canvas.height = 450;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(districtImage, 0, 0, canvas.width, canvas.height);

      uploaded.onload = () => {
        ctx.globalCompositeOperation = 'source-in'; // 이미지 합성 모드 설정
        ctx.drawImage(uploaded, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';

        const dataUrl = canvas.toDataURL('image/png');
        setClippedImageSrc(dataUrl); // 결과 이미지 저장
      };
    };
  };

  // 저장 버튼 클릭 시 실행되는 함수
  const handleSave = () => {
    // 이미지 저장 -> 알림 표시 -> 페이지 이동
    if (clippedImageSrc) {
      localStorage.setItem(`clippedImageSrc_${district}`, clippedImageSrc);
      alert('저장되었습니다.');
      navigate('/seoultravel/seoulmap');
    }
  };

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDelete = () => {
    // 이미지 초기화 및 삭제 -> 알림 표시 -> 페이지 이동
    setClippedImageSrc(null); // 이미지 초기화
    localStorage.removeItem(`clippedImageSrc_${district}`); // 로컬 스토리지에서 삭제
    alert('사진이 삭제되었습니다.');
    navigate('/seoultravel/seoulmap'); // 페이지 이동
  };


  // 이미지가 있을 때 캔버스에 그려줌
  useEffect(() => {
    if (clippedImageSrc) {
      const img = new Image();
      img.src = clippedImageSrc;
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = 450;
        canvas.height = 450;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [clippedImageSrc]);

  if (!district) {
    return <div>구역 정보가 없습니다.</div>;
  }

  const districtName = districtNames[district];

  return (
    <div className="edit-map-page">
      <div className="edit-map-wrapper">
        {/* 왼쪽 섹션 */}
        <div className="edit-map-left">
          <div className="edit-map-left-header">
            <img src={tablerMapStar} alt="Map Star" className="edit-map-left-header-icon" />
            <h1 className="edit-map-left-header-text">{districtName}</h1>
          </div>
          <img
            src={districtImages[district]}
            alt={`${districtName} 이미지`}
            className="edit-map-image"
            style={{ marginTop: '20px' }}
          />
          <img src={pinkLine} alt="Pink Line" className="edit-map-pink-line" />
        </div>

        {/* 오른쪽 섹션 */}
        <div className="edit-map-right">
          <img src={ellipseImage} alt="Ellipse Background" className="edit-map-ellipse" />
          <div className="edit-map-right-content">
            <p className="edit-map-right-text">지도에 사진을 넣어 나만의 지도를 만들어보아요!</p>
            <img
              src={clippedImageSrc || districtImages[district]}
              alt={`${districtName} 이미지`}
              className="edit-map-image-right"
            />

            {/* 나만의 이미지 편집 버튼 */}
            <button
              className="edit-map-button"
              onClick={() => document.getElementById('upload').click()}
            >
              <img src={uploadIcon} alt="Upload Icon" className="edit-map-upload-icon" />
              <span className="edit-map-button-text">나만의 지도 편집</span>
            </button>
            <div className="edit-map-button-row">
              {/* 저장하기 버튼 */}
              <button className="save-button" onClick={handleSave}>
                저장하기
              </button>
              {/* 삭제하기 버튼 */}
              <button
                className="reset-button"
                onClick={handleDelete}
              >
                사진 삭제하기
              </button>
            </div>
            {/* 파일 업로드 인풋 */}
            <input
              type="file"
              id="upload"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditMap;
