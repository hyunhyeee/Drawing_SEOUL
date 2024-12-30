import { Routes, Route } from 'react-router-dom';
import React from "react";

import MainHome from './pages/mainpage/MainHome';
import SeoulMap from './pages/seoulmap/SeoulMap';
import RandomStation from './pages/randomstationpage/RandomStation';
import Login from './pages/loginpage/Login';
import StationiMemo from './pages/stationmemo/StationMemo';
import EditMap from './pages/editmap/EditMap';
import SignUp from './pages/loginpage/SignUp';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/seoultravel/seoulmap" element={<SeoulMap />} />
        <Route path="/seoultravel/random/station" element={<RandomStation />} />
        <Route path="/seoultravel/login" element={<Login />} />
        <Route path="/seoultravel/signup" element={<SignUp />} />
        <Route path="/seoultravel/station/memo" element={<StationiMemo />} />
        <Route path="/seoultravel/edit/map" element={<EditMap />} />
      </Routes>
    </div>
  );
}

export default App;