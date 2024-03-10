import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthModule from './pages/AuthModule'
import MainModule from './pages/MainModule'
import ProductPage from "./pages/ProductPage";
import ComparePage from "./pages/ComparePage";
import ImageAnalyzer from "./pages/ImageAnalyzer";
import Chat from './pages/Chat';

const App = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/image" element={<ImageAnalyzer />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/auth" element={<AuthModule />} />
          <Route path="/" element={<MainModule />} />
        </Routes>
      </Router>
      <Chat />
    </div>
  );
}

export default App