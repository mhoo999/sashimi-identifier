# 🐟 회식별사

AI가 회 사진을 보고 어떤 생선인지 알려드립니다.

🔗 **[https://sashimi-identifier.vercel.app](https://sashimi-identifier.vercel.app)** (배포 후 실제 URL로 변경)

## 소개

횟집이나 마트에서 회를 먹을 때 "이게 무슨 생선이지?" 궁금했던 적 있으신가요?
회식별사는 사진 한 장으로 생선의 종류와 상세 정보를 알려드립니다.

### 주요 기능

- 📸 **간편한 촬영**: 카메라로 찍거나 갤러리에서 선택
- 🤖 **AI 분석**: OpenAI GPT-4 Vision으로 정확한 식별
- 📊 **상세 정보**: 맛, 식감, 영양, 제철, 가격대 등
- 💾 **히스토리**: 분석한 회 기록 자동 저장
- 📱 **모바일 최적화**: 스마트폰에서도 편하게

## 사용 방법

1. 회 사진을 촬영하거나 업로드
2. "AI 분석하기" 버튼 클릭
3. 생선 정보 확인!

## 기술 스택

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **State**: Zustand
- **AI**: OpenAI GPT-4o-mini Vision API
- **Deploy**: Vercel

## 로컬 개발

### 사전 요구사항

- Node.js 18 이상
- OpenAI API 키

### 설치 및 실행
```bash