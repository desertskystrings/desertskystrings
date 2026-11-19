import {
  createEl,
  setTextContent,
  getElementById,
  addChild,
  removeElById,
  setHref,
} from "../dom-utils.js";
import { getUpcomingShows } from "../contentful/contentful.js";

import createEventRow from "./createEventRow.js";

async function displayUpcomingEvents() {
  try {
    const shows = await getUpcomingShows();
    if (shows.length > 0) {
      displayUpcomingShowRows(shows);
    } else {
      displayNoUpcomingShowsMsg()
    }
  } catch (error) {
    displayErrorMessage()
  } finally {
    removeElById("upcomingLoading");
  }
}

function displayUpcomingShowRows(shows) {
  const upcomingShowsSection = getElementById("upcomingShowsSection");
  shows.every((show) => {
    if (upcomingShowsSection.childElementCount < 21) {
      displayShowRow(show, upcomingShowsSection, true);
      return true;
    }
    return false;
  });
}

function displayShowRow(show, sectionEl) {
  if (!sectionEl) {
    return;
  }

  const eventRowEl = createEventRow(show);
  addChild(sectionEl, eventRowEl);
}

function displayNoUpcomingShowsMsg() {
  const upcomingShowsSection = getElementById("upcomingShowsSection");
  const msgEl = createNoUpcomingShowsMsg();
  addChild(upcomingShowsSection, msgEl);
}

function createNoUpcomingShowsMsg() {
  const noUpcomingShowsMsg = createEl("p");
  const msg = "There are currently no upcoming shows. Sign up for our email list for updates."
  setTextContent(noUpcomingShowsMsg, msg)
  return noUpcomingShowsMsg;
}

function displayErrorMessage() {
  const recentShowsSection = getElementById("upcomingShowsSection");
  const msgEl = createErrorMsg();
  addChild(recentShowsSection, msgEl);
}

function createErrorMsg() {
  const errorMessageEl = createEl("p");
  const msg = "There was an error loading upcoming shows. Please try again.";

  setTextContent(errorMessageEl, msg);
  return errorMessageEl;
}

export default displayUpcomingEvents;