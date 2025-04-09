export const weekMapZh = ['日', '一', '二', '三', '四', '五', '六']
const calendarGrid = 42//7*6

export interface CalendarItem {
    year: number;
    month: number;
    day: number;
    isCurrentMonth: boolean;
}

//是否闰年
const isLeap = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
};

//一个月有几天
const getDays = (year: number, month: number): number => {
    const feb = isLeap(year) ? 29 : 28;
    const daysPerMonth = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return daysPerMonth[month]
}

const getNextOrLastMonthDays = (date: Date, type: 'next' | 'last') => {
    const month = date.getMonth();
    const year = date.getFullYear();
    if (type === 'last') {
        const lastMonth = (month === 0 ? 11 : month - 1);
        const lastYear = (lastMonth === 11 ? year - 1 : year);
        return {
            year: lastYear,
            month: lastMonth,
            days: getDays(lastYear, lastMonth)
        }
    }
    //翻滚超过了当年，下一个单位增加一
    //当前单位置为一
    const nextMonth = (month === 11 ? 0 : month + 1);
    const nextYear = (nextMonth === 0 ? year + 1 : year);

    return {
        year: nextYear,
        month: nextMonth,
        days: getDays(nextYear, nextMonth)
    }
}


export const generateCalendar = (date: Date) => {
    const currentYear = date.getFullYear()
    const currentMonth = date.getMonth()

    //当月天数
    const days = getDays(currentYear, currentMonth)

    //获取上月末尾天数和下月开头天数，填补日历
    const { days: lastMonthDays, year: lastMonthYear, month: lastMonth } = getNextOrLastMonthDays(date, 'last');
    const { year: nextMonthYear, month: nextMonth } = getNextOrLastMonthDays(date, 'next')

    //1号是星期几
    const weekIndex = new Date(`${currentYear}/${currentMonth + 1}/1`).getDay();

    //显示在当月末尾的下月天数
    const trailDays = calendarGrid - weekIndex - days

    const calendarTable: CalendarItem[] = []
    
    // 1. 填充上月日期
    for (let i = 0; i < weekIndex; i++) {
        calendarTable.push({
            year: lastMonthYear,
            month: lastMonth,
            day: lastMonthDays - weekIndex + 1 + i,
            isCurrentMonth: false
        });
    }

    // 2. 填充当月日期
    for (let d = 1; d <= days; d++) {
        calendarTable.push({
            year: currentYear,
            month: currentMonth,
            day: d,
            isCurrentMonth: true
        });
    }

    // 3. 填充下月日期
    for (let t = 1; t <= trailDays; t++) {
        calendarTable.push({
            year: nextMonthYear,
            month: nextMonth,
            day: t,
            isCurrentMonth: false
        });
    }
    return calendarTable
}

export const isAllTrue = <T = boolean>(arr: T[], fn = (p: T): boolean => Boolean(p)) => arr.every(fn)