import { TarotGame } from './TarotGame.js';
import { tarotDeck } from './taluodata.js';
const a= tarotDeck;

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const game = new TarotGame(a);
});
