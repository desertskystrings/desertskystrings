import {
  createEl,
  setTextContent,
  getElementById,
  addChild,
  removeElById,
} from "./domUtils.js";
import { getShows } from "./contentful.js";

async function displayShows() {
    console.log("displayShows")
  try {
    const shows = await getShows();
    // displayNextShow(shows);
    // displayShowRows(shows);
  } catch (error) {
    displayShowsError();
  } finally {
    removeElById("nextShowLoading");
    removeElById("upcomingLoading");
  }
}

function displayShowRows(shows) {
  const upcomingShowsTable = getElementById("upcomingShowsTable");
  const recentShowsTable = getElementById("recentShowsTable");
  shows.every((show) => {
    if (isUpcoming(show)) {
      if (upcomingShowsTable.childElementCount < 21) {
        displayShowRow(show, upcomingShowsTable, true);
      }
      return true;
    } else if (recentShowsTable.childElementCount < 3) {
      displayShowRow(show, recentShowsTable);
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

function findNextShow(sortedShows = []) {
  return sortedShows.find((show) => {
    if (isUpcoming(show)) {
      return true;
    }
  });
}

function displayNextShow(shows) {
  const nextShow = findNextShow(shows);
  if (!nextShow) {
    displayNoNextShowMessage();
    return;
  }

  const nextShowPara = getElementById("nextShowPara");
  const title = nextShow.title;
  const datetime = new Date(nextShow.startDateTime);
  const date =
    datetime.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    }) + " ";
  const time = datetime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const locationName = nextShow.locationName;
  const city = nextShow.locationCity;
  const state = nextShow.locationState;

  const nextShowText = `${date} ${time} | ${title} @ ${locationName} ${city}, ${state}`;
  addChild(nextShowPara, createEl("span", nextShowText));
}

function displayShowRow(show, tableEl, prepend = false) {
  if (!tableEl) {
    return;
  }
  const tableRow = createEl("tr");
  const dateEl = createEl("td");
  const showDate = new Date(show.startDateTime);
  setTextContent(
    dateEl,
    showDate.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    }),
  );
  const showDetailsEl = createEl("td");
  const eventTitleEl = createEl("a");
  setTextContent(eventTitleEl, `${show.title} @ ${show.locationName}`);
  eventTitleEl.href = show.link;
  eventTitleEl.className = "event-title ";

  const breakEl = createEl("br");

  const locationEL = createEl("span");
  const location = `${show.locationCity}, ${show.locationState}`;
  setTextContent(locationEL, location);

  const showTimeEl = createEl("td");
  const showTime = showDate.toLocaleTimeString("en-US", {
    hour: "numeric",
  });
  setTextContent(showTimeEl, showTime);

  addChild(showDetailsEl, eventTitleEl);
  addChild(showDetailsEl, breakEl);
  addChild(showDetailsEl, locationEL);

  addChild(tableRow, dateEl);
  addChild(tableRow, showDetailsEl);
  addChild(tableRow, showTimeEl);

  addChild(tableEl, tableRow, prepend);
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