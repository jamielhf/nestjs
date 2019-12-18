
const crypto = require('crypto');

/**
 * md5加密
 * @param string 
 */
export  const md5 =(string: string | number): string => {
        const md5 = crypto.createHash('md5');
        return md5.update(string).digest('hex');
}