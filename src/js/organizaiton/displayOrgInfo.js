import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { getElementById, safeSetInnerHtml } from "../dom-utils.js"

import { getOrgInfo } from "../contentful/contentful.js"

async function displayOrgInfo() {
    try {
        const orgInfo = await getOrgInfo();
        displayAboutSection(orgInfo);
    } catch (error) {
        // TODO: handle error
    } finally {
        //TODO remove loading state
    }
}

function displayAboutSection(aboutInfo) {

    setInnerHtmlById("orgMainAbout", aboutInfo.about)
    setInnerHtmlById("orgMission", aboutInfo.mission)
    setInnerHtmlById("orgVision", aboutInfo.vision)
    setInnerHtmlById("orgBookingInfo", aboutInfo.bookingDescription)
    setInnerHtmlById("orgJoinDescription", aboutInfo.joinDescription)
    setInnerHtmlById("orgHowToHelp", aboutInfo.howToHelp)
}

function setInnerHtmlById(id, doc) {
    const element = getElementById(id);
    const htmlString = documentToHtmlString(doc);
    safeSetInnerHtml(element, htmlString)

}


export default displayOrgInfo