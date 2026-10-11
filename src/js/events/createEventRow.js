import {
    createEl,
    addChild
} from "../dom-utils.js"
import createDateSection from "./createDateSection.js"
import createImageSection from "./createImageSection.js"
import createDetailsSubsection from "./createDetailsSubSection.js"

function createEventRow(show) {
    const eventRow = createEl("div");
    eventRow.className = "row custom-block custom-block-bg my-4";

    const dateSectionEl = createDateSection(show);
    addChild(eventRow, dateSectionEl);

    const imageSectionEl = createImageSection(show);
    addChild(eventRow, imageSectionEl)

    const detailsSubSection = createDetailsSubsection(show);
    addChild(eventRow, detailsSubSection);

    return eventRow;
}

export default createEventRow