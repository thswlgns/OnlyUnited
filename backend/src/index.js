require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const emailRouter = require('./routes/email'); // ✅ 추가

const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

// ✅ 라우터 등록
app.use('/api/user', userRouter);
app.use('/auth', authRouter);
app.use('/email', emailRouter); // ✅ 이메일 인증 라우터 등록

app.get('/', (req, res) => {
    res.send('server running!');
});

app.get('/login-success', (req, res) => {
    const user = req.user;
    if (user) {
        const { user_id, user_phone } = user;
        return res.redirect(`http://localhost:5173/login?user_id=${user_id}&phone=${user_phone}`);
    }
    res.redirect('http://localhost:5173');
});

app.listen(PORT, () => {
    console.log(`✅ Server http://localhost:${PORT} at Running ✅`);
});
