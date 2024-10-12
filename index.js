const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const nyenye = (url) => {
    const parseUrl = new URL(url);
    const gateway = parseUrl.searchParams.get("r");
    
    // Menggunakan Buffer untuk mendekode string Base64
    const decodedLink = Buffer.from(gateway, "base64").toString("utf-8");
    return decodedLink;
};

app.get('/decode', (req, res) => {
    const { url } = req.query; // Mengambil URL dari query string
    
    if (!url) {
        return res.status(400).send('URL parameter is required.');
    }

    try {
        const result = nyenye(url);
        res.send({ decodedLink: result });
    } catch (error) {
        res.status(500).send('Error decoding the link.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
