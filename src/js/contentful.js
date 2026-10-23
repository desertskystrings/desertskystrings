import * as contentful from "contentful";
import testEvents from "./dev/testEvents.js"
import devRecentEvents from "./dev/testRecentEvents.js"

let defaultImageUrl = ""

const client = contentful.createClient({
  space: CONFIG_CONTENTFUL_SPACE_ID,
  accessToken: CONFIG_CONTENTFUL_KEY,
  environment: CONFIG_CONTENTFUL_ENVIRONMENT,
});


function getassetFieldUrl(assetField) {
  return "https:" + assetField.fields.file.url;
}

async function getDefaultImageURL() {
  if (defaultImageUrl) {
    return defaultImageUrl;
  }
  const response = await client.getAsset(CONFIG_CONTENTFUL_DEFAULT_EVENT_IMG_ID);
  return getassetFieldUrl(response)
}

function getAssetFromAssetList(assetField, assets) {
  const assetId = assetField.sys.id;
  const asset = assets.find((asset) => asset.sys.id === assetId);
  return asset ? getassetFieldUrl(asset) : "";
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

function mapEventsToShows(events, assets, defaultAssetUrl = defaultImageUrl) {
  const defaultEventLink = "https://www.instagram.com/desertskystrings";
  return events.map((entry) => {
    return {
      title: entry.fields.title ?? "",
      startDateTime: entry.fields.startDateTime ?? "",
      endDateTime: entry.fields.endDateTime ?? "",
      locationName: entry.fields.locationName ?? "",
      locationCity: entry.fields.locationCity ?? "",
      locationState: entry.fields.locationState ?? "",
      imageUrl: entry.fields.image ?
        getAssetFromAssetList(entry.fields.image, assets) :
        defaultAssetUrl,
      link: entry.fields.link ?? defaultEventLink,
      description: entry.fields.description ?? "",
      ticketPrice: entry.fields.ticketPrice ?? ""
    };
  });
}

export { getUpcomingShows, getRecentShows }