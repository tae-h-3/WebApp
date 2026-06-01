// Gemini AI를 활용한 여행 일정 자동 생성 서비스
// Google AI Studio (https://aistudio.google.com/app/apikey)에서 무료 API 키 발급 가능

import { GoogleGenerativeAI } from '@google/generative-ai';

// ⚠️ 본인의 Gemini API 키로 교체하세요
const GEMINI_API_KEY = "AIzaSyBstJxGL3vdYkS0M5fr18DaF60zMuTB2EU";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 테마 ID를 한국어로 변환
const themeLabels = {
  'mountain': '산/자연',
  'indoor': '실내 여행지',
  'activity': '액티비티',
  'culture': '문화·역사',
  'theme-park': '테마파크',
  'cafe': '카페',
  'market': '전통시장',
  'festival': '축제'
};

// 기간 ID를 일수로 변환
const durationDays = {
  'day': 1,
  '1n2d': 2,
  '2n3d': 3
};

/**
 * Gemini AI로 여행 일정 생성
 * @param {Object} tripInfo - { regions, duration, themes }
 * @returns {Promise<Object>} 생성된 여행 일정
 */
export const generateItinerary = async (tripInfo) => {
  const { regions, duration, themes } = tripInfo;
  const days = durationDays[duration] || 1;
  const themeText = themes.map(t => themeLabels[t] || t).join(', ');
  const regionText = regions.join(', ');

  // Gemini에게 전달할 프롬프트
  const prompt = `너는 한국 여행 전문가야. 아래 조건에 맞는 ${days}일 여행 일정을 짜줘.

[여행 조건]
- 여행 지역: ${regionText}
- 여행 기간: ${days}일 (${duration === 'day' ? '당일치기' : duration === '1n2d' ? '1박 2일' : '2박 3일'})
- 관심 테마: ${themeText}

[요구사항]
1. 반드시 실제 존재하는 한국의 명소, 식당, 카페만 추천해줘
2. 각 날짜별로 오전/점심/오후/저녁 시간대로 나눠서 일정을 구성해줘
3. 이동 동선을 고려해서 효율적으로 짜줘
4. 각 장소마다 간단한 설명과 추천 이유를 포함해줘

[응답 형식]
반드시 아래 JSON 형식으로만 응답해. 다른 설명이나 마크다운 코드 블록 없이 순수 JSON만 출력해:

{
  "summary": "이 여행의 한 줄 요약 (50자 이내)",
  "highlights": ["하이라이트1", "하이라이트2", "하이라이트3"],
  "days": [
    {
      "day": 1,
      "title": "1일차 제목",
      "schedule": [
        {
          "time": "09:00",
          "period": "오전",
          "place": "장소명",
          "category": "관광지/식당/카페 등",
          "description": "설명 (30자 이내)",
          "reason": "추천 이유 (50자 이내)"
        }
      ]
    }
  ],
  "tips": ["여행 팁1", "여행 팁2", "여행 팁3"]
}`;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 4096,
        responseMimeType: "application/json"
      }
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // 혹시 마크다운 코드 블록이 포함되어 있다면 제거
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const itinerary = JSON.parse(text);
    return { success: true, data: itinerary };
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return { 
      success: false, 
      error: error.message || 'AI 일정 생성에 실패했습니다'
    };
  }
};
