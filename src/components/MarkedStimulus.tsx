/** Hebt die Zielstelle im Satz hervor, ohne die Zeichenfolge zu verändern. */
export function MarkedStimulus({ text, target }: { text: string; target?: string }) {
  const piece = target ? locate(text, target) : null
  if (!piece) return <p className="stimulus">{text}</p>
  return (
    <p className="stimulus">
      {piece.before}
      <mark className="target-mark">{piece.match}</mark>
      {piece.after}
    </p>
  )
}

function locate(text: string, target: string): { before: string; match: string; after: string } | null {
  const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const found = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'u').exec(text)
  const index = found?.index ?? text.indexOf(target)
  if (index < 0) return null
  const match = text.slice(index, index + target.length)
  return { before: text.slice(0, index), match, after: text.slice(index + target.length) }
}
