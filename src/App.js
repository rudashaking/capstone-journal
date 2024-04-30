import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/Signup/Signup";
import JournalCollectionPage from "./Pages/JournalCollection/JournalCollection";
import JournalPage from "./Pages/JournalPage/JournalPage";
import Header from "./Components/Header/Header";
import AvatarPick from "./Pages/AvatarPick/AvatarPick";
import FloatingAvatar from "./Components/FloatingAvatar/FloatingAvatar";
import Sidebar from "./Components/sidebar/Sidebar";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        {!["/login", "/signup"].includes(window.location.pathname) && (
          <Header />
        )}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/journal-collection"
            element={<JournalCollectionPage />}
          />
          <Route path="/journal/:id" element={<JournalPage />} />
          <Route path="/AvatarPick" element={<AvatarPick />} />
        </Routes>

      
        {["/journal-collection", "/journal/:id", "/AvatarPick"].includes(
          window.location.pathname
        ) && <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />}

      
        {!["/login", "/signup"].includes(window.location.pathname) && (
          <FloatingAvatar toggleSidebar={toggleSidebar} />
        )}
      </div>
    </Router>
  );
};

export default App;
