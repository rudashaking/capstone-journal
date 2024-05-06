import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/Signup/Signup";
import JournalCollectionPage from "./Pages/JournalCollection/JournalCollection";
import JournalPage from "./Pages/JournalPage/JournalPage";
import Header from "./components/Header/Header";
import FloatingAvatar from "./components/FloatingAvatar/FloatingAvatar";
import Sidebar from "./components/Sidebar/Sidebar";
import Support from "./Pages/SupportPage/SupportPage";
import NotFoundPage from "./Pages/404/404";
import './styling/global.scss';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        {!["/login", "/signup", "/"].includes(window.location.pathname) && (
          <Header userId={userId} toggleSidebar={toggleSidebar} />
        )}

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/support" element={<Support />} />
          <Route path="/404" element={<NotFoundPage />} />

          <Route
            path="/journal-collection/:id" 
            element={<JournalCollectionPage />}
          />
          <Route path="/journal/:userId/:id/entries" element={<JournalPage/>} />

          
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>

        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
        )}

        {!["/login", "/signup", "/"].includes(window.location.pathname) && (
          <FloatingAvatar toggleSidebar={toggleSidebar} />
        )}
      </div>
    </Router>
  );
};

export default App;
