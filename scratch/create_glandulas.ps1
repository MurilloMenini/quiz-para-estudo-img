function Save-Svg ($path, $content) {
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
}

# 1. Glândula Exócrina com Acino e Ducto Excretor
$exocrina_acino = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <!-- Excretory Duct -->
  <path d="M 250,20 L 250,150 M 350,20 L 350,150" stroke="#be123c" stroke-width="8" fill="none"/>
  <rect x="254" y="20" width="92" height="130" fill="#ffffff" opacity="0.6"/>
  <!-- Secretory Acinus Bulb -->
  <path d="M 250,150 C 120,180 120,350 300,370 C 480,350 480,180 350,150 Z" fill="#f472b6" stroke="#e11d48" stroke-width="6"/>
  <circle cx="300" cy="270" r="30" fill="#ffffff" stroke="#be123c" stroke-width="3"/> <!-- Lumen -->
  <!-- Nuclei in acinar cells -->
  <g fill="#4c1d95">
    <circle cx="210" cy="230" r="18"/><circle cx="200" cy="300" r="18"/>
    <circle cx="260" cy="340" r="18"/><circle cx="340" cy="340" r="18"/>
    <circle cx="400" cy="300" r="18"/><circle cx="390" cy="230" r="18"/>
  </g>
  <!-- Pointer Arrow -->
  <g transform="translate(300, 40)">
    <path d="M 0,0 L 0,80 M -12,65 L 0,80 L 12,65" stroke="#be123c" stroke-width="6" fill="none"/>
    <rect x="-80" y="-35" width="160" height="30" rx="8" fill="#be123c"/>
    <text x="0" y="-15" fill="#ffffff" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Ducto Excretor Exócrino</text>
  </g>
</svg>
"@
Save-Svg "public/images/histologia/glandulas/exocrina_acino.svg" $exocrina_acino

# 2. Glândula Endócrina Cordonal (Adrenal / Pituitary)
$endocrina_cordonal = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <!-- Cords of epithelial cells -->
  <g fill="#fb7185" stroke="#be123c" stroke-width="3">
    <rect x="80" y="40" width="90" height="320" rx="20"/>
    <rect x="250" y="40" width="90" height="320" rx="20"/>
    <rect x="420" y="40" width="90" height="320" rx="20"/>
  </g>
  <!-- Nuclei in Cords -->
  <g fill="#4c1d95">
    <circle cx="125" cy="80" r="16"/><circle cx="125" cy="150" r="16"/><circle cx="125" cy="220" r="16"/><circle cx="125" cy="290" r="16"/>
    <circle cx="295" cy="80" r="16"/><circle cx="295" cy="150" r="16"/><circle cx="295" cy="220" r="16"/><circle cx="295" cy="290" r="16"/>
    <circle cx="465" cy="80" r="16"/><circle cx="465" cy="150" r="16"/><circle cx="465" cy="220" r="16"/><circle cx="465" cy="290" r="16"/>
  </g>
  <!-- Capillaries between Cords with RBCs -->
  <g stroke="#9f1239" stroke-width="6" fill="none">
    <path d="M 195,20 L 195,380"/><path d="M 365,20 L 365,380"/>
  </g>
  <g fill="#e11d48">
    <circle cx="195" cy="90" r="10"/><circle cx="195" cy="190" r="10"/><circle cx="195" cy="290" r="10"/>
    <circle cx="365" cy="120" r="10"/><circle cx="365" cy="220" r="10"/><circle cx="365" cy="320" r="10"/>
  </g>
  <text x="300" y="385" fill="#be123c" font-family="Arial, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Sem Ductos: Secreção Hormonal Direta em Capilares</text>
</svg>
"@
Save-Svg "public/images/histologia/glandulas/endocrina_cordonal.svg" $endocrina_cordonal

# 3. Glândula Tubular Simples (Crypt of Lieberkühn)
$tubular_simples = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  <!-- Mucosal Surface -->
  <rect x="0" y="50" width="220" height="40" fill="#f472b6"/>
  <rect x="380" y="50" width="220" height="40" fill="#f472b6"/>
  <!-- Straight Tubular Invagination -->
  <path d="M 220,50 L 220,340 Q 300,380 380,340 L 380,50" fill="#f472b6" stroke="#be123c" stroke-width="6"/>
  <path d="M 270,50 L 270,320 Q 300,340 330,320 L 330,50" fill="#ffffff"/> <!-- Lumen -->
  <!-- Nuclei along tube -->
  <g fill="#4c1d95">
    <circle cx="245" cy="100" r="14"/><circle cx="245" cy="170" r="14"/><circle cx="245" cy="240" r="14"/><circle cx="245" cy="310" r="14"/>
    <circle cx="355" cy="100" r="14"/><circle cx="355" cy="170" r="14"/><circle cx="355" cy="240" r="14"/><circle cx="355" cy="310" r="14"/>
  </g>
  <text x="300" y="30" fill="#9f1239" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Abertura no Epitélio de Revestimento</text>
</svg>
"@
Save-Svg "public/images/histologia/glandulas/tubular_simples.svg" $tubular_simples

# 4. Ácino Seroso vs Ácino Mucoso
$acino_seroso_mucoso = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#fdf2f4"/>
  
  <!-- LEFT: Serous Acinus (Dark Basophilic, Round central nucleus) -->
  <g transform="translate(30, 0)">
    <circle cx="140" cy="200" r="110" fill="#7e22ce" stroke="#4c1d95" stroke-width="5"/>
    <circle cx="140" cy="200" r="25" fill="#ffffff"/> <!-- Lumen -->
    <g fill="#3b0764">
      <circle cx="70" cy="160" r="18"/><circle cx="70" cy="240" r="18"/>
      <circle cx="140" cy="285" r="18"/><circle cx="210" cy="240" r="18"/><circle cx="210" cy="160" r="18"/><circle cx="140" cy="115" r="18"/>
    </g>
    <text x="140" y="350" fill="#4c1d95" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">Ácino Seroso (Escuro)</text>
  </g>

  <!-- RIGHT: Mucous Acinus (Pale cytoplasm, Flat basal nucleus) -->
  <g transform="translate(310, 0)">
    <circle cx="140" cy="200" r="110" fill="#fbcfe8" stroke="#db2777" stroke-width="5"/>
    <circle cx="140" cy="200" r="30" fill="#ffffff"/> <!-- Lumen -->
    <g fill="#831843">
      <ellipse cx="60" cy="160" rx="10" ry="22" transform="rotate(-30 60 160)"/>
      <ellipse cx="60" cy="240" rx="10" ry="22" transform="rotate(30 60 240)"/>
      <ellipse cx="140" cy="295" rx="24" ry="10"/>
      <ellipse cx="220" cy="240" rx="10" ry="22" transform="rotate(-30 220 240)"/>
      <ellipse cx="220" cy="160" rx="10" ry="22" transform="rotate(30 220 160)"/>
      <ellipse cx="140" cy="105" rx="24" ry="10"/>
    </g>
    <text x="140" y="350" fill="#9d174d" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">Ácino Mucoso (Claro)</text>
  </g>
</svg>
"@
Save-Svg "public/images/histologia/glandulas/acino_seroso_mucoso.svg" $acino_seroso_mucoso

Write-Host "Glândulas SVGs criados com sucesso!"
