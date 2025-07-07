const { prisma } = require('../prisma');

async function upsertTeamStanding(team) {
    const {
        teamId,
        name,
        crest,
        position,
        points
    } = team;

    return await prisma.teamStanding.upsert({
        where: { teamId },
        update: {
            name,
            crest,
            position,
            points
        },
        create: {
            teamId,
            name,
            crest,
            position,
            points
        }
    });
}

module.exports = { upsertTeamStanding };
