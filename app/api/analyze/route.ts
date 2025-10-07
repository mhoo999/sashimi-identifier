import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: '이미지가 필요합니다.' },
        { status: 400 }
      )
    }

    console.log('OpenAI API 호출 시작...')

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `이 이미지는 횟감(생선회) 사진입니다. 다음 정보를 JSON 형식으로만 응답해주세요:

{
  "fishName": "생선 이름 (한글)",
  "fishNameEn": "생선 이름 (영문)",
  "fishNameJp": "생선 이름 (일본어)",
  "confidence": 확신도 (0-100 사이 숫자),
  "characteristics": ["특징1", "특징2", "특징3"],
  "taste": "맛 설명",
  "texture": "식감 설명",
  "season": "제철",
  "price": "저렴/보통/고급/최고급 중 하나",
  "recommendations": ["추천 먹는 법1", "추천 먹는 법2"],
  "nutrition": "영양 정보",
  "warning": "주의사항 (있으면)"
}

확신도가 70% 미만이면 alternatives 추가:
"alternatives": [{"name": "가능성있는생선", "probability": 30}]

JSON만 출력하세요.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    })

    const resultText = response.choices[0]?.message?.content

    if (!resultText) {
      throw new Error('AI 응답이 없습니다.')
    }

    console.log('AI 응답:', resultText.substring(0, 100))

    // JSON 파싱
    let analysisResult
    try {
      const cleanText = resultText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()

      analysisResult = JSON.parse(cleanText)
    } catch {
      console.error('JSON 파싱 실패:', resultText)
      return NextResponse.json({
        error: 'AI 응답을 파싱할 수 없습니다.',
        rawResponse: resultText,
      }, { status: 500 })
    }

    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error('AI 분석 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'AI 분석 중 오류가 발생했습니다.'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}