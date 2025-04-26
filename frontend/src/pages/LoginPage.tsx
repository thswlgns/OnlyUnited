import React from 'react';

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-80 flex flex-col gap-4">
                {/* 아이디 입력 */}
                <input
                type="text"
                placeholder="ID"
                className="w-full p-3 rounded bg-white/30 text-black border-none focus:outline-none focus:ring-0"
                />
                <input
                type="password"
                placeholder="PASSWORD"
                className="w-full p-3 rounded bg-white/30 text-black border-none focus:outline-none focus:ring-0"
                />

                {/* 로그인 버튼 */}
                <button className="w-full p-3 rounded bg-black text-white font-semibold">
                    뮤직허브ID 로그인
                </button>

                {/* 회원가입, 아이디 찾기, 비밀번호 찾기 */}
                <div className="flex justify-center gap-2 text-xs mt-2 text-white">
                    <a href="/signin" className="hover:underline visited:text-white">회원가입</a>
                    <span className="text-gray-400">|</span>
                    <a href="findid" className="hover:underline visited:text-white">ID찾기</a>
                    <span className="text-gray-400">|</span>
                    <a href="findpw" className="hover:underline visited:text-white">비밀번호찾기</a>
                </div>

                {/* 소셜 로그인 */}
                <div className="flex flex-col gap-2 mt-6">
                    <button className="w-full p-3 rounded bg-white hover:bg-gray-100 shadow">
                        Google로 시작하기
                    </button>
                    <button className="w-full p-3 rounded bg-yellow-400 hover:bg-yellow-300 shadow">
                        Kakao로 시작하기
                    </button>
                    <button className="w-full p-3 rounded bg-green-500 hover:bg-green-400 text-white shadow">
                        Naver로 시작하기
                    </button>
                </div>
            </div>

            <p className="text-xs mt-10">
                © MUSICHUB All Rights Reserved.
            </p>
        </div>
    );
};

export default LoginPage;
