import ButtonCreator from "./first.js";
import guide from "./second.js";

const choose_button = document.createElement("div");
document.body.appendChild(choose_button);
choose_button.id = "new-buttons";
// 创建 ButtonCreator 实例
const buttonCreator = new ButtonCreator("new-buttons");
// 调用创建按钮的方法
buttonCreator.createButtons();
button.addEventListener("click", () => {
  guide();
});
