'use client'

import { useState } from 'react'
import Camera from '@/components/Camera'
import Loading from '@/components/Loading'
import FishResultCard from '@/components/FishResultCard'
import type { FishAnalysis } from '@/types/fish'
import { useFishStore } from '@/store/useFishStore'
import { Trash2, History, X } from 'lucide-react'

export default function Home() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<FishAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  const { history, addToHistory, removeFromHistory, clearHistory } = useFishStore()

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
        addToHistory(capturedImage, result)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'AI 분석 중 오류가 발생했습니다.'
      setError(errorMessage)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setCapturedImage(null)
    setAnalysisResult(null)
    setError(null)
  }

  const handleHistoryItemClick = (item: { id: string; image: string; analysis: FishAnalysis; timestamp: number }) => {
    setCapturedImage(item.image)
    setAnalysisResult(item.analysis)
    setShowHistory(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 ancient-text">
              📜 Fish Scroll
            </h1>
            <p className="text-sm md:text-base" style={{ color: 'var(--gold)' }}>
              생선 식별 두루마리
            </p>
          </div>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            미지의 회를 식별하는 마법의 두루마리
          </p>
          
          {/* 히스토리 버튼 - 제목 아래로 이동 */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="diablo-button px-4 md:px-6 py-2 md:py-3 rounded-lg flex items-center gap-2 text-sm md:text-base"
            >
              <History size={20} />
              <span>식별 기록</span>
              <span className="bg-amber-600 text-white px-2 py-0.5 rounded-full text-xs">
                {history.length}
              </span>
            </button>
          </div>
        </header>

        {/* 히스토리 모달 */}
        {showHistory && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
              {/* 모달 헤더 */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">분석 히스토리</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 히스토리 목록 */}
              <div className="overflow-y-auto max-h-[60vh] p-6">
                {history.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-6xl mb-4">🐟</div>
                    <p>아직 분석 기록이 없습니다.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.02]"
                        onClick={() => handleHistoryItemClick(item)}
                      >
                        <img
                          src={item.image}
                          alt={item.analysis.fishName}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">
                              {item.analysis.fishName}
                            </h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeFromHistory(item.id)
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.analysis.fishNameEn}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleString('ko-KR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 모달 푸터 */}
              {history.length > 0 && (
                <div className="border-t p-4 flex justify-between">
                  <button
                    onClick={() => {
                      if (confirm('모든 히스토리를 삭제하시겠습니까?')) {
                        clearHistory()
                      }
                    }}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    전체 삭제
                  </button>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-lg font-semibold"
                  >
                    닫기
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 메인 컨텐츠 영역 */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {!capturedImage ? (
              <Camera onCapture={handleCapture} />
            ) : isAnalyzing ? (
              <div>
                <img 
                  src={capturedImage} 
                  alt="Analyzing" 
                  className="w-full rounded-lg mb-6"
                />
                <Loading />
              </div>
            ) : !analysisResult ? (
              <div className="space-y-4">
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="w-full rounded-lg"
                />
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded animate-fadeIn">
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
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02]"
                  >
                    🤖 AI 분석하기
                  </button>
                </div>
              </div>
            ) : (
              <FishResultCard 
                analysis={analysisResult}
                image={capturedImage}
                onReset={handleReset}
              />
            )}
          </div>
        </div>

        {/* 사용법 안내 */}
        {!capturedImage && (
          <div className="max-w-2xl mx-auto mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4">사용법</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="text-4xl mb-2">📸</div>
                <p className="text-sm text-gray-600 font-medium">회 사진 촬영</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="text-4xl mb-2">🤖</div>
                <p className="text-sm text-gray-600 font-medium">AI 분석</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-sm text-gray-600 font-medium">결과 확인</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}