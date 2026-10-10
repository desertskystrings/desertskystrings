import {
    createEl,
    setTextContent,
    addChild,
    setHref,
} from "../dom-utils.js";

function createDetailsSubsection(show) {
    const detailsSubSectionEl = createEl("div");
    detailsSubSectionEl.className = "col-lg-6 col-12 order-3 order-lg-0";


    const detailsSubsectionWrapperEl = createDetailsSubsectionWrapper(show);
    addChild(detailsSubSectionEl, detailsSubsectionWrapperEl);
    return detailsSubSectionEl;
}

function createDetailsSubsectionWrapper(show) {
    const detailsWrapper = createEl("div");
    detailsWrapper.className = "custom-block-info mt-2 mt-lg-0";

    const titleEl = createDetailsTitle(show);
    const descriptionEl = createDescription(show);
    const logisticsEl = createLogisticsSection(show)

    addChild(detailsWrapper, titleEl)
    addChild(detailsWrapper, descriptionEl);
    addChild(detailsWrapper, logisticsEl)
    return detailsWrapper;
}

function createDetailsTitle(show) {
    const titleEl = createEl("a");
    titleEl.className = "events-title mb-3";
    setHref(show.link);
    setTextContent(titleEl, show.title);
    return titleEl;
}

function createDescription(show) {
    const descriptionEl = createEl("p");
    descriptionEl.className = "mb-0";
    setTextContent(descriptionEl, show.description);
    return descriptionEl;
}

function createLogisticsSection(show) {
    const logisticsEl = createEl("div");
    logisticsEl.className = "d-flex flex-wrap border-top mt-4 pt-3";

    const logisticsInfoEl = createLogisticsInfo(show);
    const logisticsDetailsButtonEl = createLogisticsDetailsButton(show);

    addChild(logisticsEl, logisticsInfoEl);
    addChild(logisticsEl, logisticsDetailsButtonEl);

    return logisticsEl;
}

function createLogisticsInfo(show) {
    const logisticsInfoEl = createEl("div");
    logisticsInfoEl.className = "mb-4 mb-lg-0";

    const logisticsLocationEl = createLogisticsLocation(show);
    const logisticsPricingEl = createLogisticsPricing(show);

    addChild(logisticsInfoEl, logisticsLocationEl);
    addChild(logisticsInfoEl, logisticsPricingEl);
    return logisticsInfoEl
}

function createLogisticsLocation(show) {

    const logisticsLocationEl = createEl("div");
    logisticsLocationEl.className = "d-flex flex-wrap align-items-center mb-1";
    const locationSpan = createEl("span");
    locationSpan.className = "custom-block-span";
    setTextContent(locationSpan, "Location:")

    const location = `${show.locationName}, ${show.locationCity}, ${show.locationState}`;
    const locationEl = createEl("p");
    locationEl.className = "mb-0";
    setTextContent(locationEl, location);

    addChild(logisticsLocationEl, locationSpan);
    addChild(logisticsLocationEl, locationEl)

    return logisticsLocationEl;
}

function createLogisticsPricing(show) {
    const logisticsPricingEl = createEl("div");
    logisticsPricingEl.className = "d-flex flex-wrap align-items-center";
    const pricingLabelEl = createEl("span");
    pricingLabelEl.className = "custom-block-span";
    setTextContent(pricingLabelEl, "Ticket:");
    const priceEl = createEl("p");
    priceEl.className = "mb-0";
    setTextContent(priceEl, show.ticketPrice);

    addChild(logisticsPricingEl, pricingLabelEl)
    addChild(logisticsPricingEl, priceEl)
    return logisticsPricingEl;
}

function createLogisticsDetailsButton(show) {
    const buttonSectionEl = createEl("div");
    buttonSectionEl.className = "d-flex align-items-center ms-lg-auto";
    const detailsButton = createEl("a");
    detailsButton.className = "btn custom-btn";
    detailsButton.target = "_blank";
    setHref(detailsButton, show.link);
    setTextContent(detailsButton, "Details");

    addChild(buttonSectionEl, detailsButton);
    return buttonSectionEl;
}

export default createDetailsSubsection