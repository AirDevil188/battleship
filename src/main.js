import "./styles/main.css";
import dragula from "dragula";
import UI from "./modules/UI";
import { gameLoop } from "./modules/gameLoop";
import { dragDrop } from "./modules/helperDOMMethods";
document.querySelector("body").appendChild(UI.startingScreen);
window.onload = dragDrop();
gameLoop();
