// 动态创建 little_star div
const littleStarDiv = document.createElement("div");
littleStarDiv.id = "little_star";
document.body.appendChild(littleStarDiv);

// 动态创建 deck div
const deckDiv = document.createElement("div");
deckDiv.id = "deck";
deckDiv.className = "deck";
document.body.appendChild(deckDiv);

// 动态创建 deckced div
const deckcedDiv = document.createElement("div");
deckcedDiv.id = "deckced";
deckcedDiv.className = "deckced";
document.body.appendChild(deckcedDiv);
const editButton = document.createElement("button");
editButton.id = "editButton";
editButton.className = "editButton";
editButton.innerText = "编辑元素";
document.body.appendChild(editButton);
