export const requestVersion = () => {
  return new Promise((resolve) => {
    window.axios
      .get(`${window.location.origin}/data/version.json?t=${Date.now()}`)
      .then((res) => {
        try {
          for (const key of Object.keys(window.localStorage)) {
            if (/^ref.+table/.test(key) && !key.endsWith(res.version)) {
              window.localStorage.removeItem(key)
            }
          }
        } catch (e) {
        } finally {
          resolve(res)
        }
      })
      .catch(() => {
        resolve()
      })
  })
}
