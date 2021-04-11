const camelToWords = (s: string) => {
  let out = s.substr(0, 1).toUpperCase()
  let restWord = s.substr(1, s.length - 1)

  for (let char of restWord) {
    if (char.toLowerCase() === char) {
      out += char
    } else {
      out += ' ' + char
    }
  }

  return out
}

export default camelToWords
