import { useState } from 'react'
import { Button } from '../../elements/button'
import { TextField } from '../../elements/input'
import Coin from '../../static/img/TOKENICON.svg'
import Bomb from '../../static/img/bomb.svg'
import Gem from '../../static/img/gem.svg'
import '../styles/casino.scss'
import { SelectField } from '../../elements/select'
import { MINER_COUNT } from '../../core/constant'
import { TOption } from '../../core/types'
import TileCanvas from './tile-canvas'
import { getTotalProfit } from '../../core/utils'

const initArray = Array.from(Array(25).keys(), n => n);

export const CasinoGame = () => {
  const [betAmount, setBetAmount] = useState<number>(0);
  const [bombCount, setBombcount] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [gemCount, setGemCount] = useState<number>(0);
  const [randomTile, setRandomTile] = useState<number>(-1);
  const [remainTiles, setRemainTiles] = useState<number[]>(initArray);
  const [bombs, setBombs] = useState<number[]>([]);

  const handleClick = (value: string) => {
    if(value === 'max') return setBetAmount(Number(1000));
    else return  setBetAmount(Number(value) * betAmount);
  }

  const pickupRandom = () => {
    setRandomTile(remainTiles[Math.floor(Math.random() * (remainTiles.length))]);
  }
  
  const ActionButtons = () => {
    const buttons = [
      {text: 'x0.5', value: '0.5' },
      {text: 'x2.0', value: '2' },
      {text: 'max', value: 'max' },
    ]
    return <>
      {
        buttons.map((button) => (
          <Button
            key={button.value}
            text={button.text}
            onClick={() => handleClick(button.value)}
            varients='game_seconday'
            size='small' 
          />
        ))
      }
    </>
  }

  const getMinerOptions = () => {
    return Array(MINER_COUNT).fill(null).map((_, key) => {
      return { label: key.toString(), value: key} as TOption
    })
  }

  function generateBombIndexes(count: number): number[] {
    const indexes: number[] = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * 25);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  }

  const handleStart = () => {
    if(!bombCount) return setError('Please select Miners count!');
    if(!betAmount) return setError('Please set coin amount!');
    setError('');
    setBombs(generateBombIndexes(bombCount));
    setIsStart(true);
  }

  const handleCashout = () => {
    setIsStart(false)
  }

  const handleOpenTile = (tiles: number[]) => {
    setRemainTiles([...initArray.filter(item => !tiles.includes(item))]);
    setGemCount(tiles.length);
  }

  const renderComponentBeforeGame = () => {
    return (
      <>
        <SelectField
          value={bombCount}
          onChange={(value) => setBombcount(value.value)}
          label="miners"
          options={getMinerOptions()}
        />
        <div>
          <p className='error-msg'>{error}</p>
          <Button
            varients='game_primary'
            text='bet'
            size='large'
            fullWidth
            onClick={() => handleStart()}
          />
        </div>
      </>
    )
  }

  const renderComponentAfterStart = () => {
    return <>
      <div className='miners-gem-disabled-input'>
        <TextField
          value={bombCount}
          disabled
          label='miners'
          icon={<img src={Bomb} alt='coin' />}
          varients='large'
        />
        <TextField
          value={gemCount}
          disabled
          label='gems'
          icon={<img src={Gem} alt='coin' />}
          varients='large'
        />
      </div>
      <TextField
        value={getTotalProfit(gemCount)}
        disabled
        type='text'
        label='total profit'
        icon={<img src={Coin} alt='coin' />}
        varients='large'
      />
      <Button
        varients='game_primary'
        text='pickup random'
        size='large'
        styles={{ background: '#444750', color: 'white' }}
        fullWidth
        onClick={() => pickupRandom()}
      />
      <Button
        varients='game_primary'
        text='cashout'
        size='large'
        fullWidth
        onClick={() => handleCashout()}
      />
    </>
  }
  return <div className="casino-container">
    <div className="game-control">
      <p className='title'>casino</p>
        <TextField 
          varients='large' 
          label="bet amount"
          value={Number(betAmount)}
          type='number'
          onChange={(e) => setBetAmount(Number(e.target.value))}
          icon={<img src={Coin} alt='coin' />}
          actionComponent={<ActionButtons />}
        />
      {!isStart ? renderComponentBeforeGame() : renderComponentAfterStart()}
    </div>
    <div className='game-board'>
      <TileCanvas
        playing={isStart}
        bombIndexes={bombs}
        randomTile={randomTile}
        handleOpenTile={(tiles) => handleOpenTile(tiles)}
        handleGameEnd={() => setIsStart(false)}
      />
    </div>
  </div>
}