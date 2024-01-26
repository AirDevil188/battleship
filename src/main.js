import "./styles/main.css";
import UI from "./modules/UI";
import { gameLoop } from "./modules/gameLoop";
document.querySelector(".main-content").appendChild(UI.startingModalAgainstComputer);
gameLoop();
