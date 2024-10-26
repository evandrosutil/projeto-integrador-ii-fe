import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../services/auth';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Pet Adoption
        </Link>
        <div className="space-x-4">
          {isAuthenticated() ? (
            <>
              <Link to="/animals" className="hover:text-gray-300">
                Meus Animais
              </Link>
              <Link to="/animals/new" className="hover:text-gray-300">
                Cadastrar Animal
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 cursor-pointer"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Registrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;