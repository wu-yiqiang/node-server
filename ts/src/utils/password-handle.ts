const crypto = require('crypto');

export const md5password = (password: string) => {
  const md5 = crypto.createHash('md5');
  const result = md5.update(password).digest('hex');
  return result;
}
