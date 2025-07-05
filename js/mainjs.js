import { TarotGame } from "./TarotGame.js";
import { tarotDeck } from "./taluodata.js";
const a = tarotDeck;
// 初始化游戏

document.addEventListener("DOMContentLoaded", () => {
  const game = new TarotGame(a);
  const deckElement = document.getElementById("deck");
  // 这里可以修改要创建的牌的数量
  const numCards = 22;
  /*createCards(deckElement, numCards);*/
});

/*
export function createShuffleAnimation() {
  let animationInterval;
  let deckElement = document.getElementById("deck");
  let rotation = 0;

  return {
    
    generateCircle() {
      
      deckElement.style.position = "relative";
    },
    
    startRotation() {
      animationInterval = setInterval(() => {
        rotation += 5;
        deckElement.style.transform = `rotate(${rotation}deg)`;
      }, 50);
    },
    
    stopRotation() {
      clearInterval(animationInterval);
      deckElement.style.transform = "rotate(0deg)";
    },
  };
}*/

// 动态创建牌元素的函数
function createCards(deckElement, numCards) {
  for (let i = 1; i <= numCards; i++) {
    const card = document.createElement("div");
    card.className = `card`;
    card.id = `main-card${i}`;

    const cardBack = document.createElement("div");
    cardBack.className = "card-face card-back";
    cardBack.id = `carba${i}`;

    card.appendChild(cardBack);
    deckElement.appendChild(card);
  }
}
