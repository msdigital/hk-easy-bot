const axios = require("axios");

// GraphQL query specifying the data fields to fetch from the API
const API_QUERY = "{id,contactDetails{id,name},customFields{id,customField{id,name},value},emailOrUserName,membershipNumber,memberGroups{memberGroup{name,short}},resignationDate}";

// Constructing the full API endpoint using environment variables and the query string
const API_ENDPOINT = process.env.EASY_API_URI + "member?_isApplication=false&query=" + API_QUERY;

// API key for authorization, stored in an environment variable
const API_KEY = process.env.EASY_API_KEY;

/**
 * Asynchronously fetches data from the API.
 * Handles pagination by recursively fetching data from subsequent pages if available.
 *
 * @param {string} url The URL to fetch data from. Defaults to the constructed API_ENDPOINT.
 * @returns {Promise<Array>} A promise that resolves to an array of results from the API.
 */
exports.fetchFromApi = async function fetchFromApi(url = API_ENDPOINT) {
  try {
    // Performing the API request with Axios
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${API_KEY}`,
      },
    });

    let results = response.data.results;

    // Check for pagination ('next' property in response)
    if (response.data.next) {
      console.log("calling", response.data.next);

      // Recursive call for the next page
      const nextResults = await fetchFromApi(response.data.next);
      
      // Combining current and next page results
      results = results.concat(nextResults);
    }
    // Returning the results from the API
    return results;
  } catch (error) {
    //Throw error for further handling
    console.error("Error fetching data from API:", error);
    throw error;
  }
};
