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
document.getElementById("editButton").addEventListener("click", function () {
  const elementId = prompt("请输入要编辑的元素 ID：");
  const element = document.getElementById(elementId);
  if (element) {
    const newText = prompt("请输入新的文本内容：");
    if (newText !== null) {
      element.textContent = newText;
      // 使用 localStorage 保存数据
      localStorage.setItem(elementId, newText);
    }
  } else {
    alert("未找到该元素，请检查 ID 是否正确。");
  }
});
const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 点击按钮时从 localStorage 读取数据
    const allKeys = Object.keys(localStorage);
    allKeys.forEach((key) => {
      const element = document.getElementById(key);
      element.textContent = localStorage.getItem(key);
    });
  });
});
// 动态创建牌元素的函数
/*function createCards(deckElement, numCards) {
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
}*/
