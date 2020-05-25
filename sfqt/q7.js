// 1964 年 10 月 10 日
// 2020 年 7 月 24 日

function range(from, to, step = 1) {
  const result = [];
  for (let i = from; i < to; i += step) {
    result.push(i);
  }
  return result;
}

function isLeapYear(year) {
  if (year % 100 === 0) {
    return year % 400 === 0;
  } else {
    return year % 4 === 0;
  }
}

const months = range(1, 13);
const daysMap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function listDaysOfMonth(year, month) {
  const day = isLeapYear(year) && month === 2 ? 29 : daysMap[month - 1];
  return range(1, day + 1)
}

function add0(num) {
  return num > 9 ? `${num}` : `0${num}`;
}

function listDatesOfYear(year) {
  return months.map(v => {
    return listDaysOfMonth(year, v).map(vv => {
      return `${year}${add0(v)}${add0(vv)}`
    })
  }).flat()
}

function rangeDates(from, to) {
  
}