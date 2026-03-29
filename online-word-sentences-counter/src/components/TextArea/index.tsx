import './index.scss'

interface Props {
  onChange: (value: string) => void
}

const TextArea = ({ onChange }: Props) => {
  return (
    <textarea
      className="text-area"
      placeholder="Paste your text here..."
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default TextArea
