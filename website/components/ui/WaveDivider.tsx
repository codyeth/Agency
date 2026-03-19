export default function WaveDivider({ from = '#EEF5FF', to = '#fff' }: { from?: string; to?: string }) {
  return (
    <svg viewBox="0 0 1440 64" fill="none" style={{ display: 'block', background: to }}>
      <path d="M0 0C360 64 720 64 1080 32C1260 16 1380 0 1440 0V64H0V0Z" fill={from} />
    </svg>
  )
}
