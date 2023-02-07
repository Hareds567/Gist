"use client";
import React from "react";

export const LanguageContext = React.createContext("");

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LanguageContext.Provider value={"eng"}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
