from PIL import Image
import os

input_folder = input()
output_folder = input()
target_size = (200, 200)  # 目标尺寸

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.endswith((".webp")):
        img = Image.open(os.path.join(input_folder, filename))
        img.thumbnail(target_size)  # 保持比例缩放
        img.save(os.path.join(output_folder, filename))