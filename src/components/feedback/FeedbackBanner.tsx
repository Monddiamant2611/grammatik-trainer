export function FeedbackBanner({ correct, text }: { correct: boolean; text: string }) {
  return (
    <div className={`feedback-banner ${correct ? 'correct' : 'revise'}`} role="status">
      <p className="feedback-status">{correct ? 'Das stimmt.' : 'Schau noch einmal hin.'}</p>
      <p>{text}</p>
    </div>
  )
}
