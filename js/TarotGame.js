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
    guideText.id = "guide_text";

    guideText.textContent = `亲爱的朋友，欢迎您选择进行 ${category} 占卜。塔罗牌将为您揭示关于 ${category} 方面的潜在信息与指引。请静下心来，集中注意力，然后点击下面的“开始洗牌”按钮，让塔罗牌开启这场神秘的旅程吧。`;

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
        background-image: url(data:image/webp;base64,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);
        background-size: cover;
      }
            `;
  document.head.appendChild(style);
}

function startSpinning(duration = 3000000) {
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
