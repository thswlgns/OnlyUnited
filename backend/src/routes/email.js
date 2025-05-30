const express = require('express');
const router = express.Router();
const { sendVerificationEmail } = require('./sendemail');

const codeStore = new Map();

router.post('/authnumsend', async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: '이메일이 필요합니다.' });

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: '올바른 이메일 형식이 아닙니다.' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    codeStore.set(email, { code, expires: Date.now() + 5 * 60 * 1000 });

    try {
        await sendVerificationEmail(email, code);
        res.status(200).json({ message: '인증코드 전송 완료' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '메일 전송 실패' });
    }
});

router.post('/verifycode', (req, res) => {
    const { email, code } = req.body;
    const data = codeStore.get(email);

    if (!data) {
        return res.status(400).json({ message: '인증코드를 먼저 요청하세요.' });
    }

    const now = Date.now();

    if (now > data.expires) {
        codeStore.delete(email);
        return res.status(410).json({ message: '인증코드가 만료되었습니다.' });
    }

    if (data.code !== code) {
        return res.status(401).json({ message: '인증코드가 일치하지 않습니다.' });
    }

    // ✅ 인증 성공 → 세션에 저장
    req.session.verifiedEmail = email;

    codeStore.delete(email);
    return res.status(200).json({ message: '인증 성공!' });
});



module.exports = router;
