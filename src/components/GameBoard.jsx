import React, { useEffect, useState } from "react";
import logo from "/src/assets/Images/logo (1).svg";
import restartIcon from "/src/assets/Images/icon-restart.svg";
import "../app.css";
import { useGameContext } from "./GameContext";
import xIcon from "/src/assets/images/icon-x.svg";
import oIcon from "/src/assets/images/icon-o.svg";
import xIconOutline from "/src/assets/images/icon-x-outline.svg";
import oIconOutline from "/src/assets/images/icon-o-outline.svg";
import { useNavigate } from "react-router-dom";


const GameBoard = ({
  data,
  setData,
  setCount,
  hoverIndex,
  handleHover,
  handleMouseOut,
  handleClick,
  turn,
  setTurn,
  lock,
  setLock,
  winner,
  setWinner,
}) => {
  
  const { oponent, selected } = useGameContext();

  const [isRestartBtnClicked, setIsRestartBtnClicked] = useState(false);
  const [player1Score, setPlayer1Score] = useState(
    parseInt(localStorage.getItem("player1Score")) || 0
  );
  const [player2Score, setPlayer2Score] = useState(
    parseInt(localStorage.getItem("player2Score")) || 0
  );
  const [tiesScore, setTiesScore] = useState(
    parseInt(localStorage.getItem("tiesScore")) || 0
  );


  const clearGameData = () => {
    localStorage.clear();
    setPlayer1Score(0);
    setPlayer2Score(0);
    setTiesScore(0);
  };

  const navigate = useNavigate();


  const restartGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setLock(false);
    setIsRestartBtnClicked(false);
    setWinner("");
    navigate("/");
    clearGameData();
  };

  const handleRestartGame = () => {
    setLock(true);
    setIsRestartBtnClicked(true);
  };

  const handleIsRestartBtnClicked = () => {
    setIsRestartBtnClicked(false);
    setLock(false);
  };

  const handleScore = () => {
    if (winner === "X" || winner === "O") {
      if (selected === winner) {
        setPlayer1Score((prevScore) => {
          const newScore = Number(prevScore) + 1;
          localStorage.setItem("player1Score", newScore);
          return newScore;
        });
      } else {
        setPlayer2Score((prevScore) => {
          const newScore = Number(prevScore) + 1;
          localStorage.setItem("player2Score", newScore);
          return newScore;
        });
      }
    } else if (winner === "draw") {
      setTiesScore((prevScore) => {
        const newScore = Number(prevScore) + 1;
        localStorage.setItem("tiesScore", newScore);
        return newScore;
      });
    }
  };

  useEffect(() => {
    handleScore();
  }, [winner]);

  const declareWinner = () => {
    if (winner === "X" || winner === "O") {
      if (selected === winner) {
        return "Player 1 Wins";
      } else {
        return "Player 2 Wins";
      }
    } else if (winner === "draw") {
      return "round tied";
    } else {
      return "Restart game?";
    }
  };

  const setWinnerIcon = () => {
    if (winner === "X") {
      return xIcon;
    } else if (winner === "O") {
      return oIcon;
    } else if (winner === "draw") {
      return null;
    }
  };

  const handleNextRound = () => {
    setLock(false);
    setCount(0);
    setData(["", "", "", "", "", "", "", "", ""]);
    setWinner("");
    setTurn("X");
  };

  return (
    <div className="flex items-center justify-center gap-8 h-screen bg-[#192a33] flex-col">
      <div className="w-[320px] md:w-[436px] flex items-center justify-between">
        <img src={logo} alt="" />

        <div className="flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base px-4 py-3 md:px-5 bg-[#1F3641] rounded-lg uppercase font-bold text-[#A8BFC9] tracking-[1px] shadow-[0px_5px_rgb(16,33,42)]">
          {turn === "X" ? (
            <img
              src={xIcon}
              alt="X"
              className="w-5 h-5 md:w-[22px] md:h-[22px]"
            />
          ) : (
            <img
              src={oIcon}
              alt="O"
              className="w-5 h-5 md:w-[22px] md:h-[22px]"
            />
          )}{" "}
          turn
        </div>

        <div
          onClick={handleRestartGame}
          className="flex items-center justify-center py-[12px] px-[12px] md:py-4 md:px-4 rounded-xl bg-[#A8BFC9] hover:bg-[#DBE8ED] cursor-pointer shadow-[0px_5px_rgb(107,137,151)] active:translate-y-[0.10rem] active:scale-[0.99]"
        >
          <img src={restartIcon} alt="" />
        </div>
      </div>

      <div className="flex w-[320px] md:w-[436px] gap-[14px] md:gap-6 items-center justify-evenly flex-wrap">
        {data.map((cell, index) => (
          <div
            key={index}
            onMouseOver={() => handleHover(index)}
            onMouseOut={handleMouseOut}
            onClick={() => handleClick(index)}
            className="flex items-center justify-center h-24 w-24 md:h-32 md:w-32 bg-[#1F3641] rounded-xl cursor-pointer shadow-[0px_8px_rgb(16,33,42)]"
          >
            {cell === "X" && (
              <img src={xIcon} alt="X" className="w-12 h-12 md:w-16 md:h-16" />
            )}
            {cell === "O" && (
              <img src={oIcon} alt="O" className="w-12 h-12 md:w-16 md:h-16" />
            )}

            {hoverIndex === index && cell === "" && (
              <img
                src={turn === "X" ? xIconOutline : oIconOutline}
                alt="Outline"
                className="w-12 h-12 md:w-16 md:h-16"
              />
            )}
          </div>
        ))}
      </div>

      <div className="w-[320px] md:w-[436px] flex justify-between uppercase font-medium text-sm tracking-[1px] text-[#192a33]">
        <div className="py-2 min-w-20 md:w-32 rounded-2xl bg-[#31C3BD] flex items-center justify-center flex-col">
          <p>
            {selected === "X" ? "X" : "O"} (
            {oponent === "computer" ? "You" : "P1"})
          </p>
          <p className="font-bold text-2xl">{player1Score}</p>
        </div>

        <div className="py-2 min-w-20 md:w-32 rounded-2xl bg-[#A8BFC9] flex items-center justify-center flex-col">
          <p>ties</p>
          <p className="font-bold text-2xl">{tiesScore}</p>
        </div>

        <div className="py-2 min-w-32 md:w-32 rounded-2xl bg-[#F2B137] flex items-center justify-center flex-col text-center">
          <p> 
            {selected === "X" ? "O" : "X"} (
            {oponent === "computer" ? "Computer" : "P2"})
          </p>
          <p className="font-bold text-2xl">{player2Score}</p>
        </div>
      </div>

      <div
        className={`absolute w-full bg-[#1F3641] ${
          lock ? "flex" : "hidden"
        } items-center justify-center text-center py-10 tracking-[1px]`}
      >
        <div className="flex items-center justify-center flex-col gap-6">
          <p
            className={`uppercase text-[#A8BFC9] ${
              winner === "X" || winner === "O"
                ? "text-base"
                : "text-[32px] md:text-[40px]"
            } font-bold`}
          >
            {declareWinner()}
          </p>

          {winner === "X" || winner === "O" ? (
            <div className="flex items-center justify-center uppercase gap-3 md:gap-5">
              <img
                src={setWinnerIcon()}
                alt=""
                className="w-10 h-10 md:w-16 md:h-16"
              />
              <p
                className={`${
                  winner === "X" ? "text-[#31C3BD]" : "text-[#F2B137]"
                } text-[27px] md:text-[40px] font-bold tracking-[2px]`}
              >
                Takes The round
              </p>
            </div>
          ) : null}

          <div className="flex items-center justify-center trackin-[1px] font-bold uppercase gap-7">
            <div
              onClick={() =>
                isRestartBtnClicked
                  ? handleIsRestartBtnClicked()
                  : restartGame()
              }
              className="text-[#192a33] bg-[#A8BFC9] p-[10px] md:p-4 rounded-xl shadow-[0px_4px_rgb(107,137,151)] cursor-pointer active:translate-y-[0.10rem] active:scale-[0.99]"
            >
              {isRestartBtnClicked ? "no, cancel" : "quit"}
            </div>
            <div
              onClick={() =>
                isRestartBtnClicked ? restartGame() : handleNextRound()
              }
              className="text-[#192a33] bg-[#F2B137] p-[10px] md:p-4 rounded-xl shadow-[0px_4px_rgb(203,139,18)] cursor-pointer active:translate-y-[0.10rem] active:scale-[0.99]"
            >
              {isRestartBtnClicked ? "yes, restart" : "next round"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
