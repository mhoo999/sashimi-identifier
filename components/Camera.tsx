'use client'

import { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Camera as CameraIcon, Upload, X } from 'lucide-react'

interface CameraProps {
  onCapture: (imageSrc: string) => void
}

export default function Camera({ onCapture }: CameraProps) {
  const webcamRef = useRef<Webcam>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')

  // 사진 촬영
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      onCapture(imageSrc)
      setIsCameraOpen(false)
    }
  }, [onCapture])

  // 파일 업로드
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onCapture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 카메라 전환 (전면/후면)
  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user')
  }

  return (
    <div className="space-y-4">
      {!isCameraOpen ? (
        // 초기 화면: 카메라 켜기 / 파일 업로드 버튼
        <div className="space-y-4">
          <button
            onClick={() => setIsCameraOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <CameraIcon size={24} />
            카메라로 촬영하기
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
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Upload size={24} />
              갤러리에서 선택하기
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
            className="w-full rounded-lg"
          />

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleCamera}
              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-colors"
            >
              🔄
            </button>
            <button
              onClick={() => setIsCameraOpen(false)}
              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={capture}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
            >
              📸 촬영하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}