import { Button } from '../../elements/button'
import { HeaderLogo } from '../../elements/logo'
import './header.scss'

const Header = () => {
  return <div className='header-container'>
    <div className='header-content'>
      <div className='left'>
        <HeaderLogo />
        <Button text='Play' />
        <Button text='Stake' varients='secondary' />
        <Button text='FAQ' varients='secondary' />
      </div>
      <div className='right'>
        <Button text='Connect Wallet' />
      </div>
    </div>
  </div>
}

export default Header