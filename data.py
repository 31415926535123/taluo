import re
import json

# 读取文件内容
with open(r'C:\fusheng\taluo\1.txt', 'r', encoding='utf-8') as f:
    data = f.read()

# 使用正则表达式将键名用双引号包裹
data = re.sub(r'(\w+):', r'"\1":', data)
json_data = json.loads(data)
    
for i in range(len(json_data)):
    json_data[i]['image']=f'image/{i}.webp'
updated_data = json.dumps(json_data, ensure_ascii=False, indent=4)
with open(r'C:\fusheng\taluo\2.txt', 'w', encoding='utf-8') as f:
        f.write(updated_data)   

    

