const axios = require('axios');
const cron = require('node-cron');
const xml2js = require('xml2js');
const { upsertNews } = require('../service/newsService');

const RSS_URL = 'https://news.google.com/rss/search?q=맨유&hl=ko&gl=KR&ceid=KR:ko';

const syncNews = async () => {
    try {
        const { data } = await axios.get(RSS_URL);
        const result = await xml2js.parseStringPromise(data);
        const items = result.rss.channel[0].item;

        for (const item of items) {
            const title = item.title?.[0] || '제목 없음';

            const rawUrl = item.guid?.[0] || item.link?.[0] || '';
            const url = typeof rawUrl === 'string' ? rawUrl : String(rawUrl._ || '').trim();

            const publishedAt = new Date(item.pubDate?.[0]);

            if (!url || !url.startsWith('http')) {
                console.warn('⛔ 잘못된 URL 스킵:', url);
                continue;
            }

            await upsertNews({ title, url, publishedAt });
        }

        console.log(`✅ 뉴스 ${items.length}건 동기화 완료`);
    } catch (err) {
        console.error('❌ 뉴스 동기화 실패:\n', err);
    }
};

// 매시간 실행 + 서버 시작 시 1회 실행
cron.schedule('0 * * * *', syncNews);
syncNews();

module.exports = syncNews;
