// Lógica Principal do Aplicativo HistoZoo Gamificado

class HistoZooApp {
  constructor() {
    this.questions = window.QUESTIONS_DATABASE || [];
    this.imageQuestions = window.IMAGE_QUESTIONS_DATABASE || [];
    this.currentQuestionsList = [];
    this.currentIndex = 0;
    this.mode = 'home'; // 'home', 'study', 'exam', 'exam_result', 'reward', 'image_hub', 'image_study', 'image_flashcards', 'image_challenge', 'image_wrong_review'
    this.selectedTopic = null;
    this.selectedDifficulty = null;
    this.isImageMode = false;
    this.isChallengeMode = false;
    
    // Estado do Quiz Atual
    this.userAnswers = []; // { questionId, selectedIndex, isCorrect, question }
    this.answeredCurrent = false;

    // Estado do Zoom Modal
    this.modalZoomScale = 1.0;

    // Estatísticas Persistentes
    this.stats = this.loadStats();

    this.initUI();
    this.initKeyboardListeners();
  }

  loadStats() {
    const saved = localStorage.getItem('histozoo_stats');
    let statsData = {
      totalAnswered: 0,
      totalCorrect: 0,
      totalWrong: 0,
      streak: 0,
      maxStreak: 0,
      topicErrors: {
        "Tecido epitelial de revestimento": 0,
        "Tecido epitelial glandular": 0,
        "Células do tecido conjuntivo": 0,
        "Fibras do tecido conjuntivo": 0,
        "Classificação dos tecidos conjuntivos": 0
      },
      examHistory: [],
      imageStats: {
        totalAnswered: 0,
        totalCorrect: 0,
        totalWrong: 0,
        wrongQuestionsIds: []
      }
    };

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        statsData = { ...statsData, ...parsed };
        if (!statsData.imageStats) {
          statsData.imageStats = { totalAnswered: 0, totalCorrect: 0, totalWrong: 0, wrongQuestionsIds: [] };
        }
      } catch (e) {
        console.error("Erro ao carregar estatísticas", e);
      }
    }
    return statsData;
  }

  saveStats() {
    localStorage.setItem('histozoo_stats', JSON.stringify(this.stats));
    this.updateHeaderStats();
  }

  initUI() {
    this.updateHeaderStats();
    this.renderHome();
  }

  initKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeImageZoom();
      }
    });
  }

  updateHeaderStats() {
    const total = this.stats.totalAnswered;
    const correct = this.stats.totalCorrect;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    const streakEl = document.getElementById('stat-streak');
    const percentEl = document.getElementById('stat-percent');
    const countEl = document.getElementById('stat-count');
    const progressBar = document.getElementById('global-progress-bar');
    const progressText = document.getElementById('global-progress-text');

    if (streakEl) streakEl.textContent = `${this.stats.streak} 🔥`;
    if (percentEl) percentEl.textContent = `${percent}%`;
    if (countEl) countEl.textContent = `${correct}/${total}`;

    // Progresso baseado no banco total de questões teóricas (50)
    const masteredPercent = Math.min(100, Math.round((correct / (this.questions.length || 50)) * 100));
    if (progressBar) progressBar.style.width = `${masteredPercent}%`;
    if (progressText) progressText.textContent = `Você já dominou ${masteredPercent}% deste conteúdo!`;
  }

  // NAVEGAÇÃO E REQUISIÇÕES DE MODOS TEÓRICOS
  startStudyTopic(topicName) {
    this.mode = 'study';
    this.isImageMode = false;
    this.selectedTopic = topicName;
    this.selectedDifficulty = null;
    this.currentQuestionsList = this.shuffleArray(
      this.questions.filter(q => q.assunto === topicName)
    );
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderQuiz();
  }

  startDifficultyFilter(difficulty) {
    this.mode = 'study';
    this.isImageMode = false;
    this.selectedTopic = null;
    this.selectedDifficulty = difficulty;
    
    let filtered = [];
    if (difficulty === 'desafio') {
      filtered = this.questions.filter(q => q.dificuldade === 'medio' || q.dificuldade === 'dificil');
    } else {
      filtered = this.questions.filter(q => q.dificuldade === difficulty);
    }

    this.currentQuestionsList = this.shuffleArray(filtered);
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderQuiz();
  }

  startExamSimulation() {
    this.mode = 'exam';
    this.isImageMode = false;
    this.selectedTopic = null;
    this.selectedDifficulty = null;
    
    // Selecionar 20 questões aleatórias do banco total
    const count = window.CONFIG ? window.CONFIG.EXAM_QUESTION_COUNT : 20;
    this.currentQuestionsList = this.shuffleArray([...this.questions]).slice(0, count);
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderQuiz();
  }

  startReviewWeakTopic(topicName) {
    this.mode = 'study';
    this.isImageMode = false;
    this.selectedTopic = topicName;
    this.selectedDifficulty = null;
    this.currentQuestionsList = this.shuffleArray(
      this.questions.filter(q => q.assunto === topicName)
    );
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderQuiz();
  }

  startReviewWrongExamQuestions(wrongQuestionsList) {
    this.mode = 'study';
    this.isImageMode = false;
    this.selectedTopic = 'Revisão de Erros';
    this.selectedDifficulty = null;
    this.currentQuestionsList = this.shuffleArray(wrongQuestionsList);
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderQuiz();
  }

  // UTILS
  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  getDifficultyBadge(diff) {
    if (diff === 'facil') return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">🟢 Fácil</span>`;
    if (diff === 'medio') return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">🟡 Médio</span>`;
    return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">🔴 Difícil</span>`;
  }

  // RENDERS DE TELA PRINCIPAL
  renderHome() {
    this.mode = 'home';
    this.isImageMode = false;
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    // Identificar assuntos que precisam de revisão
    const weakTopics = Object.entries(this.stats.topicErrors)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);

    const topicsList = [
      { name: "Tecido epitelial de revestimento", icon: "🧬", desc: "Epitélios simples, estratificados, polaridade e nutrição" },
      { name: "Tecido epitelial glandular", icon: "🧪", desc: "Exócrinas, endócrinas, adênomeros e mecanismos de secreção" },
      { name: "Células do tecido conjuntivo", icon: "🔬", desc: "Fibroblastos, macrófagos, mastócitos, plasmócitos e adipócitos" },
      { name: "Fibras do tecido conjuntivo", icon: "🧵", desc: "Fibras colágenas, reticulares e elásticas comparadas" },
      { name: "Classificação dos tecidos conjuntivos", icon: "🧠", desc: "TC Frouxo, Denso, Adiposo, Cartilagem, Ósseo e Sangue" }
    ];

    mainContainer.innerHTML = `
      <!-- Título de Boas-Vindas -->
      <div class="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-pink-200/50 mb-8 relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 opacity-10 text-9xl font-bold select-none pointer-events-none">🔬</div>
        <div class="max-w-2xl relative z-10">
          <span class="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            📚 Zootecnia • 1º Semestre
          </span>
          <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Preparatória para a Prova de Histologia 🌸
          </h1>
          <p class="text-rose-100 text-sm sm:text-base leading-relaxed mb-6">
            Aprenda o conteúdo através de questões de múltipla escolha interativas com explicações didáticas e desfrute de um sistema gamificado!
          </p>

          <button onclick="app.startExamSimulation()" 
            class="inline-flex items-center justify-center gap-3 bg-white text-rose-600 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg hover:bg-rose-50 transition transform hover:-translate-y-0.5 active:translate-y-0 text-base sm:text-lg">
            <span>🎯</span> INICIAR SIMULADO DA PROVA (20 QUESTÕES)
          </button>
        </div>
      </div>

      <!-- CARD EXCLUSIVO: IDENTIFICAÇÃO POR IMAGENS 🧫 (NOVA FUNCIONALIDADE) -->
      <div onclick="app.renderImageHub()" 
        class="mb-8 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-100 cursor-pointer transform hover:-translate-y-1 transition duration-300 relative overflow-hidden group">
        <div class="absolute -right-8 -bottom-8 opacity-15 text-8xl font-black select-none pointer-events-none group-hover:scale-110 transition">🧫</div>
        <div class="max-w-2xl relative z-10">
          <div class="flex items-center gap-2 mb-3 flex-wrap">
            <span class="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-black uppercase tracking-wider">
              ✨ MODALIDADE PRÁTICA
            </span>
            <span class="px-3 py-1 bg-amber-400 text-amber-950 rounded-full text-xs font-black">
              🧫 27 Imagens Histológicas
            </span>
          </div>
          
          <h2 class="text-2xl sm:text-3xl font-black mb-2 flex items-center gap-3">
            <span>🧫</span> Identificação por imagens
          </h2>
          
          <p class="text-teal-50 text-sm sm:text-base leading-relaxed mb-6">
            Treine seu olhar! Identifique células, tecidos e estruturas através de imagens.
          </p>

          <div class="flex flex-wrap items-center gap-3">
            <button onclick="event.stopPropagation(); app.renderImageHub();" 
              class="bg-white text-teal-700 font-extrabold px-6 py-3.5 rounded-2xl shadow-md hover:bg-teal-50 transition transform active:scale-95 text-base flex items-center gap-2">
              <span>COMEÇAR</span> <span>→</span>
            </button>
            <button onclick="event.stopPropagation(); app.startImageFlashcards();" 
              class="bg-teal-700/60 hover:bg-teal-700/80 text-white font-bold px-4 py-3.5 rounded-2xl backdrop-blur-md transition text-sm flex items-center gap-2">
              <span>🧠</span> Flashcards
            </button>
            <button onclick="event.stopPropagation(); app.startImageChallenge();" 
              class="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-3.5 rounded-2xl transition text-sm flex items-center gap-2 shadow-sm">
              <span>🔥</span> Desafio
            </button>
          </div>
        </div>
      </div>

      <!-- Seção de Revisão Inteligente -->
      ${weakTopics.length > 0 ? `
        <div class="mb-8 bg-amber-50/80 border border-amber-200 rounded-2xl p-5 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">⚠️</span>
            <div>
              <h3 class="font-bold text-amber-900 text-lg">Precisa Revisar</h3>
              <p class="text-xs sm:text-sm text-amber-700">Identificamos os assuntos em que você teve maior frequência de erros:</p>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            ${weakTopics.slice(0, 2).map(([topic, errors]) => `
              <div class="bg-white p-3.5 rounded-xl border border-amber-200 flex items-center justify-between shadow-xs">
                <div>
                  <span class="font-semibold text-gray-800 text-sm block">${topic}</span>
                  <span class="text-xs text-rose-600 font-medium">${errors} erro(s) acumulado(s)</span>
                </div>
                <button onclick="app.startReviewWeakTopic('${topic}')" 
                  class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-xs shadow-xs transition">
                  REVISAR ESTE ASSUNTO
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Modos Principais -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        <!-- ESTUDAR POR ASSUNTO -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>📚</span> Estudar por Assunto (Teoria)
            </h2>
            <span class="text-xs font-semibold text-gray-500">10 Questões por tema</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${topicsList.map(t => `
              <div onclick="app.startStudyTopic('${t.name}')" 
                class="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-300 cursor-pointer transition transform hover:-translate-y-1 group relative">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 text-2xl flex items-center justify-center group-hover:scale-110 transition">
                    ${t.icon}
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-gray-800 text-base group-hover:text-rose-600 transition mb-1">${t.name}</h3>
                    <p class="text-xs text-gray-500 line-clamp-2">${t.desc}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- FILTROS DE DIFICULDADE & DESAFIO -->
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>🎚️</span> Filtros & Desafios
          </h2>

          <div class="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm space-y-3">
            <button onclick="app.startDifficultyFilter('facil')" 
              class="w-full text-left p-3 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100/60 flex items-center justify-between transition">
              <span class="font-bold text-emerald-900 text-sm flex items-center gap-2">
                <span>🟢</span> Nível Fácil
              </span>
              <span class="text-xs font-semibold bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md">Conceituais</span>
            </button>

            <button onclick="app.startDifficultyFilter('medio')" 
              class="w-full text-left p-3 rounded-xl border border-amber-100 bg-amber-50/50 hover:bg-amber-100/60 flex items-center justify-between transition">
              <span class="font-bold text-amber-900 text-sm flex items-center gap-2">
                <span>🟡</span> Nível Médio
              </span>
              <span class="text-xs font-semibold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-md">Comparativas</span>
            </button>

            <button onclick="app.startDifficultyFilter('dificil')" 
              class="w-full text-left p-3 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-100/60 flex items-center justify-between transition">
              <span class="font-bold text-rose-900 text-sm flex items-center gap-2">
                <span>🔴</span> Nível Difícil
              </span>
              <span class="text-xs font-semibold bg-rose-200 text-rose-800 px-2 py-0.5 rounded-md">Aprofundadas</span>
            </button>

            <div class="pt-2 border-t border-gray-100">
              <button onclick="app.startDifficultyFilter('desafio')" 
                class="w-full p-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-extrabold shadow-md hover:opacity-95 transition text-center block">
                🔥 MODO DESAFIO (MÉDIO + DIFÍCIL)
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // ==========================================
  // MODALIDADE: IDENTIFICAÇÃO POR IMAGENS 🧫
  // ==========================================

  renderImageHub() {
    this.mode = 'image_hub';
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    this.imageQuestions = window.IMAGE_QUESTIONS_DATABASE || [];

    const imageTopicsList = [
      { name: "Células do tecido conjuntivo", icon: "🔬", desc: "Fibroblasto, Fibrócito, Macrófago, Mastócito, Plasmócito, Adipócito" },
      { name: "Fibras do tecido conjuntivo", icon: "🧵", desc: "Fibras Colágenas (H&E), Elásticas (Orceína), Reticulares (Prata)" },
      { name: "Tecido epitelial de revestimento", icon: "🧬", desc: "Epitélios simples, estratificados, pseudoestratificado e de transição" },
      { name: "Tecido epitelial glandular", icon: "🧪", desc: "Glândulas exócrinas, endócrinas, simples, compostas, ácinos e tubos" },
      { name: "Classificação dos tecidos conjuntivos", icon: "🧠", desc: "TC Frouxo, Denso regular, Denso irregular, Cartilagem, Ósseo e Sangue" }
    ];

    const wrongImagesCount = (this.stats.imageStats && this.stats.imageStats.wrongQuestionsIds) ? this.stats.imageStats.wrongQuestionsIds.length : 0;

    mainContainer.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6">
        
        <!-- Header do Hub de Imagens -->
        <div class="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div class="flex items-center justify-between mb-4">
            <button onclick="app.renderHome()" 
              class="inline-flex items-center gap-2 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition backdrop-blur-md">
              <span>←</span> Voltar ao Painel Principal
            </button>
            <span class="text-xs font-black bg-amber-400 text-amber-950 px-3 py-1 rounded-full uppercase tracking-wider">
              🧫 Prova Prática de Histologia
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            🧫 Identificação por Imagens
          </h1>
          <p class="text-teal-100 text-sm sm:text-base max-w-2xl leading-relaxed mb-6">
            Treine seu olhar! Identifique células, tecidos, fibras e estruturas histológicas através de imagens microscópicas.
          </p>

          <div class="flex flex-wrap items-center gap-3">
            <button onclick="app.startAllImageQuestions()" 
              class="bg-white text-teal-800 font-black px-6 py-3 rounded-2xl shadow-lg hover:bg-teal-50 transition transform hover:-translate-y-0.5 text-sm sm:text-base flex items-center gap-2">
              <span>🚀</span> ESTUDAR TODAS AS IMAGENS (27 QUESTÕES)
            </button>
            <button onclick="app.startImageChallenge()" 
              class="bg-gradient-to-r from-amber-500 to-rose-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg hover:opacity-95 transition text-sm flex items-center gap-2">
              <span>🔥</span> MODO DESAFIO (10 IMAGENS)
            </button>
            <button onclick="app.startImageFlashcards()" 
              class="bg-teal-900/60 hover:bg-teal-900/80 text-white font-bold px-5 py-3 rounded-2xl backdrop-blur-md transition text-sm flex items-center gap-2 border border-white/20">
              <span>🧠</span> FLASHCARDS VISUAIS
            </button>
          </div>
        </div>

        <!-- Seção Revisar Erros -->
        ${wrongImagesCount > 0 ? `
          <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-xs flex items-center justify-between flex-wrap gap-3">
            <div class="flex items-center gap-3">
              <span class="text-3xl">🔎</span>
              <div>
                <h3 class="font-bold text-amber-900 text-base">Revisar Imagens que Errei</h3>
                <p class="text-xs text-amber-700">Você possui ${wrongImagesCount} imagem(ns) guardada(s) para revisão visual.</p>
              </div>
            </div>
            <button onclick="app.renderImageWrongReview()" 
              class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-extrabold text-xs shadow-sm transition">
              🔎 REVISAR AGORA (${wrongImagesCount})
            </button>
          </div>
        ` : ''}

        <!-- Estudo por Assuntos de Imagens -->
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>📚</span> Assuntos das Imagens
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${imageTopicsList.map(t => `
              <div onclick="app.startStudyImageTopic('${t.name}')" 
                class="bg-white rounded-2xl p-5 border border-teal-100 shadow-sm hover:shadow-md hover:border-teal-300 cursor-pointer transition transform hover:-translate-y-1 group relative">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 text-2xl flex items-center justify-center group-hover:scale-110 transition">
                    ${t.icon}
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-gray-800 text-base group-hover:text-teal-600 transition mb-1">${t.name}</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">${t.desc}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Filtros por Dificuldade -->
        <div class="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm space-y-3">
          <h3 class="font-bold text-gray-800 text-base flex items-center gap-2">
            <span>🎚️</span> Dificuldade das Imagens
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button onclick="app.startImageDifficultyFilter('facil')" 
              class="p-3 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100 text-left transition">
              <span class="font-bold text-emerald-900 text-sm block">🟢 Nível Fácil</span>
              <span class="text-xs text-emerald-700">Estruturas diretas e bem nítidas</span>
            </button>
            <button onclick="app.startImageDifficultyFilter('medio')" 
              class="p-3 rounded-xl border border-amber-100 bg-amber-50/50 hover:bg-amber-100 text-left transition">
              <span class="font-bold text-amber-900 text-sm block">🟡 Nível Médio</span>
              <span class="text-xs text-amber-700">Imagens com mais detalhes teciduais</span>
            </button>
            <button onclick="app.startImageDifficultyFilter('dificil')" 
              class="p-3 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-100 text-left transition">
              <span class="font-bold text-rose-900 text-sm block">🔴 Nível Difícil</span>
              <span class="text-xs text-rose-700">Análise de características histológicas profundas</span>
            </button>
          </div>
        </div>

      </div>
    `;
  }

  startStudyImageTopic(topicName) {
    this.mode = 'image_study';
    this.isImageMode = true;
    this.isChallengeMode = false;
    this.imageQuestions = window.IMAGE_QUESTIONS_DATABASE || [];
    this.currentQuestionsList = this.shuffleArray(
      this.imageQuestions.filter(q => q.assunto === topicName)
    );
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderImageQuiz();
  }

  startAllImageQuestions() {
    this.mode = 'image_study';
    this.isImageMode = true;
    this.isChallengeMode = false;
    this.imageQuestions = window.IMAGE_QUESTIONS_DATABASE || [];
    this.currentQuestionsList = this.shuffleArray([...this.imageQuestions]);
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderImageQuiz();
  }

  startImageDifficultyFilter(diff) {
    this.mode = 'image_study';
    this.isImageMode = true;
    this.isChallengeMode = false;
    this.imageQuestions = window.IMAGE_QUESTIONS_DATABASE || [];
    this.currentQuestionsList = this.shuffleArray(
      this.imageQuestions.filter(q => q.dificuldade === diff)
    );
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderImageQuiz();
  }

  startImageChallenge() {
    this.mode = 'image_challenge';
    this.isImageMode = true;
    this.isChallengeMode = true;
    this.imageQuestions = window.IMAGE_QUESTIONS_DATABASE || [];
    this.currentQuestionsList = this.shuffleArray([...this.imageQuestions]).slice(0, 10);
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderImageQuiz();
  }

  renderImageQuiz() {
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    if (this.currentIndex >= this.currentQuestionsList.length) {
      if (this.isChallengeMode) {
        this.renderImageChallengeResult();
      } else {
        this.renderStudyFinished();
      }
      return;
    }

    const currentQ = this.currentQuestionsList[this.currentIndex];
    const totalQ = this.currentQuestionsList.length;
    const progressPercent = Math.round(((this.currentIndex) / totalQ) * 100);

    mainContainer.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-4">
        
        <!-- Top Bar do Quiz de Imagem -->
        <div class="flex items-center justify-between mb-2">
          <button onclick="app.renderImageHub()" 
            class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-500 hover:text-teal-600 transition">
            <span>←</span> Voltar para Identificação por Imagens
          </button>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-teal-100 text-teal-800 rounded-full font-extrabold text-xs border border-teal-200">
              🧫 Imagem ${this.currentIndex + 1} de ${totalQ}
            </span>
          </div>
        </div>

        <!-- Barra de Progresso -->
        <div class="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden mb-4">
          <div class="bg-gradient-to-r from-teal-400 to-emerald-600 h-full transition-all duration-300" style="width: ${progressPercent}%"></div>
        </div>

        <!-- Card Principal da Questão -->
        <div class="bg-white rounded-3xl p-5 sm:p-8 border border-pink-100 shadow-xl space-y-6">
          
          <!-- Badges de Cabeçalho -->
          <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
            <span class="text-xs font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              📌 ${currentQ.assunto}
            </span>
            <div class="flex items-center gap-2">
              ${currentQ.marcacao ? `
                <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                  📍 Marcação Discreta
                </span>
              ` : ''}
              ${this.getDifficultyBadge(currentQ.dificuldade)}
            </div>
          </div>

          <!-- Pergunta Principal -->
          <div class="text-center sm:text-left">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">🧫 Qual é essa estrutura?</span>
            <h2 class="text-lg sm:text-xl font-extrabold text-gray-800 leading-snug">
              ${currentQ.pergunta}
            </h2>
          </div>

          <!-- IMAGEM CENTRALIZADA COM ZOOM -->
          <div class="relative bg-gray-900 rounded-2xl overflow-hidden shadow-inner group border-2 border-teal-100">
            <img src="${currentQ.imagem}" alt="${currentQ.pergunta}" 
              onclick="app.openImageZoom('${currentQ.imagem}', '${currentQ.pergunta.replace(/'/g, "&apos;")}')"
              class="w-full max-h-[380px] object-contain mx-auto cursor-zoom-in transition transform group-hover:scale-[1.01] duration-300">
            
            <!-- Floating Zoom Button -->
            <button onclick="app.openImageZoom('${currentQ.imagem}', '${currentQ.pergunta.replace(/'/g, "&apos;")}')"
              class="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1.5 transition">
              <span>🔍</span> Ampliar Imagem
            </button>
          </div>

          <!-- Créditos/Fonte da Imagem -->
          ${currentQ.fonteImagem ? `
            <div class="text-[11px] text-gray-400 text-right italic">
              Fonte: ${currentQ.fonteImagem}
            </div>
          ` : ''}

          <!-- Alternativas A, B, C, D -->
          <div class="space-y-3" id="alternatives-container">
            ${currentQ.alternativas.map((alt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              return `
                <button id="opt-${idx}" onclick="app.selectImageOption(${idx})" 
                  class="w-full text-left p-4 rounded-2xl border-2 border-gray-100 bg-gray-50/50 hover:bg-teal-50/60 hover:border-teal-300 transition flex items-start gap-4 group">
                  <span class="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-600 font-extrabold text-sm flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition shrink-0">
                    ${letter}
                  </span>
                  <span class="text-sm sm:text-base font-medium text-gray-800 leading-snug pt-1">
                    ${alt}
                  </span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Feedback Imediato -->
          <div id="feedback-area" class="hidden space-y-4 pt-4 border-t border-gray-100"></div>

          <!-- Action Button Next -->
          <div id="action-btn-area" class="hidden justify-end pt-4">
            <button onclick="app.nextQuestion()" 
              class="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:opacity-95 text-white font-extrabold rounded-2xl shadow-lg transition transform hover:-translate-y-0.5">
              PRÓXIMA IMAGEM →
            </button>
          </div>

        </div>
      </div>
    `;
  }

  selectImageOption(selectedIndex) {
    if (this.answeredCurrent) return;

    const currentQ = this.currentQuestionsList[this.currentIndex];
    const isCorrect = selectedIndex === currentQ.respostaCorreta;
    this.answeredCurrent = true;

    // Registrar resposta
    this.userAnswers.push({
      questionId: currentQ.id,
      selectedIndex,
      isCorrect,
      question: currentQ
    });

    // Atualizar estatísticas globais e estatísticas de imagem
    this.stats.totalAnswered++;
    this.stats.imageStats = this.stats.imageStats || { totalAnswered: 0, totalCorrect: 0, totalWrong: 0, wrongQuestionsIds: [] };
    this.stats.imageStats.totalAnswered++;

    if (isCorrect) {
      this.stats.totalCorrect++;
      this.stats.imageStats.totalCorrect++;
      this.stats.streak++;
      if (this.stats.streak > this.stats.maxStreak) {
        this.stats.maxStreak = this.stats.streak;
      }
      if (window.SoundFX) window.SoundFX.playSuccess();
    } else {
      this.stats.totalWrong++;
      this.stats.imageStats.totalWrong++;
      this.stats.streak = 0;
      
      if (!this.stats.topicErrors[currentQ.assunto]) {
        this.stats.topicErrors[currentQ.assunto] = 0;
      }
      this.stats.topicErrors[currentQ.assunto]++;

      if (!this.stats.imageStats.wrongQuestionsIds) {
        this.stats.imageStats.wrongQuestionsIds = [];
      }
      if (!this.stats.imageStats.wrongQuestionsIds.includes(currentQ.id)) {
        this.stats.imageStats.wrongQuestionsIds.push(currentQ.id);
      }

      if (window.SoundFX) window.SoundFX.playError();
    }
    this.saveStats();

    // Desabilitar opções
    for (let i = 0; i < currentQ.alternativas.length; i++) {
      const btn = document.getElementById(`opt-${i}`);
      if (btn) {
        btn.disabled = true;
        btn.classList.remove('hover:bg-teal-50/60', 'hover:border-teal-300');
        btn.classList.add('cursor-not-allowed', 'opacity-70');
      }
    }

    if (this.isChallengeMode) {
      const selectedBtn = document.getElementById(`opt-${selectedIndex}`);
      if (selectedBtn) {
        selectedBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
        selectedBtn.classList.add('bg-purple-100', 'border-purple-400', 'opacity-100');
      }
      setTimeout(() => {
        this.nextQuestion();
      }, 350);
    } else {
      const selectedBtn = document.getElementById(`opt-${selectedIndex}`);
      const correctBtn = document.getElementById(`opt-${currentQ.respostaCorreta}`);

      if (isCorrect) {
        if (selectedBtn) {
          selectedBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
          selectedBtn.classList.add('bg-emerald-100', 'border-emerald-500', 'opacity-100');
        }
      } else {
        if (selectedBtn) {
          selectedBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
          selectedBtn.classList.add('bg-rose-100', 'border-rose-500', 'opacity-100');
        }
        if (correctBtn) {
          correctBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
          correctBtn.classList.add('bg-emerald-100', 'border-emerald-500', 'opacity-100');
        }
      }

      this.renderImmediateImageFeedback(isCorrect, currentQ, selectedIndex);
    }
  }

  renderImmediateImageFeedback(isCorrect, currentQ, selectedIndex) {
    const feedbackArea = document.getElementById('feedback-area');
    const actionBtnArea = document.getElementById('action-btn-area');
    if (!feedbackArea || !actionBtnArea) return;

    const correctLetter = ['A', 'B', 'C', 'D'][currentQ.respostaCorreta];

    if (isCorrect) {
      feedbackArea.innerHTML = `
        <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🎉</span>
            <div>
              <h3 class="text-xl font-extrabold text-emerald-800">ACERTOU!</h3>
              <p class="text-xs text-emerald-700 font-semibold">Essa imagem apresenta características compatíveis com <strong>${currentQ.alternativas[currentQ.respostaCorreta]}</strong>.</p>
            </div>
          </div>
          <p class="text-sm text-emerald-900 leading-relaxed bg-white/70 p-4 rounded-xl border border-emerald-100">
            ${currentQ.explicacao}
          </p>
          <div class="text-xs font-bold text-emerald-800 flex items-center gap-2 pt-1">
            <span>🧠 Para lembrar:</span>
            <span class="font-normal text-emerald-900">${currentQ.dica}</span>
          </div>
        </div>
      `;
    } else {
      feedbackArea.innerHTML = `
        <div class="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-4">
          <div class="flex items-center gap-3">
            <span class="text-3xl">❌</span>
            <div>
              <h3 class="text-xl font-extrabold text-rose-800">VOCÊ ERROU</h3>
              <span class="inline-block mt-1 px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-extrabold">
                Resposta correta: Alternativa ${correctLetter} - ${currentQ.alternativas[currentQ.respostaCorreta]}
              </span>
            </div>
          </div>

          <div class="bg-white/80 p-4 rounded-xl border border-rose-100 space-y-2">
            <h4 class="font-bold text-rose-900 text-sm flex items-center gap-1.5">
              <span>💡</span> POR QUE?
            </h4>
            <p class="text-sm text-gray-700 leading-relaxed">
              ${currentQ.explicacao}
            </p>
          </div>

          <!-- CHECKLIST DE IDENTIFICAÇÃO VISUAL -->
          ${currentQ.oqueObservar && currentQ.oqueObservar.length > 0 ? `
            <div class="bg-teal-50/80 p-4 rounded-xl border border-teal-200 space-y-2">
              <h4 class="font-extrabold text-teal-900 text-xs sm:text-sm flex items-center gap-1.5">
                <span>🔎</span> O que observar na imagem:
              </h4>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                ${currentQ.oqueObservar.map(item => `
                  <li class="text-xs text-teal-900 bg-white p-2 rounded-lg border border-teal-100 font-medium flex items-center gap-2">
                    <span class="text-teal-500 font-bold">✓</span> ${item}
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <div class="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 flex items-start gap-2">
            <span class="text-base">🧠</span>
            <div>
              <span class="block font-extrabold text-amber-950">Para lembrar:</span>
              <span class="font-medium text-amber-900">${currentQ.dica}</span>
            </div>
          </div>
        </div>
      `;
    }

    feedbackArea.classList.remove('hidden');
    actionBtnArea.classList.remove('hidden');
    actionBtnArea.classList.add('flex');
  }

  // FLASHCARDS VISUAIS 🧠
  startImageFlashcards() {
    this.mode = 'image_flashcards';
    this.imageQuestions = window.IMAGE_QUESTIONS_DATABASE || [];
    this.flashcardsList = this.shuffleArray([...this.imageQuestions]);
    this.flashcardIndex = 0;
    this.showFlashcardAnswer = false;
    this.renderImageFlashcard();
  }

  renderImageFlashcard() {
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    if (this.flashcardIndex >= this.flashcardsList.length) {
      this.flashcardIndex = 0;
    }

    const currentF = this.flashcardsList[this.flashcardIndex];

    mainContainer.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="flex items-center justify-between">
          <button onclick="app.renderImageHub()" 
            class="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-teal-600 transition">
            <span>←</span> Voltar ao Hub de Imagens
          </button>
          <span class="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            🧠 Flashcard ${this.flashcardIndex + 1} de ${this.flashcardsList.length}
          </span>
        </div>

        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xl text-center space-y-6">
          <span class="text-xs font-extrabold uppercase tracking-widest text-teal-600">
            📌 ${currentF.assunto}
          </span>

          <h2 class="text-xl sm:text-2xl font-black text-gray-800">
            O que é isso?
          </h2>

          <div class="relative bg-gray-900 rounded-2xl overflow-hidden shadow-md max-w-lg mx-auto border-2 border-teal-100">
            <img src="${currentF.imagem}" alt="Flashcard Histológico" 
              onclick="app.openImageZoom('${currentF.imagem}', '${currentF.alternativas[currentF.respostaCorreta]}')"
              class="w-full max-h-[350px] object-contain mx-auto cursor-zoom-in">
          </div>

          ${!this.showFlashcardAnswer ? `
            <button onclick="app.revealFlashcardAnswer()" 
              class="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-extrabold rounded-2xl shadow-lg hover:opacity-95 transition text-base">
              REVELAR RESPOSTA
            </button>
          ` : `
            <div class="bg-teal-50 border border-teal-200 rounded-2xl p-6 text-left space-y-4 animate-fade-in">
              <div class="border-b border-teal-200 pb-3">
                <span class="text-xs font-bold text-teal-700 uppercase tracking-wider block">Estrutura Identificada</span>
                <h3 class="text-2xl font-black text-teal-900">
                  ${currentF.alternativas[currentF.respostaCorreta]}
                </h3>
              </div>

              <p class="text-sm text-teal-950 leading-relaxed">
                ${currentF.explicacao}
              </p>

              ${currentF.oqueObservar && currentF.oqueObservar.length > 0 ? `
                <div>
                  <span class="text-xs font-extrabold text-teal-900 block mb-2">Como reconhecer visualmente:</span>
                  <ul class="space-y-1.5">
                    ${currentF.oqueObservar.map(item => `
                      <li class="text-xs text-teal-800 flex items-center gap-2">
                        <span class="text-teal-600 font-bold">•</span> ${item}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}

              <button onclick="app.nextFlashcard()" 
                class="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl shadow-md transition text-center">
                PRÓXIMO FLASHCARD →
              </button>
            </div>
          `}
        </div>
      </div>
    `;
  }

  revealFlashcardAnswer() {
    this.showFlashcardAnswer = true;
    this.renderImageFlashcard();
  }

  nextFlashcard() {
    this.flashcardIndex++;
    this.showFlashcardAnswer = false;
    this.renderImageFlashcard();
  }

  // DESAFIO DE IDENTIFICAÇÃO RESULTADO 🔥
  renderImageChallengeResult() {
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    const total = this.userAnswers.length;
    const correctCount = this.userAnswers.filter(a => a.isCorrect).length;
    const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    mainContainer.innerHTML = `
      <div class="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-teal-100 shadow-xl text-center space-y-6">
        <div class="w-20 h-20 bg-teal-100 text-teal-600 text-4xl rounded-3xl flex items-center justify-center mx-auto shadow-md">
          🏆
        </div>

        <div>
          <h2 class="text-3xl font-black text-gray-800 mb-1">Desafio Concluído!</h2>
          <p class="text-lg font-bold text-teal-600">Você identificou ${correctCount} de ${total} estruturas!</p>
        </div>

        <div class="bg-teal-50 rounded-2xl p-6 border border-teal-200 max-w-md mx-auto flex justify-around">
          <div>
            <span class="text-xs font-semibold text-gray-500 block">Acertos</span>
            <span class="text-3xl font-black text-emerald-600">${correctCount}</span>
          </div>
          <div class="border-r border-teal-200"></div>
          <div>
            <span class="text-xs font-semibold text-gray-500 block">Total</span>
            <span class="text-3xl font-black text-gray-700">${total}</span>
          </div>
          <div class="border-r border-teal-200"></div>
          <div>
            <span class="text-xs font-semibold text-gray-500 block">Aproveitamento</span>
            <span class="text-3xl font-black text-purple-600">${percent}%</span>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-3 pt-2">
          <button onclick="app.startImageChallenge()" 
            class="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-rose-600 text-white font-extrabold rounded-2xl shadow-md hover:opacity-95 transition">
            🔥 JOGAR DESAFIO NOVAMENTE
          </button>
          <button onclick="app.renderImageHub()" 
            class="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl shadow-md transition">
            VOLTAR AO HUB DE IMAGENS
          </button>
        </div>
      </div>
    `;
  }

  // REVISAR IMAGENS QUE ERREI 🔎
  renderImageWrongReview() {
    this.mode = 'image_wrong_review';
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    this.imageQuestions = window.IMAGE_QUESTIONS_DATABASE || [];
    const wrongIds = (this.stats.imageStats && this.stats.imageStats.wrongQuestionsIds) ? this.stats.imageStats.wrongQuestionsIds : [];
    const wrongList = this.imageQuestions.filter(q => wrongIds.includes(q.id));

    if (wrongList.length === 0) {
      mainContainer.innerHTML = `
        <div class="max-w-xl mx-auto bg-white rounded-3xl p-8 text-center border border-pink-100 shadow-md">
          <span class="text-5xl block mb-3">✨</span>
          <h2 class="text-xl font-bold text-gray-800 mb-2">Nenhum erro registrado!</h2>
          <p class="text-sm text-gray-500 mb-6">Você ainda não errou nenhuma questão de imagem ou já limpou suas revisões.</p>
          <button onclick="app.renderImageHub()" class="px-6 py-3 bg-teal-600 text-white font-extrabold rounded-2xl shadow-md">Voltar ao Hub de Imagens</button>
        </div>
      `;
      return;
    }

    mainContainer.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6">
        <div class="flex items-center justify-between">
          <button onclick="app.renderImageHub()" 
            class="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-teal-600 transition">
            <span>←</span> Voltar ao Hub de Imagens
          </button>
          <span class="text-xs font-bold bg-rose-100 text-rose-800 px-3 py-1 rounded-full border border-rose-200">
            🔎 ${wrongList.length} imagem(ns) para revisar
          </span>
        </div>

        <div class="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg">
          <h1 class="text-2xl font-black mb-1">🔎 Revisão de Erros Visuais</h1>
          <p class="text-xs sm:text-sm text-amber-100">Examine detalhadamente as características das imagens que você errou anteriormente para fixar o aprendizado.</p>
        </div>

        <div class="space-y-6">
          ${wrongList.map(q => `
            <div class="bg-white rounded-3xl p-6 border border-pink-100 shadow-md space-y-4">
              <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                <span class="text-xs font-extrabold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                  📌 ${q.assunto}
                </span>
                <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Correto: ${q.alternativas[q.respostaCorreta]}
                </span>
              </div>

              <h3 class="font-bold text-gray-800 text-base">${q.pergunta}</h3>

              <div class="relative bg-gray-900 rounded-2xl overflow-hidden max-w-md mx-auto">
                <img src="${q.imagem}" alt="${q.pergunta}" 
                  onclick="app.openImageZoom('${q.imagem}', '${q.alternativas[q.respostaCorreta]}')"
                  class="w-full max-h-[250px] object-contain mx-auto cursor-zoom-in">
              </div>

              <div class="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs text-gray-700 leading-relaxed">
                <span class="font-bold text-gray-900 block mb-1">💡 Explicação Detalhada:</span>
                ${q.explicacao}
              </div>

              ${q.oqueObservar && q.oqueObservar.length > 0 ? `
                <div class="bg-teal-50 p-4 rounded-2xl border border-teal-200">
                  <span class="font-extrabold text-teal-900 text-xs block mb-2">🔎 O que observar nesta imagem:</span>
                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    ${q.oqueObservar.map(item => `
                      <li class="text-xs text-teal-900 bg-white p-2 rounded-lg border border-teal-100 font-medium">
                        ✓ ${item}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // CONTROLES DE ZOOM E TELA CHEIA 🔍
  openImageZoom(src, title) {
    const modal = document.getElementById('image-zoom-modal');
    const img = document.getElementById('zoom-modal-img');
    const titleEl = document.getElementById('zoom-modal-title');
    if (!modal || !img) return;

    img.src = src;
    if (titleEl) titleEl.textContent = title || "🧫 Visualização Histológica Ampliada";
    
    this.modalZoomScale = 1.0;
    img.style.transform = `scale(1.0)`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  closeImageZoom() {
    const modal = document.getElementById('image-zoom-modal');
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  adjustModalZoom(delta) {
    const img = document.getElementById('zoom-modal-img');
    if (!img) return;
    this.modalZoomScale = Math.min(3.0, Math.max(0.5, (this.modalZoomScale || 1.0) + delta));
    img.style.transform = `scale(${this.modalZoomScale})`;
  }

  resetModalZoom() {
    const img = document.getElementById('zoom-modal-img');
    if (!img) return;
    this.modalZoomScale = 1.0;
    img.style.transform = `scale(1.0)`;
  }

  // QUIZ TEÓRICO PADRÃO
  renderQuiz() {
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    if (this.currentIndex >= this.currentQuestionsList.length) {
      if (this.mode === 'exam') {
        this.renderExamResult();
      } else {
        this.renderStudyFinished();
      }
      return;
    }

    const currentQ = this.currentQuestionsList[this.currentIndex];
    const totalQ = this.currentQuestionsList.length;
    const progressPercent = Math.round(((this.currentIndex) / totalQ) * 100);

    const isExamMode = this.mode === 'exam';

    mainContainer.innerHTML = `
      <div class="max-w-3xl mx-auto">
        <!-- Top Bar do Quiz -->
        <div class="flex items-center justify-between mb-4">
          <button onclick="app.renderHome()" 
            class="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-rose-600 transition">
            <span>←</span> Sair para o Início
          </button>
          <div class="flex items-center gap-2">
            ${isExamMode ? `<span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-bold text-xs border border-purple-200">🎯 Simulado Prova</span>` : ''}
            <span class="text-xs font-bold text-gray-500">Questão ${this.currentIndex + 1} de ${totalQ}</span>
          </div>
        </div>

        <!-- Barra de Progresso do Quiz -->
        <div class="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden mb-6">
          <div class="bg-gradient-to-r from-rose-400 to-purple-500 h-full transition-all duration-300" style="width: ${progressPercent}%"></div>
        </div>

        <!-- Card da Questão -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xl mb-6 relative">
          
          <!-- Badges de Assunto e Dificuldade -->
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-gray-100">
            <span class="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              📌 ${currentQ.assunto}
            </span>
            ${this.getDifficultyBadge(currentQ.dificuldade)}
          </div>

          <!-- Pergunta -->
          <h2 class="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed mb-6">
            ${currentQ.pergunta}
          </h2>

          <!-- Alternativas -->
          <div class="space-y-3 mb-6" id="alternatives-container">
            ${currentQ.alternativas.map((alt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              return `
                <button id="opt-${idx}" onclick="app.selectOption(${idx})" 
                  class="w-full text-left p-4 rounded-2xl border-2 border-gray-100 bg-gray-50/50 hover:bg-rose-50/60 hover:border-rose-300 transition flex items-start gap-4 group">
                  <span class="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-600 font-extrabold text-sm flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition shrink-0">
                    ${letter}
                  </span>
                  <span class="text-sm sm:text-base font-medium text-gray-700 leading-snug pt-1">
                    ${alt}
                  </span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Área de Feedback Imediato -->
          <div id="feedback-area" class="hidden space-y-4 pt-4 border-t border-gray-100"></div>

          <!-- Botão Próxima Questão -->
          <div id="action-btn-area" class="hidden justify-end pt-4">
            <button onclick="app.nextQuestion()" 
              class="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-95 text-white font-extrabold rounded-2xl shadow-lg transition transform hover:-translate-y-0.5">
              PRÓXIMA QUESTÃO →
            </button>
          </div>

        </div>
      </div>
    `;
  }

  selectOption(selectedIndex) {
    if (this.answeredCurrent) return;

    const currentQ = this.currentQuestionsList[this.currentIndex];
    const isCorrect = selectedIndex === currentQ.respostaCorreta;
    this.answeredCurrent = true;

    this.userAnswers.push({
      questionId: currentQ.id,
      selectedIndex,
      isCorrect,
      question: currentQ
    });

    this.stats.totalAnswered++;
    if (isCorrect) {
      this.stats.totalCorrect++;
      this.stats.streak++;
      if (this.stats.streak > this.stats.maxStreak) {
        this.stats.maxStreak = this.stats.streak;
      }
      if (window.SoundFX) window.SoundFX.playSuccess();
    } else {
      this.stats.totalWrong++;
      this.stats.streak = 0;
      if (!this.stats.topicErrors[currentQ.assunto]) {
        this.stats.topicErrors[currentQ.assunto] = 0;
      }
      this.stats.topicErrors[currentQ.assunto]++;
      if (window.SoundFX) window.SoundFX.playError();
    }
    this.saveStats();

    for (let i = 0; i < currentQ.alternativas.length; i++) {
      const btn = document.getElementById(`opt-${i}`);
      if (btn) {
        btn.disabled = true;
        btn.classList.remove('hover:bg-rose-50/60', 'hover:border-rose-300');
        btn.classList.add('cursor-not-allowed', 'opacity-70');
      }
    }

    if (this.mode === 'exam') {
      const selectedBtn = document.getElementById(`opt-${selectedIndex}`);
      if (selectedBtn) {
        selectedBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
        selectedBtn.classList.add('bg-purple-100', 'border-purple-400', 'opacity-100');
      }
      setTimeout(() => {
        this.nextQuestion();
      }, 300);

    } else {
      const selectedBtn = document.getElementById(`opt-${selectedIndex}`);
      const correctBtn = document.getElementById(`opt-${currentQ.respostaCorreta}`);

      if (isCorrect) {
        if (selectedBtn) {
          selectedBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
          selectedBtn.classList.add('bg-emerald-100', 'border-emerald-500', 'opacity-100');
        }
      } else {
        if (selectedBtn) {
          selectedBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
          selectedBtn.classList.add('bg-rose-100', 'border-rose-500', 'opacity-100');
        }
        if (correctBtn) {
          correctBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
          correctBtn.classList.add('bg-emerald-100', 'border-emerald-500', 'opacity-100');
        }
      }

      this.renderImmediateFeedback(isCorrect, currentQ, selectedIndex);
    }
  }

  renderImmediateFeedback(isCorrect, currentQ, selectedIndex) {
    const feedbackArea = document.getElementById('feedback-area');
    const actionBtnArea = document.getElementById('action-btn-area');
    if (!feedbackArea || !actionBtnArea) return;

    const correctLetter = ['A', 'B', 'C', 'D'][currentQ.respostaCorreta];

    if (isCorrect) {
      feedbackArea.innerHTML = `
        <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🎉</span>
            <div>
              <h3 class="text-xl font-extrabold text-emerald-800">ACERTOU!</h3>
              <p class="text-xs text-emerald-700 font-semibold">Excelente raciocínio histológico!</p>
            </div>
          </div>
          <p class="text-sm text-emerald-900 leading-relaxed bg-white/70 p-4 rounded-xl border border-emerald-100">
            ${currentQ.explicacao}
          </p>
          <div class="text-xs font-bold text-emerald-800 flex items-center gap-2 pt-1">
            <span>🧠 Para lembrar:</span>
            <span class="font-normal text-emerald-900">${currentQ.dica}</span>
          </div>
        </div>
      `;
    } else {
      feedbackArea.innerHTML = `
        <div class="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-3xl">❌</span>
              <div>
                <h3 class="text-xl font-extrabold text-rose-800">VOCÊ ERROU</h3>
                <span class="inline-block mt-1 px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-extrabold">
                  Resposta correta: Alternativa ${correctLetter}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-white/80 p-4 rounded-xl border border-rose-100 space-y-2">
            <h4 class="font-bold text-rose-900 text-sm flex items-center gap-1.5">
              <span>💡</span> POR QUE?
            </h4>
            <p class="text-sm text-gray-700 leading-relaxed">
              ${currentQ.explicacao}
            </p>
          </div>

          <div class="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 flex items-start gap-2">
            <span class="text-base">🧠</span>
            <div>
              <span class="block font-extrabold text-amber-950">Para lembrar:</span>
              <span class="font-medium text-amber-900">${currentQ.dica}</span>
            </div>
          </div>
        </div>
      `;
    }

    feedbackArea.classList.remove('hidden');
    actionBtnArea.classList.remove('hidden');
    actionBtnArea.classList.add('flex');
  }

  nextQuestion() {
    this.currentIndex++;
    this.answeredCurrent = false;
    if (this.isImageMode) {
      this.renderImageQuiz();
    } else {
      this.renderQuiz();
    }
  }

  renderStudyFinished() {
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    const total = this.userAnswers.length;
    const correctCount = this.userAnswers.filter(a => a.isCorrect).length;
    const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    mainContainer.innerHTML = `
      <div class="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-pink-100 shadow-xl text-center">
        <div class="w-20 h-20 bg-rose-100 text-rose-600 text-4xl rounded-3xl flex items-center justify-center mx-auto mb-4">
          👏
        </div>
        <h2 class="text-2xl font-extrabold text-gray-800 mb-2">Estudo Concluído!</h2>
        <p class="text-sm text-gray-500 mb-6">Você revisou este bloco de questões com sucesso.</p>

        <div class="bg-rose-50/50 rounded-2xl p-6 border border-rose-100 max-w-md mx-auto mb-8 flex justify-around">
          <div>
            <span class="text-xs font-semibold text-gray-500 block">Acertos</span>
            <span class="text-2xl font-extrabold text-emerald-600">${correctCount}</span>
          </div>
          <div class="border-r border-rose-200"></div>
          <div>
            <span class="text-xs font-semibold text-gray-500 block">Total</span>
            <span class="text-2xl font-extrabold text-gray-700">${total}</span>
          </div>
          <div class="border-r border-rose-200"></div>
          <div>
            <span class="text-xs font-semibold text-gray-500 block">Aproveitamento</span>
            <span class="text-2xl font-extrabold text-purple-600">${percent}%</span>
          </div>
        </div>

        <button onclick="app.renderHome()" 
          class="px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-extrabold rounded-2xl shadow-md transition">
          VOLTAR AO PAINEL DE ESTUDOS
        </button>
      </div>
    `;
  }

  // TELA DE RESULTADO DO SIMULADO
  renderExamResult() {
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    const total = this.userAnswers.length;
    const correctCount = this.userAnswers.filter(a => a.isCorrect).length;
    const wrongCount = total - correctCount;
    const percent = Math.round((correctCount / total) * 100);

    const minScorePercent = window.CONFIG ? window.CONFIG.REWARD_MIN_SCORE_PERCENT : 80;
    const unlockedReward = percent >= minScorePercent;

    const examErrorsByTopic = {};
    this.userAnswers.forEach(ans => {
      if (!ans.isCorrect) {
        const topic = ans.question.assunto;
        examErrorsByTopic[topic] = (examErrorsByTopic[topic] || 0) + 1;
      }
    });

    let titleMsg = "";
    let subMsg = "";
    let headerBg = "";

    if (percent >= 90) {
      titleMsg = "🏆 INCRÍVEL!";
      subMsg = "Você está muito preparada para a prova de Histologia!";
      headerBg = "from-emerald-500 to-teal-600";
    } else if (percent >= 80) {
      titleMsg = "🔥 MUITO BEM!";
      subMsg = "Você está no caminho certo! Excelente desempenho!";
      headerBg = "from-rose-500 to-pink-600";
    } else if (percent >= 60) {
      titleMsg = "💪 QUASE LÁ!";
      subMsg = "Vamos revisar os assuntos que você mais errou para garantir o 10 na prova.";
      headerBg = "from-amber-500 to-orange-600";
    } else {
      titleMsg = "📚 VAMOS DE NOVO!";
      subMsg = "Não desanima. Agora você já sabe exatamente o que precisa revisar.";
      headerBg = "from-rose-600 to-red-700";
    }

    const wrongQuestionsList = this.userAnswers.filter(a => !a.isCorrect).map(a => a.question);

    mainContainer.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6">
        
        <!-- Top Banner Resultado -->
        <div class="bg-gradient-to-r ${headerBg} rounded-3xl p-8 text-white shadow-xl text-center relative overflow-hidden">
          <h1 class="text-3xl sm:text-4xl font-black mb-2">${titleMsg}</h1>
          <p class="text-white/90 text-sm sm:text-base font-medium max-w-md mx-auto mb-6">${subMsg}</p>

          <div class="bg-white/20 backdrop-blur-md rounded-2xl p-4 inline-flex items-center gap-6 border border-white/30">
            <div>
              <span class="text-xs uppercase font-extrabold tracking-wider text-white/80 block">Seu resultado</span>
              <span class="text-3xl font-black text-white">${correctCount} / ${total}</span>
            </div>
            <div class="h-10 w-px bg-white/30"></div>
            <div>
              <span class="text-xs uppercase font-extrabold tracking-wider text-white/80 block">Aproveitamento</span>
              <span class="text-3xl font-black text-white">${percent}%</span>
            </div>
          </div>
        </div>

        <!-- Análise Detalhada -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-md space-y-6">
          <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span>📊</span> Análise de Desempenho
          </h2>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center gap-3">
              <span class="text-2xl">✅</span>
              <div>
                <span class="text-xs font-semibold text-emerald-700 block">Acertos</span>
                <span class="text-xl font-black text-emerald-800">${correctCount} questões</span>
              </div>
            </div>
            <div class="bg-rose-50 p-4 rounded-2xl border border-rose-200 flex items-center gap-3">
              <span class="text-2xl">❌</span>
              <div>
                <span class="text-xs font-semibold text-rose-700 block">Erros</span>
                <span class="text-xl font-black text-rose-800">${wrongCount} questões</span>
              </div>
            </div>
          </div>

          <!-- Erros por Assunto -->
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-3">Detalhamento dos Erros por Assunto:</h3>
            <div class="space-y-2">
              ${[
                "Tecido epitelial de revestimento",
                "Tecido epitelial glandular",
                "Células do tecido conjuntivo",
                "Fibras do tecido conjuntivo",
                "Classificação dos tecidos conjuntivos"
              ].map(t => {
                const count = examErrorsByTopic[t] || 0;
                return `
                  <div class="flex items-center justify-between p-3 rounded-xl ${count > 0 ? 'bg-rose-50/70 border border-rose-100' : 'bg-gray-50 border border-gray-100'}">
                    <span class="text-xs sm:text-sm font-semibold text-gray-800">${t}</span>
                    <span class="text-xs font-bold ${count > 0 ? 'text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full' : 'text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full'}">
                      ${count > 0 ? `${count} erro(s)` : '0 erros ✨'}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-gray-100">
            ${wrongQuestionsList.length > 0 ? `
              <button onclick='app.startReviewWrongExamQuestions(${JSON.stringify(wrongQuestionsList).replace(/'/g, "&apos;")})' 
                class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-2xl shadow-md transition">
                📚 REVISAR QUESTÕES ERRADAS
              </button>
            ` : ''}

            <button onclick="app.startExamSimulation()" 
              class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl shadow-md transition">
              🔄 NOVO SIMULADO
            </button>
          </div>
        </div>

        <!-- CARD DA RECOMPENSA ❤️🎁 -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xl text-center">
          ${unlockedReward ? `
            <div class="space-y-4">
              <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-extrabold text-xs">
                🎉 RECOMPENSA DESBLOQUEADA!
              </span>
              <h3 class="text-2xl font-black text-gray-800">Parabéns! Você atingiu a meta de ${minScorePercent}%! ❤️</h3>
              <p class="text-sm text-gray-600">Seu esforço e dedicação merecem um presente especial.</p>
              
              <button onclick="app.renderRewardScreen()" 
                class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black rounded-2xl shadow-xl transform transition hover:scale-105 animate-pulse text-lg">
                <span>🎁</span> DESBLOQUEAR MEU PRESENTE
              </button>
            </div>
          ` : `
            <div class="space-y-4">
              <h3 class="text-xl font-bold text-gray-800">Você ficou pertinho! ❤️</h3>
              <p class="text-sm text-gray-600">
                Você precisa de <strong class="text-rose-600">${minScorePercent}%</strong> no Simulado para desbloquear seu presente especial.
              </p>
              <div class="inline-block bg-rose-50 px-4 py-2 rounded-xl text-rose-700 text-xs font-bold border border-rose-200">
                Seu resultado: ${percent}% • Faltaram apenas ${minScorePercent - percent}%!
              </div>

              <div class="flex justify-center gap-3 pt-2">
                <button onclick="app.startExamSimulation()" 
                  class="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-extrabold rounded-2xl shadow-md transition">
                  🔄 TENTAR NOVAMENTE
                </button>
              </div>
            </div>
          `}
        </div>

      </div>
    `;
  }

  // TELA DA RECOMPENSA ESPECIAL (PRESENTE 🎁 + WHATSAPP)
  renderRewardScreen() {
    this.mode = 'reward';
    if (window.SoundFX) window.SoundFX.playFanfare();

    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    const phone = window.CONFIG ? window.CONFIG.WHATSAPP_NUMBER : "5511999999999";
    const msg = encodeURIComponent("EU QUERO O PRESENTE!!! 🎁❤️");
    const waUrl = `https://wa.me/${phone}?text=${msg}`;

    this.launchConfetti();

    mainContainer.innerHTML = `
      <div class="max-w-2xl mx-auto bg-gradient-to-b from-rose-500 via-pink-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl relative overflow-hidden">
        
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>

        <div class="relative z-10 space-y-6">
          <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-widest uppercase text-white shadow-xs">
            🎉 PARABÉNS! VOCÊ CONSEGUIU! 🎉
          </span>

          <h1 class="text-3xl sm:text-5xl font-black tracking-tight">
            Você é incrível! ❤️
          </h1>

          <p class="text-rose-100 text-sm sm:text-lg max-w-md mx-auto leading-relaxed">
            Você atingiu mais de 80% de aproveitamento no Simulado da Prova de Histologia. Todo o seu esforço merece ser comemorado!
          </p>

          <div class="py-6">
            <div class="w-32 h-32 sm:w-40 sm:h-40 bg-white/20 backdrop-blur-md rounded-3xl mx-auto flex items-center justify-center text-7xl sm:text-8xl shadow-2xl border border-white/30 transform hover:rotate-6 transition duration-300 animate-bounce cursor-pointer">
              🎁
            </div>
            <p class="text-xs text-rose-100 font-semibold mt-4">Seu esforço merece uma recompensa ❤️</p>
          </div>

          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" 
            class="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl transform transition hover:-translate-y-1 active:translate-y-0">
            <span>🎁</span> QUERO MEU PRESENTE
          </a>

          <div class="pt-4">
            <button onclick="app.renderHome()" 
              class="text-xs font-bold text-white/80 hover:text-white underline">
              Voltar ao Painel Principal
            </button>
          </div>
        </div>

      </div>
    `;
  }

  launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#14b8a6'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        vy: Math.random() * 3 + 2,
        vx: Math.random() * 2 - 1,
        angle: Math.random() * 360,
        spin: Math.random() * 0.2 - 0.1
      });
    }

    let startTime = performance.now();

    function render(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.angle += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (now - startTime < 4500) {
        requestAnimationFrame(render);
      } else {
        canvas.remove();
      }
    }

    requestAnimationFrame(render);
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.app = new HistoZooApp();
});
