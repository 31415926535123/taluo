const littleStarDiv = document.createElement("div");
littleStarDiv.id = "little_star";
document.body.appendChild(littleStarDiv);
const deckDiv = document.createElement("div");
deckDiv.id = "deck";
deckDiv.className = "deck";
document.body.appendChild(deckDiv);
const deckcedDiv = document.createElement("div");
deckcedDiv.id = "deckced";
deckcedDiv.className = "deckced";
document.body.appendChild(deckcedDiv);
const editButton = document.createElement("button");
editButton.id = "editButton";
editButton.className = "editButton";
editButton.innerText = "编辑元素";
document.body.appendChild(editButton);
editButton.addEventListener("click", createElementAttributeEditor);
// 获取 Canvas 元素
const canvas = document.createElement("canvas");
// 设置 Canvas 为绝对定位
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = -1;
// 初始设置 Canvas 尺寸为视口尺寸
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// 获取 2D 绘图上下文
const ctx = canvas.getContext("2d");

/**
 * 绘制星星的函数
 * @param {number} x - 星星中心的 x 坐标
 * @param {number} y - 星星中心的 y 坐标
 * @param {number} outerRadius - 星星外顶点到中心的距离
 * @param {number} innerRadius - 星星内顶点到中心的距离
 * @param {number} numPoints - 星星的角数
 * @param {string} fillColor - 星星的填充颜色
 * @param {string} strokeColor - 星星的描边颜色
 */
function drawStar(
  x,
  y,
  outerRadius,
  innerRadius,
  numPoints,
  fillColor,
  strokeColor
) {
  ctx.beginPath();
  // 计算每个角的弧度
  const angle = (2 * Math.PI) / (numPoints * 2);
  for (let i = 0; i < numPoints * 2; i++) {
    // 根据当前角的索引判断是外顶点还是内顶点
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const currentAngle = i * angle;
    const pointX = x + radius * Math.cos(currentAngle - Math.PI / 2);
    const pointY = y + radius * Math.sin(currentAngle - Math.PI / 2);
    if (i === 0) {
      ctx.moveTo(pointX, pointY);
    } else {
      ctx.lineTo(pointX, pointY);
    }
  }
  ctx.closePath();
  // 设置填充颜色并填充星星
  ctx.fillStyle = fillColor;
  ctx.fill();
  // 设置描边颜色并描边星星
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
}

// 监听窗口大小变化事件，更新 Canvas 尺寸
window.addEventListener("resize", () => {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  drawing();
});
function drawing() {
  const littleStarDiv = document.getElementById("little_star");
  if (!littleStarDiv) return;

  // 获取 little_star 元素的位置和尺寸信息
  const rect = littleStarDiv.getBoundingClientRect();
  for (let i = 0; i < 300; i++) {
    var x = Math.random() * window.innerWidth * 0.33;
    var y = Math.random() * window.innerHeight;
    // 调用函数绘制星星，可随意设置位置
    drawStar(x, y, 0.1, 2.5, 4, "white", "white");
  }
  for (let i = 0; i < 300; i++) {
    var x = window.innerWidth - Math.random() * window.innerWidth * 0.33;
    var y = Math.random() * window.innerHeight;
    // 调用函数绘制星星，可随意设置位置
    drawStar(x, y, 0.1, 2.5, 4, "white", "white");
  }
  const centerX = rect.left + 0.5 * rect.width;
  const centerY = rect.top + 0.5 * rect.height;
  drawStar(
    centerX,
    centerY,
    rect.height / 9,
    rect.height / 3,
    5,
    "yellow",
    "white"
  );
}
drawing();
// ... 已有代码 ...

/**
 * 创建元素属性编辑器
 */
function createElementAttributeEditor() {
  // 创建元素 ID 输入框
  const elementIdInput = document.createElement("input");
  elementIdInput.type = "text";
  elementIdInput.placeholder = "输入要编辑的元素 ID";
  document.body.appendChild(elementIdInput);

  // 创建样式输入框
  const styleInput = document.createElement("input");
  styleInput.type = "text";
  styleInput.placeholder = "输入要编辑的样式（如：color, fontSize）";
  document.body.appendChild(styleInput);

  // 创建确定按钮
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "确定";
  document.body.appendChild(confirmButton);

  // 创建显示区域
  const displayArea = document.createElement("div");
  document.body.appendChild(displayArea);

  // 创建修改记录数组
  let modificationRecords = [];

  // 确定按钮点击事件
  confirmButton.addEventListener("click", () => {
    const elementId = elementIdInput.value.trim();
    const styleName = styleInput.value.trim();

    if (!elementId || !styleName) {
      displayArea.innerHTML =
        '<span style="color: red;">请输入有效的元素 ID 和样式名称</span>';
      return;
    }

    const element = document.getElementById(elementId);
    if (!element) {
      displayArea.innerHTML = `<span style="color: red;">未找到 ID 为 ${elementId} 的元素</span>`;
      return;
    }

    const currentStyleValue = window
      .getComputedStyle(element)
      .getPropertyValue(styleName);
    if (!currentStyleValue) {
      displayArea.innerHTML = `<span style="color: red;">元素 ${elementId} 不存在 ${styleName} 样式</span>`;
      return;
    }

    // 显示元素信息和修改输入框
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `元素 ID: ${elementId}, 样式: ${styleName}, 当前值: ${currentStyleValue}`;
    displayArea.appendChild(infoDiv);

    const newValueInput = document.createElement("input");
    newValueInput.type = "text";
    newValueInput.value = currentStyleValue;
    displayArea.appendChild(newValueInput);

    // 创建保存按钮
    const saveButton = document.createElement("button");
    saveButton.textContent = "保存";
    displayArea.appendChild(saveButton);

    // 保存按钮点击事件
    saveButton.addEventListener("click", () => {
      const newValue = newValueInput.value;
      element.style.setProperty(styleName, newValue);
      modificationRecords.push({
        elementId,
        styleName,
        oldValue: currentStyleValue,
        newValue,
      });
      displayArea.innerHTML = `<span style="color: green;">样式 ${styleName} 已更新为 ${newValue}</span>`;
    });
  });

  // 创建下载按钮
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "下载变更";
  document.body.appendChild(downloadButton);

  // 下载按钮点击事件
  downloadButton.addEventListener("click", () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(modificationRecords));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "style_modifications.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  });

  // 创建加载按钮
  const loadButton = document.createElement("input");
  loadButton.type = "file";
  loadButton.accept = ".json";
  document.body.appendChild(loadButton);

  // 加载按钮点击事件
  loadButton.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const records = JSON.parse(e.target.result);
        records.forEach((record) => {
          const element = document.getElementById(record.elementId);
          if (element) {
            element.style.setProperty(record.styleName, record.newValue);
          }
        });
        displayArea.innerHTML =
          '<span style="color: green;">样式已成功加载</span>';
      };
      reader.readAsText(file);
    }
  });
}

// ... 已有代码 ...
// ... 已有代码 ...

// 创建显示元素信息的按钮
const showElementInfoButton = document.createElement("button");
showElementInfoButton.id = "showElementInfoButton";
showElementInfoButton.className = "showElementInfoButton";
showElementInfoButton.innerText = "显示元素信息";
document.body.appendChild(showElementInfoButton);

// 显示元素信息的函数
function showElementInfo() {
  const allElements = document.querySelectorAll("*");
  let info = "";
  allElements.forEach((element) => {
    const elementType = element.tagName;
    const elementId = element.id || "无 ID";
    info += `元素类型: ${elementType}, ID: ${elementId}\n`;
  });

  // 创建一个模态框显示信息
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "black";
  modal.style.padding = "20px";
  modal.style.border = "1px solid black";
  modal.style.maxWidth = "90%";
  modal.style.maxHeight = "90%";
  modal.style.overflow = "auto";

  const pre = document.createElement("pre");
  pre.textContent = info;
  modal.appendChild(pre);

  const closeButton = document.createElement("button");
  closeButton.textContent = "关闭";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });
  modal.appendChild(closeButton);

  document.body.appendChild(modal);
}

// 给按钮添加点击事件
showElementInfoButton.addEventListener("click", showElementInfo);

// ... 已有代码 ...
