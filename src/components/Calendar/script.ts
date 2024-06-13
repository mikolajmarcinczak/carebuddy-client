
const calendar: HTMLElement | null = document.querySelector<HTMLElement>(".calendar");
const date: HTMLElement | null = document.querySelector<HTMLElement>(".date");
const daysContainer: HTMLElement | null = document.querySelector<HTMLElement>(".days");
const prev: HTMLElement | null = document.querySelector<HTMLElement>(".prev");
const next: HTMLElement | null = document.querySelector(".next");
const todayBtn: HTMLElement | null = document.querySelector(".today-btn");
const gotoBtn: HTMLElement | null = document.querySelector(".goto-btn");
const dateInput: HTMLInputElement | null = document.querySelector(".date-input");
const eventDay: HTMLElement | null = document.querySelector(".event-day");
const eventDate: HTMLElement | null = document.querySelector(".event-date");
const eventsContainer: HTMLElement | null = document.querySelector(".events");
const addEventBtn: HTMLElement | null = document.querySelector(".add-event");
const addEventWrapper: HTMLElement | null = document.querySelector(".add-event-wrapper ");
const addEventCloseBtn: HTMLElement | null = document.querySelector(".close ");
const addEventTitle: HTMLInputElement | null = document.querySelector(".event-name ");
const addEventFrom: HTMLInputElement | null = document.querySelector(".event-time-from ");
const addEventTo: HTMLInputElement | null = document.querySelector(".event-time-to ");
const addEventSubmit: HTMLElement | null = document.querySelector(".add-event-btn ");

let today: Date = new Date();
let activeDay: number;
let month: number = today.getMonth();
let year: number = today.getFullYear();

const months: string[] = [
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

const eventsArr: {
  day: number;
  month: number;
  year: number;
  events: {
    title: string;
    time: string;
  }[];
}[] = [];
getEvents();
console.log(eventsArr);

function initCalendar(): void {
  const firstDay: Date = new Date(year, month, 1);
  const lastDay: Date = new Date(year, month + 1, 0);
  const prevLastDay: Date = new Date(year, month, 0);
  const prevDays: number = prevLastDay.getDate();
  const lastDate: number = lastDay.getDate();
  const day: number = firstDay.getDay();
  const nextDays: number = 7 - lastDay.getDay() - 1;

  (date as HTMLElement).innerHTML = months[month] + " " + year;

  let days: string = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let event: boolean = false;
    eventsArr.forEach((eventObj) => {
      if (
          eventObj.day === i &&
          eventObj.month === month + 1 &&
          eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  (daysContainer as HTMLElement).innerHTML = days;
  addListner();
}

function prevMonth(): void {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth(): void {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev?.addEventListener("click", prevMonth);
next?.addEventListener("click", nextMonth);

initCalendar();

function addListner(): void {
  const days: NodeListOf<Element> = document.querySelectorAll(".day");
  days.forEach((day: Element) => {
    day.addEventListener("click", (e: Event) => {
      getActiveDay(Number((e.target as HTMLElement).innerHTML));
      updateEvents(Number((e.target as HTMLElement).innerHTML));
      activeDay = Number((e.target as HTMLElement).innerHTML);
      days.forEach((day: Element) => {
        day.classList.remove("active");
      });
      if ((e.target as HTMLElement).classList.contains("prev-date")) {
        prevMonth();
        setTimeout(() => {
          const days: NodeListOf<Element> = document.querySelectorAll(".day");
          days.forEach((day: Element) => {
            if (
                !day.classList.contains("prev-date") &&
                day.innerHTML === (e.target as HTMLElement).innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if ((e.target as HTMLElement).classList.contains("next-date")) {
        nextMonth();
        setTimeout(() => {
          const days: NodeListOf<Element> = document.querySelectorAll(".day");
          days.forEach((day: Element) => {
            if (
                !day.classList.contains("next-date") &&
                day.innerHTML === (e.target as HTMLElement).innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        (e.target as HTMLElement).classList.add("active");
      }
    });
  });
}

todayBtn?.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput?.addEventListener("input", (e: Event) => {
  const dateInputValue: string = (e.target as HTMLInputElement).value;
  const cleanedDateInputValue: string = dateInputValue.replace(/[^0-9/]/g, "");

  if (cleanedDateInputValue.length === 2) {
    (e.target as HTMLInputElement).value += "/";
  }

  if (cleanedDateInputValue.length > 7) {
    (e.target as HTMLInputElement).value = cleanedDateInputValue.slice(0, 7);
  }

  if (e.type === "deleteContentBackward") {
    if (cleanedDateInputValue.length === 3) {
      (e.target as HTMLInputElement).value = cleanedDateInputValue.slice(0, 2);
    }
  }
});

gotoBtn?.addEventListener("click", () => gotoDate(dateInput as HTMLInputElement));

function gotoDate (dateInput: HTMLInputElement): void {
  console.log("here");
  const dateArr: string[] = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (Number(dateArr[0]) > 0 && Number(dateArr[0]) < 13 && dateArr[1].length === 4) {
      let month: number = Number(dateArr[0]) - 1;
      let year: number = Number(dateArr[1]);
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

function getActiveDay(date: number): void {
  const day: Date = new Date(year, month, date);
  const dayName: string = day.toString().split(" ")[0];
  (eventDay as HTMLElement).innerHTML = dayName;
  (eventDate as HTMLElement).innerHTML = date + " " + months[month] + " " + year;
}

function updateEvents(date: number): void {
  let events: string = "";
  eventsArr.forEach((event) => {
    if (
        date === event.day &&
        month + 1 === event.month &&
        year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  (eventsContainer as HTMLElement).innerHTML = events;
  saveEvents();
}

addEventBtn?.addEventListener("click", () => {
  addEventWrapper?.classList.toggle("active");
});

addEventCloseBtn?.addEventListener("click", () => {
  addEventWrapper?.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper?.contains(e.target as HTMLElement)) {
    addEventWrapper?.classList.remove("active");
  }
});

addEventTitle?.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

function defineProperty(): void {
  const osccred: HTMLDivElement = document.createElement("div");
  osccred.innerHTML =
      "A Project By <a href='https://www.youtube.com/channel/UCiUtBDVaSmMGKxg1HYeK-BQ' target=_blank>Open Source Coding</a>";
  osccred.style.position = "absolute";
  osccred.style.bottom = "0";
  osccred.style.right = "0";
  osccred.style.fontSize = "10px";
  osccred.style.color = "#ccc";
  osccred.style.fontFamily = "sans-serif";
  osccred.style.padding = "5px";
  osccred.style.background = "#fff";
  osccred.style.borderTopLeftRadius = "5px";
  osccred.style.borderBottomRightRadius = "5px";
  osccred.style.boxShadow = "0 0 5px #ccc";
  document.body.appendChild(osccred);
}

defineProperty();

addEventFrom?.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo?.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

addEventSubmit?.addEventListener("click", () => {
  const eventTitle: string = (addEventTitle as HTMLInputElement).value;
  const eventTimeFrom: string = (addEventFrom as HTMLInputElement).value;
  const eventTimeTo: string = (addEventTo as HTMLInputElement).value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  const timeFromArr: string[] = eventTimeFrom.split(":");
  const timeToArr: string[] = eventTimeTo.split(":");
  if (
      timeFromArr.length !== 2 ||
      timeToArr.length !== 2 ||
      Number(timeFromArr[0]) > 23 ||
      Number(timeFromArr[1]) > 59 ||
      Number(timeToArr[0]) > 23 ||
      Number(timeToArr[1]) > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom: string = convertTime(eventTimeFrom);
  const timeTo: string = convertTime(eventTimeTo);

  let eventExist: boolean = false;
  eventsArr.forEach((event) => {
    if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded: boolean = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
          item.day === activeDay &&
          item.month === month + 1 &&
          item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  addEventWrapper?.classList.remove("active");
  (addEventTitle as HTMLInputElement).value = "";
  (addEventFrom as HTMLInputElement).value = "";
  (addEventTo as HTMLInputElement).value = "";
  updateEvents(activeDay);
  const activeDayEl: HTMLElement | null = document.querySelector(".day.active");
  if (activeDayEl && !activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

eventsContainer?.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).classList.contains("event")) {
    if (confirm("Are you sure you want to delete this event?")) {
      const eventTitle: string = (e.target as HTMLElement).children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            const activeDayEl: HTMLElement | null = document.querySelector(".day.active");
            if (activeDayEl && activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

function saveEvents(): void {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents(): void {
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events") as string));
}

function convertTime(time: string): string {
  let timeArr: string[] = time.split(":");
  let timeHour: string = timeArr[0];
  let timeMin: string = timeArr[1];
  let timeFormat: string = timeHour >= "12" ? "PM" : "AM";
  timeHour = (Number(timeHour) % 12 || 12).toString();
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

export default initCalendar();