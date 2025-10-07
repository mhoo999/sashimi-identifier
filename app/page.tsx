'use client'

import { useState } from 'react'
import Camera from '@/components/Camera'
import type { FishAnalysis } from '@/types/fish'

export default function Home() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<FishAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc)
    setAnalysisResult(null)
    setError(null)
  }

  const handleAnalyze = async () => {
    if (!capturedImage) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: capturedImage }),
      })

      if (!response.ok) {
        throw new Error('분석 실패')
      }

      const result = await response.json()
      
      if (result.error) {
        setError(result.error)
      } else {
        setAnalysisResult(result)
      }
    } catch (err: any) {
      setError(err.message || 'AI 분석 중 오류가 발생했습니다.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setCapturedImage(null)
    setAnalysisResult(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🐟 회식별사
          </h1>
          <p className="text-gray-600">
            회 사진을 찍으면 어떤 생선인지 알려드려요
          </p>
        </header>

        {/* 메인 컨텐츠 영역 */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {!capturedImage ? (
              <Camera onCapture={handleCapture} />
            ) : !analysisResult ? (
              <div className="space-y-4">
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="w-full rounded-lg"
                />
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    다시 촬영
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? '🤖 분석 중...' : '🤖 AI 분석하기'}
                  </button>
                </div>
              </div>
            ) : (
              // 분석 결과 표시
              <div className="space-y-6">
                <img 
                  src={capturedImage} 
                  alt="Analyzed" 
                  className="w-full rounded-lg"
                />

                {/* 생선 이름 */}
                <div className="text-center border-b pb-4">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {analysisResult.fishName}
                  </h2>
                  <p className="text-gray-600">
                    {analysisResult.fishNameEn} / {analysisResult.fishNameJp}
                  </p>
                  <div className="mt-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      analysisResult.confidence >= 80 
                        ? 'bg-green-100 text-green-800'
                        : analysisResult.confidence >= 60
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      확신도: {analysisResult.confidence}%
                    </span>
                  </div>
                </div>

                {/* 특징 */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">🔍 특징</h3>
                  <ul className="space-y-1">
                    {analysisResult.characteristics.map((char, idx) => (
                      <li key={idx} className="text-gray-700">• {char}</li>
                    ))}
                  </ul>
                </div>

                {/* 맛과 식감 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">👅 맛</h3>
                    <p className="text-gray-700 text-sm">{analysisResult.taste}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">🥢 식감</h3>
                    <p className="text-gray-700 text-sm">{analysisResult.texture}</p>
                  </div>
                </div>

                {/* 제철 & 가격 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">📅 제철</h3>
                    <p className="text-gray-700">{analysisResult.season}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">💰 가격대</h3>
                    <p className="text-gray-700">{analysisResult.price}</p>
                  </div>
                </div>

                {/* 추천 먹는 법 */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">✨ 추천 먹는 법</h3>
                  <ul className="space-y-1">
                    {analysisResult.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-gray-700 text-sm">• {rec}</li>
                    ))}
                  </ul>
                </div>

                {/* 영양 정보 */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">💊 영양 정보</h3>
                  <p className="text-gray-700 text-sm">{analysisResult.nutrition}</p>
                </div>

                {/* 주의사항 */}
                {analysisResult.warning && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-1">⚠️ 주의사항</h3>
                    <p className="text-yellow-700 text-sm">{analysisResult.warning}</p>
                  </div>
                )}

                {/* 대안 */}
                {analysisResult.alternatives && analysisResult.alternatives.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">🤔 다른 가능성</h3>
                    <ul className="space-y-1">
                      {analysisResult.alternatives.map((alt, idx) => (
                        <li key={idx} className="text-gray-700 text-sm">
                          • {alt.name} ({alt.probability}%)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={handleReset}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  새로 분석하기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 사용법 안내 */}
        {!capturedImage && (
          <div className="max-w-2xl mx-auto mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4">사용법</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4">
                <div className="text-3xl mb-2">📸</div>
                <p className="text-sm text-gray-600">회 사진 촬영</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">🤖</div>
                <p className="text-sm text-gray-600">AI 분석</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-sm text-gray-600">결과 확인</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}