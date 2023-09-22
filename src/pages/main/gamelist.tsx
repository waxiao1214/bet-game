import { useNavigate } from "react-router-dom"
import { Button } from "../../elements/button"

export const GameList = () => {
  const navigate = useNavigate();
  return <div>
    <Button
      varients='game_primary'
      size='large'
      text='casino player'
      onClick={() => navigate('/casino')}  
    />
  </div>
}