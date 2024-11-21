import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import { checkWinner } from "/src/winLogic.js";
import { useGameContext } from "../components/GameContext";
import { computerMove } from "/src/winLogic.js";



const GamePage = () => {

  const { oponent, selected } = useGameContext();


  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("gameData");
    return savedData ? JSON.parse(savedData) : ["", "", "", "", "", "", "", "", ""];
  });
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [turn, setTurn] = useState(() => {
    const savedTurn = localStorage.getItem("turn");
  return savedTurn || "X";
  });
  
  const [winner, setWinner] = useState("");


  useEffect(() => {
    localStorage.setItem("gameData", JSON.stringify(data));
  }, [data]);


  useEffect(() => {
    checkWinner(data, setLock, setWinner);
  }, [data, lock]);


  useEffect(() => {
    localStorage.setItem('turn', turn);
  }, [turn]);


  const handleHover = (index) => {
    if (data[index] === "" && !lock) {
      setHoverIndex(index);
    }
  };

  const handleMouseOut = () => setHoverIndex(null);


  const handleClick = (index) => {
    if (data[index] === "" && !lock) {
      const newData = [...data];
      newData[index] = turn;
      setData(newData);
      setCount((prevCount) => prevCount + 1);

      checkWinner(newData, setLock, setWinner);

      if (!lock) {
        setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X")); 
      }
    }
  };  

  useEffect(() => {
    if (oponent === "computer" && turn !== selected && !lock) {
      setTimeout(() => {
        const newData = [...data];
        computerMove(newData, selected);
        setData(newData);
        setCount((prevCount) => prevCount + 1);

        checkWinner(newData, setLock, setWinner);

        if (!lock) {
          setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"));
        }
      }, 500);
    }
  }, [data, turn, lock, oponent, selected]);


  return (
    <div>
      <GameBoard
        data={data}
        setData={setData}
        setCount={setCount}
        hoverIndex={hoverIndex}
        handleHover={handleHover}
        handleMouseOut={handleMouseOut}
        handleClick={handleClick}
        turn={turn}
        setTurn={setTurn}
        lock={lock}
        setLock={setLock}
        winner={winner}
        setWinner={setWinner}
      />
    </div>
  );
};

export default GamePage;
