const toPascalCase = (s: string) =>
  s
    .split(' ')
    .map(
      (ns) =>
        ns.substr(0, 1).toUpperCase() +
        ns.substr(1, ns.length - 1).toLowerCase()
    )
    .join('')

export default toPascalCase
