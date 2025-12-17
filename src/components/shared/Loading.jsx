import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen -mt-36 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-xl text-primary"></span>
        <p className="text-gray-600 text-sm">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
