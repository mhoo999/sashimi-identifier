export interface FishAnalysis {
    fishName: string
    fishNameEn: string
    fishNameJp: string
    confidence: number
    characteristics: string[]
    taste: string
    texture: string
    season: string
    price: '저렴' | '보통' | '고급' | '최고급'
    recommendations: string[]
    nutrition: string
    warning?: string
    alternatives?: Array<{
      name: string
      probability: number
    }>
  }