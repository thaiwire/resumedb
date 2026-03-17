import React from "react";

type FullPageLoaderProps = {
  message?: string;
};

const FullPageLoader = ({ message = "Loading..." }: FullPageLoaderProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center text-lg font-medium text-slate-700">
      {message}
    </div>
  );
};

export default FullPageLoader;