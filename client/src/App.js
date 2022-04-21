import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HTML404 from './pages/HTML404';
import PageFans from './pages/PageFans';
import PageLogin from './pages/PageLogin';
import PagePhotos from './pages/PagePhotos';
import PagePosts from './pages/PagePosts';
import PageProfile from './pages/PageProfile';
import PageRegister from './pages/PageRegister';
import PageVerification from './pages/PageVerification';
import PagePost from './pages/PagePost';
import HomeLayout from './layout/HomeLayout';
import PageFansOf from './pages/PageFansOf';
import PageRegistrationSuccess from './pages/PageRegistrationSuccess';
import ReRoutes from './layout/ReRoutes';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/:username" element={<PagePosts />} />
          <Route path="/:username/profile" element={<PageProfile />} />
          <Route path="/:username/photos" element={<PagePhotos />} />
          <Route path="/:username/fans" element={<PageFans />} />
          <Route path="/:username/fansof" element={<PageFansOf />} />
          <Route
            path="/:username/posts/:post_id/:user_id"
            element={<PagePost />}
          />
        </Route>
        <Route element={<ReRoutes />}>
          <Route path="/success" element={<PageRegistrationSuccess />} />
          <Route
            path="/verify/:id/:is_activated/:email"
            element={<PageVerification />}
          />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/register" element={<PageRegister />} />
        </Route>
        {/* Cath all routes */}
        <Route path="*" element={<HTML404 />} />
      </Routes>
    </>
  );
};

export default App;
