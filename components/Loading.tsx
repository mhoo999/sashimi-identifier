export default function Loading() {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative">
          {/* 물고기 애니메이션 */}
          <div className="text-6xl animate-bounce">🐟</div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">AI가 회를 분석하는 중...</p>
        <div className="mt-2 flex gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    )
  }