import { FiMenu } from 'react-icons/fi';

function Navbar({ toggleSidebar }) {

  return (
    <div className="navbar">

      <button
        className="menu-toggle"
        onClick={toggleSidebar}
      >
        <FiMenu />
      </button>

      <h2>RAG File Assistant</h2>

    </div>
  );
}

export default Navbar;