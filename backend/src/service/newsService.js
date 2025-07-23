const axios = require('axios');
const cheerio = require('cheerio');
const { prisma } = require('../prisma');

const pressLogoMap = {
    '네이트 뉴스': 'https://news.nate.com/favicon.ico',
    '머니투데이': 'https://img.mt.co.kr/favicon.ico',
    '스포탈코리아': 'https://www.sportalkorea.com/favicon.ico',
    '네이트 스포츠': 'https://sports.nate.com/favicon.ico',
    '조선일보': 'https://www.chosun.com/favicon.ico',
};

async function extractOgTags(url) {
    try {
        const { data } = await axios.get(url, {
            maxRedirects: 5,
            timeout: 5000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; OnlyUnitedBot/1.0)',
            },
        });

        const $ = cheerio.load(data);

        let imageUrl = $('meta[property="og:image"]').attr('content') || null;
        const pressName = $('meta[property="og:site_name"]').attr('content') || null;
        const summary = $('meta[property="og:description"]').attr('content') || null;

        // ✅ googleusercontent.com 이미지는 저장하지 않음
        if (imageUrl && imageUrl.includes('googleusercontent')) {
            imageUrl = null;
        }

        return { imageUrl, pressName, summary };
    } catch (err) {
        console.warn('⚠️ OG 태그 파싱 실패:', url, err.message);
        return {};
    }
}

async function upsertNews({ title, url, publishedAt }) {
    const existing = await prisma.news.findFirst({
        where: { url },
    });
    if (existing) return;

    const { imageUrl, pressName, summary } = await extractOgTags(url);
    const pressLogoUrl = pressLogoMap[pressName] || null;

    await prisma.news.create({
        data: {
            title,
            summary,
            url,
            imageUrl,
            pressName,
            pressLogoUrl,
            publishedAt,
        },
    });

    console.log(`📰 저장 완료: ${title}`);
}

module.exports = { upsertNews };
