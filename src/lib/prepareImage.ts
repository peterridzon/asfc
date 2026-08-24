/** Formats every browser can render. Anything else has to be re-encoded. */
const DISPLAYABLE = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/avif'])

const MAX_EDGE = 2400
const JPEG_QUALITY = 0.9

/**
 * Gets a photo ready for upload.
 *
 * iPhones and iPads hand over HEIC files, which nothing outside Apple can
 * display, and full-resolution photos are needlessly heavy. Both are fixed by
 * drawing the picture onto a canvas and exporting a JPEG. SVG and GIF are left
 * alone — one is already tiny, the other would lose its animation.
 */
export async function prepareImage(file: File): Promise<File> {
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') return file

  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))

    if (scale === 1 && DISPLAYABLE.has(file.type)) {
      bitmap.close()
      return file
    }

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)

    const context = canvas.getContext('2d')
    if (!context) {
      bitmap.close()
      return file
    }

    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
    )
    if (!blob) return file

    const name = `${file.name.replace(/\.[^.]+$/, '') || 'image'}.jpg`
    return new File([blob], name, { type: 'image/jpeg' })
  } catch {
    // Unreadable by the browser — let the server decide whether to accept it.
    return file
  }
}
