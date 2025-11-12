import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import UserView from './pages/UserView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/add" element={<UserForm />} />
            <Route path="/users/:id/edit" element={<UserForm />} />
            <Route path="/users/:id/view" element={<UserView />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;

