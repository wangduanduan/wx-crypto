const WxCrypto = require('./index')

// 下面例子的所有数据来自微信官方例子
// https://work.weixin.qq.com/api/doc/90000/90139/90968
corpId = "wx5823bf96d3bd56c7"
token = "QDG6eK"
encodingAesKey = "jWmYm7qr5nMoAUwZRjGtBxmz3KA1tkAj3ykkR6q2B2C"
signature = "477715d11cdb4164915debcba66cb864d751f3e6";
timestamps = "1409659813";
nonce = "1372623149";
msg_encrypt = "RypEvHKD8QQKFhvQ6QleEB4J58tiPdvo+rtK1I9qca6aM/wvqnLSV5zEPeusUiX5L5X/0lWfrf0QADHHhGd3QczcdCUpj911L3vg3W/sYYvuJTs3TUUkSUXxaccAS0qhxchrRYt66wiSpGLYL42aM6A8dTT+6k4aSknmPj48kzJs8qLjvd4Xgpue06DOdnLxAUHzM6+kDZ+HMZfJYuR+LtwGc2hgf5gsijff0ekUNXZiqATP7PF5mZxZ3Izoun1s4zG4LUMnvw2r+KqCKIw+3IQH03v+BCA9nMELNqbSf6tiWSrXJB3LAVGUcallcrw8V2t9EL4EhzJWrQUax5wLVMNS0+rUPA3k22Ncx4XXZS9o0MBH27Bo6BpNelZpS+/uh9KsNlY6bHCmJU9p8g7m3fVKn28H3KDYA5Pl/T8Z1ptDAVe0lXdQ2YoyyH2uyPIGHBZZIs2pDBS8R07+qN+E7Q==";
plain_msg = `<xml><ToUserName><![CDATA[wx5823bf96d3bd56c7]]></ToUserName>
<FromUserName><![CDATA[mycreate]]></FromUserName>
<CreateTime>1409659813</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[hello]]></Content>
<MsgId>4561255354251345929</MsgId>
<AgentID>218</AgentID>
</xml>`

let wxCrypto = new WxCrypto(token, encodingAesKey, corpId)
let plainMsg = wxCrypto.decrypt(msg_encrypt)

test('获取签名测试', () => {
    expect(wxCrypto.getSignature(timestamps, nonce, msg_encrypt)).toBe(signature)
})

test('解密测试', () => {
    expect(wxCrypto.decrypt(msg_encrypt).message).toBe(plain_msg)
})

test('加密测试', () => {
    let plain_text = 'hello wrold'
    let encrypt_msg = wxCrypto.encrypt(plain_text)
    expect(wxCrypto.decrypt(encrypt_msg).message).toBe(plain_text)
})



