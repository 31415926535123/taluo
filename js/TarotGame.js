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
  }

  startSingleReading(category) {
    const newButtons = document.getElementById("new-buttons");
    if (newButtons) {
      newButtons.classList.add("hidden");
    }
    this.selectedSpread = "single";
    this.currentReading = [];

    // 清空结果区域

    const car = document.getElementsByClassName("card");
    for (let i = 0; i < car.length; i++) {
      car[i].classList.add("hidden");
    }

    const carra = document.getElementById("deck");
    carra.classList.add("hidden");
    this.introduction(category);
  }
  introduction(category) {
    const guideText = document.createElement("p");
    guideText.textContent = `欢迎进行 ${category} 占卜，请点击下面的按钮开始洗牌。`;

    // 创建开始洗牌按钮
    const shuffleButton = document.createElement("button");
    shuffleButton.textContent = "开始洗牌";
    shuffleButton.id = "shuffle-button";
    const jiedu99 = document.getElementById("jiedu99");
    jiedu99.appendChild(guideText);
    jiedu99.appendChild(shuffleButton);
    shuffleButton.addEventListener("click", () => {
      startSpinning();
      // 移除按钮和引导词
      jiedu99.removeChild(guideText);
      jiedu99.removeChild(shuffleButton);
    });
  }
}
function addSpinAnimationStyle() {
  const style = document.createElement("style");
  style.textContent = `
  @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      #imageContainer {
        position: absolute;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        animation: spin 3s linear infinite;
      }

      .image_xipai {
        position: absolute;
        width: 40px;
        height: 40px;
        transform-origin: center;
        /* 你可以替换为你自己的图片 */
        background-image: url("../image/taluo_new.webp");
        background-size: cover;
      }
            `;
  document.head.appendChild(style);
}

function startSpinning(duration = 3000000, imageUrl = "../image/yuan.jpeg") {
  // 动态添加样式
  addSpinAnimationStyle();
  // 创建图片容器
  const imageContainer = document.createElement("div");
  imageContainer.id = "imageContainer";
  document.body.appendChild(imageContainer);
  const containerWidth = imageContainer.offsetWidth;
  const containerHeight = imageContainer.offsetHeight;
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  const radius = Math.min(containerWidth, containerHeight) * 0.4; // 圆的半径
  const imageSize = 40; // 图片大小
  const totalImages = 82; // 图片总数
  for (let i = 0; i < totalImages; i++) {
    // 计算每个图片的角度（弧度）
    const angle = (i / totalImages) * 2 * Math.PI;

    // 计算图片的位置
    const x = centerX + radius * Math.cos(angle) - imageSize / 2;
    const y = centerY + radius * Math.sin(angle) - imageSize / 2;

    // 创建图片元素
    const img = document.createElement("div");
    img.className = "image_xipai";
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    // 旋转图片使其指向圆心
    const rotationAngle = angle * (180 / Math.PI) + 90;
    img.style.transform = `rotate(${rotationAngle}deg)`;

    imageContainer.appendChild(img);
    imageContainer.classList.add("spinning");
  }
  setTimeout(() => {
    imageContainer.removeChild(img);
    imageContainer.classList.remove("spinning");
  }, duration);
}
