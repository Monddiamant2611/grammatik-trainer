import { useState } from 'react'
import type { Answer, SortBucket, SortItem, Task, ToggleToken, WordToken } from '../../engine/types'
import { rngFromString, shuffleVisible } from '../../engine/random'

export type BoardTone = 'training' | 'explore' | 'exam'

interface BoardProps {
  task: Task
  answer: Answer | null
  locked: boolean
  tone: BoardTone
  onChange: (answer: Answer) => void
}

export function TaskInteraction({ task, answer, locked, tone, onChange }: BoardProps) {
  const interaction = task.interaction
  if (interaction.kind === 'mark') {
    const ids = answer?.kind === 'ids' ? answer.ids : []
    return (
      <MarkSentence
        tokens={interaction.tokens}
        selected={ids}
        correctIds={interaction.correctIds}
        mode={interaction.mode}
        locked={locked}
        tone={tone}
        onChange={(next) => onChange({ kind: 'ids', ids: next })}
      />
    )
  }
  if (interaction.kind === 'choose') {
    return (
      <ChoiceList
        options={interaction.options}
        value={answer?.kind === 'choice' ? answer.id : null}
        correctId={interaction.correctId}
        layout={interaction.layout}
        locked={locked}
        tone={tone}
        seed={task.id}
        onChange={(id) => onChange({ kind: 'choice', id })}
      />
    )
  }
  if (interaction.kind === 'classify') {
    return (
      <ClassifyBoard
        items={interaction.items}
        buckets={interaction.buckets}
        value={answer?.kind === 'map' ? answer.map : {}}
        solution={interaction.solution}
        locked={locked}
        tone={tone}
        seed={task.id}
        onChange={(map) => onChange({ kind: 'map', map })}
      />
    )
  }
  if (interaction.kind === 'order') {
    return (
      <OrderBoard
        items={interaction.items}
        value={answer?.kind === 'order' ? answer.ids : []}
        correctIds={interaction.correctIds}
        locked={locked}
        tone={tone}
        seed={task.id}
        onChange={(ids) => onChange({ kind: 'order', ids })}
      />
    )
  }
  if (interaction.kind === 'toggle') {
    const values = answer?.kind === 'toggle'
      ? answer.values
      : Object.fromEntries(interaction.tokens.map((token) => [token.id, token.faulty]))
    return (
      <ToggleSentence
        tokens={interaction.tokens}
        values={values}
        locked={locked}
        tone={tone}
        onChange={(next) => onChange({ kind: 'toggle', values: next })}
      />
    )
  }
  if (interaction.kind === 'commas') {
    const slots = answer?.kind === 'commas' ? answer.slots : []
    return (
      <CommaSentence
        words={interaction.words}
        slots={slots}
        correctSlots={interaction.correctSlots}
        locked={locked}
        tone={tone}
        onChange={(next) => onChange({ kind: 'commas', slots: next })}
      />
    )
  }
  const value = answer?.kind === 'bool' ? answer.value : null
  return (
    <ChoiceList
      options={[{ id: 'ja', text: 'Stimmt' }, { id: 'nein', text: 'Stimmt nicht' }]}
      value={value === null ? null : value ? 'ja' : 'nein'}
      correctId={interaction.correct ? 'ja' : 'nein'}
      layout="pair"
      locked={locked}
      tone={tone}
      seed={`${task.id}-bool`}
      onChange={(id) => onChange({ kind: 'bool', value: id === 'ja' })}
    />
  )
}

export function MarkSentence({
  tokens,
  selected,
  correctIds,
  mode,
  locked,
  tone,
  onChange,
}: {
  tokens: readonly WordToken[]
  selected: readonly string[]
  correctIds: readonly string[]
  mode: 'single' | 'multi'
  locked: boolean
  tone: BoardTone
  onChange: (ids: string[]) => void
}) {
  return (
    <p className="token-sentence">
      {tokens.map((token) => {
        if (!token.selectable) return <span key={token.id} className="token-punct">{token.text}</span>
        const isSelected = selected.includes(token.id)
        const isSolution = locked && tone === 'training' && correctIds.includes(token.id)
        const isMismatch = locked && tone === 'training' && isSelected && !correctIds.includes(token.id)
        return (
          <button
            key={token.id}
            type="button"
            className={`token-chip ${isSelected ? 'selected' : ''} ${isSolution ? 'solution' : ''} ${isMismatch ? 'mismatch' : ''}`}
            aria-pressed={isSelected}
            disabled={locked}
            onClick={() => {
              if (mode === 'single') onChange(isSelected ? [] : [token.id])
              else onChange(isSelected ? selected.filter((id) => id !== token.id) : [...selected, token.id])
            }}
          >
            {token.text}
          </button>
        )
      })}
    </p>
  )
}

export function ChoiceList({
  options,
  value,
  correctId,
  layout,
  locked,
  tone,
  seed,
  onChange,
}: {
  options: readonly { id: string; text: string }[]
  value: string | null
  correctId?: string
  layout: 'stack' | 'pair'
  locked: boolean
  tone: BoardTone
  seed: string
  onChange: (id: string) => void
}) {
  const [order] = useState(() => shuffleVisible(options, rngFromString(seed)))
  return (
    <div className={`choice-list ${layout === 'pair' ? 'choice-pair' : ''}`}>
      {order.map((option) => {
        const selected = value === option.id
        const showSolution = locked && tone === 'training' && option.id === correctId
        const showMismatch = locked && tone === 'training' && selected && option.id !== correctId
        return (
          <button
            key={option.id}
            type="button"
            className={`choice-option ${selected ? 'selected' : ''} ${showSolution ? 'solution' : ''} ${showMismatch ? 'mismatch' : ''}`}
            aria-pressed={selected}
            disabled={locked}
            onClick={() => onChange(option.id)}
          >
            {option.text}
          </button>
        )
      })}
    </div>
  )
}

export function ClassifyBoard({
  items,
  buckets,
  value,
  solution,
  locked,
  tone,
  seed,
  onChange,
}: {
  items: readonly SortItem[]
  buckets: readonly SortBucket[]
  value: Record<string, string>
  solution?: Record<string, string>
  locked: boolean
  tone: BoardTone
  seed: string
  onChange: (map: Record<string, string>) => void
}) {
  const [active, setActive] = useState<string | null>(null)
  const [bank] = useState(() => shuffleVisible(items, rngFromString(`${seed}-classify`)))
  const open = bank.filter((item) => !value[item.id])
  const accents = ['sage', 'sky', 'rose', 'violet', 'clay', 'teal']

  const assign = (itemId: string, bucketId: string) => {
    if (locked) return
    const next = { ...value }
    if (bucketId) next[itemId] = bucketId
    else delete next[itemId]
    onChange(next)
    setActive(null)
  }

  return (
    <div className="classify-board">
      <div className="item-bank" aria-label="Begriffe">
        {open.map((item) => (
          <button
            key={item.id}
            type="button"
            draggable={!locked}
            className={`sort-card ${active === item.id ? 'active' : ''}`}
            onClick={() => setActive(active === item.id ? null : item.id)}
            onDragStart={(event) => {
              event.dataTransfer.setData('text/plain', item.id)
              setActive(item.id)
            }}
          >
            {item.text}
          </button>
        ))}
        {open.length === 0 && <p className="muted-note">Alle Begriffe sind zugeordnet. Tippe einen Begriff an, um ihn zurückzulegen.</p>}
      </div>
      <div className={`bucket-grid buckets-${Math.min(buckets.length, 3)}`}>
        {buckets.map((bucket, index) => (
          <section
            key={bucket.id}
            className={`bucket accent-${accents[index % accents.length]}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              const itemId = event.dataTransfer.getData('text/plain') || active
              if (itemId) assign(itemId, bucket.id)
            }}
          >
            <h3>{bucket.label}</h3>
            <button type="button" className="bucket-target" disabled={locked || !active} onClick={() => active && assign(active, bucket.id)}>
              {active ? 'Hier zuordnen' : 'Erst antippen, dann hier'}
            </button>
            <ul>
              {items.filter((item) => value[item.id] === bucket.id).map((item) => {
                const wrong = locked && tone === 'training' && solution && solution[item.id] !== bucket.id
                const right = locked && tone === 'training' && solution && solution[item.id] === bucket.id
                return (
                  <li key={item.id}>
                    <button type="button" className={`sort-card ${right ? 'solution' : ''} ${wrong ? 'mismatch' : ''}`} disabled={locked} onClick={() => assign(item.id, '')}>
                      {item.text}
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

export function OrderBoard({
  items,
  value,
  correctIds,
  locked,
  tone,
  seed,
  onChange,
}: {
  items: readonly SortItem[]
  value: readonly string[]
  correctIds: readonly string[]
  locked: boolean
  tone: BoardTone
  seed: string
  onChange: (ids: string[]) => void
}) {
  const [bank] = useState(() => shuffleVisible(
    items,
    rngFromString(seed),
    (order) => order.length === correctIds.length && order.every((item, index) => item.id === correctIds[index]),
  ))
  const used = new Set(value)
  const append = (id: string) => {
    if (locked || used.has(id)) return
    onChange([...value, id])
  }
  return (
    <div className="order-board">
      <div className="item-bank" aria-label="Bausteine">
        {bank.map((item) => (
          <button
            key={item.id}
            type="button"
            className="sort-card"
            draggable={!locked && !used.has(item.id)}
            disabled={locked || used.has(item.id)}
            onClick={() => append(item.id)}
            onDragStart={(event) => event.dataTransfer.setData('text/plain', item.id)}
          >
            {item.text}
          </button>
        ))}
      </div>
      <div
        className="order-lane"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          append(event.dataTransfer.getData('text/plain'))
        }}
      >
        <p className="muted-note">Reihenfolge: antippen oder hierher ziehen. Noch einmal tippen nimmt den Baustein zurück.</p>
        <ol>
          {value.map((id, index) => {
            const item = items.find((entry) => entry.id === id)
            const right = locked && tone === 'training' && correctIds[index] === id
            const wrong = locked && tone === 'training' && correctIds[index] !== id
            return (
              <li key={`${id}-${index}`}>
                <button type="button" className={`sort-card ${right ? 'solution' : ''} ${wrong ? 'mismatch' : ''}`} disabled={locked} onClick={() => onChange(value.filter((entry) => entry !== id))}>
                  <span className="order-index">{index + 1}</span>
                  {item?.text ?? id}
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

function ToggleSentence({
  tokens,
  values,
  locked,
  tone,
  onChange,
}: {
  tokens: readonly ToggleToken[]
  values: Record<string, string>
  locked: boolean
  tone: BoardTone
  onChange: (values: Record<string, string>) => void
}) {
  return (
    <p className="token-sentence">
      {tokens.map((token) => {
        const current = values[token.id] ?? token.faulty
        const changeable = token.faulty !== token.correct
        const right = locked && tone === 'training' && current === token.correct
        const wrong = locked && tone === 'training' && current !== token.correct
        if (!changeable) {
          return <span key={token.id} className="token-fixed">{`${token.before ?? ''}${current}${token.after ?? ''}`}</span>
        }
        const next = current === token.faulty ? token.correct : token.faulty
        return (
          <button
            key={token.id}
            type="button"
            className={`token-chip ${right ? 'solution' : ''} ${wrong ? 'mismatch' : ''}`}
            disabled={locked}
            onClick={() => onChange({ ...values, [token.id]: next })}
          >
            {`${token.before ?? ''}${current}${token.after ?? ''}`}
          </button>
        )
      })}
    </p>
  )
}

function CommaSentence({
  words,
  slots,
  correctSlots,
  locked,
  tone,
  onChange,
}: {
  words: readonly string[]
  slots: readonly number[]
  correctSlots: readonly number[]
  locked: boolean
  tone: BoardTone
  onChange: (slots: number[]) => void
}) {
  const toggle = (index: number) => {
    if (locked) return
    onChange(slots.includes(index) ? slots.filter((slot) => slot !== index) : [...slots, index])
  }
  return (
    <p className="comma-sentence">
      {words.map((word, index) => {
        const active = slots.includes(index)
        const right = locked && tone === 'training' && correctSlots.includes(index) && active
        const wrong = locked && tone === 'training' && active !== correctSlots.includes(index) && index < words.length - 1
        return (
          <span key={`${word}-${index}`} className="comma-piece">
            <span className="comma-word">{word}</span>
            {index < words.length - 1 && (
              <button
                type="button"
                className={`comma-slot ${active ? 'selected' : ''} ${right ? 'solution' : ''} ${wrong ? 'mismatch' : ''}`}
                disabled={locked}
                aria-pressed={active}
                aria-label={active ? `Komma nach ${word} entfernen` : `Komma nach ${word} setzen`}
                onClick={() => toggle(index)}
              >
                {active ? ',' : '·'}
              </button>
            )}
          </span>
        )
      })}
      <span className="token-punct">.</span>
    </p>
  )
}
