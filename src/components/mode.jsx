import { useMemo } from "react";

export default function Mode({ mode }) {

  const emoji = useMemo(() => {
    const workEmojis = ["🧠", "💻", "✍️", "📝", "🔥", "🎯"];
    const breakEmojis = ["☕", "🧘", "🌿", "🚶", "🎵", "🛋️"];

    if (mode === "work") {
      return workEmojis[Math.floor(Math.random() * workEmojis.length)]
    }
    else {
      return breakEmojis[Math.floor(Math.random() * breakEmojis.length)]
    }

  }, [mode])

  return (
    <>
      <h1>{mode}</h1>
      <h2>{emoji}</h2>
    </>
  );
};