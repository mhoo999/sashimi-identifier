'use client'

import { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Camera as CameraIcon, Upload, X } from 'lucide-react'
import { compressImage, getImageSizeKB } from '@/lib/imageUtils'

interface CameraProps {
  onCapture: (imageSrc: string) => void
}

export default function Camera({ onCapture }: CameraProps) {
  const webcamRef = useRef<Webcam>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [isCompressing, setIsCompressing] = useState(false)

  // 사진 촬영
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setIsCompressing(true)
      try {
        const compressed = await compressImage(imageSrc, 1024, 0.85)
        console.log('이미지 압축:', getImageSizeKB(imageSrc), 'KB →', getImageSizeKB(compressed), 'KB')
        onCapture(compressed)
        setIsCameraOpen(false)
      } catch (error) {
        console.error('이미지 압축 실패:', error)
        onCapture(imageSrc)
        setIsCameraOpen(false)
      } finally {
        setIsCompressing(false)
      }
    }
  }, [onCapture])

  // 파일 업로드
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsCompressing(true)
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const compressed = await compressImage(reader.result as string, 1024, 0.85)
          console.log('이미지 압축:', Math.round(file.size / 1024), 'KB →', getImageSizeKB(compressed), 'KB')
          onCapture(compressed)
        } catch (error) {
          console.error('이미지 압축 실패:', error)
          onCapture(reader.result as string)
        } finally {
          setIsCompressing(false)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // 카메라 전환 (전면/후면)
  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user')
  }

  if (isCompressing) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4 animate-pulse">🔮</div>
        <p className="ancient-text">이미지 처리 중...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {!isCameraOpen ? (
        // 초기 화면: 카메라 켜기 / 파일 업로드 버튼
        <div className="space-y-4">
          <button
            onClick={() => setIsCameraOpen(true)}
            className="w-full diablo-button font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2"
          >
            <CameraIcon size={24} />
            📸 직접 촬영하기
          </button>

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="w-full bg-stone-700 hover:bg-stone-600 border-2 border-amber-700 text-amber-200 font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Upload size={24} />
              📜 보관함에서 선택하기
            </label>
          </div>
        </div>
      ) : (
        // 카메라 화면
        <div className="relative">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: facingMode
            }}
            className="w-full rounded-lg gold-border"
          />

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleCamera}
              className="bg-stone-800/90 hover:bg-stone-700 border-2 border-amber-600 text-amber-200 p-3 rounded-full shadow-lg transition-colors"
            >
              🔄
            </button>
            <button
              onClick={() => setIsCameraOpen(false)}
              className="bg-stone-800/90 hover:bg-stone-700 border-2 border-red-600 text-red-200 p-3 rounded-full shadow-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={capture}
              disabled={isCompressing}
              className="w-full diablo-button font-semibold py-4 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCompressing ? '⏳ 처리 중...' : '📸 촬영하기'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}