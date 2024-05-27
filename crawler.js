const axios = require("axios");
const cheerio = require("cheerio");

async function fetchMetaData(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $("title").text();
    const description = $('meta[name="description"]').attr("content");
    const keywords = $('meta[name="keywords"]').attr("content");

    return {
      title,
      description,
      keywords,
    };
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return null;
  }
}

module.exports = fetchMetaData;
