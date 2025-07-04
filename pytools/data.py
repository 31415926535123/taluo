import re
import json
a=input()
b=input()
# 读取文件内容
with open(a, 'r', encoding='utf-8') as f:
    data = f.read()

# 使用正则表达式将键名用双引号包裹
data = re.sub(r'(\w+):', r'"\1":', data)
json_data = json.loads(data)
    
for i in range(len(json_data)):
    json_data[i]['image']=f'image/{i}.webp'
updated_data = json.dumps(json_data, ensure_ascii=False, indent=4)
with open(b, 'w', encoding='utf-8') as f:
        f.write(updated_data)   

    

