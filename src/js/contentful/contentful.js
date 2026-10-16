import * as contentful from "contentful";
import testEvents from "../dev/testEvents.js"
import testOrgInfo from "../dev/testOrgInfo.js"
import devRecentEvents from "../dev/testRecentEvents.js"
import { mapOrgInfo, mapEventsToShows, getassetFieldUrl } from "./mapResponses.js"

let defaultImageUrl = ""

const client = contentful.createClient({
  space: CONFIG_CONTENTFUL_SPACE_ID,
  accessToken: CONFIG_CONTENTFUL_KEY,
  environment: CONFIG_CONTENTFUL_ENVIRONMENT,
});

async function getDefaultImageURL() {
  if (defaultImageUrl) {
    return defaultImageUrl;
  }
  const response = await client.getAsset(CONFIG_CONTENTFUL_DEFAULT_EVENT_IMG_ID);
  return getassetFieldUrl(response)
}

async function getUpcomingShows() {

  if (CONFIG_CONTENTFUL_ENVIRONMENT !== "master") {
    return testEvents;
  }
  const events = client
    .getEntries({
      content_type: "event",
      order: "fields.startDateTime",
      "fields.startDateTime[gt]": new Date().toISOString(),
      limit: 10,
    })

  const fallbackImgUrl = getDefaultImageURL();

  const [eventsResponse, fallbackImgUrlResponse] = await Promise.all([events, fallbackImgUrl])
    .catch((error) => {
      throw error;
    });

  return mapEventsToShows(eventsResponse.items,
    eventsResponse.includes.Asset,
    fallbackImgUrlResponse
  );
}

async function getRecentShows() {
  if (CONFIG_CONTENTFUL_ENVIRONMENT !== "master") {
    return devRecentEvents;
  }

  const recentEvents = client
    .getEntries({
      content_type: "event",
      order: "-fields.startDateTime",
      "fields.startDateTime[lte]": new Date().toISOString(),
      limit: 3,
    })

  const fallbackImgUrl = getDefaultImageURL();

  const [recentEventsResponse, fallbackImgUrlResponse] = await Promise.all([recentEvents, fallbackImgUrl])
    .catch((error) => {
      throw error;
    });

  return mapEventsToShows(recentEventsResponse.items,
    recentEventsResponse.includes.Asset,
    fallbackImgUrlResponse
  );
}

async function getOrgInfo() {
  if (CONFIG_CONTENTFUL_ENVIRONMENT !== "master") {
    return testOrgInfo;
  }
  try {
    const orgInfo = await client.getEntry(CONFIG_CMS_ORG_ID);
    return mapOrgInfo(orgInfo)
  } catch (error) {
    throw error
  }
}

export { getUpcomingShows, getRecentShows, getOrgInfo }