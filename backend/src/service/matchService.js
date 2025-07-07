const { prisma } = require('../prisma');

async function upsertMatch(match) {
    const {
        id,
        matchday,
        utcDate,
        homeTeam,
        awayTeam,
        homeTeamId,
        awayTeamId,
        status,
        competition
    } = match;


    return await prisma.match.upsert({
        where: {id:BigInt(id)},
        update: {
            matchday,
            utcDate:new Date(utcDate),
            homeTeam,
            awayTeam,
            homeTeamId,
            awayTeamId,
            status,
            competition
        },
        create: {
            id: BigInt(id),
            utcDate:new Date(utcDate),
            homeTeam,
            awayTeam,
            homeTeamId,
            awayTeamId,
            status,
            competition
        }
    });
}

module.exports = { upsertMatch };