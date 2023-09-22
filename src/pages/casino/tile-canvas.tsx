/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';

import questionImageSrc from '../../static/img/question.png'; // Question mark image for the backend
import gemImageSrc from '../../static/img/gem_img.png'; // Gem image for the frontend
import bombImageSrc from '../../static/img/bomb_img.png'; // Bomb image for the frontend

interface TileCanvasProps {
  bombIndexes: number[];
  playing: boolean
  handleOpenTile: (value: number[]) => void
  randomTile: number
  handleGameEnd: (value: boolean) => void
  isCashout?: boolean
}

const TileCanvas: React.FC<TileCanvasProps> = (props) => {
  const { playing, bombIndexes, handleOpenTile, handleGameEnd, randomTile, isCashout } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [openTileIndexes, setOpenTileIndexes] = useState<number[]>([]);
  const [bombClicked, setBombClicked] = useState(false);

  const totalTiles = 25;
  const tileSize = 90;
  const imageSize = 60;
  const smallImageSize = 40
  const gap = 16;
  const opacity = (bombClicked || isCashout) ? 0.3 : 1;

  const bombImage = new Image();
  bombImage.src = bombImageSrc;

  const gemImage = new Image();
  gemImage.src = gemImageSrc;

  const questionImage = new Image();
  questionImage.src = questionImageSrc;

  useEffect(() => {
    bombImage.onload = () => {
      gemImage.onload = () => {
        questionImage.onload = () => {
          setOpenTileIndexes([...openTileIndexes]);
        };
      };
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < totalTiles; index++) {
      const row = Math.floor(index / 5);
      const col = index % 5;
      const x = col * (tileSize + gap);
      const y = row * (tileSize + gap);

      if (bombClicked || isCashout) {
        ctx.fillStyle = '#1b1b1b';
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        ctx.shadowColor = '#00000044';
      } else {
        ctx.fillStyle = openTileIndexes.includes(index) ? '#1b1b1b' : '#272A33'; // Change the colors as needed
        ctx.globalAlpha = 1;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        ctx.shadowColor = '#00000044';
      }

      ctx.fillRect(x, y, tileSize, tileSize);
      // console.log(openTileIndexes.includes(index))
     
      if (openTileIndexes.includes(index)) {
        const imageToDraw = bombIndexes.includes(index) ? bombImage : gemImage;
        const imageX = x + (tileSize - imageSize) / 2;
        const imageY = y + (tileSize - imageSize) / 2;
        ctx.drawImage(imageToDraw, imageX, imageY, imageSize, imageSize);
      } else if(!openTileIndexes.includes(index) && bombClicked) {
        if(bombIndexes.includes(index)) {
          const imageX = x + (tileSize - imageSize) / 2;
          const imageY = y + (tileSize - imageSize) / 2;
          // ctx.globalAlpha = opacity;
          ctx.drawImage(bombImage, imageX, imageY, imageSize, imageSize);
        } else {
          const imageX = x + (tileSize - smallImageSize) / 2;
          const imageY = y + (tileSize - smallImageSize) / 2;
          ctx.globalAlpha = opacity;
          ctx.drawImage(gemImage, imageX, imageY, smallImageSize, smallImageSize);
        }
      } else if (!openTileIndexes.includes(index) && isCashout) {
        const imageToDraw = bombIndexes.includes(index) ? bombImage : gemImage;
        const imageX = x + (tileSize - smallImageSize) / 2;
        const imageY = y + (tileSize - smallImageSize) / 2;
        ctx.globalAlpha = opacity;
        ctx.drawImage(imageToDraw, imageX, imageY, smallImageSize, smallImageSize);
      } else {
        const imageX = x + (tileSize - imageSize) / 2;
        const imageY = y + (tileSize - imageSize) / 2;
        ctx.drawImage(questionImage, imageX, imageY, imageSize, imageSize);
      }
      ctx.globalAlpha = 1;
    }
  }, [openTileIndexes, bombClicked, isCashout]);

  const handleTileClick = (index: number) => {
    if(!bombClicked) {
      if (bombIndexes.includes(index)) {
        handleGameEnd(true);
        setBombClicked(true);
      } else {
        toggleTile(index);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    if (!playing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedCol = Math.floor(x / (tileSize + gap));
    const clickedRow = Math.floor(y / (tileSize + gap));
    const clickedIndex = clickedRow * 5 + clickedCol;

    handleTileClick(clickedIndex);
  };

  const toggleTile = (index: number) => {
    if (!openTileIndexes.includes(index)) {
      setOpenTileIndexes((prevIndexes) => [...prevIndexes, index]);
      handleOpenTile([...openTileIndexes, index])
    }
  };

  useEffect(() => {
    if(playing) {
      setOpenTileIndexes([...new Array(0)]);
      setBombClicked(false);
    }
  }, [playing])

  useEffect(() => {
    handleTileClick(randomTile)
  }, [randomTile])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={(tileSize + gap) * 5}
        height={(tileSize + gap) * 5}
        onClick={handleClick}
      />
    </div>
  );
};

export default TileCanvas;
