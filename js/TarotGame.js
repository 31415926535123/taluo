import spreads from "./spreads.js";
// 游戏类
export class TarotGame {
  constructor(tarotDeck) {
    this.deck = [...tarotDeck];
    this.currentReading = [];
    this.selectedSpread = null;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document
      .getElementById("fortune")
      .addEventListener("click", () => this.startSingleReading("财运"));
    document
      .getElementById("love")
      .addEventListener("click", () => this.startSingleReading("爱情"));
    // 新增开始旋转按钮事件监听
    document
      .getElementById("friendship")
      .addEventListener("click", () => this.startSingleReading("友情"));
    document
      .getElementById("family")
      .addEventListener("click", () => this.startSingleReading("亲情"));
    document
      .getElementById("difficulty")
      .addEventListener("click", () => this.startSingleReading("困难"));
    // 关闭模态框按钮
    document.getElementById("close-modal").addEventListener("click", () => {
      document
        .getElementById("interpretation-modal")
        .classList.remove("active");
    });

    // 点击模态框背景关闭
    document
      .getElementById("interpretation-modal")
      .addEventListener("click", (e) => {
        if (e.target === document.getElementById("interpretation-modal")) {
          document
            .getElementById("interpretation-modal")
            .classList.remove("active");
        }
      });
  }

  startSingleReading(category) {
    const newButtons = document.getElementById("new-buttons");
    if (newButtons) {
      newButtons.classList.add("hidden");
    }
    this.selectedSpread = "single";
    this.currentReading = [];

    // 清空结果区域
    document.getElementById("reading-area").innerHTML = "";

    const car = document.getElementsByClassName("card");
    for (let i = 0; i < car.length; i++) {
      car[i].classList.add("hidden");
    }

    const carra = document.getElementById("deck");
    carra.classList.add("hidden");
    this.introduction(category);
  }
  introduction(category) {
    const readingArea = document.getElementById("reading-area");
    // 清空结果区域
    readingArea.innerHTML = "";
    // 显示引导词
    const guideText = document.createElement("p");
    guideText.textContent = `欢迎进行 ${category} 占卜，请点击下面的按钮开始洗牌。`;
    readingArea.appendChild(guideText);

    // 创建开始洗牌按钮
    const shuffleButton = document.createElement("button");
    shuffleButton.textContent = "开始洗牌";
    shuffleButton.id = "shuffle-button";
    readingArea.appendChild(shuffleButton);

    // 为按钮添加点击事件监听器
    shuffleButton.addEventListener("click", () => {
      startSpinning();
      // 移除按钮和引导词
      readingArea.removeChild(guideText);
      readingArea.removeChild(shuffleButton);
    });
  }
}
function addSpinAnimationStyle() {
  const style = document.createElement("style");
  style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .spinning {
                    animation: spin 3s linear infinite;
                }
                img {
                    width: 200px;
                    height: 200px;
                }
            `;
  document.head.appendChild(style);
}

function startSpinning(duration = 30000, imageUrl = "../image/yuan.jpeg") {
  // 动态添加样式
  addSpinAnimationStyle();
  // 创建图片容器
  const imageContainer = document.createElement("div");
  document.body.appendChild(imageContainer);

  // 动态创建图片元素
  const image = document.createElement("img");
  image.src = imageUrl;
  imageContainer.appendChild(image);

  image.classList.add("spinning");

  setTimeout(() => {
    image.classList.remove("spinning");
    // 移除图片元素
    imageContainer.removeChild(image);
  }, duration);
}
