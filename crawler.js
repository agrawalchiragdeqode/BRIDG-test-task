const axios = require('axios');
const cheerio = require('cheerio');

async function fetchMetaData(url) {
    const config = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        }
    };

    try {
        const response = await axios.get(url, config);
        const html = response.data;
        const $ = cheerio.load(html);

        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content');
        const keywords = $('meta[name="keywords"]').attr('content');

        return {
            title,
            description,
            keywords
        };
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        return null;
    }
}

module.exports = fetchMetaData;
