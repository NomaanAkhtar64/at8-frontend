export default function imgToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    var fr = new FileReader()
    fr.onload = () => {
      if (typeof fr.result === 'string') resolve(fr.result)
    }
    fr.onerror = () => reject(fr.error)
    fr.readAsDataURL(file)
  })
}
