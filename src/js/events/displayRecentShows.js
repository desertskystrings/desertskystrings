import { getElementById, addChild, setTextContent, removeElById } from "../dom-utils.js"

import { getRecentShows } from "../contentful.js";

import createEventRow from "./createEventRow.js"

async function displayRecentEvents() {
    try {
        const shows = await getRecentShows();
        if (shows.length > 0) {
            displayRecentShows(shows);
        } else {
            displayNoRecentShowsMsg()
        }
    } catch (error) {
        displayErrorMessage()
    } finally {
        removeElById("recentLoading");
    }
}

function displayRecentShows(shows) {
    const recentShowsSection = getElementById("recentShowsSection");

    shows.every((show) => {
        if (recentShowsSection.childElementCount <= 3) {
            displayShowRow(show, recentShowsSection, true);
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

function displayNoRecentShowsMsg() {
    const recentShowsSection = getElementById("recentShowsSection");
    const msgEl = createNoRecentShowsMsg();
    addChild(recentShowsSection, msgEl);
}

function createNoRecentShowsMsg() {
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

export default displayRecentEvents;