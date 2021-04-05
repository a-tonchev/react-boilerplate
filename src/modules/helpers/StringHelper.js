const cipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => (`0${Number(n).toString(16)}`).substr(-2);
  // eslint-disable-next-line no-bitwise
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text => text.split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
};

const decipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  // eslint-disable-next-line no-bitwise
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded => encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
};

const customEncode = cipher('GeneralConfig.DOMAIN_KEY');
const customDecode = decipher('GeneralConfig.DOMAIN_KEY');

const StringHelper = {
  encode: string => customEncode(string),

  decode: string => customDecode(string),

  slugify(string, separator) {
    let text = string.toString().toLowerCase().trim();

    const sets = [
      { to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]' },
      { to: 'c', from: '[ÇĆĈČ]' },
      { to: 'd', from: '[ÐĎĐÞ]' },
      { to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]' },
      { to: 'g', from: '[ĜĞĢǴ]' },
      { to: 'h', from: '[ĤḦ]' },
      { to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]' },
      { to: 'j', from: '[Ĵ]' },
      { to: 'ij', from: '[Ĳ]' },
      { to: 'k', from: '[Ķ]' },
      { to: 'l', from: '[ĹĻĽŁ]' },
      { to: 'm', from: '[Ḿ]' },
      { to: 'n', from: '[ÑŃŅŇ]' },
      { to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]' },
      { to: 'oe', from: '[Œ]' },
      { to: 'p', from: '[ṕ]' },
      { to: 'r', from: '[ŔŖŘ]' },
      { to: 's', from: '[ßŚŜŞŠ]' },
      { to: 't', from: '[ŢŤ]' },
      { to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]' },
      { to: 'w', from: '[ẂŴẀẄ]' },
      { to: 'x', from: '[ẍ]' },
      { to: 'y', from: '[ÝŶŸỲỴỶỸ]' },
      { to: 'z', from: '[ŹŻŽ]' },
      { to: '-', from: '[·/_,:;\']' },
    ];

    sets.forEach(set => {
      text = text.replace(new RegExp(set.from, 'gi'), set.to);
    });

    text = text.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text

    if ((typeof separator !== 'undefined') && (separator !== '-')) {
      text = text.replace(/-/g, separator);
    }

    return text;
  },

  generateToken(length, lowCase = true, highCase = true, numbers = true) {
    let result = '';
    let characters = lowCase ? 'abcdefghijklmnopqrstuvwxyz' : '';
    characters = highCase ? `${characters}ABCDEFGHIJKLMNOPQRSTUVWXYZ` : characters;
    characters = numbers ? `${characters}0123456789` : characters;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  replace(fullText, stringToReplace, replacement) {
    const re = new RegExp(stringToReplace, 'g');
    return fullText.replace(re, replacement);
  },
};

export default StringHelper;
