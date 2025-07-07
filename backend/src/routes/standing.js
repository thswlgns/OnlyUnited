const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma');

router.get('/', async (req, res) => {
    const standings = await prisma.teamStanding.findMany({
        orderBy: { position: 'asc' }
    });
    res.json(standings);
});

module.exports = router;
