import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// 🔒 Firebase 설정 타입 안전하게 유지
const firebaseConfig = {
    apiKey: "AIzaSyCQ9pP_D4t8wuJnOjqX3eMmsKGR19FXjWE", // ✅ 이거
    authDomain: "onlyunited-2dfec.firebaseapp.com",
    projectId: "onlyunited-2dfec",
    storageBucket: "onlyunited-2dfec.appspot.com",
    messagingSenderId: "1057355471930",
    appId: "1:1057355471930:web:c6f315b82a198bdec2903",
};

// 🔧 Firebase 초기화
const app = initializeApp(firebaseConfig);

// 🔧 인증 객체 생성
const auth = getAuth(app);
auth.languageCode = 'ko'; // 인증 문구 한글화

// ✅ 타입 자동 추론됨
export { auth, RecaptchaVerifier };
