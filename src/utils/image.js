export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (err) => reject(err)
  })

export const readImageMeta = async (file) => {
  const dataUrl = await fileToBase64(file)
  return { dataUrl, name: file.name }
}
