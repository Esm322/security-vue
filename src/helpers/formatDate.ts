export function formatDate(date: Date) {
  const newDate: Date = new Date(date)
  const year: number = newDate.getFullYear()
  let month: number | string = newDate.getMonth() + 1
  let day: number | string = newDate.getDate()
  let hour: number | string = newDate.getHours()
  let minute: number | string = newDate.getMinutes()

  if (day < 10) {
    day = `0${day}`
  }

  if (month < 10) {
    month = `0${month}`
  }

  if (hour < 10) {
    hour = `0${hour}`
  }

  if (minute < 10) {
    minute = `0${minute}`
  }

  return `${day}.${month}.${year} ${hour}:${minute}`
}
