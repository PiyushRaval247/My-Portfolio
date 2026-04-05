"use client";

import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);

  return (
    <LoadingContext.Provider value={{ isWelcomeComplete, setIsWelcomeComplete }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
