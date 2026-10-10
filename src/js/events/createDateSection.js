import {
    createEl,
    setTextContent,
    addChild,
} from "../dom-utils.js";

function createDateSection(show) {
    const showDate = new Date(show.startDateTime);
    const showEndDate = new Date(show.endDateTime);
    const dayOfMonth = showDate.toLocaleDateString("en-US", {
        day: "numeric"
    })
    const month = showDate.toLocaleDateString("en-US", {
        month: "short"
    });
    const year = showDate.toLocaleDateString("en-US", {
        year: "numeric"
    })
    const monthAndYear = `${month} ${year}`;

    const startTime = showDate.toLocaleTimeString("en-US", {
        hourCycle: "h12",
        hour: "numeric",
        minute: "numeric"
    }).replace(" ", "")
        .replace(":00", "")
        .trim()
        .toLocaleLowerCase();
    const endTime = showEndDate.toLocaleTimeString("en-US", {
        hourCycle: "h12",
        hour: "numeric",
        minute: "numeric"
    }).replace(" ", "")
        .replace(":00", "")
        .trim()
        .toLocaleLowerCase();
    const startToEndTime = `${startTime}-${endTime}`;


    const dateSectionEl = createEl("div");
    dateSectionEl.className = "col-lg-2 col-md-4 col-12 order-2 order-md-0 order-lg-0"
    const dateContainer = createEl("div");
    dateContainer.className = "custom-block-date-wrap d-flex d-lg-block d-md-block align-items-center mt-3 mt-lg-0 mt-md-0";

    const dayOfMonthEl = createEl("h6");
    dayOfMonthEl.className = "custom-block-date mb-lg-1 mb-0 me-3 me-lg-0 me-md-0";
    setTextContent(dayOfMonthEl, dayOfMonth)
    const monthAndYearEl = createEl("strong");
    monthAndYearEl.className = "text-white";
    setTextContent(monthAndYearEl, monthAndYear)

    const timeRangeEl = createEl("p");
    timeRangeEl.className = "text-white text-sm";
    setTextContent(timeRangeEl, startToEndTime);

    addChild(dateContainer, dayOfMonthEl);
    addChild(dateContainer, monthAndYearEl);
    addChild(dateContainer, timeRangeEl);
    addChild(dateSectionEl, dateContainer);
    return dateSectionEl;
}

export default createDateSection