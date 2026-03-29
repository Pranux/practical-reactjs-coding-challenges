import './index.scss'

interface BottomResultBoxProps {
  text: string
}

const BottomResultBox = ({ text }: BottomResultBoxProps) => {

  const longestWord = text.trim() === ''
    ? ''
    : text.trim().split(/\s+/).reduce((longest, current) => {
      const word = current.replace(/[^a-zA-Z]/g, '')
      return word.length > longest.length ? word : longest
  },'')

  const readingTime = text.trim() === '' ? 0 : Math.ceil(text.trim().split(/\s+/).length / 225)

  const bottomResultBar = [
    {
      title: 'Average Reading Time:',
      value: `~${readingTime} minute`,
    },
    {
      title: 'Longest word:',
      value: longestWord,
    },
  ]

  return (
    <div className="bottom-result-bar">
      {bottomResultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox
