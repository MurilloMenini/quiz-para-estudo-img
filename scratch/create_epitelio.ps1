function Save-Svg ($path, $content) {
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
}

# 1. Pavimentoso Simples (Endothelium/Mesothelium)
$pavimentoso_simples = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <!-- Connective tissue base -->
  <rect x="0" y="240" width="600" height="160" fill="#fecdd3" opacity="0.6"/>
  <!-- Basement Membrane -->
  <line x1="0" y1="240" x2="600" y2="240" stroke="#be123c" stroke-width="4"/>
  <!-- Single layer of flattened squamous cells -->
  <path d="M 0,240 L 0,215 Q 60,200 120,215 L 120,240 Z" fill="#f472b6" stroke="#e11d48" stroke-width="2"/>
  <ellipse cx="60" cy="222" rx="25" ry="7" fill="#5b21b6"/>

  <path d="M 120,240 L 120,215 Q 210,195 300,215 L 300,240 Z" fill="#f472b6" stroke="#e11d48" stroke-width="2"/>
  <ellipse cx="210" cy="218" rx="35" ry="9" fill="#5b21b6"/>

  <path d="M 300,240 L 300,215 Q 390,198 480,215 L 480,240 Z" fill="#f472b6" stroke="#e11d48" stroke-width="2"/>
  <ellipse cx="390" cy="220" rx="30" ry="8" fill="#5b21b6"/>

  <path d="M 480,240 L 480,215 Q 540,200 600,215 L 600,240 Z" fill="#f472b6" stroke="#e11d48" stroke-width="2"/>
  <ellipse cx="540" cy="222" rx="25" ry="7" fill="#5b21b6"/>

  <text x="300" y="100" fill="#9f1239" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle">LÚMEN (CAVIDADE / VASO)</text>
  <!-- Pointer Arrow -->
  <g transform="translate(210, 125)">
    <path d="M 0,0 L 0,60 M -10,45 L 0,60 L 10,45" stroke="#be123c" stroke-width="5" fill="none"/>
  </g>
</svg>
"@
Save-Svg "public/images/histologia/epitelio/pavimentoso_simples.svg" $pavimentoso_simples

# 2. Cúbico Simples (Renal Tubule / Thyroid Follicle)
$cubico_simples = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <!-- Connective tissue below -->
  <rect x="0" y="270" width="600" height="130" fill="#fecdd3" opacity="0.6"/>
  <!-- Basement Membrane -->
  <line x1="0" y1="270" x2="600" y2="270" stroke="#be123c" stroke-width="4"/>
  <!-- Cubic Cells -->
  <g stroke="#e11d48" stroke-width="3" fill="#f472b6">
    <rect x="20" y="170" width="100" height="100" rx="8"/>
    <circle cx="70" cy="220" r="22" fill="#5b21b6"/>

    <rect x="130" y="170" width="100" height="100" rx="8"/>
    <circle cx="180" cy="220" r="22" fill="#5b21b6"/>

    <rect x="240" y="170" width="100" height="100" rx="8"/>
    <circle cx="290" cy="220" r="22" fill="#5b21b6"/>

    <rect x="350" y="170" width="100" height="100" rx="8"/>
    <circle cx="400" cy="220" r="22" fill="#5b21b6"/>

    <rect x="460" y="170" width="100" height="100" rx="8"/>
    <circle cx="510" cy="220" r="22" fill="#5b21b6"/>
  </g>
  <text x="300" y="80" fill="#9f1239" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle">LÚMEN DO TÚBULO</text>
</svg>
"@
Save-Svg "public/images/histologia/epitelio/cubico_simples.svg" $cubico_simples

# 3. Prismático Simples (Intestinal Mucosa with Microvilli)
$prismatico_simples = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <rect x="0" y="300" width="600" height="100" fill="#fecdd3" opacity="0.6"/>
  <line x1="0" y1="300" x2="600" y2="300" stroke="#be123c" stroke-width="4"/>

  <!-- Columnar Cells -->
  <g stroke="#e11d48" stroke-width="3" fill="#f472b6">
    <rect x="50" y="120" width="90" height="180" rx="10"/>
    <ellipse cx="95" cy="245" rx="20" ry="32" fill="#5b21b6"/>

    <rect x="150" y="120" width="90" height="180" rx="10"/>
    <ellipse cx="195" cy="245" rx="20" ry="32" fill="#5b21b6"/>

    <rect x="250" y="120" width="90" height="180" rx="10"/>
    <ellipse cx="295" cy="245" rx="20" ry="32" fill="#5b21b6"/>

    <rect x="350" y="120" width="90" height="180" rx="10"/>
    <ellipse cx="395" cy="245" rx="20" ry="32" fill="#5b21b6"/>

    <rect x="450" y="120" width="90" height="180" rx="10"/>
    <ellipse cx="495" cy="245" rx="20" ry="32" fill="#5b21b6"/>
  </g>

  <!-- Microvilli Brush Border -->
  <rect x="45" y="108" width="500" height="12" fill="#be123c" rx="4"/>
  <text x="300" y="80" fill="#9f1239" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Borda em Escova (Microvilosidades Apicais)</text>
</svg>
"@
Save-Svg "public/images/histologia/epitelio/prismatico_simples.svg" $prismatico_simples

# 4. Pavimentoso Estratificado Queratinizado (Epidermis)
$pavimentoso_estratificado = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <!-- Dermis Below -->
  <path d="M 0,300 Q 150,280 300,310 T 600,290 L 600,400 L 0,400 Z" fill="#fda4af"/>
  <!-- Stratum Basale -->
  <path d="M 0,300 Q 150,280 300,310 T 600,290 L 600,240 Q 450,260 300,230 T 0,250 Z" fill="#e11d48"/>
  <!-- Stratum Spinosum / Granulosum -->
  <rect x="0" y="140" width="600" height="100" fill="#fb7185"/>
  <!-- Stratum Corneum (Keratin Layer) -->
  <path d="M 0,70 Q 150,90 300,60 T 600,80 L 600,140 L 0,140 Z" fill="#fbbf24" opacity="0.85"/>
  <text x="300" y="110" fill="#92400e" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Camada de Queratina (Superfície Anucleada)</text>
  <!-- Nuclei scattered -->
  <g fill="#4c1d95">
    <ellipse cx="80" cy="270" rx="8" ry="14"/><ellipse cx="200" cy="275" rx="8" ry="14"/>
    <ellipse cx="340" cy="275" rx="8" ry="14"/><ellipse cx="480" cy="270" rx="8" ry="14"/>
    <circle cx="100" cy="190" r="10"/><circle cx="260" cy="180" r="10"/><circle cx="420" cy="190" r="10"/>
  </g>
</svg>
"@
Save-Svg "public/images/histologia/epitelio/pavimentoso_estratificado.svg" $pavimentoso_estratificado

# 5. Cúbico Estratificado (Sweat Gland Duct)
$cubico_estratificado = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <!-- Duct Wall -->
  <!-- Outer Layer -->
  <g fill="#f472b6" stroke="#e11d48" stroke-width="3">
    <rect x="100" y="80" width="400" height="70" rx="10"/>
    <rect x="100" y="250" width="400" height="70" rx="10"/>
  </g>
  <!-- Inner Layer -->
  <g fill="#fb7185" stroke="#be123c" stroke-width="3">
    <rect x="100" y="145" width="400" height="55" rx="8"/>
    <rect x="100" y="200" width="400" height="55" rx="8"/>
  </g>
  <!-- Nuclei Outer and Inner -->
  <g fill="#4c1d95">
    <circle cx="160" cy="115" r="18"/><circle cx="300" cy="115" r="18"/><circle cx="440" cy="115" r="18"/>
    <circle cx="160" cy="172" r="15"/><circle cx="300" cy="172" r="15"/><circle cx="440" cy="172" r="15"/>
    <circle cx="160" cy="227" r="15"/><circle cx="300" cy="227" r="15"/><circle cx="440" cy="227" r="15"/>
    <circle cx="160" cy="285" r="18"/><circle cx="300" cy="285" r="18"/><circle cx="440" cy="285" r="18"/>
  </g>
  <text x="300" y="45" fill="#be123c" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Ducto com 2 Camadas de Células Cúbicas</text>
</svg>
"@
Save-Svg "public/images/histologia/epitelio/cubico_estratificado.svg" $cubico_estratificado

# 6. Prismático Estratificado
$prismatico_estratificado = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <rect x="0" y="300" width="600" height="100" fill="#fecdd3" opacity="0.6"/>
  <line x1="0" y1="300" x2="600" y2="300" stroke="#be123c" stroke-width="4"/>
  <!-- Basal polyhedral cells -->
  <g fill="#f472b6" stroke="#e11d48" stroke-width="2">
    <rect x="50" y="230" width="100" height="70" rx="8"/><circle cx="100" cy="265" r="16" fill="#5b21b6"/>
    <rect x="160" y="230" width="100" height="70" rx="8"/><circle cx="210" cy="265" r="16" fill="#5b21b6"/>
    <rect x="270" y="230" width="100" height="70" rx="8"/><circle cx="320" cy="265" r="16" fill="#5b21b6"/>
    <rect x="380" y="230" width="100" height="70" rx="8"/><circle cx="430" cy="265" r="16" fill="#5b21b6"/>
  </g>
  <!-- Apical columnar cells -->
  <g fill="#fb7185" stroke="#be123c" stroke-width="3">
    <rect x="50" y="90" width="100" height="140" rx="10"/><ellipse cx="100" cy="180" rx="18" ry="25" fill="#4c1d95"/>
    <rect x="160" y="90" width="100" height="140" rx="10"/><ellipse cx="210" cy="180" rx="18" ry="25" fill="#4c1d95"/>
    <rect x="270" y="90" width="100" height="140" rx="10"/><ellipse cx="320" cy="180" rx="18" ry="25" fill="#4c1d95"/>
    <rect x="380" y="90" width="100" height="140" rx="10"/><ellipse cx="430" cy="180" rx="18" ry="25" fill="#4c1d95"/>
  </g>
  <text x="300" y="55" fill="#9f1239" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Células Prismáticas no Topo / Células Poliédricas na Base</text>
</svg>
"@
Save-Svg "public/images/histologia/epitelio/prismatico_estratificado.svg" $prismatico_estratificado

# 7. Pseudoestratificado Ciliado (Trachea)
$pseudoestratificado = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <rect x="0" y="310" width="600" height="90" fill="#fecdd3" opacity="0.6"/>
  <line x1="0" y1="310" x2="600" y2="310" stroke="#be123c" stroke-width="4"/>
  <!-- Cells on basement membrane -->
  <g stroke="#e11d48" stroke-width="3">
    <!-- Tall cell -->
    <path d="M 50,310 L 50,110 L 130,110 L 130,310 Z" fill="#f472b6"/>
    <ellipse cx="90" cy="170" rx="18" ry="28" fill="#5b21b6"/>

    <!-- Short basal cell -->
    <path d="M 130,310 L 130,220 L 200,220 L 200,310 Z" fill="#f472b6"/>
    <circle cx="165" cy="265" r="20" fill="#5b21b6"/>

    <!-- Goblet cell -->
    <path d="M 200,310 L 200,110 L 290,110 L 290,310 Z" fill="#ffffff"/>
    <ellipse cx="245" cy="285" rx="16" ry="12" fill="#5b21b6"/>
    <circle cx="245" cy="150" r="30" fill="#fbcfe8" stroke="#ec4899" stroke-width="2"/>

    <!-- Tall cell 2 -->
    <path d="M 290,310 L 290,110 L 380,110 L 380,310 Z" fill="#f472b6"/>
    <ellipse cx="335" cy="210" rx="18" ry="28" fill="#5b21b6"/>

    <!-- Short cell 2 -->
    <path d="M 380,310 L 380,210 L 450,210 L 450,310 Z" fill="#f472b6"/>
    <circle cx="415" cy="260" r="18" fill="#5b21b6"/>

    <!-- Tall cell 3 -->
    <path d="M 450,310 L 450,110 L 530,110 L 530,310 Z" fill="#f472b6"/>
    <ellipse cx="490" cy="160" rx="18" ry="28" fill="#5b21b6"/>
  </g>
  <!-- Cilia on apical surface -->
  <g stroke="#9f1239" stroke-width="4" stroke-linecap="round">
    <line x1="60" y1="110" x2="55" y2="85"/><line x1="80" y1="110" x2="75" y2="85"/><line x1="100" y1="110" x2="95" y2="85"/>
    <line x1="120" y1="110" x2="115" y2="85"/><line x1="300" y1="110" x2="295" y2="85"/><line x1="320" y1="110" x2="315" y2="85"/>
    <line x1="340" y1="110" x2="335" y2="85"/><line x1="360" y1="110" x2="355" y2="85"/><line x1="460" y1="110" x2="455" y2="85"/>
    <line x1="480" y1="110" x2="475" y2="85"/><line x1="500" y1="110" x2="495" y2="85"/><line x1="520" y1="110" x2="515" y2="85"/>
  </g>
  <text x="300" y="60" fill="#9f1239" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Cílios Apicais Movelmente Dispostos</text>
</svg>
"@
Save-Svg "public/images/histologia/epitelio/pseudoestratificado.svg" $pseudoestratificado

# 8. Transição (Urothelium / Umbrella Cells)
$transicao = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <rect x="0" y="300" width="600" height="100" fill="#fecdd3" opacity="0.6"/>
  <line x1="0" y1="300" x2="600" y2="300" stroke="#be123c" stroke-width="4"/>

  <!-- Basal and intermediate layers -->
  <g fill="#f472b6" stroke="#e11d48" stroke-width="2">
    <circle cx="100" cy="260" r="30"/><circle cx="220" cy="260" r="30"/><circle cx="340" cy="260" r="30"/><circle cx="460" cy="260" r="30"/>
    <circle cx="160" cy="210" r="32"/><circle cx="280" cy="210" r="32"/><circle cx="400" cy="210" r="32"/>
  </g>

  <!-- Large Dome-Shaped Umbrella Cells on Surface -->
  <g fill="#fb7185" stroke="#be123c" stroke-width="4">
    <path d="M 40,180 Q 140,90 240,180 Z"/>
    <circle cx="110" cy="145" r="14" fill="#4c1d95"/>
    <circle cx="160" cy="145" r="14" fill="#4c1d95"/> <!-- Binucleated -->

    <path d="M 230,180 Q 340,90 450,180 Z"/>
    <circle cx="340" cy="140" r="16" fill="#4c1d95"/>

    <path d="M 440,180 Q 530,100 600,180 Z"/>
    <circle cx="520" cy="145" r="15" fill="#4c1d95"/>
  </g>
  <text x="300" y="55" fill="#be123c" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Células em Guarda-chuva (Domos Arredondados)</text>
</svg>
"@
Save-Svg "public/images/histologia/epitelio/transicao.svg" $transicao

Write-Host "Epitélio SVGs criados com sucesso!"
