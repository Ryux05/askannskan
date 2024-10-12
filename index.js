const express = require('express');
const app = express();

// Endpoint untuk mendekode parameter 'r' secara langsung
app.get('/decode', (req, res) => {
    const rParam = req.query.r;

    if (!rParam) {
        return res.status(400).json({ error: "Parameter 'r' tidak ditemukan dalam URL." });
    }

    try {
        // Dekode Base64
        const decoded = Buffer.from(rParam, 'base64').toString('utf-8');

        return res.json({ decoded_url: decoded });
    } catch (error) {
        return res.status(500).json({ error: "Terjadi kesalahan saat mendekode parameter 'r'." });
    }
});

// Port untuk pengembangan lokal
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
