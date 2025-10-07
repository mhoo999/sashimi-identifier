export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* 두루마리 펼치기 애니메이션 */}
      <div className="relative mb-6">
        <div className="text-7xl animate-pulse identifying">
          📜
        </div>
        {/* 마법 반짝임 효과 */}
        <div className="absolute -top-2 -right-2 text-2xl animate-pulse delay-100">✨</div>
        <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse delay-200">✨</div>
      </div>

      {/* 식별 중 텍스트 */}
      <div className="text-center">
        <p className="text-xl font-bold mb-2 ancient-text">
          🔮 식별 중...
        </p>
        <p className="text-sm" style={{ color: 'var(--gold)' }}>
          고대의 지식을 탐색하고 있습니다
        </p>
      </div>

      {/* 마법 점들 */}
      <div className="mt-6 flex gap-2">
        <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'var(--gold)' }}></div>
        <div className="w-3 h-3 rounded-full animate-pulse delay-100" style={{ background: 'var(--gold)' }}></div>
        <div className="w-3 h-3 rounded-full animate-pulse delay-200" style={{ background: 'var(--gold)' }}></div>
      </div>

      {/* 고대 룬 문자 효과 (선택) */}
      <div className="mt-6 text-xs opacity-50" style={{ color: 'var(--gold)' }}>
        <div className="flex gap-4 animate-pulse">
          <span>ᚠ</span>
          <span>ᚢ</span>
          <span>ᚦ</span>
          <span>ᚨ</span>
          <span>ᚱ</span>
          <span>ᚲ</span>
        </div>
      </div>
    </div>
  )
}