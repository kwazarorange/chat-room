// formats time to hh:mm template
const formatTime = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate =`${hours < 10 ? `0` : ``}${hours}:${minutes < 10 ? `0` : ``}${minutes}`;
  return formattedDate;
};

export default formatTime;
