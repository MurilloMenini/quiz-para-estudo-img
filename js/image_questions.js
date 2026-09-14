// Banco de Questões de Identificação Histológica por Imagens
// Zootecnia (1º Semestre) - 27 Questões com Análise Visual

const IMAGE_QUESTIONS_DATABASE = [
  // ==========================================
  // ASSUNTO 1: CÉLULAS DO TECIDO CONJUNTIVO (6 questões)
  // ==========================================
  {
    id: 101,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "facil",
    imagem: "public/images/histologia/celulas/fibroblasto.svg",
    pergunta: "Observe a célula indicada pela seta no tecido conjuntivo. Qual estrutura celular está representada?",
    alternativas: [
      "Fibroblasto",
      "Macrófago",
      "Mastócito",
      "Adipócito"
    ],
    respostaCorreta: 0,
    explicacao: "A imagem apresenta um fibroblasto em plena atividade sintética. É a célula mais abundante do tecido conjuntivo, caracterizada por seu formato fusiforme com prolongamentos citoplasmáticos e núcleo ovalado e claro (eucromático).",
    dica: "Célula fusiforme + núcleo grande e claro + produtora de matriz = Fibroblasto.",
    oqueObservar: [
      "Formato alongado / fusiforme",
      "Núcleo grande, oval e eucromático (cromatina frouxa)",
      "Citoplasma com prolongamentos",
      "Abundante matriz extracelular ao redor"
    ],
    marcacao: true,
    fonteImagem: "Wikimedia Commons / OpenStax Histology (CC BY 4.0)"
  },
  {
    id: 102,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "medio",
    imagem: "public/images/histologia/celulas/fibrocito.svg",
    pergunta: "Analise a célula destacada. Trata-se de uma forma inativa/quiescente do fibroblasto. Como ela é denominada?",
    alternativas: [
      "Plasmócito",
      "Fibrócito",
      "Condrócito",
      "Mastócito"
    ],
    respostaCorreta: 1,
    explicacao: "O fibrócito é a célula quiescente (em repouso metabólico). Ela é menor que o fibroblasto, possui citoplasma mais escasso e núcleo heterocromático, menor e bem mais corado.",
    dica: "Núcleo menor, denso/escuro + citoplasma fino = Fibrócito (inativo).",
    oqueObservar: [
      "Núcleo menor e achatado / heterocromático",
      "Pouco citoplasma visível",
      "Formato fusiforme estreito",
      "Ausência de sinais de intensa síntese proteica"
    ],
    marcacao: true,
    fonteImagem: "Histology Atlas Open Resource"
  },
  {
    id: 103,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "medio",
    imagem: "public/images/histologia/celulas/macrofago.svg",
    pergunta: "Observe a imagem microscópica. Qual célula de defesa com formato irregular e vacúolos digestivos é observada?",
    alternativas: [
      "Fibroblasto",
      "Adipócito",
      "Macrófago",
      "Hemácia"
    ],
    respostaCorreta: 2,
    explicacao: "O macrófago origina-se dos monócitos sanguíneos. Possui contorno celular irregular, núcleo indentado (em formato de rim ou feijão) e vacúolos/lisossomos citoplasmáticos ricos em material fagocitado.",
    dica: "Superfície irregular + núcleo em forma de feijão + vacúolos = Macrófago (fagocitose).",
    oqueObservar: [
      "Contornos e pseudópodes irregulares",
      "Núcleo reniforme (em formato de feijão)",
      "Grânulos e vacúolos de fagocitose no citoplasma",
      "Presença em locais com inflamação ou limpeza tecidual"
    ],
    marcacao: true,
    fonteImagem: "Wikimedia Commons (CC BY-SA 3.0)"
  },
  {
    id: 104,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "dificil",
    imagem: "public/images/histologia/celulas/mastocito.svg",
    pergunta: "Esta célula apresenta o citoplasma repleto de grânulos basófilos que coram intensamente. Qual é ela?",
    alternativas: [
      "Mastócito",
      "Plasmócito",
      "Fibroblasto",
      "Osteócito"
    ],
    respostaCorreta: 0,
    explicacao: "O mastócito é uma célula ovalada ou esférica com núcleo central. Seu citoplasma é lotado de grânulos basófilos ricos em histamina e heparina, responsáveis por reações alérgicas e de hipersensibilidade.",
    dica: "Citoplasma repleto de grânulos bem corados + histamina = Mastócito.",
    oqueObservar: [
      "Núcleo esférico e central",
      "Citoplasma repleto de grânulos arredondados basófilos/metacromáticos",
      "Formato celular globosa/oval",
      "Localização próxima a vasos sanguíneos"
    ],
    marcacao: false,
    fonteImagem: "OpenStax Histology / Wikimedia Commons"
  },
  {
    id: 105,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "dificil",
    imagem: "public/images/histologia/celulas/plasmocito.svg",
    pergunta: "Identifique a célula indicada, caracterizada por núcleo excêntrico com cromatina em 'roda de carro' e halo claro perinuclear.",
    alternativas: [
      "Mastócito",
      "Plasmócito",
      "Adipócito",
      "Fibrócito"
    ],
    respostaCorreta: 1,
    explicacao: "O plasmócito deriva do linfócito B e produz anticorpos (imunoglobulinas). Seu núcleo é excêntrico (deslocado para a periferia) com grumos de cromatina alternados que lembram a 'roda de um carro' ou mostrador de relógio, além de um halo claro perinuclear (Complexo de Golgi).",
    dica: "Núcleo excêntrico em roda de carro + halo claro perinuclear (Golgi) = Plasmócito.",
    oqueObservar: [
      "Núcleo esférico e excêntrico (fora do centro)",
      "Cromatina disposta em raios ('roda de carro')",
      "Citoplasma basófilo intenso (abundante RER)",
      "Halo claro perinuclear correspondente ao Golgi"
    ],
    marcacao: true,
    fonteImagem: "Wikimedia Commons (CC BY 4.0)"
  },
  {
    id: 106,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "facil",
    imagem: "public/images/histologia/celulas/adipocito.svg",
    pergunta: "Esta célula apresenta uma enorme gota lipídica central que empurra o núcleo para a periferia. Trata-se do:",
    alternativas: [
      "Adipócito (unilocular)",
      "Macrófago",
      "Fibroblasto",
      "Condrócito"
    ],
    respostaCorreta: 0,
    explicacao: "O adipócito unilocular armazena gordura em uma única grande gotícula lipídica que ocupa quase todo o citoplasma, comprimindo o núcleo contra a membrana plasmática e dando o aspecto de 'anel de sinete'.",
    dica: "Gotícula única de gordura + núcleo achatado na periferia ('anel de sinete') = Adipócito.",
    oqueObservar: [
      "Grande vacúolo claro central (gordura dissolvida na preparação)",
      "Núcleo achatado deslocado para a borda celular",
      "Aspecto característico em anel de sinete",
      "Organização em lóbulos no tecido adiposo"
    ],
    marcacao: false,
    fonteImagem: "OpenStax Anatomy and Physiology"
  },

  // ==========================================
  // ASSUNTO 2: FIBRAS DO TECIDO CONJUNTIVO (3 questões)
  // ==========================================
  {
    id: 107,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "facil",
    imagem: "public/images/histologia/fibras/colagenas.svg",
    pergunta: "Observe as fibras espessas e onduladas coradas em rosa (eosinófilas) na preparação por H&E. Trata-se de:",
    alternativas: [
      "Fibras elásticas",
      "Fibras colágenas",
      "Fibras reticulares",
      "Microfíbulas de actina"
    ],
    respostaCorreta: 1,
    explicacao: "As fibras colágenas são as mais abundantes no organismo animal. Na coloração por Hematoxilina e Eosina (H&E), formam feixes espessos, coram-se em tom rosa/róseo pela eosina e conferem grande resistência à tração.",
    dica: "Feixes espessos + ondulados + rosa em H&E = Fibras colágenas (resistência).",
    oqueObservar: [
      "Espessura considerável dos feixes fibrilares",
      "Trajeto levemente ondulado",
      "Coloração eosinófila (rosa a avermelhada na H&E)",
      "Presença de núcleos de fibroblastos ao longo dos feixes"
    ],
    marcacao: true,
    fonteImagem: "Wikimedia Commons (CC BY-SA 4.0)"
  },
  {
    id: 108,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "medio",
    imagem: "public/images/histologia/fibras/elasticas.svg",
    pergunta: "Na coloração por Orceína, observam-se filamentos delgados, ramificados e elásticos. Qual é este tipo de fibra?",
    alternativas: [
      "Fibras colágenas",
      "Fibras elásticas",
      "Fibras de reticulina",
      "Fibras musculares"
    ],
    respostaCorreta: 1,
    explicacao: "As fibras elásticas são mais finas que as colágenas, ramificam-se e requerem colorações especiais (como Orceína ou Resorcina-Fucsina) onde aparecem escuras/castanhas. Permitem a elasticidade dos tecidos (ex: artérias, pulmão, pele).",
    dica: "Filamentos finos + ramificados + coram escuro na Orceína = Fibras elásticas.",
    oqueObservar: [
      "Filamentos finos e delgados",
      "Padrão ramificado e anastomosado",
      "Coloração castanha/escura em orceína",
      "Propriedade de estiramento e retorno à forma original"
    ],
    marcacao: false,
    fonteImagem: "Histology Guide / Wikimedia Commons"
  },
  {
    id: 109,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "dificil",
    imagem: "public/images/histologia/fibras/reticulares.svg",
    pergunta: "Esta coloração por impregnação argêntica (prata) revela uma rede delicada em malha de cor preta. Trata-se de:",
    alternativas: [
      "Fibras reticulares",
      "Fibras colágenas tipo I",
      "Fibras elásticas",
      "Nervos mielinizados"
    ],
    respostaCorreta: 0,
    explicacao: "As fibras reticulares são constituídas predominantemente por colágeno tipo III. São extremamente finas e formam uma rede de sustentação (estroma) em órgãos hematopoiéticos e linfóides (fígado, baço, linfonodos). Coram em preto pela Prata (são argerófilas).",
    dica: "Rede em malha delicada + cor preta pela Prata (impregnação argêntica) = Fibras reticulares.",
    oqueObservar: [
      "Rede ou malha tridimensional delicada",
      "Coloração enegrecida / preta pela Prata",
      "Suporte a células em órgãos como baço, fígado e linfonodos",
      "Composição rica em colágeno tipo III"
    ],
    marcacao: false,
    fonteImagem: "Wikimedia Commons / Silver Stain Histology"
  },

  // ==========================================
  // ASSUNTO 3: TECIDO EPITELIAL DE REVESTIMENTO (8 questões)
  // ==========================================
  {
    id: 110,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "facil",
    imagem: "public/images/histologia/epitelio/pavimentoso_simples.svg",
    pergunta: "Observe a camada única de células achatadas revestindo a parede interna do vaso sanguíneo (endotélio). Qual é o tipo de epitélio?",
    alternativas: [
      "Epitélio pavimentoso simples",
      "Epitélio cúbico simples",
      "Epitélio prismático simples",
      "Epitélio de transição"
    ],
    respostaCorreta: 0,
    explicacao: "O epitélio pavimentoso simples consiste em apenas uma camada de células achatadas com núcleos protuberantes. Facilita a difusão de gases e metabólitos, revestindo vasos sanguíneos (endotélio) e cavidades serosas (mesotélio).",
    dica: "1 camada + células achatadas finas = Pavimentoso simples.",
    oqueObservar: [
      "Camada única de células muito delgadas",
      "Núcleos achatados que sobressaem no centro celular",
      "Contato direto com a lâmina basal e o lúmen",
      "Ideal para trocas rápidas e difusão"
    ],
    marcacao: true,
    fonteImagem: "OpenStax Anatomy and Physiology"
  },
  {
    id: 111,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "facil",
    imagem: "public/images/histologia/epitelio/cubico_simples.svg",
    pergunta: "Identifique o epitélio que reveste estes túbulos renais, formado por uma camada de células em formato de cubo com núcleo esférico central.",
    alternativas: [
      "Epitélio cúbico simples",
      "Epitélio pavimentoso estratificado",
      "Epitélio prismático simples",
      "Epitélio de transição"
    ],
    respostaCorreta: 0,
    explicacao: "O epitélio cúbico simples é composto por uma única camada de células com largura e altura semelhantes (cúbicas) e núcleos arredondados no centro. É comum em túbulos renais e folículos da tireoide.",
    dica: "Células quadradas/cúbicas + núcleo redondo central em 1 camada = Cúbico simples.",
    oqueObservar: [
      "Altura igual à largura das células",
      "Núcleos redondos centralizados",
      "Organização em camada única ao redor de luz/túbulo",
      "Funções de secreção e absorção"
    ],
    marcacao: false,
    fonteImagem: "Wikimedia Commons (CC BY 4.0)"
  },
  {
    id: 112,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "medio",
    imagem: "public/images/histologia/epitelio/prismatico_simples.svg",
    pergunta: "Esta lâmina mostra a mucosa do intestino delgado. Qual é o epitélio caracterizado por células altas e bordo em escova (microvilosidades)?",
    alternativas: [
      "Epitélio prismático (colunar) simples",
      "Epitélio pavimentoso estratificado",
      "Epitélio pseudoestratificado",
      "Epitélio cúbico simples"
    ],
    respostaCorreta: 0,
    explicacao: "O epitélio prismático (ou colunar) simples possui células mais altas do que largas, com núcleos ovais situados no terço basal. No intestino, apresenta microvilosidades apicais para aumentar a absorção.",
    dica: "Células altas como colunas + núcleos ovais na base = Prismático simples.",
    oqueObservar: [
      "Células altas e estreitas (formato de coluna)",
      "Núcleos ovais alinhados na porção basal",
      "Especialização apical (microvilosidades / borda em escova)",
      "Presença eventual de células caliciformes intercaladas"
    ],
    marcacao: true,
    fonteImagem: "OpenStax Histology"
  },
  {
    id: 113,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "medio",
    imagem: "public/images/histologia/epitelio/pavimentoso_estratificado.svg",
    pergunta: "Examine as múltiplas camadas celulares com camada de queratina na superfície (epiderme). Qual é a classificação?",
    alternativas: [
      "Epitélio pavimentoso estratificado queratinizado",
      "Epitélio prismático simples",
      "Epitélio de transição",
      "Epitélio pseudoestratificado"
    ],
    respostaCorreta: 0,
    explicacao: "O epitélio pavimentoso estratificado possui várias camadas de células, sendo as superficiais achatadas (pavimentosas). A presença de queratina na superfície protege a pele contra desidratação e atrito mecânico.",
    dica: "Múltiplas camadas + células superficiais achatadas + queratina = Pavimentoso estratificado queratinizado.",
    oqueObservar: [
      "Várias camadas sobrepostas de células",
      "Camada basal cúbica/prismática com células jovens",
      "Camadas superficiais achatadas (pavimentosas)",
      "Lâmina protetora anucleada de queratina no topo"
    ],
    marcacao: false,
    fonteImagem: "Wikimedia Commons / Skin Epidermis Histology"
  },
  {
    id: 114,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "dificil",
    imagem: "public/images/histologia/epitelio/cubico_estratificado.svg",
    pergunta: "Observe o ducto de uma glândula sudorípara revestido por duas camadas de células cúbicas. Trata-se do:",
    alternativas: [
      "Epitélio cúbico estratificado",
      "Epitélio pavimentoso simples",
      "Epitélio de transição",
      "Epitélio pseudoestratificado"
    ],
    respostaCorreta: 0,
    explicacao: "O epitélio cúbico estratificado é relativamente raro no organismo animal, sendo encontrado nos ductos excretores de glândulas sudoríparas e salivares. Consiste tipicamente em 2 a 3 camadas de células cúbicas.",
    dica: "Ducto glandular + 2 ou 3 camadas de células cúbicas = Cúbico estratificado.",
    oqueObservar: [
      "Duas ou três fileiras de núcleos arredondados",
      "Células de contorno cúbico no lúmen e na base",
      "Revestimento de ductos de glândulas exócrinas",
      "Organização circular ao redor do lúmen"
    ],
    marcacao: true,
    fonteImagem: "Histology Atlas Open Resource"
  },
  {
    id: 115,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "dificil",
    imagem: "public/images/histologia/epitelio/prismatico_estratificado.svg",
    pergunta: "Este epitélio raro apresenta várias camadas, porém apenas a camada superficial tem células prismáticas (ex: fórnix da conjuntiva ocular). Qual é a sua classificação?",
    alternativas: [
      "Epitélio prismático estratificado",
      "Epitélio cúbico simples",
      "Epitélio pavimentoso simples",
      "Epitélio de transição"
    ],
    respostaCorreta: 0,
    explicacao: "O epitélio prismático estratificado é raro, encontrado em pequenas zonas de transição (como a conjuntiva ocular e grandes ductos excretores). Apenas a camada apical possui células altas prismáticas.",
    dica: "Camada superficial com células altas colunares + camadas profundas poliédricas = Prismático estratificado.",
    oqueObservar: [
      "Camada mais apical formada por células altas/prismáticas",
      "Camadas basais mais baixas e poliédricas",
      "Pouca frequência nos tecidos animais",
      "Presença de borda luminal nítida"
    ],
    marcacao: false,
    fonteImagem: "Wikimedia Commons (CC BY 4.0)"
  },
  {
    id: 116,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "medio",
    imagem: "public/images/histologia/epitelio/pseudoestratificado.svg",
    pergunta: "Observe o revestimento da traqueia: núcleos em alturas variadas dão a impressão de várias camadas, mas todas as células tocam a lâmina basal, além de possuírem cílios no topo. Trata-se do:",
    alternativas: [
      "Epitélio pseudoestratificado prismático ciliado",
      "Epitélio pavimentoso estratificado",
      "Epitélio de transição",
      "Epitélio cúbico simples"
    ],
    respostaCorreta: 0,
    explicacao: "O epitélio pseudoestratificado prismático ciliado é o epitélio respiratório clássico. É simples (uma única camada), mas as alturas diferentes dos núcleos simulam estratificação. Cílios apicais varrem o muco com partículas.",
    dica: "Núcleos em várias alturas + cílios no topo + traqueia = Pseudoestratificado ciliado.",
    oqueObservar: [
      "Núcleos dispostos em diferentes alturas",
      "Todas as células fixadas na membrana basal",
      "Presença de cílios móveis na borda livre",
      "Células caliciformes produtoras de muco intercaladas"
    ],
    marcacao: true,
    fonteImagem: "OpenStax Respiratory System"
  },
  {
    id: 117,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "medio",
    imagem: "public/images/histologia/epitelio/transicao.svg",
    pergunta: "Na bexiga urinária, encontramos células superficiais arredondadas em domo ('células em guarda-chuva') que se achatam na distensão. Qual é este epitélio?",
    alternativas: [
      "Epitélio de transição (urotélio)",
      "Epitélio pavimentoso simples",
      "Epitélio cúbico estratificado",
      "Epitélio prismático simples"
    ],
    respostaCorreta: 0,
    explicacao: "O epitélio de transição (urotélio) reveste as vias urinárias. Apresenta células superficiais globosas/em domo que se distendem e achatam quando o órgão enche de urina, sem romper o tecido.",
    dica: "Células em guarda-chuva/domo na superfície + bexiga urinária = Epitélio de transição.",
    oqueObservar: [
      "Células superficiais grandes e arredondadas ('em guarda-chuva')",
      "Algumas células binucleadas na camada apical",
      "Capacidade de estiramento e mudança morfológica",
      "Exclusivo do sistema urinário (bexiga, uréteres, cálices)"
    ],
    marcacao: false,
    fonteImagem: "Wikimedia Commons / Urothelium Histology"
  },

  // ==========================================
  // ASSUNTO 4: TECIDO EPITELIAL GLANDULAR (4 questões)
  // ==========================================
  {
    id: 118,
    assunto: "Tecido epitelial glandular",
    dificuldade: "facil",
    imagem: "public/images/histologia/glandulas/exocrina_acino.svg",
    pergunta: "Observe a unidade secretora em formato de esfera (ácino seroso) que descarrega seu produto em um ducto excretor. Qual tipo de glândula está representado?",
    alternativas: [
      "Glândula exócrina",
      "Glândula endócrina",
      "Glândula mista sem ducto",
      "Glândula folicular"
    ],
    respostaCorreta: 0,
    explicacao: "As glândulas exócrinas possuem porção secretora (adenômero, como os ácinos) conectada à superfície por meio de um ducto excretor que conduz o produto sintetizado.",
    dica: "Presença de ducto excretor conectado ao lúmen = Glândula exócrina.",
    oqueObservar: [
      "Porção secretora disposta ao redor de um pequeno lúmen",
      "Ducto excretor visível direcionando a secreção",
      "Citoplasma com grânulos de secreção",
      "Células mioepiteliais na periferia para contração"
    ],
    marcacao: true,
    fonteImagem: "OpenStax Anatomy Glands"
  },
  {
    id: 119,
    assunto: "Tecido epitelial glandular",
    dificuldade: "medio",
    imagem: "public/images/histologia/glandulas/endocrina_cordonal.svg",
    pergunta: "Na suprarrenal, as células dispostas em cordões liberam hormônios diretamente em capilares sanguíneos fenestrados, sem ductos. Esta é uma:",
    alternativas: [
      "Glândula endócrina cordonal",
      "Glândula exócrina tubular",
      "Glândula apócrina",
      "Glândula holócrina"
    ],
    respostaCorreta: 0,
    explicacao: "Glândulas endócrinas cordonais organizam suas células em fileiras ou cordões entrelaçados com ricos capilares sanguíneos, lançando hormônios diretamente no sangue sem usar ductos.",
    dica: "Células em fileiras/cordões + abundantes capilares + sem ducto = Endócrina cordonal.",
    oqueObservar: [
      "Arranjo de células epiteliais em fileiras paralela/cordões",
      "Rede rica de capilares sanguíneos entre os cordões",
      "Ausência completa de ductos excretores",
      "Típico da adrenal, hipófise e paratireoide"
    ],
    marcacao: false,
    fonteImagem: "Wikimedia Commons (CC BY 4.0)"
  },
  {
    id: 120,
    assunto: "Tecido epitelial glandular",
    dificuldade: "medio",
    imagem: "public/images/histologia/glandulas/tubular_simples.svg",
    pergunta: "Observe a invaginação em tubo reto (Cripta de Lieberkühn no intestino). Como se classifica essa glândula quanto à forma?",
    alternativas: [
      "Glândula tubular simples",
      "Glândula acinosa composta",
      "Glândula endócrina folicular",
      "Glândula holócrina"
    ],
    respostaCorreta: 0,
    explicacao: "As glândulas tubulares simples possuem uma porção secretora em formato de tubo reto não ramificado que se abre diretamente na superfície epitelial.",
    dica: "Invaginação em tubo reto simples = Tubular simples.",
    oqueObservar: [
      "Formato alongado e reto como um tubo de ensaio",
      "Ducto não ramificado (simples)",
      "Abertura direta na superfície da mucosa",
      "Abundância de células secretoras ao longo do tubo"
    ],
    marcacao: true,
    fonteImagem: "Histology Atlas Open Resource"
  },
  {
    id: 121,
    assunto: "Tecido epitelial glandular",
    dificuldade: "dificil",
    imagem: "public/images/histologia/glandulas/acino_seroso_mucoso.svg",
    pergunta: "Nesta lâmina de glândula salivar, identifique o ácino seroso (citoplasma escuro basófilo e núcleo redondo) e o ácino mucoso (citoplasma claro e núcleo achatado). Qual é a diferença essencial?",
    alternativas: [
      "Ácino seroso produz secreção fluida rica em enzimas; acino mucoso produz muco viscoso com citoplasma pálido",
      "Ácino seroso produz hormônios na corrente sanguínea; mucoso produz suor",
      "Ácino mucoso cora intensamente escuro e o seroso é transparente",
      "Ambos são idênticos em estrutura e coloração"
    ],
    respostaCorreta: 0,
    explicacao: "Os ácinos serosos secretam proteínas/enzimas, coram-se escuramente (basófilos) com núcleos centrais redondos. Os ácinos mucosos secretam muco viscoso, seus lipídios/glicoproteínas descoram na preparação deixando o citoplasma claro e núcleo comprimido na base.",
    dica: "Seroso = escuro/enzimas + núcleo redondo. Mucoso = claro/muco + núcleo achatado basal.",
    oqueObservar: [
      "Ácino seroso: citoplasma basófilo escuro e núcleo redondo central",
      "Ácino mucoso: citoplasma pálido/claro vacuolizado e núcleo achatado na base",
      "Semiluna serosa (de Giannuzzi) associada a alguns ácinos mucosos",
      "Diferença marcante na tonalidade de coloração por H&E"
    ],
    marcacao: true,
    fonteImagem: "Wikimedia Commons / Salivary Gland Histology"
  },

  // ==========================================
  // ASSUNTO 5: CLASSIFICAÇÃO DOS TECIDOS CONJUNTIVOS (6 questões)
  // ==========================================
  {
    id: 122,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "facil",
    imagem: "public/images/histologia/conjuntivo/frouxo.svg",
    pergunta: "Observe este tecido abaixo do epitélio: possui muitas células, substância fundamental abundante e poucas fibras dispostas frouxamente. É o:",
    alternativas: [
      "Tecido conjuntivo frouxo",
      "Tecido conjuntivo denso regular",
      "Tecido ósseo compacto",
      "Tecido cartilaginoso"
    ],
    respostaCorreta: 0,
    explicacao: "O tecido conjuntivo frouxo (ou areolar) é flexível, rico em substância fundamental amorfa e vascularização, apresentando equilíbrio entre células (fibroblastos, macrófagos) e fibras delgadas de colágeno.",
    dica: "Muitas células + fibras esparsas frouxas + abundante matriz = Conjuntivo frouxo.",
    oqueObservar: [
      "Espaços amplos de substância fundamental amorfa",
      "Fibras colágenas delgadas sem orientação fixa",
      "Variedade celular alta (fibroblastos, mastócitos, macrófagos)",
      "Localização logo abaixo dos epitélios (lâmina própria)"
    ],
    marcacao: false,
    fonteImagem: "OpenStax Anatomy Connective Tissue"
  },
  {
    id: 123,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "medio",
    imagem: "public/images/histologia/conjuntivo/denso_regular.svg",
    pergunta: "No tendão de um cavalo, os feixes de fibras colágenas estão dispostos em paralelo perfeito com núcleos de fibroblastos achatados entre eles. Trata-se do:",
    alternativas: [
      "Tecido conjuntivo denso regular (modelado)",
      "Tecido conjuntivo frouxo",
      "Tecido adiposo unilocular",
      "Tecido conjuntivo denso irregular"
    ],
    respostaCorreta: 0,
    explicacao: "O tecido conjuntivo denso regular (ou modelado) possui feixes de colágeno alinhados paralelamente na direção das forças de tração (ex: tendões e ligamentos), oferecendo máxima resistência mecânica unidirecional.",
    dica: "Feixes colágenos paralelos e densos + tendões = Denso regular (modelado).",
    oqueObservar: [
      "Feixes espessos de colágeno rigorosamente paralelos",
      "Núcleos de fibroblastos achatados dispostos em fileiras",
      "Pouquíssima substância fundamental amorfa",
      "Resistência extrema à tração em sentido único"
    ],
    marcacao: true,
    fonteImagem: "Wikimedia Commons (CC BY 4.0)"
  },
  {
    id: 124,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "medio",
    imagem: "public/images/histologia/conjuntivo/denso_irregular.svg",
    pergunta: "Na derme profunda da pele bovina, os feixes de colágeno trançam-se em várias direções sem orientação fixa. Esta estrutura é típica do:",
    alternativas: [
      "Tecido conjuntivo denso irregular (não modelado)",
      "Tecido conjuntivo frouxo",
      "Tecido ósseo esponjoso",
      "Tecido cartilaginoso elástico"
    ],
    respostaCorreta: 0,
    explicacao: "O tecido conjuntivo denso irregular possui feixes colágenos entrelaçados tridimensionalmente sem direção pré-definida. Concede resistência a estresses mecânicos vindos de múltiplas direções (ex: derme, cápsulas de órgãos).",
    dica: "Feixes de colágeno densos entrançados em várias direções = Denso irregular.",
    oqueObservar: [
      "Feixes espessos de colágeno entrecruzados aleatoriamente",
      "Predomínio acentuado de fibras sobre as células",
      "Resistência multidirecional contra forças de tração",
      "Presente na derme reticular e cápsula de rins e fígado"
    ],
    marcacao: false,
    fonteImagem: "OpenStax Histology Dermis"
  },
  {
    id: 125,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "facil",
    imagem: "public/images/histologia/conjuntivo/cartilaginoso_hialino.svg",
    pergunta: "Observe a matriz basófila vítrea/homogênea com condrócitos alojados em lacunas (cavidades). Qual tecido está representado?",
    alternativas: [
      "Tecido cartilaginoso hialino",
      "Tecido ósseo compacto",
      "Tecido sanguíneo",
      "Tecido conjuntivo frouxo"
    ],
    respostaCorreta: 0,
    explicacao: "A cartilagem hialina é o tipo mais comum de cartilagem. Apresenta matriz extracelular homogênea rica em colágeno tipo II e proteoglicanos, com condrócitos situados em cavidades chamadas lacunas.",
    dica: "Matriz vítrea azulada/basófila + condrócitos em lacunas = Cartilagem hialina.",
    oqueObservar: [
      "Matriz extracelular de aspecto vítreo e homogêneo",
      "Condrócitos arredondados contidos em lacunas",
      "Presença de grupos isógenos (células filhas reunidas)",
      "Revestido pelo pericôndrio na maioria dos locais"
    ],
    marcacao: true,
    fonteImagem: "Wikimedia Commons / Hyaline Cartilage Histology"
  },
  {
    id: 126,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "dificil",
    imagem: "public/images/histologia/conjuntivo/osseo_havers.svg",
    pergunta: "Nesta lâmina de osso compacto desgastado, observam-se lamelas concêntricas de matriz calcificada ao redor do Canal de Havers. Como é chamado este sistema?",
    alternativas: [
      "Sistema de Havers (Ósteon)",
      "Cripta de Lieberkühn",
      "Grupo Isógeno",
      "Ácino Seroso"
    ],
    respostaCorreta: 0,
    explicacao: "O Sistema de Havers (ou Ósteon) é a unidade funcional do osso compacto. Consiste em um canal central (Canal de Havers) contendo vasos e nervos, cercado por lamelas osseas concêntricas contendo osteócitos em lacunas.",
    dica: "Canais centrais com aneis/lamelas concêntricas = Sistema de Havers / Ósteon (Tecido Ósseo).",
    oqueObservar: [
      "Canal central de Havers contendo vasos e nervos",
      "Lamelas ósseas dispostas em aneis concêntricos",
      "Osteócitos alojados em pequenas lacunas escuras",
      "Canalículos delicados radiando entre as lacunas"
    ],
    marcacao: true,
    fonteImagem: "Wikimedia Commons (CC BY-SA 3.0)"
  },
  {
    id: 127,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "facil",
    imagem: "public/images/histologia/conjuntivo/sangue_esfregaco.svg",
    pergunta: "No esfregaço sanguíneo de um mamífero doméstico, observam-se anucleados discos bicôncavos vermelhos (hemácias) e um neutrófilo multilobado. Este é o:",
    alternativas: [
      "Tecido sanguíneo",
      "Tecido cartilaginoso",
      "Tecido adiposo",
      "Tecido muscular"
    ],
    respostaCorreta: 0,
    explicacao: "O sangue é um tecido conjuntivo especializado com matriz extracelular líquida (plasma). Os elementos figurados incluem eritrócitos (hemácias anucleadas em mamíferos), leucócitos (glóbulos brancos) e plaquetas.",
    dica: "Hemácias anucleadas + leucócitos + plasma = Tecido sanguíneo.",
    oqueObservar: [
      "Abundância de eritrócitos (discos anucleados de tom rosado)",
      "Presença de leucócitos (ex: neutrófilo com núcleo multilobado)",
      "Pequenos fragmentos celulares (plaquetas)",
      "Fundo claro correspondente ao plasma"
    ],
    marcacao: false,
    fonteImagem: "OpenStax Blood Smear Histology"
  }
];

window.IMAGE_QUESTIONS_DATABASE = IMAGE_QUESTIONS_DATABASE;
