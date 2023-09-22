import Select, { SingleValue } from 'react-select'
import './styles/select.scss'

interface SelectProps {
  options?: any[]
  label?: string
  onChange?: (value: any) => void
  value?: string | number
}

export const SelectField = (props: SelectProps) => {
  const { options = [], label, value, onChange } = props

  const customStyles = {
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#363941' : 'transparent', // Example background color
      '&:hover': {
        backgroundColor: '#363941',
      },
    }),
  };

  return <div className="select-container">
    <label>{label}</label>
    <Select
      options={options}
      value={ options.filter(option => option.value === value) }
      onChange={onChange}
      className="custom-select-container"
      classNamePrefix="custom-select"
      styles={customStyles}
      placeholder=""
    />
  </div>
}