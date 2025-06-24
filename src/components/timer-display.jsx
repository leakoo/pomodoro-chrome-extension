export default function TimerDisplay({ timeLeft }) {
  
  // Caluculate minutes and seconds, then format seconds with leading 0
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <>
      <h1>{formattedTime}</h1>
    </>
  );
};
