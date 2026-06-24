import json
import os

files = ['Hero.tsx', 'CinematicGallery.tsx']

for fname in files:
    path = f'C:/Users/Kutet/Downloads/portfolio/website/components/{fname}'
    if os.path.exists(path):
        with open(path, 'r', encoding='utf8') as f:
            code = f.read()
            if code.startswith('"') and code.endswith('"'):
                try:
                    fixed_code = json.loads(code)
                    with open(path, 'w', encoding='utf8') as out:
                        out.write(fixed_code)
                    print(f"Fixed {fname}")
                except Exception as e:
                    print(f"Error fixing {fname}: {e}")
            else:
                print(f"{fname} is already unescaped.")
