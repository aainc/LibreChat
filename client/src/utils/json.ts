export function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function formatJSON(json: string) {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch (e) {
    return json;
  }
}

// 日本語などのUnicode文字をエスケープせずにJSON文字列化する関数
export function formatJSONWithoutEscaping(obj: any) {
  try {
    return JSON.stringify(obj, null, 2).replace(
      /\\u([0-9a-fA-F]{4})/g, 
      (_, codePoint) => String.fromCodePoint(parseInt(codePoint, 16))
    );
  } catch (e) {
    return JSON.stringify(obj);
  }
}

export function extractJson(text: string) {
  let openBraces = 0;
  let startIndex = -1;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') {
      if (openBraces === 0) {
        startIndex = i;
      }
      openBraces++;
    } else if (text[i] === '}') {
      openBraces--;
      if (openBraces === 0 && startIndex !== -1) {
        return text.slice(startIndex, i + 1);
      }
    }
  }

  return '';
}
