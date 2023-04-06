export const requestImageUpload = (formData) => {
  // formData {file}
  return window.axios.post('/file/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
