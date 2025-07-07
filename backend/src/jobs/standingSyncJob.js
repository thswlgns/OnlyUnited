const axios = require('axios');
const cron = require('node-cron');
const { upsertTeamStanding } = require('../service/standingService');

const syncStandings = async () => {
    try {
        const res = await axios.get(
            'https://api.football-data.org/v4/competitions/2021/standings',
            {
                headers: {
                    'X-Auth-Token': process.env.FOOTBALL_DATA_KEY
                }
            }
        );

        const table = res.data.standings[0]?.table || [];

        for (const team of table) {
            await upsertTeamStanding({
                teamId: team.team.id,
                name: team.team.name,
                crest: team.team.crest,
                position: team.position,
                points: team.points
            });
        }

        console.log(`✅ 순위 ${table.length}건 upsert 완료`);
    } catch (err) {
        console.error('❌ 순위 동기화 실패:', err.message);
    }
};

// 6시간마다 실행
cron.schedule('0 */6 * * *', syncStandings);
// 서버 시작 시 1회 실행
syncStandings();

module.exports = syncStandings;