const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { formidable, errors } = require('formidable');
const fs = require('fs');
const { getJson } = require("serpapi");
const puppeteer = require('puppeteer');
const User = require('../models/userModel');

const router = express.Router();

const IMGBB_API_KEY = 'af18f34deea279501ed6b09a0b78ce43';


router.post('/add-to-watchlist', async (req, res) => {
    const { userId, product } = req.body;

    if (!userId || !product) {
        return res.status(400).json({ error: 'User ID and product object are required' });
    }

    try {
        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user already has a watchlist
        let watchlist = user.watchlist || [];
        console.log(watchlist);

        // Check if the product already exists in the watchlist
        const existingProductIndex = watchlist.findIndex(item => item.title === product.title);

        if (existingProductIndex !== -1) {
            // If the product already exists, update its details
            watchlist[existingProductIndex] = product;
        } else {
            // If the product does not exist, add it to the watchlist
            watchlist.push(product);
        }

        console.log(watchlist);

        // Update the user's watchlist
        // await user.set({ watchlist });
        // user.watchlist = watchlist;
        // await user.save();
        await User.update({ watchlist: watchlist }, {
            where: {
               id: userId, // Assuming userId is the primary key of the user
            },
           });

        res.json({ message: 'Product added to watchlist successfully', watchlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding product to watchlist' });
    }
});

router.post('/upload-image', async (req, res) => {
    const form = formidable({});
    let fields;
    let files;
    try {
        [fields, files] = await form.parse(req);

        //  if empty files
        if (Object.keys(files).length === 0) {
            throw new Error('No files were uploaded.');
        }

        const image = files.image[0];
        // Read the file data
        const fileData = fs.readFileSync(image.filepath);

        // Convert file data to a base64 encoded string
        const base64Image = new Buffer.from(fileData).toString('base64');

        // Prepare the payload to imgBB
        const formData = new URLSearchParams();
        formData.append('image', base64Image);

        // Send the request to imgBB
        const imgBBResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const imageUrl = imgBBResponse.data.data.url;
        const response = await getJson({
            engine: "google_lens",
            api_key: "477d8b2b215ed9fdbc68f8248f1c504437148da92dd93bc1f37e0a21afe0592d", // From https://serpapi.com/manage-api-key
            url: imageUrl,
            location: "Austin, Texas",
        });

        // Send the response from imgBB
        res.status(200).json(response);
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(err.httpCode || 400).json({ error: err.message });
    }
});

router.post('/upload-imageonlytit', async (req, res) => {
    const form = formidable({});
    let fields;
    let files;
    try {
        [fields, files] = await form.parse(req);

        //  if empty files
        if (Object.keys(files).length === 0) {
            throw new Error('No files were uploaded.');
        }

        const image = files.image[0];
        // Read the file data
        const fileData = fs.readFileSync(image.filepath);

        // Convert file data to a base64 encoded string
        const base64Image = new Buffer.from(fileData).toString('base64');

        // Prepare the payload to imgBB
        const formData = new URLSearchParams();
        formData.append('image', base64Image);

        // Send the request to imgBB
        const imgBBResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const imageUrl = imgBBResponse.data.data.url;
        const response = await getJson({
            engine: "google_lens",
            api_key: "477d8b2b215ed9fdbc68f8248f1c504437148da92dd93bc1f37e0a21afe0592d", // From https://serpapi.com/manage-api-key
            url: imageUrl,
            location: "Austin, Texas",
        });

        // Send the response from imgBB
        res.status(200).json(response["visual_matches"][0]["title"]);
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(err.httpCode || 400).json({ error: err.message });
    }
});

router.post('/singleproduct', async (req, res) => {
    const url = req.body.url;
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const response = await axios.get(url, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "text/html; charset=UTF-8"
            }
        });
        const scrapedData = scrapeData(response.data);
        res.json(scrapedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while scraping data' });
    }
});

function scrapeData(data) {
    const $ = cheerio.load(data);

    const productImage = $('img._396cs4._2amPTt._3qGmMb').attr('src');
    const productName = $('h1.yhB1nd span.B_NuCI').text();
    const productRating = $('span._1lRcqv div._3LWZlK').text();
    const productPrice = $('div._30jeq3._16Jk6d').text();
    const reviews = [];
    $('div._2c2kV- div._16PBlm').each((index, element) => {
        const reviewText = $(element).find('p._2-N8zT').text().trim();
        const reviewer = $(element).find('div.t-ZTKy').text().trim();
        reviews.push(`${reviewer}: ${reviewText}`);
    });


    return {
        image: productImage,
        name: productName,
        rating: productRating,
        price: productPrice,
        reviews: reviews
    };
}



router.get('/explore', async (req, res) => {
    const query = "house products";
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // Scrape from AliExpress
        const aliExpressUrl = `https://aliexpress.com/w/wholesale-${encodeURIComponent(query)}.html?spm=a2g0o.home.search.0`;
        const aliExpressResponse = await axios.get(aliExpressUrl, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "text/html; charset=UTF-8"
            }
        });

        const aliExpressProducts = scrapeAliExpress(aliExpressResponse.data);

        // Scrape from Flipkart
        const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
        const flipkartResponse = await axios.get(flipkartUrl, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "text/html; charset=UTF-8"
            }
        });


        const flipkartProducts = scrapeFlipkart(flipkartResponse.data);

        // Send both sets of scraped data in response
        res.json({ aliExpressProducts, flipkartProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

router.post('/search', async (req, res) => {
    const query = req.body.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // Scrape from AliExpress
        // const aliExpressUrl = `https://aliexpress.com/w/wholesale-${encodeURIComponent(query)}.html?spm=a2g0o.home.search.0`;
        // const aliExpressResponse = await axios.get(aliExpressUrl, {
        //     responseType: "arraybuffer",
        //     headers: {
        //         "Content-Type": "text/html; charset=UTF-8"
        //     }
        // });

        // const aliExpressProducts = scrapeAliExpress(aliExpressResponse.data);
        const aliExpressProducts = [];

        // Scrape from Flipkart
        const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
        const flipkartResponse = await axios.get(flipkartUrl)


        const flipkartProducts = scrapeFlipkart(flipkartResponse.data);
        const smartprixProducts = []
        // const smartprixUrl = `https://www.smartprix.com/products/?q=${encodeURIComponent(query)}`;
        // const smartprixResponse = await axios.get(smartprixUrl, {
        //     responseType: "arraybuffer",
        //     headers: {
        //         "Content-Type": "text/html; charset=UTF-8"
        //     }
        // });
        // const smartprixProducts = scrapeSmartprix(smartprixResponse.data);

        // const browser = await puppeteer.launch();
        //     const page = await browser.newPage();

        //     // Navigate to Smartprix search results page
        //     const smartprixUrl = `https://www.smartprix.com/products/?q=${encodeURIComponent(query)}`;
        //     await page.goto(smartprixUrl);

        //     // Wait for product data to load
        //     await page.waitForSelector('.sm-product.has-tag.has-features.has-actions');

        //     // Scrape product data
        //     const smartprixProducts = await page.evaluate(() => {
        //         const products = [];
        //         const productElements = document.querySelectorAll('.sm-product.has-tag.has-features.has-actions');

        //         productElements.forEach(element => {
        //             const name = element.querySelector('h2')?.innerText?.trim();
        //             const price = element.querySelector('span.price')?.innerText?.trim();
        //             const ratingStyle = element.querySelector('span.sm-rating')?.getAttribute('style');
        //             const ratingMatch = /--rating: ([\d.]+);/.exec(ratingStyle);
        //             const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;
        //             products.push({ name, price, rating, from: "smartprix" });
        //         });

        //         return products;
        //     });

        //     // Close Puppeteer browser
        //     await browser.close();

        // Send both sets of scraped data in response
        // res.json({ aliExpressProducts, flipkartProducts,smartprixProducts });
        const combinedProducts = [...aliExpressProducts, ...flipkartProducts, ...smartprixProducts];

        // Send combined products in response
        res.json({ combinedProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data', details: error });
    }
});

router.get('/search', async (req, res) => {
    // const query = req.body.query;
    // if (!query) {
    //     return res.status(400).json({ error: 'Query parameter is required' });
    // }

    const query = "laptop"

    try {
        // Scrape from AliExpress
        // const aliExpressUrl = `https://aliexpress.com/w/wholesale-${encodeURIComponent(query)}.html?spm=a2g0o.home.search.0`;
        // const aliExpressResponse = await axios.get(aliExpressUrl, {
        //     responseType: "arraybuffer",
        //     headers: {
        //         "Content-Type": "text/html; charset=UTF-8"
        //     }
        // });

        // const aliExpressProducts = scrapeAliExpress(aliExpressResponse.data);
        const aliExpressProducts = [];

        // Scrape from Flipkart
        const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
        const flipkartResponse = await axios.get(flipkartUrl)


        const flipkartProducts = scrapeFlipkart(flipkartResponse.data);
        const smartprixProducts = []
        // const smartprixUrl = `https://www.smartprix.com/products/?q=${encodeURIComponent(query)}`;
        // const smartprixResponse = await axios.get(smartprixUrl, {
        //     responseType: "arraybuffer",
        //     headers: {
        //         "Content-Type": "text/html; charset=UTF-8"
        //     }
        // });
        // const smartprixProducts = scrapeSmartprix(smartprixResponse.data);

        // const browser = await puppeteer.launch();
        //     const page = await browser.newPage();

        //     // Navigate to Smartprix search results page
        //     const smartprixUrl = `https://www.smartprix.com/products/?q=${encodeURIComponent(query)}`;
        //     await page.goto(smartprixUrl);

        //     // Wait for product data to load
        //     await page.waitForSelector('.sm-product.has-tag.has-features.has-actions');

        //     // Scrape product data
        //     const smartprixProducts = await page.evaluate(() => {
        //         const products = [];
        //         const productElements = document.querySelectorAll('.sm-product.has-tag.has-features.has-actions');

        //         productElements.forEach(element => {
        //             const name = element.querySelector('h2')?.innerText?.trim();
        //             const price = element.querySelector('span.price')?.innerText?.trim();
        //             const ratingStyle = element.querySelector('span.sm-rating')?.getAttribute('style');
        //             const ratingMatch = /--rating: ([\d.]+);/.exec(ratingStyle);
        //             const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;
        //             products.push({ name, price, rating, from: "smartprix" });
        //         });

        //         return products;
        //     });

        //     // Close Puppeteer browser
        //     await browser.close();

        // Send both sets of scraped data in response
        // res.json({ aliExpressProducts, flipkartProducts,smartprixProducts });
        const combinedProducts = [...aliExpressProducts, ...flipkartProducts, ...smartprixProducts];

        // Send combined products in response
        res.json({ combinedProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data', details: error });
    }
});

// function scrapeAliExpress(data) {
//     const $ = cheerio.load(data);
//     const products = [];
//     $('.multi--titleText--nXeOvyr').each((index, element) => {
//         const productTitle = $(element).text();
//         products.push({ title: productTitle });
//     });
//     return products;
// }

function scrapeSmartprix(html) {
    const $ = cheerio.load(html);
    const products = [];

    $('.sm-product has-tag has-features has-actions').each((index, element) => {
        const name = $(element).find('h2').text().trim();
        const price = $(element).find('span.price').text().trim();
        const rating = $(element).find('div.score.rank-2-bg b').text().trim();
        products.push({ name, price, rating });
    });

    return products;
}

function scrapeAliExpress(data) {
    const $ = cheerio.load(data);
    const products = [];

    $('.list--galleryWrapper--29HRJT4 .list--gallery--C2f2tvm').each((index, element) => {
        const title = $(element).find('.multi--titleText--nXeOvyr').text();
        const url = $(element).find('.multi--outWrapper--SeJ8lrF a').attr('href');
        const image = $(element).find('img.images--item--3XZa6xf').attr('src');
        const price = $(element).find('.multi--price-sale--U-S0jtj').text().trim();
        const from = "aliexpress"

        products.push({ title, url, image, price, from });
    });

    return products;
}

function scrapeFlipkart(data) {
    const $ = cheerio.load(data);
    const products = [];

    $('._1AtVbE').each((index, element) => {
        const divCount = $(element).find('div._13oc-S').children().length;

        if (divCount === 4) {
            $(element).find('div._13oc-S').children().each((childIndex, childElement) => {
                // Scraping method 1 inside each child div
                const titleElement1 = $(childElement).find('a.s1Q9rs');
                console.log(titleElement1);
                const titleElement2 = $(childElement).find('div._4rR01T');
                const title = titleElement2.text() || titleElement1.attr('title') || titleElement1.text() || 'No title found';

                const urlElement = $(childElement).find('a');
                const url = `https://www.flipkart.com${urlElement.attr('href') || ''}`;

                const priceElement = $(childElement).find('._30jeq3');
                const price = priceElement.text().trim() || 'No price found';

                const imageElement = $(childElement).find('img._396cs4');
                const image = imageElement.attr('src') || '';

                const ratingElement = $(childElement).find('span._1lRcqv > div._3LWZlK');
                const rating = ratingElement.text().trim() || 'No rating found';

                const from = "flipkart";

                products.push({ title, url, price, image, rating, from });
            });
        } else {
            // Scraping method 2
            const titleElement1 = $(element).find('a.s1Q9rs');
            const titleElement2 = $(element).find('div._4rR01T');
            const title = titleElement2.text() || 'No title found' || titleElement1.attr('title') || titleElement1.text();

            const urlElement = $(element).find('a');
            const url = `https://www.flipkart.com${urlElement.attr('href') || ''}`;

            const priceElement = $(element).find('._30jeq3');
            const price = priceElement.text().trim() || 'No price found';

            const imageElement = $(element).find('img._396cs4');
            const image = imageElement.attr('src') || '';

            const ratingElement = $(element).find('span._1lRcqv > div._3LWZlK');
            const rating = ratingElement.text().trim() || 'No rating found';

            const from = "flipkart";

            products.push({ title, url, price, image, rating, from });
        }
    });


    return products;
}

module.exports = router;
