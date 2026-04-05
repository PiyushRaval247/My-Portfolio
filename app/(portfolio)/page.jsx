"use client";

import { useLoading } from "@/context/LoadingContext";
import WelcomeScreen from "@/components/WelcomeScreen";
import { HomeContent } from "@/components/HomeContent";

export default function Home() {
  const { isWelcomeComplete, setIsWelcomeComplete } = useLoading();

  return (
    <>
      {!isWelcomeComplete ? (
        <WelcomeScreen onWelcomeComplete={() => setIsWelcomeComplete(true)} />
      ) : (
        <HomeContent />
      )}
    </>
  );
}
