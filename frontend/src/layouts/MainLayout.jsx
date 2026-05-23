import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function MainLayout({ children }) {

  // Load saved sidebar state
  const [collapsed, setCollapsed] = useState(() => {

    const savedState = localStorage.getItem(
      'sidebarCollapsed'
    );

    return savedState === 'true';
  });

  // Save state whenever changed
  useEffect(() => {

    localStorage.setItem(
      'sidebarCollapsed',
      collapsed
    );

  }, [collapsed]);

  // Toggle ONLY on hamburger click
  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="layout">

      <Sidebar collapsed={collapsed} />

      <div className="main-content">

        <Navbar toggleSidebar={toggleSidebar} />

        {children}

      </div>

    </div>
  );
}

export default MainLayout;