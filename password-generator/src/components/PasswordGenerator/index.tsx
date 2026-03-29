import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useCallback, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Checkbox from '../Checkbox'

import passwordGif from '../../assets/gif/password.gif'
import copyIcon from '../../assets/icons/copy.svg'
import refreshIcon from '../../assets/icons/refresh.svg'

import './index.css'

const CHARACTER_POOL = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  specialChars: '!@#$%^&*()',
}

const containsAny = (str: string, pool: string) => {
  return pool.split('').some(char => str.includes(char))
}

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [password, setPassword] = useState<string>('')
  const [passwordStrength, setPasswordStrength] = useState<string>('')
  const [passwordType, setPasswordType] = useState({
    uppercase: true,
    lowercase: false,
    numbers: true,
    specialChars: false,
  })
  const [copied, setCopied] = useState(false)

  const onChangePasswordLength = (value: any) => {
    setPasswordLength(value)
  }

  const generatePassword = useCallback(() => {
    let pool = ''
    if (passwordType.uppercase) {
      pool += CHARACTER_POOL.uppercase
    }
    if (passwordType.lowercase) {
      pool += CHARACTER_POOL.lowercase
    }
    if (passwordType.numbers) {
      pool += CHARACTER_POOL.numbers
    }
    if (passwordType.specialChars) {
      pool += CHARACTER_POOL.specialChars
    }
    
    let generatedPassword = ''
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * pool.length)
      generatedPassword += pool[randomIndex]
    }
    setPassword(generatedPassword)
  }, [passwordType, passwordLength])

  const toggleType = (key: keyof typeof passwordType) => {
    const updatedType = { ...passwordType, [key]: !passwordType[key] }
    const anyChecked = Object.values(updatedType).some(Boolean)
    if (anyChecked) {
      setPasswordType(updatedType)
    }
  }

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  useEffect(() => {
    if(passwordLength < 8) {
      setPasswordStrength('Too short')
    } else {
      let fields = 0
      fields = containsAny(password, CHARACTER_POOL.uppercase) ? 1 : 0
      fields += containsAny(password, CHARACTER_POOL.lowercase) ? 1 : 0
      fields += containsAny(password, CHARACTER_POOL.numbers) ? 1 : 0
      fields += containsAny(password, CHARACTER_POOL.specialChars) ? 1 : 0
      if(fields < 3) {
        setPasswordStrength('Weak')

      } else if (fields === 3) {
        setPasswordStrength('Medium')
      } else {
        setPasswordStrength('Hard')
      }
    }
  }, [password])

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Ensure online account safety by creating strong and secure passwords
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" value={password} />  
          <img src={refreshIcon} alt="refresh the password" onClick={generatePassword} />
        </div>
        <CopyToClipboard text={password} onCopy={() => setCopied(true)}>
          <button className="copy-btn">
            <img src={copyIcon} alt="copy password" />
            {copied ? 'Copied' : 'Copy'}
          </button>
        </CopyToClipboard>
      </div>
      <span className={`fw-500
        ${['Too short', 'Weak'].includes(passwordStrength) ? 'danger'
        : passwordStrength === 'Medium' ? 'warning' : 'success'}`}>
        {passwordStrength}
      </span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox id="uppercase" label="Uppercase" checked={passwordType.uppercase} name="upper" onChange={() =>toggleType('uppercase')} />
        <Checkbox id="lowercase" label="Lowercase" checked={passwordType.lowercase} name="lower" onChange={() =>toggleType('lowercase')} />
        <Checkbox id="numbers" label="Numbers" checked={passwordType.numbers} name="numbers" onChange={() =>toggleType('numbers')} />
        <Checkbox id="special chars" label="Special Characters" checked={passwordType.specialChars} name="specialChars" onChange={() =>toggleType('specialChars')} />
      </div>
    </div>
  )
}

export default PasswordGenerator
