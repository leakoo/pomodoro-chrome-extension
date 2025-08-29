import { useMemo } from "react";

export default function Mode({ mode }) {

  const emoji = useMemo(() => {
    const workEmojis = ["🧠", "💻", "✍️", "📝", "🔥", "🎯"];
    const breakEmojis = ["☕", "🧘", "🌿", "🚶", "🎵", "🛋️"];

    if (mode === "Work") {
      return workEmojis[Math.floor(Math.random() * workEmojis.length)]
    }
    else {
      return breakEmojis[Math.floor(Math.random() * breakEmojis.length)]
    }

  }, [mode])

  return (
    <div className="flex justify-center gap-2 pt-5 pb-5">
      <h2 className="bg-clip-text bg-gradient-to-r from-red-500 via-rose-900 to-rose-500 font-bold text-transparent text-2xl">{mode}</h2>
      <h2 className="text-2xl animate-bounce">{emoji}</h2>
    </div>
  );
};