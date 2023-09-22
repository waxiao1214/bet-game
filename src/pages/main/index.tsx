import { Route, Routes as Switch } from 'react-router-dom';
import Header from '../../components/header';
import { CasinoGame } from '../casino';
import '../styles/main.scss'
import { GameList } from './gamelist';

export const Main = () => {

  return (
    <>
      <Header />
      <div className='pages-container'>
        <Switch>
          <Route path="/" Component={GameList}/>
          <Route path='/casino' Component={CasinoGame} />
        </Switch>
      </div>
    </>
  )
}