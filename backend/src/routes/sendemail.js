const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendVerificationEmail = async (to, code) => {
    const mailOptions = {
        from: `"OnlyUnited" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'OnlyUnited 이메일 인증코드',
        html: `<h2>안녕하세요, OnlyUnited 입니다.</h2><h2>인증코드는 ${code} 입니다.</h2><p>5분 안에 입력해주세요.</p>`
    };

    return transporter.sendMail(mailOptions);
};