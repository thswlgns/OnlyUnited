const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');
const router = express.Router();

// 구글 로그인 요청
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// 구글 로그인 콜백
router.get('/google/callback',
    (req, res, next) => {
        console.log('📥 Google callback hit:', req.query);
        next();
    },
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        try {
            const user = req.user;
        
            // ✅ 추가정보 입력이 필요한지 확인
            if (!user.user_phone || !user.user_gender) {
                return res.redirect(`/add-info?user_id=${user.user_id}`);
            }

            // ✅ JWT 토큰 발급
            const token = jwt.sign(
                { user_id: user.user_id, user_email: user.user_email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.redirect(`/login-success?token=${token}`);
        } catch (err) {
            console.error('❌ 콜백 핸들링 중 에러:', err); // ✅ 꼭 추가하세요
            res.status(500).send('Internal Server Error');
        }
    }
);

// 네이버 로그인 요청
router.get('/naver', passport.authenticate('naver'));

// 네이버 로그인 콜백
router.get('/naver/callback',
    passport.authenticate('naver', { failureRedirect: '/' }),
    async (req, res) => {
        const user = req.user;

        // ✅ 추가정보 입력이 필요한지 확인
        if (!user.user_phone || !user.user_gender) {
            return res.redirect(`/add-info?user_id=${user.user_id}`);
        }

        // ✅ JWT 토큰 발급
        const token = jwt.sign(
            { user_id: user.user_id, user_email: user.user_email }, // <-- OK!
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // 로그인 성공 시 프론트로 전달
        res.redirect(`/login-success?token=${token}`);
    }
);

// 카카오 로그인 요청
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 로그인 콜백
router.get('/kakao/callback',
    passport.authenticate('kakao', { failureRedirect: '/' }),
    async (req, res) => {
        const user = req.user;

        // ✅ 추가정보 입력이 필요한지 확인
        if (!user.user_phone || !user.user_gender) {
        return res.redirect(`/add-info?user_id=${user.user_id}`);
        }

        // ✅ JWT 토큰 발급
        const token = jwt.sign(
        { user_id: user.user_id, user_email: user.user_email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
        );

    // 로그인 성공 시 프론트로 전달
        res.redirect(`/login-success?token=${token}`);
    }
);

// 추가 정보 입력
router.patch('/complete-info', async (req, res) => {
    console.log('[요청 받은 데이터]', req.body);
    const { user_id, user_gender, user_birthday, user_phone } = req.body;

    try {
        const updated = await prisma.user.update({
            where: { user_id },
            data: {
                user_gender,
                user_birthday: new Date(user_birthday),
                user_phone
            }
        });

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: '업데이트 실패', detail: err.message });
    }
});

// 로그아웃 세션 가져오기
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err);

        req.session.destroy((err) => {
            if (err) return next(err);

            res.clearCookie('connect.sid', {
                path: '/',
                httpOnly: true,
            });

            return res.status(200).send('✅ 로그아웃 완료');
        });
    });
});

module.exports = router;
