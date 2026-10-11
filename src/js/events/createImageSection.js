import {
    createEl,
    setSrc,
    addChild,
} from "../dom-utils.js";

function createEventImageSection(show) {
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

    addChild(imageAnchorEl, imageEl);
    addChild(imageAnchorEl, iconEl);
    addChild(imageWrapEl, imageAnchorEl);
    addChild(imageSectionEl, imageWrapEl);

    return imageSectionEl;
}

export default createEventImageSection