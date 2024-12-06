import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <span className="navbar-brand">Gestión de Gimnasio</span>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Socios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/clases">Clases</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;