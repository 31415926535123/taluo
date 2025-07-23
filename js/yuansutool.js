import { taluo } from "./taluodata.js";
export function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  // 处理鼠标按下事件
  const handleMouseDown = (e) => {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    element.style.cursor = "grabbing";
  };

  // 处理鼠标移动事件
  const handleMouseMove = (e) => {
    if (isDragging) {
      element.style.left = e.clientX - offsetX + "px";
      element.style.top = e.clientY - offsetY + "px";
    }
  };

  // 处理鼠标释放事件
  const handleMouseUp = () => {
    isDragging = false;
    element.style.cursor = "grab";
  };

  // 处理触摸开始事件
  const handleTouchStart = (e) => {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - element.offsetLeft;
    offsetY = touch.clientY - element.offsetTop;
    element.style.cursor = "grabbing";
  };

  // 处理触摸移动事件
  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      element.style.left = touch.clientX - offsetX + "px";
      element.style.top = touch.clientY - offsetY + "px";
    }
  };

  // 处理触摸结束事件
  const handleTouchEnd = () => {
    isDragging = false;
    element.style.cursor = "grab";
  };

  // 为元素添加鼠标事件监听器
  element.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  // 为元素添加触摸事件监听器
  element.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchmove", handleTouchMove);
  document.addEventListener("touchend", handleTouchEnd);

  // 确保元素为绝对定位
  if (getComputedStyle(element).position === "static") {
    element.style.position = "absolute";
  }
  element.style.cursor = "grab";
}
export function chou_pai() {
  const a = document.createElement("button");
  document.body.appendChild(a);
  a.textContent = "抽牌";
  a.style.zIndex = 9999;
  a.style.position = "fixed";
  a.style.bottom = "10px";
  a.addEventListener("click", () => {
    taluo();
  });
}
