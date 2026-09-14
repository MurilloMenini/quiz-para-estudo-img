# Script para gerar SVGs histológicos de altíssima qualidade visual para o HistoZoo

function Save-Svg ($path, $content) {
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
}

# 1. Células - Fibroblasto
$fibroblasto = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fce4ec"/>
  <path d="M 50,180 Q 120,120 250,150 T 450,220 Q 550,280 500,320 T 300,280 Q 150,300 50,180 Z" fill="#f8bbd0" stroke="#ec4899" stroke-width="3" opacity="0.85"/>
  <!-- Nucleus -->
  <ellipse cx="280" cy="210" rx="65" ry="35" fill="#8b5cf6" opacity="0.9" transform="rotate(-10 280 210)"/>
  <ellipse cx="260" cy="205" rx="15" ry="10" fill="#a78bfa"/>
  <ellipse cx="300" cy="215" rx="12" ry="8" fill="#a78bfa"/>
  <!-- Collagen fibers in matrix -->
  <path d="M 20,50 Q 200,80 400,30 T 580,70" stroke="#f43f5e" stroke-width="6" fill="none" opacity="0.4"/>
  <path d="M 10,340 Q 180,310 380,360 T 590,320" stroke="#f43f5e" stroke-width="8" fill="none" opacity="0.4"/>
  <path d="M 400,120 Q 480,180 550,100" stroke="#f43f5e" stroke-width="5" fill="none" opacity="0.4"/>
  <!-- Pointer Arrow -->
  <g transform="translate(280, 80)">
    <path d="M 0,0 L 0,60 M -12,45 L 0,60 L 12,45" stroke="#be123c" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="-60" y="-35" width="120" height="30" rx="8" fill="#be123c"/>
    <text x="0" y="-15" fill="#ffffff" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Fibroblasto</text>
  </g>
</svg>
"@
Save-Svg "public/images/histologia/celulas/fibroblasto.svg" $fibroblasto

# 2. Células - Fibrócito
$fibrocito = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <!-- Dense matrix background -->
  <path d="M 0,100 Q 300,120 600,80 M 0,200 Q 300,220 600,180 M 0,300 Q 300,320 600,280" stroke="#f43f5e" stroke-width="14" fill="none" opacity="0.3"/>
  <!-- Quiescent cell -->
  <path d="M 120,200 Q 250,185 480,200 Q 250,215 120,200 Z" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
  <!-- Heterochromatic condensed nucleus -->
  <ellipse cx="280" cy="200" rx="45" ry="10" fill="#4c1d95"/>
  <!-- Pointer Arrow -->
  <g transform="translate(280, 110)">
    <path d="M 0,0 L 0,60 M -12,45 L 0,60 L 12,45" stroke="#be123c" stroke-width="6" fill="none" stroke-linecap="round"/>
    <rect x="-55" y="-35" width="110" height="30" rx="8" fill="#be123c"/>
    <text x="0" y="-15" fill="#ffffff" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Fibrócito</text>
  </g>
</svg>
"@
Save-Svg "public/images/histologia/celulas/fibrocito.svg" $fibrocito

# 3. Células - Macrófago
$macrofago = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fcf4f6"/>
  <!-- Irregular Macrophage -->
  <path d="M 180,140 C 130,170 120,240 160,300 C 220,360 340,350 420,300 C 480,260 460,180 400,140 C 330,100 230,110 180,140 Z" fill="#f472b6" opacity="0.75" stroke="#e11d48" stroke-width="4"/>
  <!-- Pseudopodia -->
  <path d="M 140,200 Q 90,190 110,230 Q 130,240 150,230" fill="#f472b6" stroke="#e11d48" stroke-width="3"/>
  <path d="M 430,220 Q 490,210 470,250 Q 440,260 430,240" fill="#f472b6" stroke="#e11d48" stroke-width="3"/>
  <!-- Kidney shaped nucleus -->
  <path d="M 250,200 A 35,35 0 0,1 320,250 A 20,20 0 0,0 280,240 A 20,20 0 0,1 250,200 Z" fill="#5b21b6"/>
  <!-- Phagocytosed vacuoles -->
  <circle cx="210" cy="260" r="14" fill="#9f1239" opacity="0.8"/>
  <circle cx="360" cy="200" r="18" fill="#881337" opacity="0.8"/>
  <circle cx="340" cy="260" r="10" fill="#4c1d95" opacity="0.8"/>
  <circle cx="230" cy="180" r="12" fill="#be123c" opacity="0.8"/>
  <!-- Pointer Arrow -->
  <g transform="translate(290, 50)">
    <path d="M 0,0 L 0,65 M -12,50 L 0,65 L 12,50" stroke="#be123c" stroke-width="6" fill="none"/>
    <rect x="-60" y="-35" width="120" height="30" rx="8" fill="#be123c"/>
    <text x="0" y="-15" fill="#ffffff" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Macrófago</text>
  </g>
</svg>
"@
Save-Svg "public/images/histologia/celulas/macrofago.svg" $macrofago

# 4. Células - Mastócito
$mastocito = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fae8ff"/>
  <!-- Globular cell -->
  <circle cx="300" cy="210" r="120" fill="#f0abfc" opacity="0.7" stroke="#c084fc" stroke-width="4"/>
  <!-- Central round nucleus -->
  <circle cx="300" cy="210" r="40" fill="#581c87" opacity="0.85"/>
  <!-- Basophilic/metachromatic granules -->
  <g fill="#4c1d95">
    <circle cx="230" cy="150" r="9"/><circle cx="260" cy="130" r="10"/><circle cx="310" cy="135" r="8"/>
    <circle cx="350" cy="145" r="11"/><circle cx="380" cy="180" r="9"/><circle cx="390" cy="220" r="10"/>
    <circle cx="370" cy="260" r="8"/><circle cx="340" cy="290" r="11"/><circle cx="290" cy="300" r="9"/>
    <circle cx="240" cy="280" r="10"/><circle cx="210" cy="240" r="11"/><circle cx="210" cy="190" r="8"/>
    <circle cx="250" cy="180" r="7"/><circle cx="340" cy="180" r="8"/><circle cx="260" cy="250" r="9"/>
    <circle cx="330" cy="250" r="10"/><circle cx="220" cy="160" r="8"/><circle cx="380" cy="250" r="9"/>
  </g>
</svg>
"@
Save-Svg "public/images/histologia/celulas/mastocito.svg" $mastocito

# 5. Células - Plasmócito
$plasmocito = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f8"/>
  <!-- Cell body -->
  <ellipse cx="300" cy="210" rx="130" ry="100" fill="#c084fc" opacity="0.85" stroke="#7e22ce" stroke-width="4"/>
  <!-- Eccentric Nucleus -->
  <circle cx="350" cy="200" r="45" fill="#4c1d95"/>
  <!-- Clock-face / cartwheel chromatin spokes -->
  <g stroke="#a78bfa" stroke-width="4">
    <line x1="350" y1="160" x2="350" y2="240"/>
    <line x1="310" y1="200" x2="390" y2="200"/>
    <line x1="322" y1="172" x2="378" y2="228"/>
    <line x1="322" y1="228" x2="378" y2="172"/>
  </g>
  <circle cx="350" cy="200" r="12" fill="#4c1d95"/>
  <!-- Perinuclear Golgi Halo -->
  <path d="M 255,180 A 30,30 0 0,1 285,240 A 20,20 0 0,0 255,180 Z" fill="#ffffff" opacity="0.8"/>
  <!-- Pointer Arrow -->
  <g transform="translate(350, 70)">
    <path d="M 0,0 L 0,60 M -12,45 L 0,60 L 12,45" stroke="#be123c" stroke-width="6" fill="none"/>
    <rect x="-60" y="-35" width="120" height="30" rx="8" fill="#be123c"/>
    <text x="0" y="-15" fill="#ffffff" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Plasmócito</text>
  </g>
</svg>
"@
Save-Svg "public/images/histologia/celulas/plasmocito.svg" $plasmocito

# 6. Células - Adipócito
$adipocito = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fff1f2"/>
  <!-- Adipocyte Mesh -->
  <!-- Adipocyte 1 Main -->
  <polygon points="200,100 380,80 480,220 380,340 180,330 100,200" fill="#ffffff" stroke="#fb7185" stroke-width="4"/>
  <ellipse cx="440" cy="140" rx="35" ry="12" fill="#8b5cf6" transform="rotate(30 440 140)"/>
  <!-- Adipocyte 2 Neighbor -->
  <polygon points="380,80 550,50 580,180 480,220" fill="#ffffff" stroke="#fda4af" stroke-width="3"/>
  <!-- Adipocyte 3 Neighbor -->
  <polygon points="100,200 180,330 50,380 20,260" fill="#ffffff" stroke="#fda4af" stroke-width="3"/>
  <text x="280" y="220" fill="#f43f5e" font-family="Arial, sans-serif" font-size="20" font-weight="bold" opacity="0.4" text-anchor="middle">Gota Lipídica</text>
</svg>
"@
Save-Svg "public/images/histologia/celulas/adipocito.svg" $adipocito

Write-Host "Células SVGs criados com sucesso!"
