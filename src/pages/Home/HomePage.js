import React from 'react';
import HomeMain from '../../components/Home/HomeMain';
import RecentNotices from '../../components/Home/RecentNotices';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <HomeMain />
      <RecentNotices />
    </div>
  );
};

export default HomePage;
