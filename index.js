const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Fungsi untuk mendekode URL
const nyenye = (url) => {
    const parseUrl = new URL(url);
    const gateway = parseUrl.searchParams.get("r");

    if (!gateway) {
        console.error('Parameter "r" tidak ditemukan dalam URL.');
        return null; // Atau bisa throw error
    }

    try {
        // Decode URI component
        const decodedGateway = decodeURIComponent(gateway);
        
        // Menggunakan Buffer untuk mendekode string Base64
        const decodedLink = Buffer.from(decodedGateway, "base64").toString("utf-8");

        // Cek apakah hasilnya tampak seperti URL
        if (!decodedLink.startsWith("http")) {
            console.warn('Hasil decoding tidak tampak seperti URL:', decodedLink);
        }

        console.log(decodedLink);
        return decodedLink;
    } catch (error) {
        console.error('Error saat mendekode link:', error);
        return null; // Atau bisa throw error
    }
};

// Endpoint untuk mendekode URL
app.get('/decode', (req, res) => {
    const { url } = req.query; // Mengambil URL dari query string

    if (!url) {
        return res.status(400).send('URL parameter is required.');
    }

    try {
        const result = nyenye(url);
        if (result) {
            res.send({ decodedLink: result });
        } else {
            res.status(500).send('Error decoding the link.');
        }
    } catch (error) {
        res.status(500).send('Error decoding the link.');
    }
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
