const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  const createArray = (length) => {
    const result = [];
  
    for (let i = 0; i < length; i++) {
      result.push(null);
    }
  
    return result;
  };
  
  const createData = () => {
    const current = new Date();
    current.setDate(1);
  
    const startDay = current.getDay();
    const daysInMonth = getDaysInMonth(current);
  
    const weeks = createArray(5);
    const days = createArray(7);
    let result = [];
  
    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
      let value = {
        week: weekIndex+1,
        days: [],
      };
  
      for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
        const day = (weekIndex * 7) + dayIndex - startDay + 1;
        const isValid = day > 0 && day <= daysInMonth;
  
        value.days.push({
          dayOfWeek: dayIndex + 1,
          value: isValid ? day : '',
        });
      }
  
      result.push(value);
    }
  
    return result;
  };

  console.log(createData())
  
  const addCell = (existing, classString, value) => {
    return  `${existing}
        <td class="${classString}">
          ${value}
        </td>
      `;
  };
  
  const createHtml = (data) => {
    let result = "";
  
    for (const { week, days } of data) {
      let inner = "";
      inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${week}`);
  
      for (const { dayOfWeek, value } of days) {
        let classString = "table__cell";
        const isToday = new Date().getDate() === value;
        const isWeekend = dayOfWeek === 1 || dayOfWeek === 7;
        const isAlternate = week % 2 === 0;
  
        if (isToday) classString = `${classString} table__cell_today`;
        if (isWeekend) classString = `${classString} table__cell_weekend`;
        if (isAlternate) classString = `${classString} table__cell_alternate`;
  
        inner = addCell(inner, classString, value);
      }
  
      result += `<tr>${inner}</tr>`;
    }
  
    return result;
  };
  
  const current = new Date();
  document.querySelector("[data-title]").innerText = `${
    MONTHS[current.getMonth()]
  } ${current.getFullYear()}`;
  
  const data = createData();
  document.querySelector("[data-content]").innerHTML = createHtml(data);