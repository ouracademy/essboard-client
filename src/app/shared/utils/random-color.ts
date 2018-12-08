const seedrandom = require('seedrandom')
const defaultRandom = () => Math.random()
const randomFrom = aText => () => {
  return seedrandom(aText)()
}
const palettePastelColor = (random = defaultRandom, ligth) => {
  const hBase = random()

  return {
    h: Math.floor(hBase * 360),
    s: 100,
    l: ligth
  }
}

export const randomColor = (text, ligth = 60) => {
  const a = 0.5
  const { h, s, l } = palettePastelColor(randomFrom(text), ligth)
  return `hsla(${h}, ${s}%, ${l}%,${a})`
}
