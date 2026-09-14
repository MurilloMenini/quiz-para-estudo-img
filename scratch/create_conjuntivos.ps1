function Save-Svg ($path, $content) {
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
}

# 1. Tecido Conjuntivo Frouxo
$frouxo = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fff1f2"/>
  <!-- Loose sparse collagen fibers -->
  <g stroke="#fb7185" fill="none" stroke-linecap="round">
    <path d="M 20,80 Q 200,120 400,60 T 580,100" stroke-width="12" opacity="0.6"/>
    <path d="M 50,300 Q 250,260 420,340 T 570,300" stroke-width="14" opacity="0.6"/>
    <path d="M 100,40 Q 150,220 120,360" stroke-width="10" opacity="0.5"/>
    <path d="M 450,50 Q 420,200 480,360" stroke-width="10" opacity="0.5"/>
  </g>
  <!-- Thin Elastic Fibers -->
  <path d="M 0,160 Q 200,190 400,140 T 600,180" stroke="#881337" stroke-width="4" fill="none"/>
  <!-- Various Cell Nuclei -->
  <ellipse cx="180" cy="115" rx="30" ry="12" fill="#6d28d9"/> <!-- Fibroblast -->
  <circle cx="340" cy="220" r="24" fill="#9f1239"/> <!-- Macrophage -->
  <circle cx="480" cy="140" r="22" fill="#581c87"/> <!-- Mast cell -->
  <circle cx="140" cy="280" r="18" fill="#4c1d95"/> <!-- Plasma cell -->
</svg>
"@
Save-Svg "public/images/histologia/conjuntivo/frouxo.svg" $frouxo

# 2. Tecido Conjuntivo Denso Regular (Tendon)
$denso_regular = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fecdd3"/>
  <!-- Rigorously parallel dense collagen bundles -->
  <g stroke="#f43f5e" stroke-width="38" fill="none">
    <line x1="-10" y1="50" x2="610" y2="50"/>
    <line x1="-10" y1="125" x2="610" y2="125"/>
    <line x1="-10" y1="200" x2="610" y2="200"/>
    <line x1="-10" y1="275" x2="610" y2="275"/>
    <line x1="-10" y1="350" x2="610" y2="350"/>
  </g>
  <!-- Squeezed rows of flattened fibroblast nuclei -->
  <g fill="#4c1d95">
    <ellipse cx="120" cy="88" rx="40" ry="6"/><ellipse cx="380" cy="88" rx="40" ry="6"/>
    <ellipse cx="240" cy="162" rx="42" ry="6"/><ellipse cx="480" cy="162" rx="40" ry="6"/>
    <ellipse cx="150" cy="238" rx="38" ry="6"/><ellipse cx="340" cy="238" rx="42" ry="6"/>
    <ellipse cx="280" cy="312" rx="40" ry="6"/><ellipse cx="500" cy="312" rx="38" ry="6"/>
  </g>
  <text x="300" y="385" fill="#881337" font-family="Arial, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Feixes de Colágeno Rigorosamente Paralelos (Tendão)</text>
</svg>
"@
Save-Svg "public/images/histologia/conjuntivo/denso_regular.svg" $denso_regular

# 3. Tecido Conjuntivo Denso Irregular (Dermis)
$denso_irregular = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fecdd3"/>
  <!-- Coarse bundles in random directions -->
  <g stroke="#e11d48" fill="none" opacity="0.85" stroke-linecap="round">
    <path d="M 20,40 Q 180,180 80,320" stroke-width="42"/>
    <path d="M 120,80 Q 300,40 450,160" stroke-width="38"/>
    <path d="M 250,220 Q 420,380 580,280" stroke-width="45"/>
    <path d="M 400,40 Q 550,120 520,350" stroke-width="36"/>
    <path d="M 50,350 Q 250,300 380,380" stroke-width="40"/>
  </g>
  <!-- Scattered fibroblast nuclei -->
  <g fill="#4c1d95">
    <ellipse cx="140" cy="180" rx="25" ry="8" transform="rotate(45 140 180)"/>
    <ellipse cx="320" cy="110" rx="28" ry="7" transform="rotate(-20 320 110)"/>
    <ellipse cx="420" cy="270" rx="26" ry="8" transform="rotate(60 420 270)"/>
  </g>
  <text x="300" y="385" fill="#881337" font-family="Arial, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Feixes Entrançados em Várias Direções (Derme)</text>
</svg>
"@
Save-Svg "public/images/histologia/conjuntivo/denso_irregular.svg" $denso_irregular

# 4. Cartilagem Hialina
$cartilaginoso_hialino = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#f0abfc" opacity="0.6"/> <!-- Smooth Basophilic Matrix -->
  <!-- Chondrocytes in Lacunae -->
  <g fill="#ffffff" stroke="#c084fc" stroke-width="4">
    <!-- Single lacunae -->
    <circle cx="120" cy="100" r="32"/><circle cx="120" cy="100" r="18" fill="#581c87"/>

    <circle cx="450" cy="120" r="35"/><circle cx="450" cy="120" r="20" fill="#581c87"/>

    <circle cx="150" cy="300" r="34"/><circle cx="150" cy="300" r="19" fill="#581c87"/>

    <!-- Isogenous Group (Pair) -->
    <ellipse cx="300" cy="220" rx="55" ry="35"/>
    <circle cx="280" cy="220" r="18" fill="#581c87"/>
    <circle cx="320" cy="220" r="18" fill="#581c87"/>
  </g>
  <!-- Territory Matrix Rim -->
  <circle cx="300" cy="220" r="62" fill="none" stroke="#7e22ce" stroke-width="3" opacity="0.7"/>
  <text x="300" y="360" fill="#581c87" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Grupo Isógeno de Condrócitos em Lacunas</text>
</svg>
"@
Save-Svg "public/images/histologia/conjuntivo/cartilaginoso_hialino.svg" $cartilaginoso_hialino

# 5. Sistema de Havers (Compact Bone)
$osseo_havers = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#e7e5e4"/>
  <!-- Concentric Lamellae Rings -->
  <g stroke="#78716c" fill="none" stroke-width="3">
    <circle cx="300" cy="200" r="50"/>
    <circle cx="300" cy="200" r="90"/>
    <circle cx="300" cy="200" r="130"/>
    <circle cx="300" cy="200" r="170"/>
  </g>
  <!-- Central Havers Canal -->
  <circle cx="300" cy="200" r="28" fill="#1c1917"/>
  <text x="300" y="205" fill="#ffffff" font-family="Arial, sans-serif" font-size="11" text-anchor="middle">Havers</text>

  <!-- Osteocyte Lacunae on Lamellae -->
  <g fill="#292524">
    <ellipse cx="350" cy="200" rx="8" ry="4"/>
    <ellipse cx="250" cy="200" rx="8" ry="4"/>
    <ellipse cx="300" cy="290" rx="4" ry="8"/>
    <ellipse cx="300" cy="110" rx="4" ry="8"/>
    <ellipse cx="390" cy="290" rx="7" ry="5" transform="rotate(45 390 290)"/>
    <ellipse cx="210" cy="110" rx="7" ry="5" transform="rotate(45 210 110)"/>
  </g>
  <text x="300" y="385" fill="#1c1917" font-family="Arial, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Sistema de Havers (Ósteon com Lamelas Concêntricas)</text>
</svg>
"@
Save-Svg "public/images/histologia/conjuntivo/osseo_havers.svg" $osseo_havers

# 6. Esfregaço Sanguíneo (Blood Smear)
$sangue_esfregaco = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fff1f2"/>
  <!-- Erythrocytes (RBCs - Anucleated Biconcave Disks) -->
  <g fill="#f43f5e" opacity="0.8">
    <circle cx="80" cy="80" r="24"/><circle cx="80" cy="80" r="10" fill="#fecdd3"/>
    <circle cx="160" cy="120" r="24"/><circle cx="160" cy="120" r="10" fill="#fecdd3"/>
    <circle cx="240" cy="70" r="24"/><circle cx="240" cy="70" r="10" fill="#fecdd3"/>
    <circle cx="340" cy="100" r="24"/><circle cx="340" cy="100" r="10" fill="#fecdd3"/>
    <circle cx="440" cy="70" r="24"/><circle cx="440" cy="70" r="10" fill="#fecdd3"/>
    <circle cx="520" cy="120" r="24"/><circle cx="520" cy="120" r="10" fill="#fecdd3"/>
    
    <circle cx="100" cy="220" r="24"/><circle cx="100" cy="220" r="10" fill="#fecdd3"/>
    <circle cx="200" cy="270" r="24"/><circle cx="200" cy="270" r="10" fill="#fecdd3"/>
    <circle cx="400" cy="280" r="24"/><circle cx="400" cy="280" r="10" fill="#fecdd3"/>
    <circle cx="500" cy="250" r="24"/><circle cx="500" cy="250" r="10" fill="#fecdd3"/>
  </g>

  <!-- Neutrophil WBC with Lobed Nucleus -->
  <circle cx="300" cy="210" r="45" fill="#f472b6" opacity="0.7" stroke="#c084fc" stroke-width="3"/>
  <path d="M 270,190 Q 285,175 305,190 T 325,220 Q 310,240 285,225 Z" fill="#4c1d95"/>
</svg>
"@
Save-Svg "public/images/histologia/conjuntivo/sangue_esfregaco.svg" $sangue_esfregaco

Write-Host "Conjuntivo SVGs criados com sucesso!"
