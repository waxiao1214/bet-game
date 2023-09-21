import { ReactNode } from 'react';
import clsx from 'clsx'
import './styles/button.scss';

interface ButtonProps {
  text: string
  onClick?: () => void
  children?: ReactNode
  font?: string, // use font family directly
  varients?: 'primary' | 'secondary' | 'game_primary' | 'game_seconday'
  size?: 'small' | 'medium' | 'large'
  styles?: any
  fullWidth?: boolean
}

export const Button = (props: ButtonProps) => {
  const {
    text,
    children,
    varients = 'primary',
    size = 'medium',
    font,
    styles = {},
    onClick,
    fullWidth
  } = props
  return (
    <div className='button-container'>
      <button 
        className={clsx(varients, size, font)}
        style={{
          ...styles,
          width: fullWidth ? '100%' : 'fit-content'
        }}
        onClick={onClick}
      >
        { text }
        { children }
      </button>
    </div>
  )
}