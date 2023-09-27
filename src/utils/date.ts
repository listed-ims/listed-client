export const dateToMMDDYY = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  export const dateToMonthDDYYYY = (date: Date) => {
    return (
      date.toDateString().slice(4, 10) +
      date.toDateString().slice(10).replace(" ", ", ")
    );
  };
  
  export const dateToReadableTime = (date: Date) => {
    return date.toLocaleTimeString().replace(/:\d{1,2}\s/, "");
  };