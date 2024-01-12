export const isAccessTokenExpired = (accessToken: string | null) => {
  if (!accessToken || typeof accessToken !== 'string') {
    return true
  }

  try {
    // Token'ı parse et ve içindeki verilere eriş
    const tokenData = JSON.parse(atob(accessToken.split('.')[1]))

    // Geçerlilik süresini kontrol et (expire zamanı saniye cinsinden)
    const expirationTime = tokenData.exp * 1000 // Saniye cinsinden süreyi milisaniyeye çevir
    const currentTime = new Date().getTime()

    // Şu anki zaman, token'ın geçerlilik süresinden büyükse token geçersizdir
    return currentTime > expirationTime
  } catch (error) {
    console.error('Token parse hatası:', error)
    return true // Token'ı parse edemezsek veya bir hata olursa, token geçersiz kabul edilir
  }
}
