const axios = require("axios");
const {Member} = require("../../models/member");

const API_BASE_URL = process.env.EASY_API_URI;
const API_KEY = process.env.EASY_API_KEY;

/**
 * Fetches data from the easyVerein API.
 *
 * @param {string} url The URL to fetch data from (including endpoint and query parameters).
 * @returns {Promise<Object>} The response data from the API.
 */
async function fetchFromApi(url) {
  console.log("calling easyVerein:", url);
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${API_KEY}`,
      },
      hooks: {
		    beforeRetry: [
			    async ({request, options, error, retryCount}) => {
				    let refreshURL = `${API_BASE_URL}/refresh-token`;
            const API_KEY = await fetchFromApi(refreshURL);
				    request.headers.set('Authorization', `token ${API_KEY}`);
			      }
		    ]
	    }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
}

/**
 * Fetches and processes member data from the easyVerein API.
 * Handles pagination for the 'member' endpoint.
 * Converts the raw API data into an array of Member instances.
 *
 * @returns {Promise<Member[]>} An array of Member instances.
 */
exports.getMembers = async function () {
  const queryParams = "_isApplication=false&limit=20&query={id,contactDetails{id,name},customFields{id,customField{id,name},value},emailOrUserName,membershipNumber,memberGroups{memberGroup{name,short}},resignationDate}";
  let memberURL = `${API_BASE_URL}/member?${queryParams}`;
  let results = [];

  while (memberURL) {
    const data = await fetchFromApi(memberURL);
    results = results.concat(data.results);
    memberURL = data.next ? data.next : null;
  }

  let returnResult = results.map((data) => new Member(data));
  return returnResult

  return results.map((data) => new Member(data));
};
