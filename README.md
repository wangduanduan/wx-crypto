# wx-crypto
微信加解密库

# 安装

```
npm i @wangduanduan/wx-crypto
yarn add @wangduanduan/wx-crypto
```

# 用法

```js
// 初始化
let wxCrypto = new WxCrypto(token, encodingAesKey, corpId)

// 获取签名
let signature = wxCrypto.getSignature(timestamps, nonce, msg_encrypt)

// 加密
let encrypt_msg = wxCrypto.decrypt(plain_text)

// 解密
let plain_msg = wxCrypto.decrypt(msg_encrypt)
```

# 接口说明

- class WxCrypto()
  - getSignature
  - decrypt
  - decrypt
