const createRandomRange = (start: number, end: number, len: number) => {
  let out = []
  while (out.length <= len) {
    let num = Math.floor(Math.random() * (end - start + 1)) + start
    while (out.includes(num)) {
      num = Math.floor(Math.random() * (end - start + 1)) + start
    }
    out.push(num)
  }
  return out
}
export default createRandomRange
