//初始化时间

let cuttrent = new Date()
// const cuttrent = new Date(2022,10,1)
render(cuttrent)

get('#prevMonth').onclick = () => {
    render(new Date(cuttrent - 86400 * 1000 * 30))
}
get('#nextMonth').onclick = () => {
    render(new Date(cuttrent - 0 + 86400 * 1000 * 30))
}
get('#toDays').onclick = () => {
    render(new Date())
}

//帮助函数
function get(selector) {
    return document.querySelector(selector)
}

function getAll(selector) {
    return document.querySelectorAll(selector)
}

function render(tiem) {
    const year = tiem.getFullYear()
    const month = tiem.getMonth() + 1
    // console.log(typeof tiem)   //object

    cuttrent = tiem
    initTime()
    generateDays()

    function initTime() {
        const time = get('#time')
        time.textContent = `${year}年${month}月`
    }

    function generateDays() {
        //days  时区差+8
        const firstDayOfCurrentMonth = new Date(year, month - 1, 1)   //月初
        console.log('月初', firstDayOfCurrentMonth)
        const weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay()  //月初星期几
        console.log('月初星期几', weekdayOfFirstDayOfCurrentMonth)
        const MonthLast = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)  //月末
        const MonthLastDays = MonthLast.getDate()
        console.log('月末几号', MonthLastDays)  //一个月的天数
        const MonthLastWeekDays = MonthLast.getDay()  //月末周几
        const days = get('#days')
        days.innerHTML = ''
        //月初星期几之前的铺垫
        for (let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++) {
            const li = document.createElement('li')
            const d = new Date(firstDayOfCurrentMonth - 86400 * 1000 * i)
            console.log('d', d)
            li.textContent = d.getDate()
            days.prepend(li)
        }
        const liList = []
        //这个月几天
        for (let i = 1; i <= MonthLastDays; i++) {
            const li = document.createElement('li')
            li.textContent = i
            liList.push(li)
            days.append(li)
        }
        //月末星期几之后的铺垫
        for (let i = MonthLastWeekDays + 1; i <= 7; i++) {
            const delta = i - MonthLastWeekDays
            const li = document.createElement('li')
            const d = new Date(MonthLast - 0 + 86400 * 1000 * delta)
            li.textContent = d.getDate()
            days.append(li)
        }
    }
}
