import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthModule from './pages/AuthModule'
import MainModule from './pages/MainModule'
import ProductPage from "./pages/ProductPage";
import ComparePage from "./pages/ComparePage";
import ImageAnalyzer from "./pages/ImageAnalyzer";
import Chat from './pages/Chat';
import Loader from "./components/Loader";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <Router>
        <Routes>
          <Route
            path="/image"
            element={<ImageAnalyzer setIsLoading={setIsLoading} />}
          />
          <Route
            path="/compare"
            element={<ComparePage setIsLoading={setIsLoading} />}
          />
          <Route
            path="/product"
            element={<ProductPage setIsLoading={setIsLoading} />}
          />
          <Route
            path="/auth"
            element={<AuthModule setIsLoading={setIsLoading} />}
          />
          <Route
            path="/"
            element={<MainModule setIsLoading={setIsLoading} />}
          />
        </Routes>
      </Router>
      <Chat />
      {isLoading && <Loader />}
    </div>
  );
};

export default App