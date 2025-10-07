/**
 * 이미지를 리사이즈하고 압축합니다
 */
export function compressImage(
    dataUrl: string,
    maxWidth: number = 800,
    quality: number = 0.8
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
  
        // 최대 너비 제한
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
  
        canvas.width = width
        canvas.height = height
  
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas context not available'))
          return
        }
  
        ctx.drawImage(img, 0, 0, width, height)
  
        // JPEG로 압축
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve(compressedDataUrl)
      }
      img.onerror = reject
      img.src = dataUrl
    })
  }
  
  /**
   * Base64 이미지 크기 계산 (KB)
   */
  export function getImageSizeKB(dataUrl: string): number {
    const base64 = dataUrl.split(',')[1]
    const bytes = (base64.length * 3) / 4
    return Math.round(bytes / 1024)
  }