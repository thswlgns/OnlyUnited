// src/routes/news.js
const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma');

// GET /api/news?limit=5
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;

    try {
        const news = await prisma.news.findMany({
            orderBy: { publishedAt: 'desc' },
            take: limit,
        });

        res.json({ news });
    } catch (err) {
        console.error('❌ 뉴스 불러오기 실패:', err);
        res.status(500).json({ error: '뉴스 로딩 오류' });
    }
});

module.exports = router;
