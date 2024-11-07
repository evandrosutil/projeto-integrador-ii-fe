import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AnimalList from './components/AnimalList';
import AnimalForm from './components/AnimalForm';
import PrivateRoute from './components/PrivateRoute';
import AdoptantRegistration from './components/AdoptantRegistration';

const Home = () => <div>Home Page</div>;

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/admin" element={<Register />} />
          <Route path="/register" element={<AdoptantRegistration />} />
          <Route 
          path="/animals" 
          element={
            <PrivateRoute>
              <AnimalList />
            </PrivateRoute>
          } 
          />
          <Route 
          path="/animals/new" 
          element={
            <PrivateRoute>
              <AnimalForm />
            </PrivateRoute>
            } 
          />
        </Routes>
    </Router>
  );
}

export default App;