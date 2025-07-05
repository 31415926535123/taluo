/**
 * 让 taluo_new.webp 图片绕指定点旋转
 * @param {number} centerX - 旋转中心点的 X 坐标
 * @param {number} centerY - 旋转中心点的 Y 坐标
 * @param {number} radius - 旋转半径
 * @param {number} duration - 旋转一周的时间（毫秒）
 * @param {HTMLElement} container - 图片所在的容器元素
 */
function rotateTarotImage(centerX, centerY, radius, duration, container) {
  // 创建图片元素
  const img = document.createElement("img");
  img.src = "taluo_new.webp";
  img.style.position = "absolute";
  img.style.width = "80px"; // 可根据实际情况调整图片大小
  img.style.height = "120px"; // 可根据实际情况调整图片大小

  // 计算初始位置
  const initialAngle = 0;
  const initialX = centerX + radius * Math.cos(initialAngle);
  const initialY = centerY + radius * Math.sin(initialAngle);

  // 设置图片初始位置
  img.style.left = `${initialX}px`;
  img.style.top = `${initialY}px`;

  // 创建动画样式
  const style = document.createElement("style");
  const animationName = `rotateTarot${Date.now()}`;
  style.textContent = `
        @keyframes ${animationName} {
            from {
                transform: rotate(0deg) translate(${radius}px, 0) rotate(0deg);
            }
            to {
                transform: rotate(360deg) translate(${radius}px, 0) rotate(-360deg);
            }
        }
    `;
  document.head.appendChild(style);

  // 应用动画
  img.style.animation = `${animationName} ${duration}ms linear infinite`;
  img.style.transformOrigin = `${-radius}px center`;

  // 将图片添加到容器中
  container.appendChild(img);
}

// 使用示例
// 假设容器为 body 元素
const container = document.body;
rotateTarotImage(200, 200, 150, 5000, container);
