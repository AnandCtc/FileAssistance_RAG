import { NavLink } from 'react-router-dom';

import {
  FiHome,
  FiUpload,
  FiMessageCircle
} from 'react-icons/fi';

function Sidebar({ collapsed }) {

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>

      <div className="logo-section">

        <div className="logo-box">
          📄
        </div>

        {!collapsed && (
          <h2>RAG File Assistant</h2>
        )}

      </div>

      {!collapsed && (
        <p className="menu-label">
          MENU
        </p>
      )}

      <div className="sidebar-menu">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'sidebar-link active'
              : 'sidebar-link'
          }
        >
          <FiHome className="nav-icon" />

          {!collapsed && (
            <span>Dashboard</span>
          )}

        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) =>
            isActive
              ? 'sidebar-link active'
              : 'sidebar-link'
          }
        >
          <FiUpload className="nav-icon" />

          {!collapsed && (
            <span>Upload</span>
          )}

        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive
              ? 'sidebar-link active'
              : 'sidebar-link'
          }
        >
          <FiMessageCircle className="nav-icon" />

          {!collapsed && (
            <span>Chat</span>
          )}

        </NavLink>

      </div>

    </div>
  );
}

export default Sidebar;