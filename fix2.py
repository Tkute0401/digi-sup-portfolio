import json
for fname in ['Hero.tsx', 'CinematicGallery.tsx']:
    path = f'components/{fname}'
    with open(path, 'r', encoding='utf8') as f:
        code = f.read().strip()
    if code.startswith('"'):
        try:
            parsed = json.loads(code)
            with open(path, 'w', encoding='utf8') as f:
                f.write(parsed)
            print(f'Fixed {fname}')
        except Exception as e:
            print(f'Failed to fix {fname}: {e}')
