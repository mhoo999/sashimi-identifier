import type { FishAnalysis } from '@/types/fish'

interface FishResultCardProps {
  analysis: FishAnalysis
  image: string
  onReset: () => void
}

export default function FishResultCard({ analysis, image, onReset }: FishResultCardProps) {
  return (
    <div className="space-y-6 scroll-unroll">
      <img 
        src={image} 
        alt="Analyzed" 
        className="w-full rounded-lg gold-border"
      />

      {/* 생선 이름 - 타이틀 */}
      <div className="text-center border-b-2 border-amber-800 pb-4">
        <div className="inline-block px-6 py-2 mb-3" style={{ 
          background: 'linear-gradient(135deg, var(--dark-red) 0%, #5a0000 100%)',
          border: '2px solid var(--gold)',
          borderRadius: '8px'
        }}>
          <h2 className="text-3xl font-bold mb-1" style={{ color: 'var(--gold)', textShadow: '0 0 10px rgba(212, 175, 55, 0.5)' }}>
            {analysis.fishName}
          </h2>
        </div>
        <p className="text-stone-700 font-semibold">
          {analysis.fishNameEn} / {analysis.fishNameJp}
        </p>
        <div className="mt-3">
          <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold border-2 ${
            analysis.confidence >= 80 
              ? 'bg-green-900/30 border-green-700 text-green-200'
              : analysis.confidence >= 60
              ? 'bg-yellow-900/30 border-yellow-700 text-yellow-200'
              : 'bg-red-900/30 border-red-700 text-red-200'
          }`}>
            ⚡ 확신도: {analysis.confidence}%
          </span>
        </div>
      </div>

      {/* 특징 */}
      <div className="bg-stone-800/40 p-5 rounded-lg border-2 border-amber-700">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2 ancient-text">
          🔍 <span>특징</span>
        </h3>
        <ul className="space-y-2">
          {analysis.characteristics.map((char, idx) => (
            <li key={idx} className="text-stone-700 flex items-start gap-2">
              <span className="text-amber-600 mt-1">◆</span>
              <span>{char}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 맛과 식감 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-5 rounded-lg border-2 border-orange-800">
          <h3 className="font-bold mb-2 flex items-center gap-2 ancient-text text-orange-900">
            👅 <span>맛</span>
          </h3>
          <p className="text-stone-800 text-sm leading-relaxed">{analysis.taste}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-5 rounded-lg border-2 border-purple-800">
          <h3 className="font-bold mb-2 flex items-center gap-2 ancient-text text-purple-900">
            🥢 <span>식감</span>
          </h3>
          <p className="text-stone-800 text-sm leading-relaxed">{analysis.texture}</p>
        </div>
      </div>

      {/* 제철 & 가격 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-lg border-2 border-green-800 text-center">
          <h3 className="font-bold mb-2 ancient-text text-green-900">📅 제철</h3>
          <p className="text-stone-800 text-lg font-bold">{analysis.season}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-5 rounded-lg border-2 border-yellow-800 text-center">
          <h3 className="font-bold mb-2 ancient-text text-yellow-900">💰 가격대</h3>
          <p className="text-stone-800 text-lg font-bold">{analysis.price}</p>
        </div>
      </div>

      {/* 추천 먹는 법 */}
      <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-5 rounded-lg border-2 border-pink-800">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2 ancient-text text-pink-900">
          ✨ <span>추천 먹는 법</span>
        </h3>
        <ul className="space-y-2">
          {analysis.recommendations.map((rec, idx) => (
            <li key={idx} className="text-stone-800 flex items-start gap-2">
              <span className="text-pink-600 mt-1">◆</span>
              <span className="text-sm">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 영양 정보 */}
      <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-5 rounded-lg border-2 border-indigo-800">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2 ancient-text text-indigo-900">
          💊 <span>영양 정보</span>
        </h3>
        <p className="text-stone-800 text-sm leading-relaxed">{analysis.nutrition}</p>
      </div>

      {/* 주의사항 */}
      {analysis.warning && (
        <div className="bg-red-900/20 border-l-4 border-red-700 p-5 rounded">
          <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2 ancient-text">
            ⚠️ <span>주의사항</span>
          </h3>
          <p className="text-red-700 text-sm leading-relaxed">{analysis.warning}</p>
        </div>
      )}

      {/* 대안 */}
      {analysis.alternatives && analysis.alternatives.length > 0 && (
        <div className="bg-stone-700/30 p-5 rounded-lg border-2 border-stone-600">
          <h3 className="font-bold mb-3 flex items-center gap-2 ancient-text text-stone-700">
            🤔 <span>다른 가능성</span>
          </h3>
          <div className="space-y-2">
            {analysis.alternatives.map((alt, idx) => (
              <div 
                key={idx} 
                className="flex justify-between items-center bg-stone-200 p-3 rounded border-2 border-stone-400"
              >
                <span className="text-stone-800 font-semibold text-sm">{alt.name}</span>
                <span className="text-xs bg-stone-700 text-amber-200 px-3 py-1 rounded-full font-bold">
                  {alt.probability}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 새로 분석하기 버튼 */}
      <button
        onClick={onReset}
        className="w-full diablo-button font-semibold py-4 px-6 rounded-lg"
      >
        🔮 새로운 식별 시작
      </button>
    </div>
  )
}