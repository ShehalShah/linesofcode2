import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-black bg-opacity-15 backdrop-blur-sm flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
    </div>
  );
};

export default Loader;
