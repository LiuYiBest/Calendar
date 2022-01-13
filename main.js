console.log('测试')
// const time = document.querySelector('#time')

const time = get('#time')
const now = new Date
console.log(typeof now)   //object
const year = now.getFullYear()
const month = now.getMonth() + 1
time.textContent = `${year}年${month}月`

//days  时区差+8
const firstDayOfCurrentMonth = new Date(year, month - 1 , 1)   //月初
console.log('月初',firstDayOfCurrentMonth.toISOString())
const weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay()  //月初星期几
console.log('月初星期几',weekdayOfFirstDayOfCurrentMonth)
const MonthLast = new Date(new Date(year, month - 1 + 1 , 1) - 86400 * 1000)  //一个月的天数 下个月初减一天
const MonthLastDays = MonthLast.getDate()
console.log('月末几号',MonthLastDays)

//帮助函数
function get(selector) {
    return document.querySelector(selector)
}

function getAll(selector) {
    return document.querySelectorAll(selector)
}
