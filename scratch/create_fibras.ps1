function Save-Svg ($path, $content) {
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
}

# 1. Fibras Colágenas (H&E Stain Pink Wavy Bundles)
$colagenas = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#ffe4e6"/>
  <!-- Pink Eosinophilic Wavy Collagen Bundles -->
  <path d="M -20,60 Q 150,110 300,50 T 620,80" stroke="#fb7185" stroke-width="32" fill="none" opacity="0.9"/>
  <path d="M -20,140 Q 150,180 300,130 T 620,160" stroke="#f43f5e" stroke-width="40" fill="none" opacity="0.85"/>
  <path d="M -20,230 Q 150,270 300,210 T 620,250" stroke="#e11d48" stroke-width="36" fill="none" opacity="0.8"/>
  <path d="M -20,320 Q 150,360 300,300 T 620,330" stroke="#fb7185" stroke-width="45" fill="none" opacity="0.9"/>
  <!-- Fibroblast nuclei flattened between bundles -->
  <ellipse cx="180" cy="115" rx="30" ry="7" fill="#6d28d9"/>
  <ellipse cx="420" cy="205" rx="35" ry="8" fill="#6d28d9"/>
  <ellipse cx="250" cy="295" rx="28" ry="6" fill="#6d28d9"/>
  <!-- Pointer Arrow -->
  <g transform="translate(180, 30)">
    <path d="M 0,0 L 0,60 M -12,45 L 0,60 L 12,45" stroke="#be123c" stroke-width="6" fill="none"/>
    <rect x="-70" y="-35" width="140" height="30" rx="8" fill="#be123c"/>
    <text x="0" y="-15" fill="#ffffff" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Fibras Colágenas</text>
  </g>
</svg>
"@
Save-Svg "public/images/histologia/fibras/colagenas.svg" $colagenas

# 2. Fibras Elásticas (Orcein Stain Dark Brown Wavy Branching Threads)
$elasticas = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fef3c7"/>
  <!-- Dark Orcein Elastic Threads -->
  <g stroke="#78350f" fill="none" stroke-linecap="round">
    <path d="M -10,80 Q 100,40 200,100 T 400,60 T 610,90" stroke-width="6"/>
    <path d="M 150,80 Q 220,140 320,110 T 500,160" stroke-width="4"/>
    <path d="M -10,180 Q 120,240 280,170 T 480,220 T 610,190" stroke-width="7"/>
    <path d="M 220,190 Q 290,260 410,240" stroke-width="4"/>
    <path d="M -10,290 Q 150,330 310,280 T 610,310" stroke-width="6"/>
    <path d="M 80,310 Q 180,260 250,330" stroke-width="5"/>
  </g>
  <text x="300" y="370" fill="#92400e" font-family="Arial, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Coloração: Orceína (Fibras Elásticas)</text>
</svg>
"@
Save-Svg "public/images/histologia/fibras/elasticas.svg" $elasticas

# 3. Fibras Reticulares (Silver Impregnation Black Delicate Meshwork)
$reticulares = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#f5f5f4"/>
  <!-- Cells background in lymph node / liver -->
  <g fill="#d6d3d1" opacity="0.5">
    <circle cx="100" cy="100" r="30"/><circle cx="200" cy="150" r="35"/><circle cx="350" cy="120" r="32"/>
    <circle cx="480" cy="160" r="30"/><circle cx="150" cy="280" r="33"/><circle cx="300" cy="260" r="35"/>
    <circle cx="450" cy="290" r="32"/>
  </g>
  <!-- Black Silver Impregnated Network -->
  <g stroke="#1c1917" stroke-width="3.5" fill="none" stroke-linecap="round">
    <path d="M 50,50 L 120,120 L 200,80 L 280,160 L 360,90 L 450,140 L 550,60"/>
    <path d="M 120,120 L 100,220 L 180,260 L 150,350"/>
    <path d="M 280,160 L 300,260 L 220,320 L 330,360"/>
    <path d="M 360,90 L 420,200 L 450,290 L 520,350"/>
    <path d="M 450,140 L 530,220 L 580,280"/>
    <path d="M 200,80 L 300,40 L 400,60"/>
    <path d="M 100,220 L 220,180 L 300,260"/>
  </g>
  <text x="300" y="380" fill="#292524" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Impregnação Argêntica (Prata)</text>
</svg>
"@
Save-Svg "public/images/histologia/fibras/reticulares.svg" $reticulares

Write-Host "Fibras SVGs criados com sucesso!"
