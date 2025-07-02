import { useEffect, useState } from 'react';
import axios from 'axios';
import teamNameKoMap from '../constants/TeamNameKoMap';

const MANCHESTER_UNITED_ID = 66;

const MatchesSection = () => {
  const [highlightMatch, setHighlightMatch] = useState<any>(null);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [isUpcoming, setIsUpcoming] = useState(true);

  // 날짜 포맷팅 함수
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  // 경기가 예정인지 완료인지 판단하는 함수
  const isMatchScheduled = (utcDate: string) => {
    const matchDate = new Date(utcDate);
    const now = new Date();
    return matchDate > now;
  };

  // 승패 계산 함수
  const getMatchResult = (match: any, teamId: number): "승" | "패" | "무" | null => {
    if (!match.score.fullTime) return null;
    const { home, away } = match.score.fullTime;
    const isHome = match.homeTeam.id === teamId;
    const teamScore = isHome ? home : away;
    const opponentScore = isHome ? away : home;
    if (teamScore > opponentScore) return "승";
    if (teamScore < opponentScore) return "패";
    return "무";
  };

  // 승패 색상 계산 함수
  const getResultColor = (result: "승" | "패" | "무" | null) => {
    switch (result) {
      case "승":
        return "text-green-400";
      case "패":
        return "text-red-400";
      case "무":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  // 팀 이름 두 줄로 포맷팅 함수
  const formatTeamNameTwoLines = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0]; // 단어 1개면 그대로
    if (parts.length === 2) return `${parts[0]}\n${parts[1]}`; // 2단어는 딱 두 줄
    return `${parts.slice(0, 2).join(' ')}\n${parts.slice(2).join(' ')}`; // 3단어 이상 처리
  };

  // 팀 이름이 한 줄인지 체크 후 띄울 줄 조정
  const isSingleLineName = (name: string) => {
    return name.trim().split(' ').length === 1;
  };
  
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // 모든 경기 데이터를 가져옴 (예정 + 완료)
        const res = await axios.get('/football-api/v4/teams/66/matches?status=SCHEDULED&limit=5', {
          headers: {
            'X-Auth-Token': import.meta.env.VITE_FOOTBALL_DATA_KEY
          }
        });
        console.log(res.data);
        
        const allMatches = res.data.matches || [];
        
        // 현재 시각 기준으로 예정 경기와 완료된 경기 분리
        const scheduledMatches = allMatches.filter((match: any) => isMatchScheduled(match.utcDate));
        const finishedMatches = allMatches.filter((match: any) => !isMatchScheduled(match.utcDate) && match.score.fullTime.home !== null);

        if (scheduledMatches.length > 0) {
          // 예정 경기가 있으면 첫 번째 경기를 하이라이트, 나머지를 리스트로
          setHighlightMatch(scheduledMatches[0]);
          setUpcomingMatches(scheduledMatches.slice(1, 5));
          setIsUpcoming(true);
        } else if (finishedMatches.length > 0) {
          // 예정 경기가 없고 완료된 경기가 있으면 가장 최근 경기를 하이라이트
          const latestMatch = finishedMatches[finishedMatches.length - 1];
          setHighlightMatch(latestMatch);
          setUpcomingMatches(finishedMatches.slice(-4));
          setIsUpcoming(false);
        }
      } catch (err) {
        console.error('❌ 경기 정보 불러오기 실패:', err);
      }
    };

    fetchMatches();
  }, []);

  if (!highlightMatch) return null;

  const { homeTeam, awayTeam, utcDate, score } = highlightMatch;
  const isHighlightScheduled = isMatchScheduled(utcDate);
  const mainResult = !isHighlightScheduled ? getMatchResult(highlightMatch, MANCHESTER_UNITED_ID) : null;

  const leftHomeTeam = (team: any) => {
    return (
      <div className="flex flex-col items-start w-100">
        <div className="flex items-center gap-4">
          <img src={team.crest} className="w-32 h-32 object-contain ml-2" />
          <span className="text-2xl font-bold whitespace-pre-line leading-tight text-center">
            {formatTeamNameTwoLines(teamNameKoMap[team.id] || team.name)}
          </span>
        </div>
      </div>
    );
  };
  
  const rightAwayTeam = (team: any) => {
    return (
      <div className="flex flex-col items-end w-100">
        <div className="flex items-center gap-4 justify-end mr-2">
          <span className="text-2xl font-bold whitespace-pre-line leading-tight text-center">
            {formatTeamNameTwoLines(teamNameKoMap[team.id] || team.name)}
          </span>
          <img src={team.crest} className="w-32 h-32 object-contain mr-2" />
        </div>
      </div>
    );
  };

  const homeTeamSmall = (team: any, match: any) => {
    return (
      <div className="flex flex-col items-start w-36">
        <div className="flex items-center gap-3">
          <img src={team.crest} className="w-10 h-10 object-contain" />
          <span
            className={`text-sm whitespace-pre-line leading-tight text-center${
              isSingleLineName(teamNameKoMap[team.id] || team.name) ? 'my-2' : ''
            }`}
          >
            {formatTeamNameTwoLines(teamNameKoMap[team.id] || team.name)}
          </span>
        </div>
      </div>
    );
  };
  
  const awayTeamSmall = (team: any, match: any) => {
    return (
      <div className="flex flex-col items-end w-36">
        <div className="flex items-center gap-3 justify-end">
          <span
            className={`text-sm text-center whitespace-pre-line leading-tight ${
              isSingleLineName(teamNameKoMap[team.id] || team.name) ? 'my-2' : ''
            }`}
          >
            {formatTeamNameTwoLines(teamNameKoMap[team.id] || team.name)}
          </span>
          <img src={team.crest} className="w-10 h-10 object-contain" />
        </div>
      </div>
    );
  };
  
  return (
    <div className="text-white space-y-8">
      {/* ✅ 상단 하이라이트 경기 */}
      <div className="bg-[#2e2d2d] rounded-lg shadow text-center pt-8 pb-8">
        <h2 className="text-3xl font-bold mb-2">{isHighlightScheduled ? '다음 경기' : '최근 경기'}</h2>
        <div className="flex justify-between items-center gap-2 mb-4">
          {leftHomeTeam(homeTeam)}
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-2">{formatDate(utcDate)}</div>
            <div className="text-7xl font-extrabold tracking-wider">
              {isHighlightScheduled ? 'VS' : `${score.fullTime.home} : ${score.fullTime.away}`}
            </div>
            <div className={`text-xl font-bold mt-2 ${getResultColor(mainResult)}`}>
              {mainResult}
            </div>
          </div>
          {rightAwayTeam(awayTeam)}
        </div>
      </div>

      {/* ✅ 하단 4경기 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingMatches.map(match => {
          const { home, away } = match.score.fullTime || { home: null, away: null };
          const isScheduled = isMatchScheduled(match.utcDate);
          const result = !isScheduled ? getMatchResult(match, MANCHESTER_UNITED_ID) : null;

          return (
            <div key={match.id} className="bg-[#2e2d2d] pt-4 pb-4 rounded-lg shadow text-sm space-y-2">
              <div className="text-center text-gray-400 text-xs">{formatDate(match.utcDate)}</div>
              <div className="flex justify-center items-center gap-10">
                {homeTeamSmall(match.homeTeam, match)}
                <div className="text-center">
                  <div className="text-2xl font-semibold">
                    {isScheduled ? 'VS' : `${home} : ${away}`}
                  </div>
                  {!isScheduled && (
                    <div className={`text-sm font-bold mt-1 ${getResultColor(result)}`}>
                      {result}
                    </div>
                  )}
                </div>
                {awayTeamSmall(match.awayTeam, match)}
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchesSection;