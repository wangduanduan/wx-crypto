const crypto = require('crypto')
const BLOCK_SIZE = 32

class WxCrypt {
    constructor(token, encodingAESKey, id) {
        if (!token || !encodingAESKey || !id) {
            throw new Error('please check arguments');
        }

        let AESKey = new Buffer.from(encodingAESKey + '=', 'base64')
        if (AESKey.length !== 32) {
            throw new Error('encodingAESKey invalid');
        }

        this.token = token
        this.id = id
        this.key = AESKey
        this.iv = AESKey.slice(0, 16)
    }
    decode(text) {
        let pad = text[text.length - 1]

        pad = pad < 1 || pad > 32 ? 0 : pad

        return text.slice(0, text.length - pad)
    }
    encode(text) {
        let amountToPad = BLOCK_SIZE - (text.length % BLOCK_SIZE);
        return Buffer.concat([text, Buffer.alloc(amountToPad, amountToPad)])
    }
    getSignature (timestamp, nonce, msg_encrypt) {
        // console.log(this.token, timestamp, nonce, msg_encrypt)
        return crypto.createHash('sha1').update([this.token, timestamp, nonce, msg_encrypt].sort().join('')).digest('hex')
    }
    decrypt(text){
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv)
        decipher.setAutoPadding(false)
        let deciphered = Buffer.concat([decipher.update(text, 'base64'), decipher.final()])
        deciphered = this.decode(deciphered)

        let content = deciphered.slice(16)
        let length = content.slice(0, 4).readUInt32BE(0)
    
        return {
            message: content.slice(4, length + 4).toString(),
            id: content.slice(length + 4).toString()
        }
    }
    encrypt(text){
        let msgBuffer = new Buffer.from(text)
        let msgLengthBuffer = new Buffer.alloc(4)
        msgLengthBuffer.writeUInt32BE(msgBuffer.length, 0)

        let bufMsg = Buffer.concat([
            crypto.randomBytes(16),
            msgLengthBuffer,
            msgBuffer,
            new Buffer.from(this.id)
        ])

        let cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv)
        cipher.setAutoPadding(false) 

        return Buffer.concat([cipher.update(this.encode(bufMsg)), cipher.final()]).toString('base64')
    }
}

module.exports = WxCrypt