export const formatText = (text?: string): string | null => {
  if (!text) return null

  const splitText = text.toLowerCase().split(' ')
  const capitalisedWords = splitText
    .filter((text) => !!text)
    .map((text) => {
      return text[0].toUpperCase() + text.substring(1);
    })

  return capitalisedWords.join(' ')
}