export function dateTransfer(type, date) {
  switch (type) {
    case "hour":
      return new Date(date).getHours();
    case "min":
      return new Date(date).getMinutes() < 10
        ? "0" + new Date(date).getMinutes()
        : new Date(date).getMinutes();
    case "day":
      return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(new Date(date));
    case "month":
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(new Date(date));
    case "date":
      const n = new Date(date).getDate();
      const result =
        n +
        ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10];

      return result;
    case "am":
      return new Date(date).getHours() < 12 ? "AM" : "PM";
    default:
      return "";
  }
}

export function sameDay(d1, d2) {
  d1 = new Date(d1);
  d2 = new Date(d2);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function formateDate(date) {
  date = new Date(date);
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}
