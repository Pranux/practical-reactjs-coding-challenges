import './index.scss'
import { pronouns } from '../../data/pronouns'

interface Props {
  text: string
}

const ResultBox = ({ text }: Props) => {

  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const characters = text.length
  const sentences = text.split(/[.!?]+/).length - 1
  const paragraphs = text.split(/\n+/).length
  const pronounses = text.match(new RegExp(`\\b(${pronouns.join('|')})\\b`, 'gi'))?.length || 0

  const resultBar = [
    {
      title: 'Words',
      value: words,
    },
    {
      title: 'Characters',
      value: characters,
    },
    {
      title: 'Sentences',
      value: sentences,
    },
    {
      title: 'Paragraphs ',
      value: paragraphs,
    },
    {
      title: 'Pronouns',
      value: pronounses,
    },
  ]

  return (
    <div className="result-bar">
      {resultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default ResultBox
