import './popup.scss'
import Bomb from '../../static/img/bomb_img.png'

export const CasinoGameBombPopup = () => {
  return (
    <div className='modal-container'>
      <div className="cashout-popup">
        <img src={Bomb} alt='bomb'/>
        <p>Boom!</p>
      </div>
    </div>
  )
}