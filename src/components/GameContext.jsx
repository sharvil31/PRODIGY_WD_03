import { createContext, useContext, useState } from "react";


const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    
    const [oponent, setOponent] = useState(() => {
      const savedOpponent = localStorage.getItem("opponent");
    return savedOpponent || null;
    });


    const [selected, setSelected] = useState(() => {
        const savedSelected = localStorage.getItem("selected");
      return savedSelected || "O";
    })


    return (
        <GameContext.Provider value={{ oponent, setOponent, selected, setSelected }}>
            {children}
        </GameContext.Provider>
    )
}