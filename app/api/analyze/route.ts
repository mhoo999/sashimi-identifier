import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: '이미지가 필요합니다.' },
        { status: 400 }
      )
    }

    // Gemini 1.5 Flash 모델 (무료 티어)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `이 이미지는 횟감(생선회) 사진입니다. 다음 정보를 JSON 형식으로 정확하게 분석해주세요:

1. fishName: 생선 이름 (한글)
2. fishNameEn: 생선 이름 (영문)
3. fishNameJp: 생선 이름 (일본어)
4. confidence: 확신도 (0-100 사이의 숫자)
5. characteristics: 특징 (배열, 3-5개 항목)
6. taste: 맛 설명 (한 문장)
7. texture: 식감 설명 (한 문장)
8. season: 제철 (예: "겨울", "사계절", "여름" 등)
9. price: 가격대 ("저렴", "보통", "고급", "최고급" 중 하나)
10. recommendations: 추천 먹는 법 (배열, 2-3개)
11. nutrition: 영양 정보 (한 문장으로 간단히)
12. warning: 주의사항 (있다면, 없으면 생략)

확신이 70% 미만이면 alternatives 필드에 가능성 있는 다른 생선들을 배열로 추가해주세요.
예: "alternatives": [{"name": "우럭", "probability": 30}, {"name": "볼락", "probability": 20}]

반드시 유효한 JSON 형식으로만 응답해주세요. 마크다운이나 다른 텍스트 없이 순수 JSON만 출력하세요.`

    // Base64 이미지를 Gemini 형식으로 변환
    const base64Data = image.split(',')[1]
    const mimeType = image.split(',')[0].split(':')[1].split(';')[0]

    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
    ]

    // Gemini API 호출
    const result = await model.generateContent([prompt, ...imageParts])
    const response = await result.response
    const text = response.text()

    // JSON 파싱
    let analysisResult
    try {
      // Gemini는 가끔 ```json으로 감싸서 응답하므로 제거
      const cleanText = text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      
      analysisResult = JSON.parse(cleanText)
    } catch (e) {
      console.error('JSON 파싱 실패:', text)
      return NextResponse.json({
        error: 'AI 응답을 파싱할 수 없습니다.',
        rawResponse: text,
      }, { status: 500 })
    }

    return NextResponse.json(analysisResult)
  } catch (error: any) {
    console.error('AI 분석 에러:', error)
    return NextResponse.json(
      { error: error.message || 'AI 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}