// src/components/Header.js

import React, { useState } from 'react';
import Logo from '../../assets/loga.png';
import './Header.css';
import SettingsIcon from '@mui/icons-material/Settings';
import Setting from './Setting';
import Friend from './Friend';

const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <div className="header">
        <div className="header-content">
          <img src={Logo} alt="Chat Buddies Logo" className="logo" />
          <h2 className="title">Chat Buddies</h2>
          <SettingsIcon className="settings-icon" onClick={toggleSidebar} />
        </div>
      <Friend/>
      </div>
      <Setting visible={sidebarVisible} toggleSidebar={toggleSidebar}/>
    </>
  );
};

export default Header;
