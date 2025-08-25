export default function TimerDisplay({ timeLeft }) {

  // Caluculate minutes and seconds, then format seconds with leading 0
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <>
      <h1 className="flex justify-center bg-clip-text bg-gradient-to-r from-red-500 via-rose-900 to-rose-500 font-bold text-transparent text-5xl">{formattedTime}</h1>
    </>
  );
};
