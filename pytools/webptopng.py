from PIL import Image
a=input()
b=input()
c=int(input())
d=int(input())
def convert_webp_to_png(input_path, output_path,c,d):
    for i in range(c,d):
        try:
            with Image.open(f"{input_path}{i}.jpg") as img:
                img.save(f"{output_path}{i}.webp", 'WebP')
                print(f"成功将 {input_path}{i}.webp 转换为 {output_path}{i}.png")
        except:
            pass
        

# 使用示例
convert_webp_to_png(a, b,c,d)