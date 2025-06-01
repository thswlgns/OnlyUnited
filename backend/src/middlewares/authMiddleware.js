const authMiddleware = (req, res, next) => {
    // passport가 로그인된 상태이면 req.isAuthenticated() === true
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    // 로그인된 사용자 정보는 req.user에 자동으로 있음
    next();
};

module.exports = authMiddleware;
