import { Route, Routes as Switch } from 'react-router-dom';
import Header from '../../components/header';
import { CasinoGame } from '../casino';
import '../styles/main.scss'

export const Main = () => {
  console.log('main component is loaded!!')
  return (
    <>
      <Header />
      <div className='pages-container'>
        <Switch>
          <Route path='/casino' Component={CasinoGame} />
        </Switch>
      </div>
    </>
  )
}