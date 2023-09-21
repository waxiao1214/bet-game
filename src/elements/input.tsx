import { ChangeEvent, ReactNode } from "react"
import './styles/input.scss'
import clsx from "clsx"

interface TextFieldProps {
  varients: 'large' | 'small'
  readonly?: boolean
  actionComponent?: ReactNode
  icon?: ReactNode
  label?: string
  value?: any
  type?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export const TextField = (props: TextFieldProps) => {
  const { disabled, label, type, actionComponent, icon, onChange, value } = props;
  return <div className="input-container">
    <label>{label}</label>
    <input
      disabled={disabled}
      className={clsx(disabled && 'disabled' )}
      type={type}
      value={value}
      onChange={onChange}
    />
    <div className="action-content">
      {icon}
      {actionComponent}
    </div>
  </div>
}