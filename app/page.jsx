"use client";

import { useState } from "react";
import WelcomeScreen from "../components/WelcomeScreen";
import { HomeContent } from "../components/HomeContent";

export default function Home() {
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  return (
    <>
      {!welcomeComplete ? (
        <WelcomeScreen onWelcomeComplete={() => setWelcomeComplete(true)} />
      ) : (
        <HomeContent />
      )}
    </>
  );
}
