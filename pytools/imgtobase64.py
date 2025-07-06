import base64
from PIL import Image
from io import BytesIO

def image_to_base64(image_path):
    """
    将指定路径的图片转换为 Base64 编码的字符串。

    :param image_path: 图片文件的路径
    :return: Base64 编码的字符串
    """
    try:
        # 打开图片文件
        with Image.open(image_path) as img:
            # 创建一个字节流对象
            buffered = BytesIO()
            # 将图片保存到字节流中，使用原图片格式
            img.save(buffered, format=img.format)
            # 获取字节流中的字节数据
            img_byte = buffered.getvalue()
            # 将字节数据进行 Base64 编码
            img_base64 = base64.b64encode(img_byte).decode('utf-8')
            return img_base64
    except Exception as e:
        print(f"转换图片时出错: {e}")
        return None

def get_html_img_tag(image_path):
    """
    获取包含 Base64 编码图片的 HTML <img> 标签。

    :param image_path: 图片文件的路径
    :return: 包含 Base64 编码图片的 HTML <img> 标签字符串
    """
    base64_str = image_to_base64(image_path)
    if base64_str:
        try:
            with Image.open(image_path) as img:
                img_format = img.format.lower()
            return f'<img src="data:image/{img_format};base64,{base64_str}" alt="Embedded Image">'
        except Exception as e:
            print(f"获取图片格式时出错: {e}")
    return ""

if __name__ == "__main__":
    # 替换为你的图片路径
    image_path = input()
    html_img_tag = get_html_img_tag(image_path)
    if html_img_tag:
        print(html_img_tag)
