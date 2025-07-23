class ButtonCreator {
  constructor(containerId) {
    // 获取按钮容器元素
    this.container = document.getElementById(containerId);
    // 定义按钮配置信息
    this.buttonsConfig = [
      { id: "fortune", src: "./image/zi1.webp", alt: "财运图标" },
      { id: "love", src: "./image/zi2.webp", alt: "爱情图标" },
      { id: "friendship", src: "./image/zi3.webp", alt: "友情图标" }, // 修正为友情图标
      { id: "family", src: "./image/zi4.webp", alt: "亲情图标" }, // 修正为亲情图标
      { id: "difficulty", src: "./image/zi5.webp", alt: "困难指引图标" }, // 修正为合适的图标描述
    ];
  }

  createButtons() {
    // 遍历按钮配置信息
    this.buttonsConfig.forEach((config) => {
      // 创建按钮元素
      const button = document.createElement("button");
      button.id = config.id;
      // 创建图片元素
      const img = document.createElement("img");
      img.src = config.src;
      img.alt = config.alt;
      // 将图片添加到按钮中
      button.appendChild(img);
      // 将按钮添加到容器中
      this.container.appendChild(button);
    });
  }
}
const choose_button = document.createElement("div");
document.body.appendChild(choose_button);
choose_button.id = "new-buttons";
// 创建 ButtonCreator 实例
const buttonCreator = new ButtonCreator("new-buttons");
// 调用创建按钮的方法
buttonCreator.createButtons();
