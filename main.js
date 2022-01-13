//初始化时间

let currentTime = new Date()
// const currentTime = new Date(2022,10,1)
render(currentTime)

get('#prevMonth').onclick = () => {
    const firstDayOfCurrentMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)   //月初
    render(new Date(firstDayOfCurrentMonth - 86400 * 1000))
}
get('#nextMonth').onclick = () => {
    const nextFirstDayOfCurrentMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1)   //月初
    render(new Date(nextFirstDayOfCurrentMonth))
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

    currentTime = tiem
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
        let n = 0
        //月初星期几之前的铺垫
        for (let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++) {
            const li = document.createElement('li')
            const d = new Date(firstDayOfCurrentMonth - 86400 * 1000 * i)
            console.log('d', d)
            li.textContent = d.getDate()
            days.prepend(li)
            li.classList.add('calendar-days-disabled')
            n+=1
        }
        const liList = []
        const now = new Date()  //今天
        let selectedLi
        //这个月几天
        for (let i = 1; i <= MonthLastDays; i++) {
            const li = document.createElement('li')
            li.textContent = i
            console.log('日期', i)
            if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
                console.log('today', i)
                li.classList.add("calendar-days-today")
            }
            li.onclick = () => {
                if (selectedLi) {
                    selectedLi.classList.remove("calendar-days-selected")
                }
                li.classList.add("calendar-days-selected")
                selectedLi = li
            }
            // liList.push(li)
            days.append(li)
            n += 1
        }

        let i = MonthLastWeekDays + 1
        //月末星期几之后的铺垫
        for (let j = 0; j < 42 - n; j++) {
            const delta = i - MonthLastWeekDays
            const li = document.createElement('li')
            const d = new Date(MonthLast - 0 + 86400 * 1000 * delta)
            li.textContent = d.getDate()
            days.append(li)
            i++
            li.classList.add('calendar-days-disabled')
        }
    }
}
