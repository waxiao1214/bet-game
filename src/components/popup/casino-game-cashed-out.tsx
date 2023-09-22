import './popup.scss'

interface CasinoGameCashedOutPopupProps {
  amount: number
  betAmount: number
}

export const CasinoGameCashedOutPopup = (props: CasinoGameCashedOutPopupProps) => {
  const { amount, betAmount } = props
  const multi = ((amount + betAmount) /betAmount).toFixed(2);
  return (
    <div className='modal-container'>
      <div className="cashout-popup">
        <p>{multi} x</p>
        <div className='seperator'></div>
        <p>$ {amount}</p>
      </div>
    </div>
  )
}