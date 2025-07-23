import { useEffect, useState } from 'react';
import axios from 'axios';

interface NewsItem {
    id: string;
    title: string;
    summary: string;
    url: string;
    imageUrl?: string;
    pressName: string;
    pressLogoUrl?: string;
    publishedAt?: string;
}

const MainNews = () => {
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:3001/api/news?limit=5');
                console.log('뉴스 데이터:', res.data);

                // 데이터 구조에 따라 적절히 처리
                const news = Array.isArray(res.data)
                    ? res.data
                    : (res.data.news || res.data.data || []);

                setNewsList(news);
            } catch (err) {
                console.error('❌ 뉴스 불러오기 실패:', err);
                // 에러 시 더미 데이터 표시
                setNewsList([
                    {
                        id: '1',
                        title: '맨체스터 유나이티드, 새로운 시즌 준비 완료',
                        summary: '올해 시즌을 위한 전력 보강과 전술 준비가 완료되었다고 발표했다.',
                        url: '#',
                        pressName: '맨유 뉴스',
                        publishedAt: '2024-01-15'
                    },
                    {
                        id: '2',
                        title: '주요 선수들의 컨디션 회복 소식',
                        summary: '부상에서 복귀한 선수들이 팀 훈련에 합류하여 좋은 모습을 보이고 있다.',
                        url: '#',
                        pressName: '축구 뉴스',
                        publishedAt: '2024-01-14'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="bg-[#545454] rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg text-white">최신 뉴스</h2>
                    <button className="text-gray-400 hover:text-white text-xl">›</button>
                </div>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-[#2e2d2d] p-3 rounded-lg animate-pulse">
                            <div className="h-4 bg-gray-600 rounded mb-2"></div>
                            <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#545454] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-white">최신 뉴스</h2>
                <button className="text-gray-400 hover:text-white text-xl">›</button>
            </div>
            <div className="space-y-3">
                {newsList.map((news) => (
                    <div key={news.id} className="bg-[#2e2d2d] p-3 rounded-lg hover:bg-[#3a3939] transition-colors">
                        <div className="flex items-start gap-3">
                            {news.imageUrl && (
                                <img
                                    src={news.imageUrl}
                                    alt="뉴스 썸네일"
                                    className="w-16 h-12 object-cover rounded flex-shrink-0"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    {news.pressLogoUrl && (
                                        <img
                                            src={news.pressLogoUrl}
                                            alt="언론사 로고"
                                            className="w-4 h-4 rounded"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    )}
                                    <span className="text-gray-400 text-xs">{news.pressName}</span>
                                    {news.publishedAt && (
                                        <span className="text-gray-500 text-xs">• {news.publishedAt}</span>
                                    )}
                                </div>
                                <h4 className="text-white text-sm font-medium mb-1 line-clamp-2">
                                    <a
                                        href={news.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        {news.title}
                                    </a>
                                </h4>
                                <p className="text-gray-300 text-xs line-clamp-2">
                                    {news.summary}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-2 py-2 text-gray-400 hover:text-white bg-[#2e2d2d] rounded-lg text-sm transition-colors">
                전체 뉴스 보기 →
            </button>
        </div>
    );
};

export default MainNews;
