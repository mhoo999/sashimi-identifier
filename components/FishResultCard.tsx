import type { FishAnalysis } from '@/types/fish'

interface FishResultCardProps {
  analysis: FishAnalysis
  image: string
  onReset: () => void
}

export default function FishResultCard({ analysis, image, onReset }: FishResultCardProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <img 
        src={image} 
        alt="Analyzed" 
        className="w-full rounded-lg shadow-md"
      />

      {/* 생선 이름 */}
      <div className="text-center border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {analysis.fishName}
        </h2>
        <p className="text-gray-600">
          {analysis.fishNameEn} / {analysis.fishNameJp}
        </p>
        <div className="mt-3">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
            analysis.confidence >= 80 
              ? 'bg-green-100 text-green-800'
              : analysis.confidence >= 60
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            확신도: {analysis.confidence}%
          </span>
        </div>
      </div>

      {/* 특징 */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          🔍 <span>특징</span>
        </h3>
        <ul className="space-y-2">
          {analysis.characteristics.map((char, idx) => (
            <li key={idx} className="text-gray-700 flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>{char}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 맛과 식감 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            👅 <span>맛</span>
          </h3>
          <p className="text-gray-800 text-sm leading-relaxed">{analysis.taste}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            🥢 <span>식감</span>
          </h3>
          <p className="text-gray-800 text-sm leading-relaxed">{analysis.texture}</p>
        </div>
      </div>

      {/* 제철 & 가격 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <h3 className="font-semibold mb-2">📅 제철</h3>
          <p className="text-gray-800 text-lg font-bold">{analysis.season}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <h3 className="font-semibold mb-2">💰 가격대</h3>
          <p className="text-gray-800 text-lg font-bold">{analysis.price}</p>
        </div>
      </div>

      {/* 추천 먹는 법 */}
      <div className="bg-pink-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          ✨ <span>추천 먹는 법</span>
        </h3>
        <ul className="space-y-2">
          {analysis.recommendations.map((rec, idx) => (
            <li key={idx} className="text-gray-700 flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              <span className="text-sm">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 영양 정보 */}
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          💊 <span>영양 정보</span>
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">{analysis.nutrition}</p>
      </div>

      {/* 주의사항 */}
      {analysis.warning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            ⚠️ <span>주의사항</span>
          </h3>
          <p className="text-yellow-700 text-sm">{analysis.warning}</p>
        </div>
      )}

      {/* 대안 */}
      {analysis.alternatives && analysis.alternatives.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            🤔 <span>다른 가능성</span>
          </h3>
          <div className="space-y-2">
            {analysis.alternatives.map((alt, idx) => (
              <div 
                key={idx} 
                className="flex justify-between items-center bg-white p-2 rounded"
              >
                <span className="text-gray-700 text-sm">{alt.name}</span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {alt.probability}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg"
      >
        새로 분석하기
      </button>
    </div>
  )
}