
import logo from "/src/assets/Images/logo (1).svg";
import "/src/App.css";
import { Link } from "react-router-dom";
import { useGameContext } from "../components/GameContext";

const StartNewGamePage = () => {

  const { setOponent, selected, setSelected } = useGameContext();
  
  const handleSelected = (selected) => {
    localStorage.setItem('selected', selected);
    setSelected(selected); 
  };
 
  const handleOpponentSelect = (opponent) => {
    localStorage.setItem('opponent', opponent);
    setOponent(opponent); 
  };

  

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#192a33]">
      <section className="w-[80%] min-h-screen flex items-center justify-center flex-col">
        <div className="flex items-center justify-center">
          <img className="w-24 md:w-28" src={logo} alt="" />
        </div>

        <div className="w-full lg:w-[38%] bg-[#1F3641] my-10 p-7 rounded-2xl text-[#A8BFC9] text-center shadow-[0px_10px_rgb(16,33,42)]">
          <p className="mb-7 font-bold tracking-[2px] [word-spacing:2px]">
            PICK PLAYER 1&apos;S MARK
          </p>
          <div className="w-full h-20 bg-[#192A33] rounded-xl p-[10px] flex flex-row gap-1 cursor-pointer">
            <div
              onClick={() => handleSelected("X")}
              className={`w-[50%] h-full rounded-lg flex items-center justify-center ${
                selected === "X" ? "selected" : ""
              }`}
            >
              <svg
                width="64"
                height="64"
                className="scale-[0.60]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                  fill={`${selected === "X" ? "" : "#A8BFC9"}`}
                  fillRule="evenodd"
                />
              </svg>
            </div>

            <div
              onClick={() => handleSelected("O")}
              className={`w-[50%] h-full rounded-lg flex items-center justify-center  ${
                selected === "O" ? "selected" : ""
              }`}
            >
              <svg
                width="64"
                height="64"
                className="scale-[0.60]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                  fill={`${selected === "O" ? "" : "#A8BFC9"}`}
                />
              </svg>
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold tracking-[2px] uppercase">
            Remember: X goes first
          </p>
        </div>

        <div className="w-full lg:w-[38%] text-center text-[#192a33] p-1 text-sm md:text-xl tracking-[0.6px] [word-spacing:1px]">
          <Link to={"/game"}>
            <div
              onClick={() => handleOpponentSelect("computer")}
              className="w-full py-4 mb-6 font-bold text-sm md:text-xl cursor-pointer uppercase rounded-xl bg-[#F2B137] hover:bg-[#FFC860] shadow-[0px_8px_rgb(203,139,18)] active:translate-y-[0.10rem] active:scale-[0.99]"
            >
              New Game (vs computer)
            </div>
          </Link>

          <Link to={"/game"}>
            <div
              onClick={() => handleOpponentSelect("player")}
              className="w-full py-4 font-bold cursor-pointer uppercase rounded-xl bg-[#31C3BD] shadow-[0px_8px_rgb(17,140,135)] hover:bg-[#65E9E4] active:translate-y-[0.10rem] active:scale-[0.99]"
            >
              New Game (vs player)
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default StartNewGamePage;
