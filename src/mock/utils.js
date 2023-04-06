/**
 * @param {any} result
 * @returns {
 *  { ret: number, result: *, serverTime: string }
 *  }
 */
export function generateSuccess(result = {}) {
  return {
    ret: 200,
    result,
    serverTime: '@integer(1680858265303, 1709256991186)' // 更新时间
  }
}

export const responseSuccess = generateSuccess()

export const responseUpload = generateSuccess({
  url: 'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/079f1014cbfc46109450a18abbb36f6b.jpeg'
})

export const responseUploadMp4 = generateSuccess({
  url: 'https://mv-res.xdplt.com/sandbox/2020/07/25/EB7650B54A904B6A3DEE813F2911D64E.mp4'
})

export const responseAppUpload = generateSuccess({
  weChatApiCert:
    'https://mv-res.xdplt.com/sandbox/2020/07/25/EF7C5661EEBE8530768F64E7BAD7482F.jpg?p12=1',
  weChatMchPrivateKey:
    'https://mv-res.xdplt.com/sandbox/2020/07/25/EF7C5661EEBE8530768F64E7BAD7482F.jpg?p12=2',
  weChatMchCertSerialNo:
    'https://mv-res.xdplt.com/sandbox/2020/07/25/EF7C5661EEBE8530768F64E7BAD7482F.jpg?pem=3',
  alipayAppCert:
    'https://mv-res.xdplt.com/sandbox/2020/07/25/EF7C5661EEBE8530768F64E7BAD7482F.jpg?crt=4',
  alipayPublicCert:
    'https://mv-res.xdplt.com/sandbox/2020/07/25/EF7C5661EEBE8530768F64E7BAD7482F.jpg?crt=5',
  alipayRootCert:
    'https://mv-res.xdplt.com/sandbox/2020/07/25/EF7C5661EEBE8530768F64E7BAD7482F.jpg?crt=6'
})

export const responseFail = {
  ret: 2002,
  message: 'mock failed',
  result: {}
}

export const responseTokenExpired = {
  code: 401,
  message: 'token expired!',
  result: {}
}
