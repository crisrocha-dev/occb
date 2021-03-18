const Cryptr = require('cryptr')

const crypto  = require('crypto')



export function encrypto(text){
  var cipher = crypto.createCipheriv('aes-256-cbc',
    Buffer.from('2005suiciniv2019ivad2021ivar1989enaitsirc'), Buffer.from('vectorvector1234'))
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

export function decrypto(text){
  var decipher = crypto.createDecipheriv('aes-256-cbc',
    Buffer.from('2005suiciniv2019ivad2021ivar1989enaitsirc'), Buffer.from('vectorvector1234'))
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

const cryptr = new Cryptr('qsvgb*&¨%$#@!)(*hsdfsd')

export const encrypt = (value) => {
    let crypted = cryptr.encrypt(value)

    return crypted
};

export const decrypt = (value) => {
    const decrypted = cryptr.decrypt(value);

    return decrypted
};