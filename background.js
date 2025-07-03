// 获取 Canvas 元素
const canvas = document.createElement('canvas');
// 设置 Canvas 为绝对定位
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = -1;
// 初始设置 Canvas 尺寸为视口尺寸
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// 获取 2D 绘图上下文
const ctx = canvas.getContext('2d');

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
function drawStar(x, y, outerRadius, innerRadius, numPoints, fillColor, strokeColor) {
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
window.addEventListener('document.documentElement.clientWidth<window.innerWidth', () => {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    drawing();

});
function drawing(){
for(i=0;i<100;i++){var x=Math.random()*window.innerWidth*0.33;
var y=Math.random()*window.innerHeight;
// 调用函数绘制星星，可随意设置位置
drawStar(x, y, 2, 5, 4, 'white', 'white');}
for(i=0;i<100;i++){var x=window.innerWidth-Math.random()*window.innerWidth*0.33;
var y=Math.random()*window.innerHeight;
// 调用函数绘制星星，可随意设置位置
drawStar(x, y, 2, 5, 4, 'white', 'white');}
drawStar(0.5*window.innerWidth, 0.3*window.innerHeight, 30, 75, 5, 'yellow', 'white');}
drawing();