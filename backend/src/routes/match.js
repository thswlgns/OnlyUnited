const express = require('express');
const { prisma } = require('../prisma');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const matches = await prisma.match.findMany({
            where: { 
                status: {
                    in : ['TIMED','SCHEDULED']
                } 
            },
            orderBy: { utcDate: 'asc' },
            take: 5
        });

        // BigInt → String 처리(프론트에서 받아야함)
        const serializedMatches = matches.map((match) => ({
            ...match,
            id: match.id.toString(),
            homeTeamId: match.homeTeamId ?? null,
            awayTeamId: match.awayTeamId ?? null,
        }));

        res.json({ matches: serializedMatches });
    } catch (err) {
        console.error('❌ 경기 조회 실패:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
