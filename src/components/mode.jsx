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
    <div className="flex justify-center gap-2 pt-4 pb-4">
      <h2 className="text-3xl">{mode}</h2>
      <h2 className="text-3xl">{emoji}</h2>
    </div>
  );
};