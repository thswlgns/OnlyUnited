const axios = require('axios');
const cron = require('node-cron');
const { upsertMatch } = require('../service/matchService');

const syncMatches = async () => {
    try {
        const res = await axios.get(
        'https://api.football-data.org/v4/teams/66/matches?status=SCHEDULED&limit=5',
            {
                headers: {
                'X-Auth-Token': process.env.FOOTBALL_DATA_KEY
                }
            }
        );
        
        const matches = res.data.matches || [];

        for (const match of matches) {
            await upsertMatch({
                id: match.id,
                matchday: match.matchday,
                utcDate: match.utcDate,
                homeTeam: match.homeTeam.name,
                homeTeamId: match.homeTeam.id,
                awayTeam: match.awayTeam.name,
                awayTeamId: match.awayTeam.id,
                status: match.status,
                competition: match.competition.name
            });
        }

        console.log(`✅ 경기 ${matches.length}건 동기화 완료`);
    } catch (err) {
        console.error('❌ 경기 동기화 실패:', err.message);
    }
};

// 6시간마다 실행
cron.schedule('0 */6 * * *', syncMatches);
// 서버 시작 시 1회 실행
syncMatches();

module.exports = syncMatches;
