import {
  createEl,
  setTextContent,
  getElementById,
  addChild,
  removeElById,
  setSrc,
  setHref,
} from "./dom-utils.js";
import { getShows } from "./contentful.js";

async function displayShows() {
  try {
    const shows = await getShows();
    console.log(shows)
    // displayNextShow(shows);
    displayShowRows(shows);
  } catch (error) {
    console.log(error)
    displayShowsError();
  } finally {
    removeElById("nextShowLoading");
    removeElById("upcomingLoading");
  }
}

function displayShowRows(shows) {
  console.log("displayShowRows")
  const upcomingShowsSection = getElementById("upcomingShowsSection");
  const recentShowsSection = getElementById("recentShowsSection");
  shows.every((show) => {
    console.log(isUpcoming(show))
    if (isUpcoming(show)) {
      console.log(upcomingShowsSection.childElementCount)
      if (upcomingShowsSection.childElementCount < 21) {
        displayShowRow(show, upcomingShowsSection, true);
      }
      return true;
    } else if (recentShowsSection.childElementCount < 3) {
      // displayShowRow(show, recentShowsSection);
      return true;
    }
    return false;
  });
}

function isUpcoming(show) {
  const now = new Date().getTime();
  return new Date(show.startDateTime).getTime() >= now;
}

function displayShowsError() {
  const upcomingShowsTable = getElementById("upcomingShowsTable");
  const tdEl = createEl("td");
  const errorEl = createShowErrorMessage();

  addChild(tdEl, errorEl);
  addChild(upcomingShowsTable, tdEl);

  const subscribeMsg = createInviteToSubscribeMsg();

  const nextShowEl = getElementById("nextShowPara");
  setTextContent(nextShowEl, "");
  addChild(nextShowEl, subscribeMsg);
}

function createShowErrorMessage() {
  const container = createEl("p");
  const errorMsgEl = createEl("span");
  const msg = "There was an error fetching show information. ";
  setTextContent(errorMsgEl, msg);
  errorMsgEl.className = "gray";
  const subscribeMsgEl = createInviteToSubscribeMsg();
  subscribeMsgEl.className = "gray";
  addChild(container, errorMsgEl);
  addChild(container, subscribeMsgEl);
  return container;
}

function displayShowRow(show, sectionEl, prepend = false) {
  if (!sectionEl) {
    return;
  }
  console.log(show)


  const sectionRow = createEl("div");
  sectionRow.className = "row custom-block custom-block-bg";

  const imageSectionEl = createEl("div");
  imageSectionEl.className = "col-lg-4 col-md-8 col-12 order-1 order-lg-0";
  const imageWrapEl = createEl("div");
  imageWrapEl.className = "custom-block-image-wrap";
  const imageAnchorEl = createEl("a");
  imageAnchorEl.href = show.link;
  const imageEl = createEl("img");
  imageEl.className = "custom-block-image img-fluid";
  setSrc(imageEl, show.imageUrl);
  const iconEl = createEl("i");
  iconEl.className = "custom-block-icon bi-link";

  const detailsSectionEl = createEl("div");
  detailsSectionEl.className = "col-lg-6 col-12 order-3 order-lg-0";
  const detailsWrapper = createEl("div");
  detailsWrapper.className = "custom-block-info mt-2 mt-lg-0";

  const titleEl = createEl("a");
  titleEl.className = "events-title mb-3";
  setHref(show.link);
  setTextContent(titleEl, show.title);

  const descriptionEl = createEl("p");
  descriptionEl.className = "mb-0";
  setTextContent(descriptionEl, show.description);

  const detailsSubsectionEl = createEl("div");
  detailsSubsectionEl.className = "d-flex flex-wrap border-top mt-4 pt-3";
  const detailsSubsectionWrapper = createEl("div");
  detailsSubsectionWrapper.className = "mb-4 mb-lg-0";

  const locationSection = createEl("div");
  locationSection.className = "d-flex flex-wrap align-items-center mb-1";
  const locationSpan = createEl("span");
  locationSpan.className = "custom-block-span";
  setTextContent("Location:")

  const location = `${show.locationName}, ${show.locationCity}, ${show.locationState}`;
  const locationEl = createEl("p");
  locationEl.className = "mb-0";
  setTextContent(locationEl, location);

  const pricingSection = createEl("div");
  pricingSection.className = "d-flex flex-wrap align-items-center";
  const pricingLabelEl = createEl("span");
  pricingLabelEl.className = "custom-block-span";
  setTextContent(pricingLabelEl, "Ticket:");
  const priceEl = createEl("p");
  priceEl.className = "mb-0";
  setTextContent(priceEl, show.ticketPrice);

  const buttonSectionEl = createEl("div");
  buttonSectionEl.className = "d-flex align-items-center ms-lg-auto";
  const detailsButton = createEl("a");
  detailsButton.className = "btn custom-btn";
  detailsButton.target = "_blank";
  setHref(detailsButton, show.link);
  setTextContent(detailsButton, "Details")

  const dateSectionEl = createDateSection(show);
  addChild(sectionRow, dateSectionEl);

  addChild(imageAnchorEl, imageEl);
  addChild(imageAnchorEl, iconEl);
  addChild(imageWrapEl, imageAnchorEl);
  addChild(imageSectionEl, imageWrapEl);
  addChild(sectionRow, imageSectionEl)

  addChild(detailsWrapper, titleEl)
  addChild(detailsWrapper, descriptionEl)

  addChild(locationSection, locationSpan);
  addChild(locationSection, locationEl);

  addChild(pricingSection, pricingLabelEl);
  addChild(pricingSection, priceEl);

  addChild(buttonSectionEl, detailsButton)

  addChild(detailsSubsectionWrapper, locationSection);
  addChild(detailsSubsectionWrapper, pricingSection);
  addChild(detailsSubsectionWrapper, buttonSectionEl);
  addChild(detailsSubsectionEl, detailsSubsectionWrapper);

  addChild(detailsWrapper, detailsSubsectionEl);
  addChild(detailsSectionEl, detailsWrapper);
  addChild(sectionRow, detailsSectionEl);

  addChild(sectionEl, sectionRow);

}

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
  });
  const endTime = showEndDate.toLocaleTimeString("en-US", {
    hourCycle: "h12",
    hour: "numeric",
    minute: "numeric"
  });
  const startToEndTime = `${startTime} - ${endTime}`;


  const dateSectionEl = createEl("div");
  dateSectionEl.className = "col-lg-2 col-md-4 col-12 order-2 order-md-0 order-lg-0"
  const dateContainer = createEl("div");
  dateContainer.className = "custom-block-date-wrap d-flex d-lg-block d-md-block align-items-center mt-3 mt-lg-0 mt-md-0";

  console.log({ dayOfMonth })
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

function displayNoNextShowMessage() {
  const nextShowPara = getElementById("nextShowPara");
  const spanEl = createEl("span");

  setTextContent(nextShowPara, "");
  const noNextEventMsg = "There are currently no upcoming shows.";
  setTextContent(spanEl, noNextEventMsg);
  const subscribeMsgEl = createInviteToSubscribeMsg();
  addChild(nextShowPara, spanEl);
  addChild(nextShowPara, subscribeMsgEl);
}

function createInviteToSubscribeMsg() {
  const inviteMsg = "To stay up to date on our latest shows/releases, ";
  const spanEl = createEl("span");

  setTextContent(spanEl, inviteMsg);
  const anchorEl = createEl("a");
  setTextContent(anchorEl, "subscribe to our newsletter.");
  anchorEl.href = "#newsletter";
  anchorEl.className = "link";
  addChild(spanEl, anchorEl);
  return spanEl;
}

export default displayShows;