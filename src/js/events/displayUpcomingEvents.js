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
    displayNoUpcomingShowsMsg
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
  const recentShowsSection = getElementById("recentShowsSection");
  const msgEl = createNoUpcomingShowsMsg();
  addChild(recentShowsSection, msgEl);
}

function createNoUpcomingShowsMsg() {
  const noRecentShowsMsgEl = createEl("p");
  const msg = "There have been no recent shows."
  setTextContent(noRecentShowsMsgEl, msg)
  return noRecentShowsMsgEl;
}

function displayErrorMessage() {
  const recentShowsSection = getElementById("recentShowsSection");
  const msgEl = createErrorMsg();
  addChild(recentShowsSection, msgEl);
}

function createErrorMsg() {
  const errorMessageEl = createEl("p");
  const msg = "There was an error loading recent shows. Please try again.";

  setTextContent(errorMessageEl, msg);
  return errorMessageEl;
}

export default displayUpcomingEvents;