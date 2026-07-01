/*
 * Fichier fusionné automatiquement pour réduire le nombre de fichiers.
 * Contient : app.js puis interface.dynamique.js.
 */


;
/* ===== DEBUT: app.js ===== */
/* global QUIZ_QUESTIONS, USERS */

(function () {
  const els = {
    screenCode: document.getElementById("screenCode"),
    appContent: document.getElementById("appContent"),
    formCode: document.getElementById("formCode"),
    inputUsername: document.getElementById("inputUsername"),
    codeError: document.getElementById("codeError"),
    btnFreeTrial: document.getElementById("btnFreeTrial"),

    screenStart: document.getElementById("screenStart"),
    screenQuiz: document.getElementById("screenQuiz"),
    screenResult: document.getElementById("screenResult"),
    screenReview: document.getElementById("screenReview"),
    screenHistory: document.getElementById("screenHistory"),
    screenAdmin: document.getElementById("screenAdmin"),
    screenDictionary: document.getElementById("screenDictionary"),
    screenResumes: document.getElementById("screenResumes"),

    selectLevel: document.getElementById("selectLevel"),
    selectSubject: document.getElementById("selectSubject"),
    selectTopic: document.getElementById("selectTopic"),
    btnModeQuiz: document.getElementById("btnModeQuiz"),
    btnModeDE: document.getElementById("btnModeDE"),
    modeNormal: document.getElementById("modeNormal"),
    modeDE: document.getElementById("modeDE"),
    selectDETrack: document.getElementById("selectDETrack"),
    selectDESubject: document.getElementById("selectDESubject"),
    selectDETopic: document.getElementById("selectDETopic"),
    btnStart: document.getElementById("btnStart"),
    btnReset: document.getElementById("btnReset"),
    questionBankInfo: document.getElementById("questionBankInfo"),

    quizMeta: document.getElementById("quizMeta"),
    questionText: document.getElementById("questionText"),
    answers: document.getElementById("answers"),
    btnSkip: document.getElementById("btnSkip"),
    btnNext: document.getElementById("btnNext"),
    btnFinish: document.getElementById("btnFinish"),
    progressBar: document.getElementById("progressBar"),
    progressText: document.getElementById("progressText"),
    quizTimer: document.getElementById("quizTimer"),

    scoreText: document.getElementById("scoreText"),
    btnRetry: document.getElementById("btnRetry"),
    btnReview: document.getElementById("btnReview"),
    btnResultHistory: document.getElementById("btnResultHistory"),

    reviewList: document.getElementById("reviewList"),
    btnBackToStart: document.getElementById("btnBackToStart"),

    btnOpenSettings: document.getElementById("btnOpenSettings"),
    settingsDialog: document.getElementById("settingsDialog"),
    inputStudentName: document.getElementById("inputStudentName"),
    toggleShuffle: document.getElementById("toggleShuffle"),
    btnSaveSettings: document.getElementById("btnSaveSettings"),
    btnLogout: document.getElementById("btnLogout"),
    btnHome: document.getElementById("btnHome"),
    btnBack: document.getElementById("btnBack"),
    btnHomeQuiz: document.getElementById("btnHomeQuiz"),
    btnHistory: document.getElementById("btnHistory"),
    currentUser: document.getElementById("currentUser"),
    btnAdmin: document.getElementById("btnAdmin"),
    adminLogs: document.getElementById("adminLogs"),
    btnBackToStartFromAdmin: document.getElementById("btnBackToStartFromAdmin"),
    btnBackToStartFromHistory: document.getElementById("btnBackToStartFromHistory"),
    historyContent: document.getElementById("historyContent"),

    btnDictionary: document.getElementById("btnDictionary"),
    btnBackToStartFromDictionary: document.getElementById("btnBackToStartFromDictionary"),
    inputDictionarySearch: document.getElementById("inputDictionarySearch"),
    dictionaryList: document.getElementById("dictionaryList"),

    btnResumes: document.getElementById("btnResumes"),
    btnBackToStartFromResumes: document.getElementById("btnBackToStartFromResumes"),
    selectResumeLevel: document.getElementById("selectResumeLevel"),
    selectResumeSubject: document.getElementById("selectResumeSubject"),
    selectResumeTitle: document.getElementById("selectResumeTitle"),
    resumeView: document.getElementById("resumeView"),
  };

  const STORAGE_KEYS = {
    settings: "quizRevision.settings.v1",
    last: "quizRevision.lastSession.v1",
    user: "quizRevision.user.v1",
    lastResult: "quizRevision.lastResult.v1",
    history: "quizRevision.history.v1",
    sessionToken: "quizRevision.sessionToken.v1",
    deviceId: "quizRevision.deviceId.v1",
    appSettings: "quizRevision.appSettings.v1",
    adminCache: "quizRevision.adminCache.v1",
  };

  const FREE_TRIAL_USER = "__ESSAI_GRATUIT__";
  const FREE_TRIAL_LEVEL = "Essai gratuit";
  const FREE_TRIAL_SUBJECT = "Sujet d’essai gratuit";
  const FREE_TRIAL_TOPIC = "Sujet essai";
  const FREE_TRIAL_BLOCK_MESSAGE =
    "Veuillez disposer d’un compte personnel pour accéder à tous les quiz ainsi qu’aux corrections expliquées.\n" +
    "Merci de contacter les administrateurs au +225 0708190886 / +225 0709282169 pour obtenir votre compte personnel.";

  // Sécurité essai gratuit : garder aussi un état mémoire.
  // Ainsi l'affichage ne retombe pas à 0 si le navigateur tarde à relire localStorage
  // ou si une ancienne session a laissé les sélecteurs sur un autre niveau.
  let freeTrialSessionActive = false;

  const FREE_TRIAL_QUESTIONS = [
    {
      id: "essai-gratuit-1",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quel est le signe principal de la fièvre ?",
      choices: ["Température élevée", "Peau toujours froide", "Absence de pouls", "Vision trouble uniquement"],
      answerIndex: 0,
      explanation: "La fièvre correspond à une élévation anormale de la température corporelle."
    },
    {
      id: "essai-gratuit-2",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quel geste est prioritaire avant de faire un pansement ?",
      choices: ["Se laver ou se désinfecter les mains", "Toucher directement la plaie", "Réutiliser une compresse sale", "Souffler sur la plaie"],
      answerIndex: 0,
      explanation: "L’hygiène des mains réduit le risque de contamination de la plaie."
    },
    {
      id: "essai-gratuit-3",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "tf",
      question: "Une mauvaise hydratation peut entraîner une fatigue et une sécheresse des muqueuses.",
      answer: true,
      explanation: "La déshydratation peut provoquer fatigue, soif, sécheresse buccale et diminution des urines."
    },
    {
      id: "essai-gratuit-4",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quel est le rôle principal d’un antiseptique ?",
      choices: ["Détruire ou réduire les microbes", "Augmenter le saignement", "Remplacer l’eau de boisson", "Endormir le patient"],
      answerIndex: 0,
      explanation: "Un antiseptique sert à réduire ou éliminer les micro-organismes sur les tissus vivants."
    },
    {
      id: "essai-gratuit-5",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quel élément est indispensable pour prendre la température ?",
      choices: ["Un thermomètre", "Un tensiomètre", "Une seringue", "Une bande plâtrée"],
      answerIndex: 0,
      explanation: "Le thermomètre est l’instrument utilisé pour mesurer la température corporelle."
    },
    {
      id: "essai-gratuit-6",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quelle est la fréquence normale du lavage des mains en milieu de soins ?",
      choices: ["Avant et après chaque soin", "Une fois par jour", "Seulement si les mains sont sales", "Uniquement avant les repas"],
      answerIndex: 0,
      explanation: "Le lavage ou la désinfection des mains doit être réalisé avant et après chaque soin."
    },
    {
      id: "essai-gratuit-7",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "tf",
      question: "Le port des gants peut aider à prévenir certaines infections.",
      answer: true,
      explanation: "Les gants réduisent le risque de transmission des microbes pendant les soins."
    },
    {
      id: "essai-gratuit-8",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quel organe permet principalement la respiration ?",
      choices: ["Les poumons", "Le foie", "Les reins", "L’estomac"],
      answerIndex: 0,
      explanation: "Les poumons assurent les échanges gazeux nécessaires à la respiration."
    },
    {
      id: "essai-gratuit-9",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quelle est la position recommandée pour un patient en difficulté respiratoire ?",
      choices: ["Position semi-assise", "Position couchée à plat ventre", "Position tête en bas", "Position debout sans appui"],
      answerIndex: 0,
      explanation: "La position semi-assise facilite généralement la respiration."
    },
    {
      id: "essai-gratuit-10",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "tf",
      question: "Une douleur intense doit être signalée rapidement au personnel soignant.",
      answer: true,
      explanation: "Toute douleur importante doit être évaluée et prise en charge rapidement."
    },
    {
      id: "essai-gratuit-11",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quel appareil permet de mesurer la tension artérielle ?",
      choices: ["Le tensiomètre", "Le thermomètre", "Le stéthoscope seul", "Le glucomètre"],
      answerIndex: 0,
      explanation: "Le tensiomètre est utilisé pour mesurer la pression artérielle."
    },
    {
      id: "essai-gratuit-12",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quel est le premier réflexe devant un saignement important ?",
      choices: ["Comprimer la plaie", "Donner à boire", "Faire marcher le patient", "Appliquer du parfum"],
      answerIndex: 0,
      explanation: "La compression permet de limiter la perte de sang."
    },
    {
      id: "essai-gratuit-13",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "tf",
      question: "La vaccination aide à prévenir certaines maladies infectieuses.",
      answer: true,
      explanation: "La vaccination protège contre plusieurs maladies graves."
    },
    {
      id: "essai-gratuit-14",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quel est le signe fréquent d’une hypoglycémie ?",
      choices: ["Sueurs et malaise", "Peau bleue uniquement", "Perte des cheveux", "Douleur au genou uniquement"],
      answerIndex: 0,
      explanation: "Une hypoglycémie peut provoquer des sueurs, tremblements et malaises."
    },
    {
      id: "essai-gratuit-15",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Pourquoi faut-il respecter les horaires des médicaments ?",
      choices: ["Pour assurer leur efficacité", "Pour décorer le dossier", "Pour fatiguer le patient", "Sans raison particulière"],
      answerIndex: 0,
      explanation: "Le respect des horaires permet une meilleure efficacité du traitement."
    },
    {
      id: "essai-gratuit-16",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quel signe peut évoquer une déshydratation chez un enfant ?",
      choices: ["Bouche sèche et soif intense", "Cheveux qui poussent vite", "Vision meilleure", "Appétit toujours augmenté"],
      answerIndex: 0,
      explanation: "La bouche sèche, la soif, les yeux creux et la diminution des urines peuvent évoquer une déshydratation."
    },
    {
      id: "essai-gratuit-17",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "tf",
      question: "Il faut vérifier l'identité du patient avant d'administrer un soin.",
      answer: true,
      explanation: "L'identification du patient évite les erreurs de soin et sécurise la prise en charge."
    },
    {
      id: "essai-gratuit-18",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quel matériel sert à écouter les bruits du cœur et des poumons ?",
      choices: ["Le stéthoscope", "Le garrot", "Le thermomètre", "Le pansement"],
      answerIndex: 0,
      explanation: "Le stéthoscope permet l'auscultation cardiaque et pulmonaire."
    },
    {
      id: "essai-gratuit-19",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "mcq",
      question: "Quelle conduite est correcte devant une plaie sale ?",
      choices: ["Nettoyer selon les règles d'asepsie", "Couvrir sans regarder", "Mettre du sable", "Gratter avec les doigts"],
      answerIndex: 0,
      explanation: "Une plaie sale doit être prise en charge avec une hygiène rigoureuse et du matériel propre ou stérile selon le contexte."
    },
    {
      id: "essai-gratuit-20",
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      type: "tf",
      question: "La confidentialité des informations du patient doit être respectée.",
      answer: true,
      explanation: "Le secret professionnel et la confidentialité protègent le patient et font partie de l'éthique des soins."
    }
  ];

  const DEFAULT_APP_SETTINGS = {
    shuffleQuestions: true,
    shuffleAnswers: false,
    instantCorrection: false,
    finalScore: true,
    negativePoints: true,
    qpqMode: true,
    photoRequired: false,
    cheatDetection: false,
    notifyCheat: false,
    antiScreenshot: false,
    antiTabChange: false,
    antiCopyPaste: false,
    maxWarnings: 3,
    autoPenalty: false,
    autoSubmitCheat: false,
    questionTime: 40,
    quizTotalTime: "",
    freeTrialQuestions: 20,
    freeTrialDuration: "",
    freeTrialMaxAttempts: 1,
    autoBackup: false,
    serverSync: false,
    keepAlive: false,
    customQuestions: [],
    deletedQuestionIds: [],
    customCatalog: { levels: [], subjectsByLevel: {}, topicsByLevelSubject: {} }
  };

  let appSettings = { ...DEFAULT_APP_SETTINGS };

  function toBool(value, fallback = false) {
    if (typeof value === "boolean") return value;
    if (value === "true") return true;
    if (value === "false") return false;
    return fallback;
  }

  function toPositiveNumber(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  }


  function normalizeCustomCatalog(raw = {}) {
    const catalog = raw && typeof raw === "object" ? raw : {};
    const clean = (v) => safeText(v).trim();
    const unique = (arr) => Array.from(new Set((arr || []).map(clean).filter(Boolean)));
    const out = { levels: unique(catalog.levels || []), subjectsByLevel: {}, topicsByLevelSubject: {} };
    const subjectsByLevel = catalog.subjectsByLevel && typeof catalog.subjectsByLevel === "object" ? catalog.subjectsByLevel : {};
    for (const [level, subjects] of Object.entries(subjectsByLevel)) {
      const lv = clean(level);
      if (!lv) continue;
      out.subjectsByLevel[lv] = unique(subjects);
      if (!out.levels.includes(lv)) out.levels.push(lv);
    }
    const topicsMap = catalog.topicsByLevelSubject && typeof catalog.topicsByLevelSubject === "object" ? catalog.topicsByLevelSubject : {};
    for (const [level, bySubject] of Object.entries(topicsMap)) {
      const lv = clean(level);
      if (!lv || !bySubject || typeof bySubject !== "object") continue;
      out.topicsByLevelSubject[lv] = {};
      if (!out.levels.includes(lv)) out.levels.push(lv);
      for (const [subject, topics] of Object.entries(bySubject)) {
        const sub = clean(subject);
        if (!sub) continue;
        out.topicsByLevelSubject[lv][sub] = unique(topics);
        out.subjectsByLevel[lv] = unique([...(out.subjectsByLevel[lv] || []), sub]);
      }
    }
    out.levels.sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
    return out;
  }

  function normalizeAppSettings(raw = {}) {
    const merged = { ...DEFAULT_APP_SETTINGS, ...(raw || {}) };
    return {
      ...merged,
      shuffleQuestions: toBool(merged.shuffleQuestions, true),
      shuffleAnswers: toBool(merged.shuffleAnswers, false),
      instantCorrection: toBool(merged.instantCorrection, false),
      finalScore: toBool(merged.finalScore, true),
      negativePoints: toBool(merged.negativePoints, true),
      // Le bouton Mode QPQ n'est plus affiché dans l'administration.
      // On garde la valeur interne pour compatibilité avec les anciens paramètres.
      qpqMode: toBool(merged.qpqMode, true),
      photoRequired: toBool(merged.photoRequired, false),
      cheatDetection: toBool(merged.cheatDetection, false),
      notifyCheat: toBool(merged.notifyCheat, false),
      antiScreenshot: toBool(merged.antiScreenshot, false),
      antiTabChange: toBool(merged.antiTabChange, false),
      antiCopyPaste: toBool(merged.antiCopyPaste, false),
      maxWarnings: Math.max(1, Math.floor(toPositiveNumber(merged.maxWarnings, 3))),
      autoPenalty: toBool(merged.autoPenalty, false),
      autoSubmitCheat: toBool(merged.autoSubmitCheat, false),
      questionTime: toPositiveNumber(merged.questionTime, 40),
      freeTrialQuestions: Math.max(20, Math.floor(toPositiveNumber(merged.freeTrialQuestions, 20))),
      freeTrialMaxAttempts: Math.max(1, Math.floor(toPositiveNumber(merged.freeTrialMaxAttempts, 1))),
      customQuestions: Array.isArray(merged.customQuestions) ? merged.customQuestions : [],
      deletedQuestionIds: Array.isArray(merged.deletedQuestionIds) ? merged.deletedQuestionIds.map(String) : [],
      customCatalog: normalizeCustomCatalog(merged.customCatalog)
    };
  }

  async function loadAppSettingsFromServer() {
    try {
      const data = await apiGet('/api/settings');
      appSettings = normalizeAppSettings(data.settings || {});
      localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
    } catch (_) {
      try {
        appSettings = normalizeAppSettings(JSON.parse(localStorage.getItem(STORAGE_KEYS.appSettings) || '{}'));
      } catch {
        appSettings = normalizeAppSettings({});
      }
    }
    applyRuntimeSettings();
    return appSettings;
  }

  function shouldAutoAdvance() {
    return appSettings.qpqMode !== false;
  }

  function applyRuntimeSettings() {
    document.body?.classList.toggle('anti-screenshot-enabled', !!appSettings.antiScreenshot);
    document.body?.classList.toggle('copy-blocked', !!appSettings.antiCopyPaste);
  }

  function getFocusLossAntiCheatReason() {
    const activeOptions = [];
    if (appSettings.antiTabChange) activeOptions.push('Anti changement d’onglet ou réduction');
    if (appSettings.antiScreenshot) activeOptions.push('Anti capture d’écran');
    if (appSettings.antiCopyPaste) activeOptions.push('Anti copier/coller');
    const suffix = activeOptions.length ? ` (${activeOptions.join(', ')})` : '';
    return `Perte de focus : changement d’onglet, réduction ou sortie de la page${suffix}`;
  }

  function shouldAutoSubmitOnFocusLoss() {
    return !!(appSettings.cheatDetection && (appSettings.antiTabChange || appSettings.antiScreenshot || appSettings.antiCopyPaste));
  }

  function captureQuizScreenshotDataUrl() {
    return new Promise((resolve) => {
      try {
        const target = els.screenQuiz;
        if (!target || target.classList.contains('hidden')) return resolve('');

        const rect = target.getBoundingClientRect();
        const width = Math.max(320, Math.ceil(rect.width || target.scrollWidth || window.innerWidth || 320));
        const height = Math.max(240, Math.ceil(Math.min(target.scrollHeight || rect.height || window.innerHeight || 240, 1400)));
        const clone = target.cloneNode(true);

        const sourceFields = target.querySelectorAll('input, textarea, select');
        const cloneFields = clone.querySelectorAll('input, textarea, select');
        cloneFields.forEach((field, index) => {
          const original = sourceFields[index];
          if (!original) return;
          if (field.tagName === 'TEXTAREA') field.textContent = original.value || '';
          else if (field.tagName === 'SELECT') {
            Array.from(field.options || []).forEach((option) => { option.selected = option.value === original.value; });
          } else {
            field.setAttribute('value', original.value || '');
            if (original.checked) field.setAttribute('checked', 'checked');
            else field.removeAttribute('checked');
          }
        });

        clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
        clone.style.width = `${width}px`;
        clone.style.minHeight = `${height}px`;
        clone.style.margin = '0';
        clone.style.background = '#ffffff';
        clone.style.color = '#111827';
        clone.style.boxSizing = 'border-box';

        let cssText = '';
        try {
          cssText = Array.from(document.styleSheets).map((sheet) => {
            try { return Array.from(sheet.cssRules || []).map((rule) => rule.cssText || '').join('\n'); }
            catch (_) { return ''; }
          }).join('\n');
        } catch (_) { cssText = ''; }

        const serialized = new XMLSerializer().serializeToString(clone);
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${cssText}</style>${serialized}</div></foreignObject></svg>`;
        const img = new Image();
        const timeout = setTimeout(() => resolve(''), 1200);
        img.onload = () => {
          clearTimeout(timeout);
          try {
            const maxWidth = 900;
            const maxHeight = 1200;
            const scale = Math.min(1, maxWidth / width, maxHeight / height);
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(width * scale));
            canvas.height = Math.max(1, Math.round(height * scale));
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.55);
            resolve(dataUrl.length < 1800000 ? dataUrl : '');
          } catch (_) {
            resolve('');
          }
        };
        img.onerror = () => {
          clearTimeout(timeout);
          resolve('');
        };
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      } catch (_) {
        resolve('');
      }
    });
  }

  async function autoSubmitCurrentScoreAfterCheat(attempt) {
    if (!attempt || session.autoCheatSubmitted || session.autoCheatSubmitPending) return;
    session.autoCheatSubmitPending = true;
    const screenshotDataUrl = await captureQuizScreenshotDataUrl();
    const result = computeScore();
    const note20 = formatNoteSur20(getNoteSur20(result));
    session.autoCheatSubmitted = {
      at: attempt.at,
      reason: attempt.reason,
      correct: result.correct,
      answered: result.answered,
      total: result.total,
      score: result.score,
      note20,
      screenshotCaptured: !!screenshotDataUrl
    };
    session.autoCheatSubmitPending = false;

    const user = localStorage.getItem(STORAGE_KEYS.user);
    logActivity(user, 'auto_submit_cheat', {
      reason: attempt.reason,
      at: attempt.at,
      correct: result.correct,
      answered: result.answered,
      total: result.total,
      score: result.score,
      note20,
      autoSubmit: true,
      screenshotCaptured: !!screenshotDataUrl,
      screenshot: screenshotDataUrl || undefined
    });
  }

  function recordCheatAttempt(reason, options = {}) {
    if (!appSettings.cheatDetection) return;
    if (!session || !Array.isArray(session.questions) || !session.questions.length) return;
    if (!els.screenQuiz || els.screenQuiz.classList.contains('hidden')) return;
    if (!session.startedAt) return;

    const now = Date.now();
    // Évite les faux positifs au moment exact où l'écran du quiz s'ouvre.
    if (now - session.startedAt < 1500) return;

    session.cheatAttempts = Array.isArray(session.cheatAttempts) ? session.cheatAttempts : [];
    const previousAttempt = session.cheatAttempts[session.cheatAttempts.length - 1];
    if (!options.allowDuplicate && previousAttempt && now - previousAttempt.at < 900) return;

    const attempt = { at: now, reason: reason || 'Tentative de tricherie' };
    session.cheatAttempts.push(attempt);
    session.cheatWarning = attempt;

    // Principe demandé : on laisse l'élève continuer le quiz, mais les réponses
    // données après la première tentative détectée ne comptent plus dans la note.
    if (!session.cheatLockedAt) {
      session.cheatLockedAt = now;
      session.cheatSubmissionReason = attempt.reason;
      autoSubmitCurrentScoreAfterCheat(attempt);
    }

    const user = localStorage.getItem(STORAGE_KEYS.user);
    logActivity(user, 'cheat_attempt', { reason: attempt.reason, count: session.cheatAttempts.length, at: attempt.at });
  }

  function saveAnswerForCurrentQuestion(q, answer) {
    if (!q || !q.id) return;
    session.answersById = session.answersById || {};
    session.answersById[q.id] = { ...answer, answeredAt: Date.now() };
  }

  async function ensureQuizPhotoAllowed() {
    if (!appSettings.photoRequired) return true;
    if (window.__PHOTO_CHECK_OPEN) return false;
    window.__PHOTO_CHECK_OPEN = true;

    return await new Promise((resolve) => {
      let stream = null;
      let done = false;

      const close = (ok) => {
        if (done) return;
        done = true;
        try {
          if (stream) stream.getTracks().forEach(track => track.stop());
        } catch (_) {}
        overlay.remove();
        window.__PHOTO_CHECK_OPEN = false;
        resolve(!!ok);
      };

      const overlay = document.createElement('div');
      overlay.className = 'camera-check-overlay';
      overlay.innerHTML = `
        <div class="camera-check-box">
          <h3 class="camera-check-title">Prise de vue obligatoire avant quiz</h3>
          <p class="camera-check-instruction">Veuillez activer votre caméra puis prendre une photo de vous pour commencer le quiz.</p>
          <video class="camera-check-video" autoplay playsinline muted></video>
          <canvas class="camera-check-canvas hidden"></canvas>
          <div class="camera-check-actions">
            <button class="btn btn--primary camera-action-btn" type="button" data-action="start-camera">Activer la caméra</button>
            <button class="btn btn--primary camera-action-btn hidden" type="button" data-action="capture">Prendre la photo</button>
            <button class="btn camera-action-btn hidden" type="button" data-action="retake">Reprendre</button>
            <button class="btn camera-cancel-btn" type="button" data-action="cancel">Annuler</button>
          </div>
          <div class="camera-check-status"></div>
        </div>`;
      document.body.appendChild(overlay);

      const video = overlay.querySelector('video');
      const canvas = overlay.querySelector('canvas');
      const status = overlay.querySelector('.camera-check-status');
      const btnStart = overlay.querySelector('[data-action="start-camera"]');
      const btnCapture = overlay.querySelector('[data-action="capture"]');
      const btnRetake = overlay.querySelector('[data-action="retake"]');
      const setStatus = (msg) => { if (status) status.textContent = msg || ''; };

      const startCamera = async () => {
        try {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setStatus('Caméra non disponible sur ce navigateur. La prise de vue obligatoire nécessite un navigateur compatible.');
            return;
          }
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
          video.srcObject = stream;
          video.classList.remove('hidden');
          canvas.classList.add('hidden');
          btnStart.classList.add('hidden');
          btnCapture.classList.remove('hidden');
          btnRetake.classList.add('hidden');
          setStatus('Caméra activée. Cliquez sur « Prendre la photo ».');
        } catch (e) {
          setStatus('Accès caméra refusé ou indisponible. Autorisez la caméra pour commencer le quiz.');
        }
      };

      const capturePhoto = () => {
        const width = video.videoWidth || 640;
        const height = video.videoHeight || 480;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        session.quizPhotoTakenAt = Date.now();
        session.quizPhotoDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        video.classList.add('hidden');
        canvas.classList.remove('hidden');
        btnCapture.classList.add('hidden');
        btnRetake.classList.remove('hidden');
        setStatus('Photo prise. Le quiz démarre automatiquement.');
        close(true);
      };

      overlay.addEventListener('click', (event) => {
        const action = event.target?.dataset?.action;
        if (!action) return;
        if (action === 'start-camera') startCamera();
        if (action === 'capture') capturePhoto();
        if (action === 'retake') startCamera();
        if (action === 'cancel') close(false);
      });
    });
  }

  function isFreeTrialUser(user = null) {
    let current = user;
    if (current === null || typeof current === "undefined") {
      try { current = localStorage.getItem(STORAGE_KEYS.user); } catch (_) { current = ""; }
    }
    return freeTrialSessionActive || current === FREE_TRIAL_USER;
  }

  function canUseOfflineMode() {
    return true;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function shouldRetryRequest(err) {
    // Correction mobile : sur certains téléphones/réseaux, le premier appel fetch peut
    // échouer brièvement ou recevoir une réponse 5xx pendant le réveil du mode local.
    // On réessaie uniquement les erreurs temporaires, jamais les refus métier (401/403/409).
    return !err.status || err.status === 408 || err.status === 425 || err.status === 429 || err.status >= 500;
  }

  function readLocalAdminCache() {
    const fallback = { loginLogs: [], activeSessions: {}, dynamicUsers: [], appSettings: {}, dashboard: { connectedUsers: 0, quizDone: 0 } };
    const cached = readJsonStorage(STORAGE_KEYS.adminCache, null);
    return cached && typeof cached === "object" ? { ...fallback, ...cached } : fallback;
  }

  function writeLocalAdminCache(cache) {
    writeJsonStorage(STORAGE_KEYS.adminCache, {
      ...readLocalAdminCache(),
      ...(cache || {}),
      savedAt: Date.now(),
    });
  }

  function cleanLocalCodePart(value, length) {
    return String(value || "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, length)
      .padEnd(length, "X");
  }

  function generateLocalUsername({ lastName, firstName, levels, phone }) {
    const levelText = Array.isArray(levels) ? levels[0] || "NA" : String(levels || "NA");
    const digits = String(phone || "").replace(/\D/g, "");
    return `${cleanLocalCodePart(lastName, 3)}${cleanLocalCodePart(firstName, 3)}${cleanLocalCodePart(levelText, 2)}${digits.slice(-4).padStart(4, "0")}`;
  }

  function staticUsersAsRows() {
    return Object.entries(window.USERS || {}).map(([username, cfg]) => ({
      username,
      full_name: cfg.full_name || cfg.fullName || `${cfg.last_name || cfg.lastName || cfg.nom || ""} ${cfg.first_name || cfg.firstName || cfg.prenom || cfg.prénom || ""}`.trim(),
      first_name: cfg.first_name || cfg.firstName || cfg.prenom || cfg.prénom || "",
      last_name: cfg.last_name || cfg.lastName || cfg.nom || "",
      phone: cfg.phone || "",
      levels: cfg.levels === "all" ? ["Tous les niveaux"] : normalizeAccountLevels(cfg.levels || (cfg.niveau ? [cfg.niveau] : [])),
      suspended: !!cfg.suspended,
      source: cfg.dynamic ? "local" : "codes",
      dynamic: !!cfg.dynamic,
    }));
  }

  function cachedUsersAsRows() {
    return (readLocalAdminCache().dynamicUsers || []).filter(Boolean).map((u) => ({
      ...u,
      username: u.username || u.user || u.id || "",
      full_name: u.full_name || u.fullName || `${u.last_name || u.lastName || ""} ${u.first_name || u.firstName || ""}`.trim(),
      first_name: u.first_name || u.firstName || "",
      last_name: u.last_name || u.lastName || "",
      levels: Array.isArray(u.levels) ? u.levels : normalizeAccountLevels(u.levels || []),
      suspended: !!u.suspended,
      source: u.source || "local",
      dynamic: true,
    })).filter((u) => u.username && !u.deleted);
  }

  function mergeLocalUserRows(extraRows = []) {
    const map = new Map();
    [...staticUsersAsRows(), ...cachedUsersAsRows(), ...(Array.isArray(extraRows) ? extraRows : [])].forEach((u) => {
      if (!u || !u.username || u.deleted) return;
      map.set(u.username, { ...(map.get(u.username) || {}), ...u });
    });
    return Array.from(map.values()).sort((a, b) => String(a.username).localeCompare(String(b.username)));
  }

  function saveLocalDynamicUser(user) {
    if (!user || !user.username) return;
    const cache = readLocalAdminCache();
    const rows = (cache.dynamicUsers || []).filter((u) => u && u.username !== (user.oldUsername || user.username));
    rows.push({ ...user, dynamic: true, source: "local" });
    writeLocalAdminCache({ ...cache, dynamicUsers: rows });
    window.USERS = window.USERS || {};
    window.USERS[user.username] = {
      levels: Array.isArray(user.levels) ? user.levels : [],
      suspended: !!user.suspended,
      dynamic: true,
      source: "local",
      full_name: user.full_name || user.fullName || "",
      first_name: user.first_name || user.firstName || "",
      last_name: user.last_name || user.lastName || "",
      phone: user.phone || "",
    };
  }

  function localApiError(message, status = 400) {
    const err = new Error(message);
    err.status = status;
    err.data = { ok: false, error: message };
    throw err;
  }

  async function apiPost(path, payload = {}) {
    const cache = readLocalAdminCache();
    if (path === "/api/activity") {
      const logs = Array.isArray(cache.loginLogs) ? cache.loginLogs : [];
      logs.push({ id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`, timestamp: Date.now(), username: payload.username || "", action: payload.action || "activity", details: payload.details || {}, device: payload.device || {} });
      writeLocalAdminCache({ loginLogs: logs.slice(-5000), dashboard: { ...(cache.dashboard || {}), quizDone: logs.filter(l => l.action === "finish_quiz").length } });
      return { ok: true, localOnly: true };
    }
    if (path === "/api/check-session") {
      const username = String(payload.username || "").trim();
      const cfg = getLocalUserConfig(username)?.config || null;
      return { ok: true, loggedIn: !!cfg, forceLogout: false, userConfig: cfg, localOnly: true };
    }
    if (path === "/api/logout") return { ok: true, localOnly: true };
    if (path === "/api/admin/logs" || path === "/api/admin/all-users") {
      return { ok: true, activeSessions: {}, loginLogs: cache.loginLogs || [], dynamicUsers: mergeLocalUserRows(), appSettings: readJsonStorage(STORAGE_KEYS.appSettings, {}) || {}, dashboard: cache.dashboard || { connectedUsers: 0, quizDone: 0 }, storage: "navigateur local" };
    }
    if (path === "/api/admin/create-user") {
      const levels = normalizeAccountLevels(Array.isArray(payload.levels) ? payload.levels.filter(Boolean) : []);
      if (!levels.length) localApiError("Veuillez cocher au moins un niveau valide.");
      const generated = generateLocalUsername({ lastName: payload.lastName, firstName: payload.firstName, levels, phone: payload.phone });
      const existing = new Set(mergeLocalUserRows().map((u) => u.username));
      let username = generated;
      let i = 1;
      while (existing.has(username)) username = `${generated}${i++}`;
      const fullName = `${payload.lastName || ""} ${payload.firstName || ""}`.trim();
      const userConfig = { username, levels, suspended: false, dynamic: true, source: "local", full_name: fullName, first_name: payload.firstName || "", last_name: payload.lastName || "", phone: payload.phone || "" };
      saveLocalDynamicUser(userConfig);
      return { ok: true, username, levels, userConfig, storage: "navigateur local" };
    }
    if (path === "/api/admin/update-user") {
      const action = payload.action || "";
      const targetUser = payload.targetUser || "";
      if (!targetUser) localApiError("Utilisateur cible manquant.");
      const rows = mergeLocalUserRows();
      const current = rows.find((u) => u.username === targetUser) || { username: targetUser };
      if (action === "delete") {
        const cacheNow = readLocalAdminCache();
        writeLocalAdminCache({ dynamicUsers: (cacheNow.dynamicUsers || []).filter((u) => u.username !== targetUser) });
        if (window.USERS) delete window.USERS[targetUser];
        return { ok: true, deleted: true };
      }
      const updated = { ...current };
      if (action === "suspend") updated.suspended = true;
      if (action === "reactivate") updated.suspended = false;
      if (action === "editProfile") {
        updated.last_name = payload.lastName || "";
        updated.first_name = payload.firstName || "";
        updated.phone = payload.phone || "";
        updated.full_name = `${updated.last_name} ${updated.first_name}`.trim();
        updated.levels = normalizeAccountLevels(Array.isArray(payload.levels) ? payload.levels : []);
      }
      saveLocalDynamicUser(updated);
      return { ok: true, username: updated.username, levels: updated.levels || [], user: updated, userConfig: window.USERS?.[updated.username] || {} };
    }
    if (path === "/api/admin/force-logout" || path === "/api/admin/disconnect-all") return { ok: true, disconnected: 0, localOnly: true };
    if (path === "/api/admin/save-settings") {
      const settings = normalizeAppSettings(payload.settings || {});
      localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(settings));
      writeLocalAdminCache({ appSettings: settings });
      return { ok: true, settings, storage: "navigateur local" };
    }
    if (path === "/api/admin/sync-github") localApiError("Mode local : la synchronisation GitHub nécessite un serveur.", 501);
    return { ok: true, localOnly: true };
  }

  async function apiGet(path) {
    if (path === "/api/settings") return { ok: true, settings: readJsonStorage(STORAGE_KEYS.appSettings, {}) || {}, localOnly: true };
    if (path === "/api/health") return { ok: true, mode: "local", storage: "navigateur", githubSync: false };
    return { ok: true, localOnly: true };
  }

  function getSessionToken() {
    let token = localStorage.getItem(STORAGE_KEYS.sessionToken);
    if (!token) {
      token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(STORAGE_KEYS.sessionToken, token);
    }
    return token;
  }

  function getDeviceId() {
    let id = localStorage.getItem(STORAGE_KEYS.deviceId);
    if (!id) {
      id = `dev-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(STORAGE_KEYS.deviceId, id);
    }
    return id;
  }

  function detectBrowser() {
    const ua = navigator.userAgent || "";
    if (ua.includes("Edg/")) return "Microsoft Edge";
    if (ua.includes("Firefox/")) return "Firefox";
    if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
    if (ua.includes("Chrome/")) return "Chrome";
    if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
    return "Navigateur inconnu";
  }

  function getDeviceInfo() {
    const platform = navigator.platform || "Appareil inconnu";
    const browser = detectBrowser();
    return {
      deviceId: getDeviceId(),
      browser,
      platform,
      userAgent: navigator.userAgent || "",
      language: navigator.language || "",
      online: navigator.onLine,
    };
  }

  function formatDate(ts) {
    return ts ? new Date(ts).toLocaleString('fr-FR') : "-";
  }

  function readJsonStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJsonStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function currentAuthPayload(extra = {}) {
    return {
      username: localStorage.getItem(STORAGE_KEYS.user) || "",
      sessionToken: localStorage.getItem(STORAGE_KEYS.sessionToken) || "",
      device: getDeviceInfo(),
      ...extra,
    };
  }


  // Mode local : les comptes créés depuis l'administration sont conservés dans le navigateur.
  function getCachedDynamicUsersObject() {
    const out = {};
    try {
      const cache = readLocalAdminCache();
      (cache.dynamicUsers || []).forEach((u) => {
        const username = u && (u.username || u.user || u.id);
        if (!username || u.deleted) return;
        out[username] = {
          levels: Array.isArray(u.levels) ? u.levels : [],
          suspended: !!u.suspended,
          dynamic: true,
          source: 'local',
          full_name: u.full_name || u.fullName || '',
          first_name: u.first_name || u.firstName || '',
          last_name: u.last_name || u.lastName || '',
          phone: u.phone || '',
        };
      });
    } catch (_) {}
    return out;
  }

  // Mode local / site statique : la connexion se fait directement
  // avec les comptes présents dans codes.js ou créés dans ce navigateur.
  function findLocalUsername(input) {
    const key = normalizeKey(input || '');
    if (!key) return '';
    const sources = [
      window.USERS || {},
      window.UTILISATEURS_LOCAUX_INFOS || {},
      window.LOCAL_USER_INFOS || {},
      window.localUserInfos || {},
      getCachedDynamicUsersObject(),
    ];
    for (const source of sources) {
      if (!source || typeof source !== 'object') continue;
      for (const id of Object.keys(source)) {
        if (normalizeKey(id) === key) return id;
      }
    }
    if (Array.isArray(window.ADMINS)) {
      const admin = window.ADMINS.find((id) => normalizeKey(id) === key);
      if (admin) return admin;
    }
    return '';
  }

  function getLocalUserConfig(input) {
    const username = findLocalUsername(input);
    if (!username) return null;
    applyManualLocalUserInfo(username);
    return {
      username,
      config: (window.USERS && window.USERS[username]) || (window.UTILISATEURS_LOCAUX_INFOS && window.UTILISATEURS_LOCAUX_INFOS[username]) || getCachedDynamicUsersObject()[username] || {},
    };
  }

  async function logActivity(user, action, details = {}) {
    if (isFreeTrialUser(user)) return;
    try {
      await apiPost("/api/activity", {
        username: user,
        sessionToken: getSessionToken(),
        action,
        details,
        device: getDeviceInfo(),
      });
    } catch (e) {
      // On évite de bloquer le quiz si le journal d'activité ne peut pas être écrit.
      console.warn("Journal d'activité non enregistré:", e.message);
    }
  }

  function clearLocalLogin() {
    freeTrialSessionActive = false;
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.sessionToken);
  }

  async function checkCurrentSession() {
    const user = localStorage.getItem(STORAGE_KEYS.user);
    const token = localStorage.getItem(STORAGE_KEYS.sessionToken);
    if (isFreeTrialUser(user)) {
      return { loggedIn: true, forceLogout: false };
    }
    if (!user || !token) {
      // Sur GitHub Pages, il n'y a pas de session serveur : si le code existe
      // dans codes.js, on garde la connexion locale active.
      if (user && getLocalUserConfig(user)) {
        return { loggedIn: true, forceLogout: false, localStaticMode: true };
      }
      return { loggedIn: false, forceLogout: false };
    }
    try {
      const status = await apiPost("/api/check-session", { username: user, sessionToken: token, device: getDeviceInfo() });
      if (status.userConfig) {
        window.USERS = window.USERS || {};
        window.USERS[user] = status.userConfig;
      }
      // Ne plus déconnecter automatiquement les comptes créés localement / depuis le site
      // quand la session serveur n'est pas retrouvée ou quand l'appareil change.
      // Seule une déconnexion forcée par l'administrateur doit vraiment couper l'accès.
      if (status && status.forceLogout) return status;
      if (status && status.loggedIn === false) {
        return { ...status, loggedIn: true, forceLogout: false, localSessionMaintained: true };
      }
      return status;
    } catch {
      if (getLocalUserConfig(user)) {
        return { loggedIn: true, forceLogout: false, localStaticMode: true };
      }
      // Ne pas déconnecter automatiquement un compte créé sur le site si le serveur répond mal.
      return { loggedIn: true, forceLogout: false, pendingServerCheck: true };
    }
  }

  async function isAccessGranted() {
    const status = await checkCurrentSession();
    if (status.forceLogout) clearLocalLogin();
    return !!status.loggedIn && !status.forceLogout;
  }

  function startSessionHeartbeat(username) {
    // Mode local : aucune session serveur à surveiller.
    stopSessionHeartbeat();
  }

  function stopSessionHeartbeat() {
    if (heartbeatTimerId) {
      clearInterval(heartbeatTimerId);
      heartbeatTimerId = null;
    }
  }

  function releaseCurrentSession(action = 'logout') {
    // Mode local : rien à envoyer à un serveur.
  }

  async function grantAccess(username) {
    username = String(username || "").trim();
    const localAccount = username === FREE_TRIAL_USER ? null : getLocalUserConfig(username);
    if (localAccount) username = localAccount.username;
    applyManualLocalUserInfo(username);
    const freeTrial = username === FREE_TRIAL_USER || isFreeTrialUser(username);
    freeTrialSessionActive = freeTrial;
    if (!username) {
      const msg = "Veuillez entrer votre code avant de vous connecter.";
      if (els.codeError) {
        els.codeError.textContent = msg;
        els.codeError.style.display = "block";
      }
      alert(msg);
      return false;
    }

    if (!freeTrial) {
      // Connexion locale directe : aucune requête serveur n'est envoyée.
      // Les codes sont lus dans codes.js, ce qui fonctionne sur GitHub Pages.
      if (!localAccount) {
        const msg = "Code incorrect ou non autorisé. Vérifie le code saisi.";
        if (els.codeError) {
          els.codeError.textContent = msg;
          els.codeError.style.display = "block";
        }
        alert(msg);
        return false;
      }
      localStorage.setItem(STORAGE_KEYS.user, username);
      localStorage.removeItem(STORAGE_KEYS.sessionToken);
      stopSessionHeartbeat();
    }

    if (els.screenCode) els.screenCode.classList.add("hidden");
    document.body.classList.remove("qdash-login-view");
    document.body.classList.add("qdash-auth-view");
    if (els.appContent) els.appContent.classList.remove("hidden");

    if (els.currentUser) els.currentUser.textContent = freeTrial ? "Essai gratuit" : getUserDisplayName(username);

    if (els.btnModeQuiz) els.btnModeQuiz.style.display = "";

    if (freeTrial || !hasDEAccess()) {
      if (els.btnModeDE) els.btnModeDE.style.display = "none";
    } else {
      if (els.btnModeDE) els.btnModeDE.style.display = "";
    }

    if (freeTrial && els.btnOpenSettings) els.btnOpenSettings.style.display = "none";
    else if (els.btnOpenSettings) els.btnOpenSettings.style.display = "";
    // En mode essai gratuit, le bouton du dictionnaire reste visible.
    // Son ouverture est bloquée par un message explicatif.
    if (els.btnDictionary) els.btnDictionary.style.display = "";
    if (els.btnReset) els.btnReset.classList.add("hidden");

    // Version locale : tous les comptes connectés ont accès au menu Paramètres.
    // L'essai gratuit n'est pas un compte complet et ne voit pas ce menu.
    if (!freeTrial && els.btnAdmin) {
      els.btnAdmin.classList.remove("hidden");
    } else if (els.btnAdmin) {
      els.btnAdmin.classList.add("hidden");
    }
    return true;
  }

  function denyAccess(sendLogout = true) {
    if (sendLogout) releaseCurrentSession('logout');
    stopSessionHeartbeat();
    clearLocalLogin();
    if (els.screenCode) els.screenCode.classList.remove("hidden");
    document.body.classList.add("qdash-login-view");
    document.body.classList.remove("qdash-auth-view");
    if (els.appContent) els.appContent.classList.add("hidden");
    if (els.inputUsername) els.inputUsername.value = "";
    if (els.codeError) {
      els.codeError.style.display = "none";
      els.codeError.textContent = "";
    }
    if (els.currentUser) els.currentUser.textContent = "";
  }

  function normalizeAccountLevel(level) {
    const n = normalizeKey(level);
    if (n === normalizeKey("Auxiliaire 2 année") || n === normalizeKey("AUXI")) return "A2-Niveau moyen";
    if (n === normalizeKey("L3-Niveau Accompli INF/SFM")) return "L3-Niveau Accompli INF";
    if (n === normalizeKey("Licence 3 INF/SAG-M") || n === normalizeKey("INF/SAG-M")) return "L3-Niveau Accompli SF";
    return String(level || "").trim();
  }

  function normalizeAccountLevels(levels) {
    if (levels === "all") return "all";
    if (!Array.isArray(levels)) return [];
    const out = [];
    const seen = new Set();
    for (const level of levels) {
      const normalized = normalizeAccountLevel(level);
      if (!normalized) continue;
      const key = normalizeKey(normalized);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(normalized);
    }
    return out;
  }



  function normalizeManualLocalUserInfo(username) {
    const key = normalizeKey(username || '');
    const source = window.UTILISATEURS_LOCAUX_INFOS || window.LOCAL_USER_INFOS || window.localUserInfos || {};
    if (!key || !source || typeof source !== 'object') return null;

    let found = source[username] || null;
    if (!found) {
      for (const [id, value] of Object.entries(source)) {
        if (normalizeKey(id) === key) {
          found = value;
          break;
        }
      }
    }
    if (!found || typeof found !== 'object') return null;

    const lastName = String(found.nom || found.last_name || found.lastName || '').trim();
    const firstName = String(found.prenom || found.prénom || found.first_name || found.firstName || '').trim();
    const fullName = String(found.full_name || found.fullName || `${lastName} ${firstName}`.trim()).trim();
    const level = found.niveau || found.level || (Array.isArray(found.levels) ? found.levels[0] : '');
    const levels = Array.isArray(found.levels) ? found.levels : (level ? [level] : []);

    return {
      levels,
      first_name: firstName,
      firstName,
      last_name: lastName,
      lastName,
      full_name: fullName,
      fullName,
      source: 'local-manual',
      dynamic: true,
      localManual: true,
    };
  }

  function applyManualLocalUserInfo(username) {
    const info = normalizeManualLocalUserInfo(username);
    if (!info) return null;
    window.USERS = window.USERS || {};
    window.USERS[username] = { ...(window.USERS[username] || {}), ...info };
    return window.USERS[username];
  }

  function getUserDisplayName(username) {
    const cfg = applyManualLocalUserInfo(username) || (window.USERS && window.USERS[username]) || null;
    const first = String(cfg?.first_name || cfg?.firstName || '').trim();
    const last = String(cfg?.last_name || cfg?.lastName || '').trim();
    const full = String(cfg?.full_name || cfg?.fullName || `${last} ${first}`.trim()).trim();
    return full || username;
  }

  function getCurrentUserConfig() {
    const user = localStorage.getItem(STORAGE_KEYS.user);
    let cfg = applyManualLocalUserInfo(user) || window.USERS?.[user];

    // Correction locale : certains comptes créés en ligne ou en mode local peuvent
    // rester connectés quand le serveur est indisponible, mais ne pas encore être
    // réinjectés dans window.USERS. Dans ce cas, on récupère d'abord le cache admin
    // sauvegardé dans le navigateur afin que les listes Niveau / Matière / Sujet
    // restent sélectionnables dans « Commencer un quiz ».
    if (!cfg && user) {
      try {
        const cached = readJsonStorage(STORAGE_KEYS.adminCache, null);
        const dynamicUsers = Array.isArray(cached?.dynamicUsers) ? cached.dynamicUsers : [];
        const found = dynamicUsers.find((u) => normalizeKey(u.username || u.user || u.id || '') === normalizeKey(user));
        if (found) {
          cfg = {
            levels: found.levels || found.niveaux || found.level || found.niveau || [],
            first_name: found.first_name || found.firstName || found.prenom || found.prénom || '',
            last_name: found.last_name || found.lastName || found.nom || '',
            full_name: found.full_name || found.fullName || found.name || '',
            source: found.source || 'cache',
            dynamic: true,
          };
          window.USERS = window.USERS || {};
          window.USERS[user] = cfg;
        }
      } catch (_) {}
    }

    // Sécurité non destructive : si un utilisateur est déjà connecté localement mais
    // sans configuration retrouvée, on lui donne au minimum son niveau local A1 afin
    // que les listes déroulantes ne soient jamais vides. Les administrateurs gardent
    // leurs droits via window.ADMINS/window.USERS dès qu'ils sont disponibles.
    if (!cfg && user && !isFreeTrialUser(user)) {
      cfg = { levels: ['A1-Base Santé'], source: 'local-fallback' };
      window.USERS = window.USERS || {};
      window.USERS[user] = cfg;
    }

    if (cfg && cfg.level && !cfg.levels) cfg.levels = [cfg.level];
    if (cfg && cfg.niveau && !cfg.levels) cfg.levels = [cfg.niveau];
    if (cfg && cfg.levels === 'all') return cfg;
    if (cfg && Array.isArray(cfg.levels)) cfg.levels = normalizeAccountLevels(cfg.levels);
    return cfg;
  }

  function hasDEAccess() {
    const user = localStorage.getItem(STORAGE_KEYS.user);
    if (isFreeTrialUser(user)) return false;

    const isAdminUser = !!(
      user &&
      Array.isArray(window.ADMINS) &&
      window.ADMINS.some((admin) => normalizeKey(admin) === normalizeKey(user))
    );
    if (isAdminUser) return true;

    const userConfig = getCurrentUserConfig();
    if (!userConfig) return false;

    // Administrateurs / comptes avec accès total : voient le bouton EFF et tous les niveaux EFF.
    if (userConfig.levels === "all") return true;
    if (Array.isArray(userConfig.levels)) {
      const hasAll = userConfig.levels.some((lv) => {
        const n = normalizeKey(lv);
        return n === "all" || n === normalizeKey("Tous les niveaux");
      });
      if (hasAll) return true;
    }
    if (!Array.isArray(userConfig.levels)) return false;

    const levels = normalizeAccountLevels(userConfig.levels).map((lv) => normalizeKey(lv));
    return levels.includes(normalizeKey("A2-Niveau moyen")) ||
           levels.includes(normalizeKey("L3-Niveau Accompli INF")) ||
           levels.includes(normalizeKey("L3-Niveau Accompli SF"));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  async function renderAdminLogs(options = {}) {
    if (!els.adminLogs) return;
    const silent = !!options.silent;
    // Ne plus afficher "Chargement des paramètres..." à chaque action.
    // Le panneau reste visible pendant que les données se mettent à jour en arrière-plan.
    if (!silent && !els.adminLogs.dataset.rendered) {
      els.adminLogs.innerHTML = "";
    }

    let payload;
    let adminWarning = "";
    const cachedAdminPayload = readJsonStorage(STORAGE_KEYS.adminCache, null);
    try {
      payload = await Promise.race([
        apiPost("/api/admin/logs", currentAuthPayload()),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Le mode local met trop de temps à répondre. Le dernier affichage sauvegardé est utilisé.")), 15000))
      ]);
      if (payload && payload.ok !== false) {
        writeJsonStorage(STORAGE_KEYS.adminCache, {
          savedAt: Date.now(),
          loginLogs: payload.loginLogs || [],
          activeSessions: payload.activeSessions || {},
          dynamicUsers: payload.dynamicUsers || [],
          appSettings: payload.appSettings || {},
          dashboard: payload.dashboard || {}
        });
      }
    } catch (e) {
      adminWarning = e.data?.error || e.message || "Impossible de charger les données serveur. Le dernier affichage sauvegardé est utilisé.";
      payload = cachedAdminPayload || {
        loginLogs: [],
        activeSessions: {},
        dynamicUsers: [],
        appSettings: {},
        dashboard: { connectedUsers: 0, quizDone: 0 }
      };
    }

    async function refreshAdminUsersPayloadFromServer() {
      try {
        const usersPayload = await Promise.race([
          apiPost('/api/admin/all-users', currentAuthPayload()),
          new Promise((_, reject) => setTimeout(() => reject(new Error('chargement utilisateurs trop long')), 8000))
        ]);
        if (usersPayload && usersPayload.ok !== false) {
          payload.dynamicUsers = usersPayload.dynamicUsers || payload.dynamicUsers || [];
          payload.activeSessions = usersPayload.activeSessions || payload.activeSessions || {};
          payload.dashboard = { ...(payload.dashboard || {}), ...(usersPayload.dashboard || {}) };
          writeJsonStorage(STORAGE_KEYS.adminCache, {
            savedAt: Date.now(),
            loginLogs: payload.loginLogs || [],
            activeSessions: payload.activeSessions || {},
            dynamicUsers: payload.dynamicUsers || [],
            appSettings: payload.appSettings || {},
            dashboard: payload.dashboard || {}
          });
        }
      } catch (e) {
        console.warn('Liste complète des utilisateurs non rechargée:', e.message || e);
      }
    }

    await refreshAdminUsersPayloadFromServer();

    function normalizeUserRecord(username, user = {}) {
      const levels = user.levels === 'all' ? ['Tous les niveaux'] : (Array.isArray(user.levels) ? user.levels : []);
      const firstName = user.first_name || user.firstName || '';
      const lastName = user.last_name || user.lastName || '';
      const fullName = user.full_name || user.fullName || `${lastName} ${firstName}`.trim();
      return {
        ...user,
        username,
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
        phone: user.phone || '',
        levels,
        suspended: !!user.suspended,
        source: user.dynamic ? 'server' : (user.source || 'codes')
      };
    }

    function mergeAdminUsers(serverUsers = []) {
      const byUsername = new Map();
      Object.entries(window.USERS || {}).forEach(([username, user]) => {
        byUsername.set(username, normalizeUserRecord(username, user || {}));
      });
      (Array.isArray(serverUsers) ? serverUsers : []).forEach((user) => {
        const username = user.username || user.targetUser;
        if (!username) return;
        byUsername.set(username, { ...normalizeUserRecord(username, user), ...user, username });
      });
      return Array.from(byUsername.values()).sort((a, b) => String(a.username).localeCompare(String(b.username)));
    }

    const logs = payload.loginLogs || [];
    const active = payload.activeSessions || {};
    const activeRows = Object.values(active).sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0));
    let dynamicUsers = mergeAdminUsers(payload.dynamicUsers || []);
    appSettings = normalizeAppSettings(payload.appSettings || appSettings || {});
    localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
    const dashboard = payload.dashboard || { connectedUsers: activeRows.length, quizDone: logs.filter(l => l.action === 'finish_quiz').length };
    const allQuestionsForLevels = []
      .concat(Array.isArray(window.QUIZ_QUESTIONS) ? window.QUIZ_QUESTIONS : [])
      .concat(Array.isArray(window.QUIZ_QUESTIONS_QUIZ) ? window.QUIZ_QUESTIONS_QUIZ : [])
      .concat(Array.isArray(window.QUIZ_QUESTIONS_DE) ? window.QUIZ_QUESTIONS_DE : []);
    const defaultLevels = ["A1-Base Santé", "A2-Niveau moyen", "INF/SAG-M", "AUXI", "L1-Niveau Émergent", "L2-Niveau Ascendant", "L3-Niveau Accompli INF", "L3-Niveau Accompli SF"];
    const removedAccountLevels = new Set([
      normalizeKey("Auxiliaire 2 année"),
      normalizeKey("L3-Niveau Accompli INF/SFM"),
      normalizeKey("Licence 3 INF/SAG-M"),
    ]);
    const customAdminLevels = ((appSettings.customCatalog || {}).levels || []);
    const allLevels = Array.from(new Set(allQuestionsForLevels.map(q => q.level).filter(Boolean).concat(defaultLevels).concat(customAdminLevels)))
      .filter(level => !removedAccountLevels.has(normalizeKey(level)))
      .sort();

    els.adminLogs.dataset.rendered = "1";
    els.adminLogs.innerHTML = `
      ${adminWarning ? `<div class="notice" style="margin-bottom:12px"><strong>Information :</strong> ${escapeHtml(adminWarning)}<br><small>La gestion des quiz reste visible avec les dernières données sauvegardées dans ce navigateur.</small></div>` : ""}
      <div class="admin-tabs">
        <button class="btn btn--primary adminTabBtn" data-tab="quiz" type="button">📚 Gestion des quiz</button>
      </div>

      <div class="adminTab" data-panel="quiz">
        <div class="admin-box" data-quiz-subpanel="quiz-settings">
        <h3 class="h3">🧠 Paramètres des questions</h3>
        <div class="checkbox-grid adminSettings">
          ${[
            ['shuffleQuestions','Mélanger les questions'],
            ['shuffleAnswers','Mélanger les réponses'],
            ['instantCorrection','Afficher correction immédiatement'],
            ['finalScore','Afficher note finale'],
            ['negativePoints','Points négatifs'],
            ['photoRequired','Prise de vue obligatoire avant quiz'],
            ['cheatDetection','Gestion tentatives de tricherie']
          ].map(([k,label]) => `<label><input type="checkbox" data-setting="${k}" ${appSettings[k] ? 'checked' : ''}> ${label}</label>`).join('')}
        </div>
        <div class="checkbox-grid adminSettings cheat-options ${appSettings.cheatDetection ? '' : 'hidden'}" id="cheatOptionsPanel">
          ${[
            ['notifyCheat','Recevoir notification/appel'],
            ['antiScreenshot','Anti capture d’écran'],
            ['antiTabChange','Anti changement d’onglet ou réduction'],
            ['antiCopyPaste','Anti copier/coller'],
            ['autoPenalty','Pénalité automatique']
          ].map(([k,label]) => `<label><input type="checkbox" data-setting="${k}" ${appSettings[k] ? 'checked' : ''}> ${label}</label>`).join('')}
        </div>
        <p class="muted small">Lorsque <strong>Gestion tentatives de tricherie</strong> est cochée, les options anti-tricherie s’affichent. En cas de tentative détectée, le quiz continue, mais les réponses données après la tentative ne sont plus prises en compte dans la note. Le motif apparaît avec le résultat.</p>
        <div class="grid"><div class="field"><label class="label">Temps par question (secondes)</label><input class="input" data-setting="questionTime" type="number" value="${escapeHtml(appSettings.questionTime || 40)}"></div><div class="field"><label class="label">Temps total du quiz (minutes)</label><input class="input" data-setting="quizTotalTime" type="number" value="${escapeHtml(appSettings.quizTotalTime || '')}"></div><div class="field"><label class="label">Nombre maximal d’avertissements</label><input class="input" data-setting="maxWarnings" type="number" min="1" value="${escapeHtml(appSettings.maxWarnings || 3)}"></div></div>
        <button class="btn btn--primary btnSaveAdminSettings" type="button">Enregistrer les paramètres quiz</button>
        </div>
      </div>

    `;


    // Empêche les actions du panneau admin de provoquer un rechargement complet de la page.
    if (!els.adminLogs.dataset.noReloadGuard) {
      els.adminLogs.dataset.noReloadGuard = "1";
      els.adminLogs.addEventListener('submit', (event) => { event.preventDefault(); });
      els.adminLogs.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (button) event.preventDefault();
      });
    }

    function renderUsers(filter = '') {
      const box = document.getElementById('adminUsersList');
      if (!box) return;
      const q = normalizeKey(filter);
      const rows = dynamicUsers.filter(u => {
        const levels = Array.isArray(u.levels) ? u.levels.join(' ') : '';
        const haystack = [u.username, u.full_name, u.fullName, u.first_name, u.firstName, u.last_name, u.lastName, u.phone, levels].map(x => String(x || '')).join(' ');
        return !q || normalizeKey(haystack).includes(q);
      });
      box.innerHTML = rows.length ? rows.map(u => {
        const levels = Array.isArray(u.levels) ? u.levels : [];
        const fullName = u.full_name || u.fullName || `${u.last_name || ''} ${u.first_name || ''}`.trim();
        const isOnline = !!active[u.username];
        return `<div class="admin-log-item admin-session-row" data-user-row="${escapeHtml(u.username)}">
          <div>
            <strong>${escapeHtml(u.username)}</strong> ${isOnline ? '<span class="badge">En ligne</span>' : '<span class="muted small">Hors ligne</span>'}<br>
            <small>${escapeHtml(fullName)} • ${levels.map(escapeHtml).join(', ')} • <b>${u.suspended ? 'Suspendu' : 'Actif'}</b></small>
          </div>
          <div class="row">
            <button class="btn btn--danger btnUserAction" data-action="disconnect" data-user="${escapeHtml(u.username)}" type="button" ${u.username === (localStorage.getItem(STORAGE_KEYS.user) || "") ? "disabled" : ""}>Déconnexion</button>
            <button class="btn btnUserAction" data-action="${u.suspended ? 'reactivate' : 'suspend'}" data-user="${escapeHtml(u.username)}" type="button">${u.suspended ? 'Réactiver' : 'Suspendre'}</button>
            <button class="btn btnUserEdit" data-user="${escapeHtml(u.username)}" data-first-name="${escapeHtml(u.first_name || u.firstName || '')}" data-last-name="${escapeHtml(u.last_name || u.lastName || '')}" data-phone="${escapeHtml(u.phone || '')}" data-levels="${escapeHtml(JSON.stringify(levels))}" type="button">Modifier nom</button>
            <button class="btn btn--danger btnUserAction" data-action="delete" data-user="${escapeHtml(u.username)}" type="button">Supprimer</button>
          </div>
        </div>`;
      }).join('') : "<p class='muted'>Aucun utilisateur trouvé. Vérifie que le fichier codes.js est bien chargé.</p>";
    }
    renderUsers();

    function upsertDynamicUser(updated) {
      if (!updated) return;
      const username = updated.username || updated.targetUser;
      if (!username) return;
      const oldUsername = updated.oldUsername || username;
      const normalized = {
        ...updated,
        username,
        full_name: updated.full_name || updated.fullName || `${updated.last_name || updated.lastName || ''} ${updated.first_name || updated.firstName || ''}`.trim(),
        first_name: updated.first_name || updated.firstName || '',
        last_name: updated.last_name || updated.lastName || '',
        phone: updated.phone || '',
        levels: Array.isArray(updated.levels) ? updated.levels : [],
        suspended: !!updated.suspended,
      };
      const idx = dynamicUsers.findIndex(u => u.username === oldUsername || u.username === username);
      if (idx >= 0) dynamicUsers[idx] = { ...dynamicUsers[idx], ...normalized };
      else dynamicUsers.push(normalized);
    }

    function currentUserSearchFilter() {
      return document.getElementById('adminUserSearch')?.value || '';
    }

    function rerenderCurrentUserSearch() {
      renderUsers(currentUserSearchFilter());
    }

    function chooseUserLevelsWithCheckboxes(currentLevels = []) {
      return new Promise((resolve) => {
        const previous = document.getElementById('editUserLevelsOverlay');
        if (previous) previous.remove();
        const selected = new Set((Array.isArray(currentLevels) ? currentLevels : []).map(String));
        const overlay = document.createElement('div');
        overlay.id = 'editUserLevelsOverlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;';
        overlay.innerHTML = `
          <div style="background:#fff;color:#111;width:min(520px,96vw);max-height:86vh;overflow:auto;border-radius:16px;box-shadow:0 18px 50px rgba(0,0,0,.25);padding:18px;">
            <h3 style="margin:0 0 8px;color:#111;">Choisir le niveau de l'utilisateur</h3>
            <p style="margin:0 0 12px;color:#555;font-size:13px;">Coche un ou plusieurs niveaux, puis clique sur Valider.</p>
            <div class="checkbox-grid" id="editUserLevelsList" style="display:grid;gap:8px;margin:12px 0;">
              ${allLevels.map(level => `
                <label style="display:flex;align-items:center;gap:8px;color:#111;background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:8px;cursor:pointer;">
                  <input type="checkbox" value="${escapeHtml(level)}" ${selected.has(level) ? 'checked' : ''}>
                  <span>${escapeHtml(level)}</span>
                </label>
              `).join('')}
            </div>
            <div class="row" style="display:flex;gap:10px;justify-content:flex-end;margin-top:14px;">
              <button class="btn" id="btnCancelEditUserLevels" type="button">Annuler</button>
              <button class="btn btn--primary" id="btnValidateEditUserLevels" type="button">Valider</button>
            </div>
          </div>`;
        document.body.appendChild(overlay);
        const close = (value) => { overlay.remove(); resolve(value); };
        overlay.querySelector('#btnCancelEditUserLevels')?.addEventListener('click', () => close(null));
        overlay.addEventListener('click', (event) => { if (event.target === overlay) close(null); });
        overlay.querySelector('#btnValidateEditUserLevels')?.addEventListener('click', () => {
          const levels = [...overlay.querySelectorAll('#editUserLevelsList input:checked')].map(i => i.value);
          if (!levels.length) { alert('Choisis au moins un niveau.'); return; }
          close(levels);
        });
      });
    }

    function collapseAdminPanels() {
      // On garde la page du bouton principal ouverte, mais on masque les contenus des sous-boutons.
      els.adminLogs.querySelectorAll('.adminSubPanel, .adminQuizSubPanel, .adminTrialSubPanel, .adminTechSubPanel, .catalogModePanel').forEach(p => p.classList.add('hidden'));
      els.adminLogs.querySelectorAll('.adminSubTabBtn, .adminQuizSubTabBtn, .adminTrialSubTabBtn, .adminTechSubTabBtn, .catalogMatterModeBtn').forEach(b => b.classList.remove('btn--primary'));
    }

    function hideAdminTemporaryPanels() {
      // Les panneaux "Essais gratuits" et "Technique" doivent se comporter comme des menus temporaires :
      // ils s'ouvrent au clic sur leur bouton et disparaissent dès qu'on clique ailleurs.
      els.adminLogs.querySelectorAll('.adminTab[data-panel="trial"], .adminTab[data-panel="tech"]').forEach(p => p.classList.add('hidden'));
      els.adminLogs.querySelectorAll('.adminTabBtn[data-tab="trial"], .adminTabBtn[data-tab="tech"]').forEach(b => b.classList.remove('btn--primary'));
    }

    if (window.__adminOutsideClickHandler) document.removeEventListener('click', window.__adminOutsideClickHandler, true);
    window.__adminOutsideClickHandler = (event) => {
      if (!els.adminLogs || els.adminLogs.classList.contains('hidden')) return;
      const target = event.target;
      const topicEditor = document.getElementById('adminTopicEditor');
      if (topicEditor && !topicEditor.classList.contains('hidden') && !target.closest('#adminTopicEditor, #btnEditCatalogTopic')) topicEditor.classList.add('hidden');

      const isTemporaryAdminPanelClick = !!target.closest('.adminTab[data-panel="trial"], .adminTab[data-panel="tech"]');
      const isTemporaryAdminButtonClick = !!target.closest('.adminTabBtn[data-tab="trial"], .adminTabBtn[data-tab="tech"]');
      if (!isTemporaryAdminPanelClick && !isTemporaryAdminButtonClick) {
        hideAdminTemporaryPanels();
      }

      if (!target.closest('#adminLogs')) return;
      if (target.closest('button, .btn, input, select, textarea, label, .adminTab, .adminSubPanel, .adminQuizSubPanel, .adminTrialSubPanel, .adminTechSubPanel')) return;
      collapseAdminPanels();
    };
    setTimeout(() => document.addEventListener('click', window.__adminOutsideClickHandler, true), 0);

    els.adminLogs.querySelectorAll('.adminTabBtn').forEach(btn => btn.addEventListener('click', (event) => { event.stopPropagation();
      const panel = els.adminLogs.querySelector(`.adminTab[data-panel="${btn.dataset.tab}"]`);
      const canToggleClosed = btn.dataset.tab === 'trial' || btn.dataset.tab === 'tech';
      const willClose = canToggleClosed && panel && !panel.classList.contains('hidden');
      els.adminLogs.querySelectorAll('.adminTabBtn').forEach(b => b.classList.remove('btn--primary'));
      els.adminLogs.querySelectorAll('.adminTab').forEach(p => p.classList.add('hidden'));
      if (!willClose) {
        btn.classList.add('btn--primary');
        if (panel) panel.classList.remove('hidden');
      }
      collapseAdminPanels();
    }));

    els.adminLogs.querySelectorAll('.adminSubTabBtn').forEach(btn => btn.addEventListener('click', async (event) => { event.stopPropagation();
      els.adminLogs.querySelectorAll('.adminSubTabBtn').forEach(b => b.classList.remove('btn--primary'));
      btn.classList.add('btn--primary');
      els.adminLogs.querySelectorAll('.adminSubPanel').forEach(p => p.classList.toggle('hidden', p.dataset.subpanel !== btn.dataset.subtab));
      if ((btn.dataset.subtab === 'online' || btn.dataset.subtab === 'search') && !btn.dataset.refreshing) {
        btn.dataset.refreshing = '1';
        try { await renderAdminLogs({ silent: true, openSubtab: btn.dataset.subtab }); } finally { delete btn.dataset.refreshing; }
      }
    }));
    if (options.openSubtab) {
      const subBtn = els.adminLogs.querySelector(`.adminSubTabBtn[data-subtab="${options.openSubtab}"]`);
      if (subBtn) {
        els.adminLogs.querySelectorAll('.adminSubTabBtn').forEach(b => b.classList.remove('btn--primary'));
        subBtn.classList.add('btn--primary');
        els.adminLogs.querySelectorAll('.adminSubPanel').forEach(p => p.classList.toggle('hidden', p.dataset.subpanel !== options.openSubtab));
      }
    }

    els.adminLogs.querySelectorAll('.adminQuizSubTabBtn').forEach(btn => btn.addEventListener('click', (event) => { event.stopPropagation();
      els.adminLogs.querySelectorAll('.adminQuizSubTabBtn').forEach(b => b.classList.remove('btn--primary'));
      btn.classList.add('btn--primary');
      els.adminLogs.querySelectorAll('.adminQuizSubPanel').forEach(p => p.classList.toggle('hidden', p.dataset.quizSubpanel !== btn.dataset.quizSubtab));
    }));



    els.adminLogs.querySelectorAll('.adminTrialSubTabBtn').forEach(btn => btn.addEventListener('click', (event) => { event.stopPropagation();
      els.adminLogs.querySelectorAll('.adminTrialSubTabBtn').forEach(b => b.classList.remove('btn--primary'));
      btn.classList.add('btn--primary');
      els.adminLogs.querySelectorAll('.adminTrialSubPanel').forEach(p => p.classList.toggle('hidden', p.dataset.trialSubpanel !== btn.dataset.trialSubtab));
    }));

    els.adminLogs.querySelectorAll('.adminTechSubTabBtn').forEach(btn => btn.addEventListener('click', (event) => { event.stopPropagation();
      els.adminLogs.querySelectorAll('.adminTechSubTabBtn').forEach(b => b.classList.remove('btn--primary'));
      btn.classList.add('btn--primary');
      els.adminLogs.querySelectorAll('.adminTechSubPanel').forEach(p => p.classList.toggle('hidden', p.dataset.techSubpanel !== btn.dataset.techSubtab));
    }));

    function showGithubSyncStatus(message, isError = false) {
      const box = document.getElementById('githubSyncStatus');
      if (!box) return;
      box.classList.remove('hidden');
      box.innerHTML = `<strong>${isError ? 'Erreur' : 'Information'} :</strong> ${escapeHtml(message)}`;
    }

    async function runGithubUserSync(direction) {
      try {
        const r = await apiPost('/api/admin/sync-github', currentAuthPayload({ direction }));
        showGithubSyncStatus(direction === 'push'
          ? `Comptes envoyés vers GitHub : ${r.github?.repo || ''}/${r.github?.path || ''}`
          : `Comptes récupérés depuis GitHub : ${r.github?.repo || ''}/${r.github?.path || ''}`);
        await renderAdminLogs({ silent: true });
      } catch (e) {
        showGithubSyncStatus(e.data?.error || e.message || 'Synchronisation GitHub impossible.', true);
      }
    }

    document.getElementById('btnGithubPullUsers')?.addEventListener('click', () => runGithubUserSync('pull'));
    document.getElementById('btnGithubPushUsers')?.addEventListener('click', () => runGithubUserSync('push'));
    document.getElementById('btnGithubStatusUsers')?.addEventListener('click', async () => {
      try {
        const r = await apiGet('/api/health');
        showGithubSyncStatus(r.githubSync
          ? `GitHub configuré : ${r.github?.repo || ''} / branche ${r.github?.branch || ''} / fichier ${r.github?.path || ''}`
          : 'GitHub n’est pas encore configuré en local. Ajoute GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH et GITHUB_USERS_PATH dans les variables d’environnement.');
      } catch (e) {
        showGithubSyncStatus(e.message || 'Impossible de vérifier la configuration GitHub.', true);
      }
    });

    document.getElementById('btnRefreshAdminUsers')?.addEventListener('click', async () => {
      try {
        await renderAdminLogs({ silent: true, openSubtab: 'search' });
      } catch (e) {
        alert(e.data?.error || e.message || 'Impossible d’actualiser les comptes.');
      }
    });
    const adminUserSearchInput = document.getElementById('adminUserSearch');
    if (adminUserSearchInput) {
      adminUserSearchInput.value = window.__ADMIN_USER_SEARCH_FILTER || '';
      renderUsers(adminUserSearchInput.value);
      adminUserSearchInput.addEventListener('input', (e) => {
        window.__ADMIN_USER_SEARCH_FILTER = e.target.value;
        renderUsers(e.target.value);
      });
    }
    document.getElementById('btnCreateUser')?.addEventListener('click', async () => {
      const levels = [...document.querySelectorAll('#adminLevels input:checked')].map(i => i.value);
      const body = currentAuthPayload({ lastName: document.getElementById('adminLastName')?.value, firstName: document.getElementById('adminFirstName')?.value, phone: document.getElementById('adminPhone')?.value, levels });
      try {
        const r = await apiPost('/api/admin/create-user', body);
        window.__LAST_CREATED_USER = { username: r.username, levels: r.levels || levels };
        if (r.userConfig) {
          window.USERS = window.USERS || {};
          window.USERS[r.username] = r.userConfig;
        }
        upsertDynamicUser({
          username: r.username,
          full_name: `${body.lastName || ''} ${body.firstName || ''}`.trim(),
          first_name: body.firstName || '',
          last_name: body.lastName || '',
          phone: body.phone || '',
          levels: r.levels || levels,
          suspended: false
        });
        await renderAdminLogs({ silent: true });
      } catch(e) { alert(e.data?.error || e.message); }
    });

    els.adminLogs.querySelectorAll('.btnForceLogout').forEach(button => button.addEventListener('click', async () => {
      const targetUser = button.dataset.user || ''; if (!targetUser || !confirm(`Déconnecter ${targetUser} ?`)) return;
      try { await apiPost('/api/admin/force-logout', currentAuthPayload({ targetUser })); await renderAdminLogs({ silent: true }); } catch(e) { alert(e.data?.error || e.message); }
    }));
    document.getElementById('btnDisconnectAll')?.addEventListener('click', async () => { if (!confirm('Déconnecter tous les autres appareils ?')) return; try { const r = await apiPost('/api/admin/disconnect-all', currentAuthPayload()); alert(`${r.disconnected} session(s) déconnectée(s).`); await renderAdminLogs({ silent: true }); } catch(e) { alert(e.data?.error || e.message); } });
    document.getElementById('adminUsersList')?.addEventListener('click', async (event) => {
      const actionBtn = event.target.closest('.btnUserAction');
      const editBtn = event.target.closest('.btnUserEdit');
      if (actionBtn) {
        const targetUser = actionBtn.dataset.user || '';
        const action = actionBtn.dataset.action || '';
        if (action === 'disconnect') {
          if (!confirm(`Déconnecter le compte ${targetUser} ?`)) return;
          try {
            const r = await apiPost('/api/admin/force-logout', currentAuthPayload({ targetUser }));
            alert(`${r.disconnected || 0} session(s) déconnectée(s).`);
            await renderAdminLogs({ silent: true, openSubtab: 'search' });
          } catch(e) { alert(e.data?.error || e.message); }
          return;
        }
        if (action === 'delete' && !confirm(`Supprimer définitivement le compte ${targetUser} ?`)) return;
        if (action === 'suspend' && !confirm(`Suspendre le compte ${targetUser} jusqu’à réactivation ?`)) return;
        try {
          const r = await apiPost('/api/admin/update-user', currentAuthPayload({ targetUser, action }));
          if (action === 'delete') {
            dynamicUsers = dynamicUsers.filter(u => u.username !== targetUser);
          } else if (action === 'suspend' || action === 'reactivate') {
            dynamicUsers = dynamicUsers.map(u => u.username === targetUser ? { ...u, suspended: action === 'suspend' } : u);
          }
          rerenderCurrentUserSearch();
          alert(action === 'delete' ? 'Compte supprimé.' : (action === 'suspend' ? 'Compte suspendu.' : 'Compte réactivé.'));
        } catch(e) { alert(e.data?.error || e.message); }
        return;
      }
      if (editBtn) {
        const targetUser = editBtn.dataset.user || '';
        let currentLevels = [];
        try { currentLevels = JSON.parse(editBtn.dataset.levels || '[]'); } catch(_) { currentLevels = []; }
        const lastName = prompt('Premier nom / Nom de famille :', editBtn.dataset.lastName || '');
        if (lastName === null) return;
        const firstName = prompt('Deuxième nom / Prénom :', editBtn.dataset.firstName || '');
        if (firstName === null) return;
        const phone = prompt('Numéro de téléphone :', editBtn.dataset.phone || '');
        if (phone === null) return;
        const levels = await chooseUserLevelsWithCheckboxes(currentLevels);
        if (levels === null) return;
        try {
          const r = await apiPost('/api/admin/update-user', currentAuthPayload({ targetUser, action: 'editProfile', lastName, firstName, phone, levels }));
          upsertDynamicUser({ ...(r.user || {}), oldUsername: targetUser, username: r.username || targetUser, levels: r.levels || levels });
          rerenderCurrentUserSearch();
          alert(`Compte modifié. Nouvel identifiant : ${r.username || targetUser}`);
        } catch(e) { alert(e.data?.error || e.message); }
      }
    });
    document.getElementById('btnClearCache')?.addEventListener('click', () => { localStorage.removeItem(STORAGE_KEYS.last); localStorage.removeItem(STORAGE_KEYS.lastResult); alert('Cache local vidé.'); });
    const cheatDetectionBox = els.adminLogs.querySelector('[data-setting="cheatDetection"]');
    const cheatOptionsPanel = document.getElementById('cheatOptionsPanel');
    cheatDetectionBox?.addEventListener('change', () => {
      cheatOptionsPanel?.classList.toggle('hidden', !cheatDetectionBox.checked);
    });
    function collectAdminSettings() {
      const settings = { ...appSettings };
      els.adminLogs.querySelectorAll('[data-setting]').forEach(input => {
        settings[input.dataset.setting] = input.type === 'checkbox' ? input.checked : input.value;
      });
      settings.autoSubmitCheat = true;
      settings.qpqMode = appSettings.qpqMode !== false;
      if (!settings.cheatDetection) {
        settings.notifyCheat = false;
        settings.antiScreenshot = false;
        settings.antiTabChange = false;
        settings.antiCopyPaste = false;
      }
      return normalizeAppSettings(settings);
    }


    function isAdminDECatalogLevel(level) {
      const n = normalizeKey(level);
      return n === normalizeKey('INF/SAG-M') || n === normalizeKey('AUXI');
    }

    function adminDELevelMatches(questionLevel, selectedLevel) {
      const nSelected = normalizeKey(selectedLevel);
      const nQuestion = normalizeKey(questionLevel);
      if (nSelected === normalizeKey('INF/SAG-M')) {
        return nQuestion.includes('inf/sag-m') ||
          nQuestion.includes('ide/sfm') ||
          nQuestion.includes('licence 3 ide') ||
          nQuestion.includes('licence 3 sfm') ||
          nQuestion === normalizeKey('L3-Niveau Accompli INF') ||
          nQuestion === normalizeKey('L3-Niveau Accompli SF');
      }
      if (nSelected === normalizeKey('AUXI')) {
        return nQuestion.includes('auxi') ||
          nQuestion.includes('auxiliaire') ||
          nQuestion === normalizeKey('A2-Niveau moyen');
      }
      return levelMatches(questionLevel, selectedLevel);
    }

    function getAdminDEQuestionSource() {
      const deletedIds = new Set(Array.isArray(appSettings.deletedQuestionIds) ? appSettings.deletedQuestionIds.map(String) : []);
      const baseEFF = Array.isArray(DE_QUESTIONS_SOURCE) ? DE_QUESTIONS_SOURCE : [];
      const customEFF = (Array.isArray(appSettings.customQuestions) ? appSettings.customQuestions : [])
        .filter(q => isAdminDECatalogLevel(q?.level) || adminDELevelMatches(q?.level, 'INF/SAG-M') || adminDELevelMatches(q?.level, 'AUXI'));
      const byId = new Map();
      baseEFF.concat(customEFF).map(normalizeQuestion).filter(Boolean).forEach(q => {
        if (q.id && !deletedIds.has(String(q.id))) byId.set(q.id, q);
      });
      return Array.from(byId.values());
    }

    // Index léger et strictement limité à l'Examen de fin de formation.
    // Ici on ne lit pas toute la banque Quiz : seulement questions.eff.js + modifications admin EFF.
    let adminDECatalogIndexCache = null;
    function getAdminDECatalogIndex() {
      if (adminDECatalogIndexCache) return adminDECatalogIndexCache;
      const index = {
        'INF/SAG-M': { subjects: new Set(), topicsBySubject: {} },
        'AUXI': { subjects: new Set(), topicsBySubject: {} },
      };
      const add = (level, question) => {
        const subject = safeText(question.subject).trim();
        const topic = safeText(question.topic).trim();
        if (!subject) return;
        index[level].subjects.add(subject);
        index[level].topicsBySubject[subject] = index[level].topicsBySubject[subject] || new Set();
        if (topic) index[level].topicsBySubject[subject].add(topic);
      };
      getAdminDEQuestionSource().forEach((q) => {
        if (adminDELevelMatches(q.level, 'INF/SAG-M')) add('INF/SAG-M', q);
        if (adminDELevelMatches(q.level, 'AUXI')) add('AUXI', q);
      });
      adminDECatalogIndexCache = index;
      return index;
    }

    function getDECatalogSubjectsForLevel(level) {
      if (!isAdminDECatalogLevel(level)) return [];
      const levelKey = normalizeKey(level) === normalizeKey('AUXI') ? 'AUXI' : 'INF/SAG-M';
      const index = getAdminDECatalogIndex()[levelKey];
      const subjects = [];
      const seen = new Set();
      const addOne = (value) => {
        const label = safeText(value).trim();
        const key = normalizeKey(label);
        if (!label || seen.has(key)) return;
        seen.add(key);
        subjects.push(label);
      };
      const addMany = (arr) => (Array.isArray(arr) ? arr : []).forEach(addOne);

      // Source unique demandée pour l'EFF : sujets.de.js.
      Object.keys(window.SUJETS_PAR_MATIERE_DE || {}).forEach(addOne);

      return subjects.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
    }

    function getDECatalogTopicsForLevelSubject(level, subject) {
      if (!isAdminDECatalogLevel(level)) return [];
      const index = getAdminDECatalogIndex()[normalizeKey(level) === normalizeKey('AUXI') ? 'AUXI' : 'INF/SAG-M'];
      const subjectKey = Object.keys(index.topicsBySubject).find(s => normalizeKey(s) === normalizeKey(subject)) || subject;
      const topics = [];
      const seen = new Set();
      const addTopic = (value) => {
        const label = safeText(value).trim();
        const key = normalizeKey(label);
        if (!label || seen.has(key)) return;
        seen.add(key);
        topics.push(label);
      };

      const deSubject = Object.keys(window.SUJETS_PAR_MATIERE_DE || {}).find((key) => normalizeKey(key) === normalizeKey(subject));
      if (deSubject && Array.isArray(window.SUJETS_PAR_MATIERE_DE[deSubject])) window.SUJETS_PAR_MATIERE_DE[deSubject].forEach(addTopic);

      topics.sort((a, b) => {
        const ma = normalizeKey(a).match(/^sujet\s*([0-9]+)$/);
        const mb = normalizeKey(b).match(/^sujet\s*([0-9]+)$/);
        if (ma && mb) return Number(ma[1]) - Number(mb[1]);
        return a.localeCompare(b, 'fr', { sensitivity: 'base' });
      });
      return topics;
    }

    function getBaseCatalogForAdmin() {
      const catalog = normalizeCustomCatalog(appSettings.customCatalog || {});
      const levels = Array.from(new Set([...(ALL_LEVELS || []), 'INF/SAG-M', 'AUXI', ...(catalog.levels || [])])).filter(Boolean);
      const subjectsByLevel = {};
      const topicsByLevelSubject = {};
      for (const level of levels) {
        const customSubjects = ((catalog.subjectsByLevel || {})[level] || []);
        const baseSubjects = isAdminDECatalogLevel(level) ? getDECatalogSubjectsForLevel(level) : (getAllowedSubjectsForLevel(level) || []);
        subjectsByLevel[level] = isAdminDECatalogLevel(level)
          ? baseSubjects
          : Array.from(new Set([...baseSubjects, ...customSubjects])).filter(Boolean);
        topicsByLevelSubject[level] = isAdminDECatalogLevel(level) ? {} : { ...(((catalog.topicsByLevelSubject || {})[level]) || {}) };
        for (const subject of subjectsByLevel[level]) {
          const customTopics = (((catalog.topicsByLevelSubject || {})[level] || {})[subject]) || [];
          const baseTopics = isAdminDECatalogLevel(level)
            ? getDECatalogTopicsForLevelSubject(level, subject)
            : [];
          topicsByLevelSubject[level][subject] = isAdminDECatalogLevel(level)
            ? baseTopics
            : Array.from(new Set([...baseTopics, ...customTopics])).filter(Boolean);
        }
      }
      return normalizeCustomCatalog({ levels, subjectsByLevel, topicsByLevelSubject });
    }

    let adminCatalogDraft = getBaseCatalogForAdmin();

    function setSelectOptionsSimple(select, options, value) {
      if (!select) return;
      select.innerHTML = '';
      (options || []).forEach(opt => {
        const o = document.createElement('option');
        o.value = opt;
        o.textContent = opt;
        select.appendChild(o);
      });
      if (value && options.includes(value)) select.value = value;
    }

    function getAdminCatalogTopicsForLevelSubject(level, subject) {
      if (!level || !subject || subject === 'Aucune matière') return [];

      const customTopics = ((((adminCatalogDraft.topicsByLevelSubject || {})[level] || {})[subject]) || []);
      const baseTopics = isAdminDECatalogLevel(level)
        ? getDECatalogTopicsForLevelSubject(level, subject)
        // Important : dans l'administration, on doit utiliser le niveau choisi dans
        // Utilise le niveau choisi dans les paramètres, pas le niveau
        // actuellement sélectionné dans la partie « Commencer un quiz ».
        : computeTopicsForLevelSubject(level, subject).filter(t => t !== 'Tous les sujets');

      return sortTopicsList(Array.from(new Set([...customTopics, ...baseTopics])));
    }

    function renderCatalogAdmin(selectedLevel, selectedSubject, selectedTopic) {
      adminCatalogDraft = normalizeCustomCatalog(adminCatalogDraft);
      const levels = adminCatalogDraft.levels.length ? adminCatalogDraft.levels : ALL_LEVELS.slice();
      const level = selectedLevel && levels.includes(selectedLevel) ? selectedLevel : levels[0];
      setSelectOptionsSimple(document.getElementById('adminCatalogLevel'), levels, level);
      const subjects = ((adminCatalogDraft.subjectsByLevel || {})[level] || []).slice().sort((a,b)=>a.localeCompare(b,'fr',{sensitivity:'base'}));
      const subject = selectedSubject && subjects.includes(selectedSubject) ? selectedSubject : subjects[0];
      setSelectOptionsSimple(document.getElementById('adminCatalogSubjectList'), subjects.length ? subjects : ['Aucune matière'], subject);
      setSelectOptionsSimple(document.getElementById('adminCatalogSubjectRemove'), subjects.length ? subjects : ['Aucune matière'], subject);
      setSelectOptionsSimple(document.getElementById('adminCatalogTopicSubject'), subjects.length ? subjects : ['Aucune matière'], subject);
      const topics = getAdminCatalogTopicsForLevelSubject(level, subject);
      const topicValue = selectedTopic && topics.includes(selectedTopic) ? selectedTopic : topics[0];
      setSelectOptionsSimple(document.getElementById('adminCatalogTopic'), topics.length ? topics : ['Aucun sujet'], topicValue);
    }

    async function saveCatalogDraft(messageOk, messageLocal) {
      // Enregistre immédiatement le catalogue (niveaux, matières, sujets).
      // Avant correction, l'ajout restait seulement dans adminCatalogDraft et pouvait
      // disparaître au rechargement ou ne pas apparaître dans « Commencer un quiz ».
      adminCatalogDraft = normalizeCustomCatalog(adminCatalogDraft);
      const settings = normalizeAppSettings({ ...collectAdminSettings(), customCatalog: adminCatalogDraft });
      const status = document.getElementById('adminCatalogStatus');
      let savedOnServer = true;
      try {
        await apiPost('/api/admin/save-settings', currentAuthPayload({ settings }));
        if (status) status.textContent = messageOk || 'Niveaux, matières et sujets enregistrés en local et appliqués.';
      } catch (e) {
        savedOnServer = false;
        if (status) status.textContent = messageLocal || 'Mode local : modifications enregistrées dans ce navigateur et appliquées.';
      }
      appSettings = settings;
      localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
      adminDECatalogIndexCache = null;
      bank = getQuestionBank();
      updateStartInfo();
      return savedOnServer;
    }

    let validatedImportContext = null;

    function getCatalogSelectionForImport() {
      const level = document.getElementById('adminCatalogLevel')?.value || '';
      const subject = document.getElementById('adminCatalogTopicSubject')?.value || document.getElementById('adminCatalogSubjectList')?.value || '';
      const topic = document.getElementById('adminCatalogTopic')?.value || '';
      if (!level || !subject || !topic || subject === 'Aucune matière' || topic === 'Aucun sujet') return null;
      return { level, subject, topic };
    }

    function setImportControlsEnabled(enabled, message) {
      const box = document.getElementById('adminImportBox');
      const status = document.getElementById('adminImportStatus');
      const contextLabel = document.getElementById('adminSelectedImportContext');
      box?.classList.toggle('locked', !enabled);
      ['adminImportFile','adminImportScript','btnPreviewImport','btnApplyImport'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.disabled = !enabled;
      });
      if (contextLabel) contextLabel.innerHTML = enabled && validatedImportContext
        ? `Choix validé : <strong>${escapeHtml(validatedImportContext.level)}</strong> / <strong>${escapeHtml(validatedImportContext.subject)}</strong> / <strong>${escapeHtml(validatedImportContext.topic)}</strong>.`
        : 'Choisis d’abord un niveau, une matière et un sujet dans la première partie, puis clique sur « Valider ce choix pour l’import ». ';
      if (message && status) status.textContent = message;
    }

    function invalidateImportContext() {
      validatedImportContext = null;
      setImportControlsEnabled(false);
    }

    function bindCatalogAdmin() {
      adminCatalogDraft = getBaseCatalogForAdmin();
      renderCatalogAdmin();
      setImportControlsEnabled(false);
      const levelSelect = document.getElementById('adminCatalogLevel');
      const subjectList = document.getElementById('adminCatalogSubjectList');
      const topicSubject = document.getElementById('adminCatalogTopicSubject');
      levelSelect?.addEventListener('change', () => { renderCatalogAdmin(levelSelect.value); invalidateImportContext(); });
      subjectList?.addEventListener('change', () => { renderCatalogAdmin(levelSelect?.value, subjectList.value); invalidateImportContext(); });
      topicSubject?.addEventListener('change', () => { renderCatalogAdmin(levelSelect?.value, topicSubject.value); invalidateImportContext(); });
      document.getElementById('adminCatalogTopic')?.addEventListener('change', () => { invalidateImportContext(); });
      els.adminLogs.querySelectorAll('.catalogMatterModeBtn').forEach(btn => btn.addEventListener('click', (event) => { event.stopPropagation();
        els.adminLogs.querySelectorAll('.catalogMatterModeBtn').forEach(b => b.classList.remove('btn--primary'));
        btn.classList.add('btn--primary');
        const mode = btn.dataset.catalogMode;
        if (mode === 'topic') {
          const currentSubject = document.getElementById('adminCatalogTopicSubject')?.value || document.getElementById('adminCatalogSubjectList')?.value;
          renderCatalogAdmin(levelSelect?.value, currentSubject);
        }
        els.adminLogs.querySelectorAll('.catalogModePanel').forEach(panel => panel.classList.toggle('hidden', panel.dataset.catalogPanel !== mode));
      }));
      document.getElementById('btnAddCatalogLevel')?.addEventListener('click', async () => {
        const name = prompt('Nom du nouveau niveau :');
        if (!name || !name.trim()) return;
        adminCatalogDraft.levels = Array.from(new Set([...(adminCatalogDraft.levels || []), name.trim()]));
        adminCatalogDraft.subjectsByLevel[name.trim()] = adminCatalogDraft.subjectsByLevel[name.trim()] || [];
        renderCatalogAdmin(name.trim());
        invalidateImportContext();
        await saveCatalogDraft('Niveau ajouté, enregistré et appliqué.', 'Niveau ajouté en mode local et appliqué.');
      });
      document.getElementById('btnRemoveCatalogLevel')?.addEventListener('click', async () => {
        const level = levelSelect?.value;
        if (!level) return;
        if (!confirm(`Retirer le niveau « ${level} » ? Les matières, sujets et questions personnalisées liés à ce niveau seront retirés.`)) return;
        adminCatalogDraft.levels = (adminCatalogDraft.levels || []).filter(l => l !== level);
        delete adminCatalogDraft.subjectsByLevel[level];
        delete adminCatalogDraft.topicsByLevelSubject[level];
        const remainingCustomQuestions = (Array.isArray(appSettings.customQuestions) ? appSettings.customQuestions : []).filter(q => q.level !== level);
        appSettings = normalizeAppSettings({ ...collectAdminSettings(), customCatalog: adminCatalogDraft, customQuestions: remainingCustomQuestions });
        localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
        try { await apiPost('/api/admin/save-settings', currentAuthPayload({ settings: appSettings })); } catch (_) {}
        adminDECatalogIndexCache = null; bank = getQuestionBank(); updateStartInfo(); renderCatalogAdmin(); invalidateImportContext();
        const status = document.getElementById('adminCatalogStatus'); if (status) status.textContent = 'Niveau retiré et modifications appliquées.';
      });
      document.getElementById('btnRenameCatalogLevel')?.addEventListener('click', async () => {
        const oldLevel = levelSelect?.value;
        if (!oldLevel) return;
        const newLevel = prompt('Nouveau nom du niveau :', oldLevel);
        if (!newLevel || !newLevel.trim() || newLevel.trim() === oldLevel) return;
        const clean = newLevel.trim();
        adminCatalogDraft.levels = (adminCatalogDraft.levels || []).map(l => l === oldLevel ? clean : l);
        adminCatalogDraft.subjectsByLevel[clean] = adminCatalogDraft.subjectsByLevel[oldLevel] || [];
        if (clean !== oldLevel) delete adminCatalogDraft.subjectsByLevel[oldLevel];
        adminCatalogDraft.topicsByLevelSubject[clean] = adminCatalogDraft.topicsByLevelSubject[oldLevel] || {};
        if (clean !== oldLevel) delete adminCatalogDraft.topicsByLevelSubject[oldLevel];
        const customQuestions = (Array.isArray(appSettings.customQuestions) ? appSettings.customQuestions : []).map(q => q.level === oldLevel ? { ...q, level: clean } : q);
        appSettings = normalizeAppSettings({ ...collectAdminSettings(), customCatalog: adminCatalogDraft, customQuestions });
        localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
        try { await apiPost('/api/admin/save-settings', currentAuthPayload({ settings: appSettings })); } catch (_) {}
        adminDECatalogIndexCache = null; bank = getQuestionBank(); updateStartInfo(); renderCatalogAdmin(clean); invalidateImportContext();
        const status = document.getElementById('adminCatalogStatus'); if (status) status.textContent = 'Nom du niveau modifié et appliqué.';
      });
      document.getElementById('btnAddCatalogSubject')?.addEventListener('click', async () => {
        const level = levelSelect?.value;
        const name = prompt('Nom de la nouvelle matière :');
        if (!level || !name || !name.trim()) return;
        adminCatalogDraft.subjectsByLevel[level] = Array.from(new Set([...(adminCatalogDraft.subjectsByLevel[level] || []), name.trim()]));
        adminCatalogDraft.topicsByLevelSubject[level] = adminCatalogDraft.topicsByLevelSubject[level] || {};
        adminCatalogDraft.topicsByLevelSubject[level][name.trim()] = adminCatalogDraft.topicsByLevelSubject[level][name.trim()] || [];
        renderCatalogAdmin(level, name.trim());
        invalidateImportContext();
        await saveCatalogDraft('Matière ajoutée, enregistrée et visible dans « Commencer un quiz ».', 'Matière ajoutée en mode local et visible dans ce navigateur.');
      });
      document.getElementById('btnRemoveCatalogSubjectFromList')?.addEventListener('click', () => {
        document.getElementById('btnRemoveCatalogSubject')?.click();
      });
      document.getElementById('btnRenameCatalogSubject')?.addEventListener('click', async () => {
        const level = levelSelect?.value;
        const oldSubject = document.getElementById('adminCatalogSubjectList')?.value;
        if (!level || !oldSubject || oldSubject === 'Aucune matière') return;
        const newSubject = prompt('Nouveau nom de la matière :', oldSubject);
        if (!newSubject || !newSubject.trim() || newSubject.trim() === oldSubject) return;
        const clean = newSubject.trim();
        adminCatalogDraft.subjectsByLevel[level] = (adminCatalogDraft.subjectsByLevel[level] || []).map(s => s === oldSubject ? clean : s);
        adminCatalogDraft.topicsByLevelSubject[level] = adminCatalogDraft.topicsByLevelSubject[level] || {};
        adminCatalogDraft.topicsByLevelSubject[level][clean] = adminCatalogDraft.topicsByLevelSubject[level][oldSubject] || [];
        if (clean !== oldSubject) delete adminCatalogDraft.topicsByLevelSubject[level][oldSubject];
        const customQuestions = (Array.isArray(appSettings.customQuestions) ? appSettings.customQuestions : []).map(q => (q.level === level && q.subject === oldSubject) ? { ...q, subject: clean } : q);
        appSettings = normalizeAppSettings({ ...collectAdminSettings(), customCatalog: adminCatalogDraft, customQuestions });
        localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
        try { await apiPost('/api/admin/save-settings', currentAuthPayload({ settings: appSettings })); } catch (_) {}
        adminDECatalogIndexCache = null; bank = getQuestionBank(); updateStartInfo(); renderCatalogAdmin(level, clean); invalidateImportContext();
        const status = document.getElementById('adminCatalogStatus'); if (status) status.textContent = 'Nom de la matière modifié et appliqué.';
      });
      document.getElementById('btnRemoveCatalogSubject')?.addEventListener('click', async () => {
        const level = levelSelect?.value;
        const subject = document.getElementById('adminCatalogSubjectRemove')?.value;
        if (!level || !subject || subject === 'Aucune matière') return;
        if (!confirm(`Retirer la matière « ${subject} » de ${level} ?`)) return;
        adminCatalogDraft.subjectsByLevel[level] = (adminCatalogDraft.subjectsByLevel[level] || []).filter(s => s !== subject);
        if (adminCatalogDraft.topicsByLevelSubject[level]) delete adminCatalogDraft.topicsByLevelSubject[level][subject];
        renderCatalogAdmin(level);
        invalidateImportContext();
        await saveCatalogDraft('Matière retirée et enregistrée.', 'Matière retirée en mode local.');
      });
      document.getElementById('btnAddCatalogTopic')?.addEventListener('click', async () => {
        const level = levelSelect?.value;
        const subject = document.getElementById('adminCatalogTopicSubject')?.value;
        const topic = prompt('Nom du nouveau sujet :');
        if (!level || !subject || subject === 'Aucune matière' || !topic || !topic.trim()) return;
        adminCatalogDraft.topicsByLevelSubject[level] = adminCatalogDraft.topicsByLevelSubject[level] || {};
        adminCatalogDraft.topicsByLevelSubject[level][subject] = Array.from(new Set([...(adminCatalogDraft.topicsByLevelSubject[level][subject] || []), topic.trim()]));
        adminCatalogDraft.subjectsByLevel[level] = Array.from(new Set([...(adminCatalogDraft.subjectsByLevel[level] || []), subject]));
        renderCatalogAdmin(level, subject, topic.trim());
        invalidateImportContext();
        await saveCatalogDraft('Sujet ajouté, enregistré et visible dans « Commencer un quiz ».', 'Sujet ajouté en mode local et visible dans ce navigateur.');
      });
      document.getElementById('btnRemoveCatalogTopic')?.addEventListener('click', async () => {
        const level = levelSelect?.value;
        const subject = document.getElementById('adminCatalogTopicSubject')?.value;
        const topic = document.getElementById('adminCatalogTopic')?.value;
        if (!level || !subject || subject === 'Aucune matière' || !topic || topic === 'Aucun sujet') return;
        if (!confirm(`Retirer le sujet « ${topic} » de ${subject} / ${level} ? Les questions personnalisées liées à ce sujet seront aussi retirées.`)) return;
        adminCatalogDraft.topicsByLevelSubject[level] = adminCatalogDraft.topicsByLevelSubject[level] || {};
        adminCatalogDraft.topicsByLevelSubject[level][subject] = (adminCatalogDraft.topicsByLevelSubject[level][subject] || []).filter(t => t !== topic);
        const remainingCustomQuestions = (Array.isArray(appSettings.customQuestions) ? appSettings.customQuestions : []).filter(q => !(q.level === level && q.subject === subject && q.topic === topic));
        const settings = normalizeAppSettings({ ...collectAdminSettings(), customCatalog: adminCatalogDraft, customQuestions: remainingCustomQuestions });
        const status = document.getElementById('adminCatalogStatus');
        let savedOnServer = true;
        try { await apiPost('/api/admin/save-settings', currentAuthPayload({ settings })); } catch (_) { savedOnServer = false; }
        appSettings = settings;
        localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
        adminDECatalogIndexCache = null; bank = getQuestionBank();
        updateStartInfo();
        renderCatalogAdmin(level, subject);
        invalidateImportContext();
        const editor = document.getElementById('adminTopicEditor');
        if (editor) editor.classList.add('hidden');
        if (status) status.textContent = savedOnServer ? 'Sujet retiré et enregistré en local.' : 'Sujet retiré en mode local dans ce navigateur.';
      });
      function getQuestionsForSelectedTopic() {
        const level = levelSelect?.value || '';
        const subject = document.getElementById('adminCatalogTopicSubject')?.value || '';
        const topic = document.getElementById('adminCatalogTopic')?.value || '';
        const source = isAdminDECatalogLevel(level) ? getAdminDEQuestionSource() : getQuestionBank();
        return source.filter(q =>
          (isAdminDECatalogLevel(level) ? adminDELevelMatches(q.level, level) : levelMatches(q.level, level)) &&
          normalizeKey(q.subject) === normalizeKey(subject) &&
          normalizeKey(q.topic) === normalizeKey(topic)
        );
      }

      let topicEditorRemovedQuestionIds = new Set();

      function questionDuplicateKey(q) {
        return normalizeKey(String(q.question || '').replace(/\s+/g, ' ').trim());
      }

      function findDuplicateTopicQuestions() {
        const groups = new Map();
        getQuestionsForSelectedTopic().forEach(q => {
          const key = questionDuplicateKey(q);
          if (!key) return;
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key).push(q);
        });
        return Array.from(groups.values()).filter(group => group.length > 1);
      }

      function renderDuplicateTopicQuestions() {
        const target = document.getElementById('topicDuplicateList');
        if (!target) return;
        const groups = findDuplicateTopicQuestions();
        if (!groups.length) {
          target.innerHTML = '';
          return;
        }
        target.innerHTML = `<div class="duplicate-box"><h5>Questions identiques détectées</h5>${groups.map((group, groupIndex) => `
          <div class="duplicate-group"><strong>Doublon ${groupIndex + 1}</strong><p>${escapeHtml(group[0].question || '')}</p>
            ${group.map((q, index) => `<label class="duplicate-check"><input type="checkbox" class="duplicateQuestionCheck" value="${escapeHtml(q.id)}" ${index === 0 ? '' : 'checked'}> Question ${index + 1} — ${escapeHtml(q.type || '')}</label>`).join('')}
          </div>`).join('')}</div>`;
      }

      async function deleteSelectedDuplicateQuestions() {
        const checkedIds = [...document.querySelectorAll('#topicDuplicateList .duplicateQuestionCheck:checked')].map(i => i.value);
        const status = document.getElementById('adminTopicEditorStatus');
        if (!checkedIds.length) {
          if (status) status.textContent = 'Aucun doublon sélectionné.';
          return;
        }
        if (!confirm(`Supprimer ${checkedIds.length} question(s) sélectionnée(s) ?`)) return;
        const currentCustom = Array.isArray(appSettings.customQuestions) ? appSettings.customQuestions : [];
        const toRemove = new Set(checkedIds);
        const remainingCustom = currentCustom.filter(q => !toRemove.has(q.id));
        const deletedQuestionIds = Array.from(new Set([...(appSettings.deletedQuestionIds || []), ...checkedIds]));
        const settings = normalizeAppSettings({ ...collectAdminSettings(), customCatalog: adminCatalogDraft, customQuestions: remainingCustom, deletedQuestionIds });
        let savedOnServer = true;
        try { await apiPost('/api/admin/save-settings', currentAuthPayload({ settings })); } catch (_) { savedOnServer = false; }
        appSettings = settings;
        localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
        adminDECatalogIndexCache = null; bank = getQuestionBank();
        updateStartInfo();
        renderTopicEditor();
        if (status) status.textContent = `${checkedIds.length} doublon(s) supprimé(s). ${savedOnServer ? 'Enregistré en local.' : 'Mode local : enregistré dans ce navigateur.'}`;
      }

      function buildQuestionStructureHtml(q, typeOverride = null) {
        const type = typeOverride || q.type || 'mcq';
        const choices = Array.isArray(q.choices) && q.choices.length ? q.choices : (type === 'tf' ? ['Vrai', 'Faux'] : ['Réponse A', 'Réponse B']);
        const answerValue = type === 'tf'
          ? String(q.answer === true)
          : (type === 'mcq_multi' ? (q.answerIndices || [q.answerIndex ?? 0]).join(',') : String(Number.isInteger(q.answerIndex) ? q.answerIndex : 0));
        if (type === 'tf') {
          return `<div class="question-structure-fields" data-structure="tf">
            <label class="label">Structure Vrai/Faux</label>
            <p class="muted small">Cette question utilise la structure <strong>tf</strong> : une réponse vraie ou fausse.</p>
            <label class="label">Bonne réponse</label>
            <select class="input editQuestionAnswer"><option value="true" ${answerValue === 'true' ? 'selected' : ''}>Vrai</option><option value="false" ${answerValue !== 'true' ? 'selected' : ''}>Faux</option></select>
          </div>`;
        }
        return `<div class="question-structure-fields" data-structure="${escapeHtml(type)}">
          <label class="label">Choix de réponse</label>
          <div class="editChoices">${choices.map((choice, cidx) => `<label class="choice-edit-row"><input type="checkbox" class="choiceSelectForRemove" title="Sélectionner pour retirer"><input class="input editChoice" data-choice-index="${cidx}" value="${escapeHtml(choice)}"></label>`).join('')}</div>
          <div class="choice-edit-actions">
            <button class="btn btn--danger btnRemoveChoice" type="button">-</button>
            <button class="btn btn--primary btnAddChoice" type="button">+</button>
          </div>
          <label class="label">Bonne réponse ${type === 'mcq_multi' ? '(indices séparés par virgule : 0,2)' : '(indice unique : 0, 1, 2...)'}</label>
          <input class="input editQuestionAnswer" value="${escapeHtml(answerValue)}">
        </div>`;
      }

      function collectCardDraft(card) {
        const type = card.querySelector('.editQuestionType')?.value || 'mcq';
        const draft = {
          type,
          question: card.querySelector('.editQuestionText')?.value || '',
          explanation: card.querySelector('.editQuestionExplanation')?.value || ''
        };
        if (type === 'tf') {
          draft.answer = card.querySelector('.editQuestionAnswer')?.value === 'true';
        } else {
          const choices = [...card.querySelectorAll('.editChoice')].map(i => i.value).filter(Boolean);
          draft.choices = choices.length ? choices : ['Réponse A', 'Réponse B'];
          const answerText = card.querySelector('.editQuestionAnswer')?.value || '0';
          if (type === 'mcq_multi') {
            draft.answerIndices = answerText.split(',').map(x => Number(x.trim())).filter(n => Number.isInteger(n) && n >= 0 && n < draft.choices.length);
            if (!draft.answerIndices.length) draft.answerIndices = [0];
          } else {
            const n = Number(answerText);
            draft.answerIndex = Number.isInteger(n) && n >= 0 && n < draft.choices.length ? n : 0;
          }
        }
        return draft;
      }

      function applyQuestionTypeToCard(card, nextType) {
        if (!card) return;
        const draft = collectCardDraft(card);
        draft.type = nextType;
        if (nextType === 'tf') {
          draft.answer = draft.type === 'tf' ? draft.answer : true;
          delete draft.choices; delete draft.answerIndex; delete draft.answerIndices;
        } else {
          draft.choices = Array.isArray(draft.choices) && draft.choices.length >= 2 ? draft.choices : ['Réponse A', 'Réponse B'];
          if (nextType === 'mcq_multi') {
            draft.answerIndices = Array.isArray(draft.answerIndices) ? draft.answerIndices : [Number.isInteger(draft.answerIndex) ? draft.answerIndex : 0];
            delete draft.answerIndex; delete draft.answer;
          } else {
            draft.answerIndex = Number.isInteger(draft.answerIndex) ? draft.answerIndex : (Array.isArray(draft.answerIndices) ? draft.answerIndices[0] : 0) || 0;
            delete draft.answerIndices; delete draft.answer;
          }
        }
        const hidden = card.querySelector('.editQuestionType');
        if (hidden) hidden.value = nextType;
        const tag = card.querySelector('.topic-question-head .tag');
        if (tag) tag.textContent = nextType;
        const area = card.querySelector('.question-structure-host');
        if (area) area.innerHTML = buildQuestionStructureHtml(draft, nextType);
        bindChoiceButtons(card);
      }

      function bindChoiceButtons(scope) {
        scope.querySelectorAll('.btnAddChoice').forEach(btn => btn.addEventListener('click', () => {
          const card = btn.closest('.topic-question-editor');
          const list = card?.querySelector('.editChoices');
          if (!list) return;
          const idx = list.querySelectorAll('.editChoice').length;
          list.insertAdjacentHTML('beforeend', `<label class="choice-edit-row"><input type="checkbox" class="choiceSelectForRemove" title="Sélectionner pour retirer"><input class="input editChoice" data-choice-index="${idx}" value="Nouvelle proposition"></label>`);
        }));
        scope.querySelectorAll('.btnRemoveChoice').forEach(btn => btn.addEventListener('click', () => {
          const card = btn.closest('.topic-question-editor');
          const rows = [...(card?.querySelectorAll('.choice-edit-row') || [])];
          const selected = rows.filter(row => row.querySelector('.choiceSelectForRemove')?.checked);
          if (!selected.length) { alert('Coche d’abord la ou les propositions à retirer.'); return; }
          if (rows.length - selected.length < 2) { alert('Une question QCM doit garder au moins 2 propositions.'); return; }
          selected.forEach(row => row.remove());
          [...(card?.querySelectorAll('.editChoice') || [])].forEach((input, idx) => input.dataset.choiceIndex = String(idx));
          const answer = card?.querySelector('.editQuestionAnswer');
          if (answer) answer.value = '0';
        }));
      }

      function buildTopicQuestionEditorCard(q, idx) {
        return `<div class="topic-question-editor" data-qid="${escapeHtml(q.id)}">
              <div class="topic-question-head"><strong>Question ${idx + 1}</strong><span class="tag">${escapeHtml(q.type || 'mcq')}</span></div>
              <label class="label">Modifier le type de question</label>
              <div class="question-type-buttons">
                <button class="btn questionTypeBtn ${q.type === 'mcq' ? 'btn--primary' : ''}" type="button" data-type="mcq">QCM simple</button>
                <button class="btn questionTypeBtn ${q.type === 'mcq_multi' ? 'btn--primary' : ''}" type="button" data-type="mcq_multi">QCM multiple</button>
                <button class="btn questionTypeBtn ${q.type === 'tf' ? 'btn--primary' : ''}" type="button" data-type="tf">Vrai/Faux</button>
              </div>
              <input type="hidden" class="editQuestionType" value="${escapeHtml(q.type || 'mcq')}">
              <label class="label">Énoncé</label><textarea class="input editQuestionText" rows="3">${escapeHtml(q.question || '')}</textarea>
              <div class="question-structure-host">${buildQuestionStructureHtml(q)}</div>
              <label class="label">Explication</label><textarea class="input editQuestionExplanation" rows="2">${escapeHtml(q.explanation || '')}</textarea>
              <div class="topic-question-remove-row"><button class="btn btn--danger btnRemoveTopicQuestion" type="button" title="Retirer cette question">-</button></div>
            </div>`;
      }

      function bindQuestionTypeButtons(scope) {
        scope.querySelectorAll('.questionTypeBtn').forEach(button => button.addEventListener('click', () => {
          const card = button.closest('.topic-question-editor');
          if (!card) return;
          card.querySelectorAll('.questionTypeBtn').forEach(b => b.classList.remove('btn--primary'));
          button.classList.add('btn--primary');
          applyQuestionTypeToCard(card, button.dataset.type || 'mcq');
        }));
      }

      function refreshTopicQuestionNumbers(scope) {
        [...(scope || document).querySelectorAll('#adminTopicEditor .topic-question-editor')].forEach((card, idx) => {
          const title = card.querySelector('.topic-question-head strong');
          if (title) title.textContent = `Question ${idx + 1}`;
        });
      }

      function bindRemoveTopicQuestionButtons(scope) {
        scope.querySelectorAll('.btnRemoveTopicQuestion').forEach(button => button.addEventListener('click', () => {
          const card = button.closest('.topic-question-editor');
          const list = card?.closest('.topic-editor-list');
          const status = document.getElementById('adminTopicEditorStatus');
          if (!card || !list) return;
          const label = card.querySelector('.topic-question-head strong')?.textContent || 'cette question';
          if (!confirm(`Retirer ${label} de la liste des questions ?`)) return;
          const id = card.dataset.qid;
          if (id) topicEditorRemovedQuestionIds.add(String(id));
          card.remove();
          refreshTopicQuestionNumbers(list);
          if (status) status.textContent = 'Question retirée de la liste. Clique sur « Enregistrer les modifications du sujet » pour sauvegarder.';
        }));
      }

      function addQuestionToTopicEditor() {
        const level = levelSelect?.value || '';
        const subject = document.getElementById('adminCatalogTopicSubject')?.value || '';
        const topic = document.getElementById('adminCatalogTopic')?.value || '';
        const list = document.querySelector('#adminTopicEditor .topic-editor-list');
        const status = document.getElementById('adminTopicEditorStatus');
        if (!level || !subject || !topic || !list) {
          if (status) status.textContent = 'Choisis d’abord un niveau, une matière et un sujet.';
          return;
        }
        const lastType = [...document.querySelectorAll('#adminTopicEditor .topic-question-editor .editQuestionType')].pop()?.value || 'mcq';
        const type = ['mcq', 'mcq_multi', 'tf'].includes(lastType) ? lastType : 'mcq';
        const newQuestion = {
          id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          level,
          subject,
          topic,
          type,
          question: 'Nouvelle question',
          explanation: ''
        };
        if (type === 'tf') {
          newQuestion.answer = true;
        } else if (type === 'mcq_multi') {
          newQuestion.choices = ['Réponse A', 'Réponse B'];
          newQuestion.answerIndices = [0];
        } else {
          newQuestion.choices = ['Réponse A', 'Réponse B'];
          newQuestion.answerIndex = 0;
        }
        const idx = list.querySelectorAll('.topic-question-editor').length;
        list.insertAdjacentHTML('beforeend', buildTopicQuestionEditorCard(newQuestion, idx));
        const card = list.lastElementChild;
        bindQuestionTypeButtons(card);
        bindChoiceButtons(card);
        bindRemoveTopicQuestionButtons(card);
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.querySelector('.editQuestionText')?.focus();
        if (status) status.textContent = 'Nouvelle question ajoutée. Clique sur « Enregistrer les modifications du sujet » pour la sauvegarder.';
      }

      function renderTopicEditor() {
        topicEditorRemovedQuestionIds = new Set();
        const box = document.getElementById('adminTopicEditor');
        if (!box) return;
        const level = levelSelect?.value || '';
        const subject = document.getElementById('adminCatalogTopicSubject')?.value || '';
        const topic = document.getElementById('adminCatalogTopic')?.value || '';
        const questions = getQuestionsForSelectedTopic();
        box.classList.remove('hidden');
        if (!level || !subject || !topic || subject === 'Aucune matière' || topic === 'Aucun sujet') {
          box.innerHTML = '<p class="muted small">Choisis d’abord un niveau, une matière et un sujet.</p>';
          return;
        }
        if (!questions.length) {
          box.innerHTML = `<p class="muted small">Aucune question trouvée pour <strong>${escapeHtml(level)}</strong> / <strong>${escapeHtml(subject)}</strong> / <strong>${escapeHtml(topic)}</strong>.</p>`;
          return;
        }
        box.innerHTML = `
          <h4 class="h3">Modifier les questions du sujet</h4>
          <p class="muted small">${questions.length} question(s) trouvée(s). Les modifications sont sauvegardées dans les paramètres du site : serveur si disponible, local sinon.</p>
          <div class="topic-editor-actions">
            <button class="btn" id="btnShowTopicDuplicates" type="button">Afficher les doublons</button>
            <button class="btn btn--danger" id="btnDeleteTopicDuplicates" type="button">Supprimer</button>
          </div>
          <div id="topicDuplicateList"></div>
          <div class="topic-editor-list">
            ${questions.map((q, idx) => buildTopicQuestionEditorCard(q, idx)).join('')}
          </div>
          <div class="topic-editor-actions">
            <button class="btn btn--primary" id="btnSaveTopicQuestions" type="button">Enregistrer les modifications du sujet</button>
            <button class="btn" id="btnAddTopicQuestion" type="button">Ajouter une question</button>
          </div>
          <div id="adminTopicEditorStatus" class="muted small" style="margin-top:8px"></div>`;
        document.getElementById('btnSaveTopicQuestions')?.addEventListener('click', saveTopicQuestionEdits);
        document.getElementById('btnAddTopicQuestion')?.addEventListener('click', addQuestionToTopicEditor);
        document.getElementById('btnShowTopicDuplicates')?.addEventListener('click', renderDuplicateTopicQuestions);
        document.getElementById('btnDeleteTopicDuplicates')?.addEventListener('click', deleteSelectedDuplicateQuestions);
        bindQuestionTypeButtons(box);
        bindChoiceButtons(box);
        bindRemoveTopicQuestionButtons(box);
      }

      async function saveTopicQuestionEdits() {
        const status = document.getElementById('adminTopicEditorStatus');
        const existingQuestions = Array.isArray(appSettings.customQuestions) ? appSettings.customQuestions : [];
        const byId = new Map(existingQuestions.map(q => [q.id, q]));
        const allById = new Map(getQuestionBank().map(q => [q.id, q]));
        const removedIds = Array.from(topicEditorRemovedQuestionIds || []).map(String);
        const edited = [];
        document.querySelectorAll('#adminTopicEditor .topic-question-editor').forEach(card => {
          const id = card.dataset.qid;
          const original = allById.get(id) || {
            id,
            level: levelSelect?.value || '',
            subject: document.getElementById('adminCatalogTopicSubject')?.value || '',
            topic: document.getElementById('adminCatalogTopic')?.value || ''
          };
          const next = { ...original };
          next.question = card.querySelector('.editQuestionText')?.value || '';
          next.explanation = card.querySelector('.editQuestionExplanation')?.value || '';
          const selectedType = card.querySelector('.editQuestionType')?.value || next.type || 'mcq';
          next.type = selectedType;
          if (selectedType === 'tf') {
            next.answer = card.querySelector('.editQuestionAnswer')?.value === 'true';
            delete next.choices; delete next.answerIndex; delete next.answerIndices;
          } else {
            let choices = [...card.querySelectorAll('.editChoice')].map(i => i.value).filter(Boolean);
            if (choices.length < 2) choices = ['Vrai', 'Faux'];
            next.choices = choices;
            const ans = card.querySelector('.editQuestionAnswer')?.value || '';
            if (selectedType === 'mcq_multi') {
              next.answerIndices = ans.split(',').map(x => Number(x.trim())).filter(n => Number.isInteger(n) && n >= 0 && n < choices.length);
              if (!next.answerIndices.length) next.answerIndices = [0];
              delete next.answerIndex; delete next.answer;
            } else {
              const n = Number(ans);
              next.answerIndex = Number.isInteger(n) && n >= 0 && n < choices.length ? n : 0;
              delete next.answerIndices; delete next.answer;
            }
          }
          const normalized = normalizeQuestion(next);
          if (normalized) {
            byId.set(normalized.id, normalized);
            edited.push(normalized);
          }
        });
        if (!edited.length && !removedIds.length) {
          if (status) status.textContent = 'Aucune modification valide à enregistrer.';
          return;
        }
        removedIds.forEach(id => byId.delete(id));
        const deletedQuestionIds = Array.from(new Set([...(appSettings.deletedQuestionIds || []), ...removedIds]));
        const settings = normalizeAppSettings({ ...collectAdminSettings(), customCatalog: adminCatalogDraft, customQuestions: Array.from(byId.values()), deletedQuestionIds });
        try {
          await apiPost('/api/admin/save-settings', currentAuthPayload({ settings }));
          if (status) status.textContent = `${edited.length} question(s) modifiée(s), ${removedIds.length} question(s) retirée(s) et enregistrée(s) en local.`;
        } catch (e) {
          if (status) status.textContent = `${edited.length} question(s) modifiée(s), ${removedIds.length} question(s) retirée(s) en mode local dans ce navigateur.`;
        }
        appSettings = settings;
        localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
        adminDECatalogIndexCache = null; bank = getQuestionBank();
        updateStartInfo();
        const editor = document.getElementById('adminTopicEditor');
        if (editor) editor.classList.add('hidden');
      }

      document.getElementById('btnEditCatalogTopic')?.addEventListener('click', (event) => { event.stopPropagation(); const box = document.getElementById('adminTopicEditor'); if (box && !box.classList.contains('hidden')) { box.classList.add('hidden'); return; } renderTopicEditor(); });
      document.getElementById('adminCatalogTopic')?.addEventListener('change', () => {
        const box = document.getElementById('adminTopicEditor');
        if (box && !box.classList.contains('hidden')) renderTopicEditor();
      });
      document.getElementById('btnValidateImportChoice')?.addEventListener('click', () => {
        const selection = getCatalogSelectionForImport();
        if (!selection) {
          setImportControlsEnabled(false, 'Choisis un niveau, une matière et un sujet valide avant de passer à l’import.');
          return;
        }
        validatedImportContext = selection;
        setImportControlsEnabled(true, `Choix validé. L’import sera appliqué à : ${selection.level} / ${selection.subject} / ${selection.topic}.`);
      });
    }

    function stripImportedQuestionWrapper(src) {
      let cleaned = String(src || '').trim();
      cleaned = cleaned
        .replace(/^\s*(?:window\.)?[A-Za-z_$][\w$]*\s*=\s*/s, '')
        .replace(/^\s*(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=\s*/s, '')
        .replace(/;\s*$/s, '')
        .trim();
      return cleaned;
    }

    function forceQuestionImportContext(question, forcedContext, index) {
      const raw = question && typeof question === 'object' ? question : {};
      const stamp = Date.now().toString(36);
      const forcedId = `custom-${normalizeKey(forcedContext.level)}-${normalizeKey(forcedContext.subject)}-${normalizeKey(forcedContext.topic)}-${stamp}-${index}-${Math.random().toString(36).slice(2, 7)}`;
      const merged = {
        ...raw,
        id: forcedId,
        level: forcedContext.level,
        subject: forcedContext.subject,
        topic: forcedContext.topic,
        category: `${forcedContext.level} — ${forcedContext.subject}`
      };
      return normalizeQuestion(merged);
    }

    function parseImportedQuestions(text, forcedContext = null) {
      const src = String(text || '').trim();
      if (!src) throw new Error('Collez d’abord un tableau de questions ou choisissez un fichier .js.');
      if (!forcedContext || !forcedContext.level || !forcedContext.subject || !forcedContext.topic) throw new Error('Valide d’abord le niveau, la matière et le sujet dans la première partie.');
      let value;
      try {
        value = JSON.parse(src);
      } catch (_) {
        const cleaned = stripImportedQuestionWrapper(src);
        value = Function(`"use strict"; return (${cleaned});`)();
      }
      if (!Array.isArray(value)) throw new Error('Le contenu doit être un tableau de questions : [{...}, {...}].');
      const normalized = value.map((q, index) => forceQuestionImportContext(q, forcedContext, index)).filter(Boolean);
      if (!normalized.length) throw new Error('Aucune question valide trouvée. Vérifiez type, question, choices/réponses et explication.');
      return normalized;
    }

    bindCatalogAdmin();

    document.getElementById('adminImportFile')?.addEventListener('change', async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const text = await file.text();
      const area = document.getElementById('adminImportScript');
      if (area) area.value = text;
    });

    document.getElementById('btnPreviewImport')?.addEventListener('click', () => {
      const status = document.getElementById('adminImportStatus');
      try {
        const imported = parseImportedQuestions(document.getElementById('adminImportScript')?.value || '', validatedImportContext);
        if (status) status.textContent = `${imported.length} question(s) valide(s) détectée(s) pour : ${validatedImportContext.level} / ${validatedImportContext.subject} / ${validatedImportContext.topic}.`;
      } catch (e) {
        if (status) status.textContent = e.message;
      }
    });

    document.getElementById('btnApplyImport')?.addEventListener('click', async () => {
      const status = document.getElementById('adminImportStatus');
      try {
        const importArea = document.getElementById('adminImportScript');
        const imported = parseImportedQuestions(importArea?.value || '', validatedImportContext);
        // Réécrit le tableau affiché avec le choix validé : ainsi level, subject et topic
        // sont visiblement remplacés dans chaque question avant l'enregistrement.
        if (importArea) importArea.value = JSON.stringify(imported, null, 2);
        const existing = Array.isArray(appSettings.customQuestions) ? appSettings.customQuestions : [];
        const byId = new Map(existing.map(q => [q.id, q]));
        for (const q of imported) byId.set(q.id, q);
        const catalog = normalizeCustomCatalog({
          ...adminCatalogDraft,
          levels: Array.from(new Set([...(adminCatalogDraft.levels || []), validatedImportContext.level])),
          subjectsByLevel: {
            ...(adminCatalogDraft.subjectsByLevel || {}),
            [validatedImportContext.level]: Array.from(new Set([...(adminCatalogDraft.subjectsByLevel?.[validatedImportContext.level] || []), validatedImportContext.subject]))
          },
          topicsByLevelSubject: {
            ...(adminCatalogDraft.topicsByLevelSubject || {}),
            [validatedImportContext.level]: {
              ...((adminCatalogDraft.topicsByLevelSubject || {})[validatedImportContext.level] || {}),
              [validatedImportContext.subject]: Array.from(new Set([...(((adminCatalogDraft.topicsByLevelSubject || {})[validatedImportContext.level] || {})[validatedImportContext.subject] || []), validatedImportContext.topic]))
            }
          }
        });
        adminCatalogDraft = catalog;
        const settings = normalizeAppSettings({
          ...collectAdminSettings(),
          customCatalog: catalog,
          customQuestions: Array.from(byId.values())
        });
        let savedOnServer = true;
        try {
          await apiPost('/api/admin/save-settings', currentAuthPayload({ settings }));
        } catch (_) {
          savedOnServer = false;
        }
        appSettings = settings;
        localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
        adminDECatalogIndexCache = null; bank = getQuestionBank();
        updateStartInfo();
        renderCatalogAdmin(validatedImportContext.level, validatedImportContext.subject, validatedImportContext.topic);
        validatedImportContext = { ...validatedImportContext };
        setImportControlsEnabled(true);
        if (status) status.textContent = `${imported.length} question(s) ajoutée(s) à ${validatedImportContext.level} / ${validatedImportContext.subject} / ${validatedImportContext.topic}. ${savedOnServer ? 'Enregistré en local.' : 'Mode local : enregistré dans ce navigateur.'} Total importé : ${appSettings.customQuestions.length}.`;
        setTimeout(collapseAdminPanels, 250);
      } catch(e) {
        if (status) status.textContent = e.data?.error || e.message;
        else alert(e.data?.error || e.message);
      }
    });

    els.adminLogs.querySelectorAll('.btnSaveAdminSettings').forEach(btn => btn.addEventListener('click', async () => {
      const settings = collectAdminSettings();
      try {
        await apiPost('/api/admin/save-settings', currentAuthPayload({ settings }));
        appSettings = settings;
        localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
        applyRuntimeSettings();
        adminDECatalogIndexCache = null; bank = getQuestionBank();
        updateStartInfo();
        if (currentMode === "de") updateDEStartInfo();
        if (els.screenQuiz && !els.screenQuiz.classList.contains('hidden')) {
          lastTimedQuestionIndex = -1;
          renderQuiz();
        }
        alert('Paramètres enregistrés et appliqués immédiatement sur les quiz.');
        collapseAdminPanels();
      } catch(e) {
        // Mode local sans PostgreSQL : les paramètres restent appliqués dans ce navigateur.
        appSettings = settings;
        localStorage.setItem(STORAGE_KEYS.appSettings, JSON.stringify(appSettings));
        notifySynthesisQuestionsUpdated('settings');
        applyRuntimeSettings();
        adminDECatalogIndexCache = null; bank = getQuestionBank();
        updateStartInfo();
        if (currentMode === "de") updateDEStartInfo();
        if (els.screenQuiz && !els.screenQuiz.classList.contains('hidden')) {
          lastTimedQuestionIndex = -1;
          renderQuiz();
        }
        alert('Mode local : paramètres enregistrés et appliqués dans ce navigateur.');
        collapseAdminPanels();
      }
    }));
  }

  const QUESTION_TIME_SEC = 40; // valeur par défaut en mode local
  const MAX_QUESTIONS_PER_SESSION = 100;
  let questionTimerId = null;
  let questionTimerRemaining = 0;
  let lastTimedQuestionIndex = -1;
  let abandonListener = null;
  let heartbeatTimerId = null;

  function safeText(s) {
    return String(s ?? "");
  }

  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.settings);
      if (!raw) return { studentName: "", shuffleQuestions: true };
      const parsed = JSON.parse(raw);
      return {
        studentName: typeof parsed.studentName === "string" ? parsed.studentName : "",
        // Toujours mélanger les questions (Quiz + EFF) pour éviter
        // un ordre fixe quand on refait le même sujet.
        shuffleQuestions: true,
      };
    } catch {
      return { studentName: "", shuffleQuestions: true };
    }
  }

  function saveSettings(next) {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(next));
  }

  function clearQuestionTimer() {
    if (questionTimerId) {
      clearInterval(questionTimerId);
      questionTimerId = null;
    }
  }

  function startQuestionTimer() {
    clearQuestionTimer();
    questionTimerRemaining = Math.max(5, Math.floor(Number(appSettings.questionTime || QUESTION_TIME_SEC)));
    if (els.quizTimer) els.quizTimer.textContent = `${questionTimerRemaining} s`;
    questionTimerId = setInterval(() => {
      questionTimerRemaining--;
      if (els.quizTimer) els.quizTimer.textContent = `${questionTimerRemaining} s`;
      if (questionTimerRemaining <= 0) {
        clearQuestionTimer();
        advanceAfterAnswer();
      }
    }, 1000);
  }

  function getRequiredAnswerCount(q) {
    if (!q) return 1;
    if (q.type === "mcq_multi" && Array.isArray(q.answerIndices)) return q.answerIndices.length;
    return 1;
  }

  function advanceAfterAnswer() {
    const atLast = session.index >= session.questions.length - 1;
    if (atLast) {
      renderQuiz();
      return;
    }
    goNext();
  }

  function advanceAfterAnswerSoon(questionId) {
    clearQuestionTimer();
    if (session.pendingAutoAdvanceTimer) {
      clearTimeout(session.pendingAutoAdvanceTimer);
      session.pendingAutoAdvanceTimer = null;
    }
    const fromQuestionId = questionId || session.questions?.[session.index]?.id;
    const delay = appSettings.instantCorrection ? 1600 : 250;
    session.pendingAutoAdvanceTimer = setTimeout(() => {
      session.pendingAutoAdvanceTimer = null;
      // Sécurité anti-saut : on avance seulement si l'utilisateur est encore sur
      // la même question. Ainsi un double clic ou un clic sur le bouton Suivant
      // ne peut plus faire passer de la question 1 à la question 3.
      if (fromQuestionId && session.questions?.[session.index]?.id !== fromQuestionId) return;
      advanceAfterAnswer();
    }, delay);
  }

  function showScreen(which) {
    if (!which) return;
    if (activeScreen && activeScreen !== which && !isReturningToPreviousScreen) {
      screenHistory.push(activeScreen);
      if (screenHistory.length > 25) screenHistory.shift();
    }
    activeScreen = which;
    if (which !== els.screenQuiz) {
      clearQuestionTimer();
      if (abandonListener) {
        window.removeEventListener('beforeunload', abandonListener);
        abandonListener = null;
      }
    } else {
      // Add abandon listener when showing quiz
      if (!abandonListener) {
        abandonListener = () => {
          session.abandoned = true;
        };
        window.addEventListener('beforeunload', abandonListener);
      }
    }
    const screens = [
      els.screenStart,
      els.screenQuiz,
      els.screenResult,
      els.screenReview,
      els.screenHistory,
      els.screenAdmin,
      els.screenDictionary,
      els.screenResumes,
    ].filter(Boolean);
    for (const s of screens) s.classList.add("hidden");
    which.classList.remove("hidden");
    if (els.btnReset) {
      els.btnReset.classList.toggle("hidden", which !== els.screenQuiz);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  function loadMedicalDictionary() {
    if (Array.isArray(window.MEDICAL_DICTIONARY)) return Promise.resolve();
    if (window.__medicalDictionaryLoading) return window.__medicalDictionaryLoading;
    window.__medicalDictionaryLoading = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "./dictionnaire.medical.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        console.warn("Dictionnaire médical non chargé.");
        window.MEDICAL_DICTIONARY = window.MEDICAL_DICTIONARY || [];
        resolve();
      };
      document.body.appendChild(script);
    });
    return window.__medicalDictionaryLoading;
  }

  function normalizeDictionaryEntry(e) {
    if (!e || typeof e !== "object") return null;
    const term = safeText(e.term).trim();
    const definition = safeText(e.definition).trim();
    if (!term || !definition) return null;
    return { term, definition };
  }

  function getDictionary() {
    const raw = Array.isArray(window.MEDICAL_DICTIONARY) ? window.MEDICAL_DICTIONARY : [];
    return raw.map(normalizeDictionaryEntry).filter(Boolean);
  }

  function renderDictionary(query) {
    if (!els.dictionaryList) return;
    const q = normalizeKey(query || "");
    const raw = Array.isArray(window.MEDICAL_DICTIONARY) ? window.MEDICAL_DICTIONARY : [];
    const tokens = q.split(" ").filter(Boolean);

    if (tokens.length === 0) {
      els.dictionaryList.innerHTML = "<p class='muted'>Saisis un mot dans la barre de recherche pour afficher les termes correspondants.</p>";
      return;
    }

    const unique = new Map();
    for (const e of raw) {
      const term = safeText(e && e.term).trim();
      const definition = safeText(e && e.definition).trim();
      if (!term || !definition) continue;
      const searchableTerm = normalizeKey(term);
      const old = unique.get(searchableTerm);
      if (!old || definition.length > old.definition.length) {
        unique.set(searchableTerm, { term, definition, searchableTerm });
      }
    }

    const items = Array.from(unique.values())
      .filter((e) => tokens.every((token) => e.searchableTerm.includes(token)))
      .sort((a, b) => {
        const aStarts = a.searchableTerm.startsWith(q) ? 0 : 1;
        const bStarts = b.searchableTerm.startsWith(q) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        const aTermMatch = tokens.every((token) => a.searchableTerm.includes(token)) ? 0 : 1;
        const bTermMatch = tokens.every((token) => b.searchableTerm.includes(token)) ? 0 : 1;
        if (aTermMatch !== bTermMatch) return aTermMatch - bTermMatch;
        return a.term.localeCompare(b.term, "fr", { sensitivity: "base" });
      });

    if (items.length === 0) {
      els.dictionaryList.innerHTML = "<p class='muted'>Aucun mot correspondant trouvé.</p>";
      return;
    }

    const maxResults = 80;
    const fragment = document.createDocumentFragment();
    const info = document.createElement("p");
    info.className = "muted small";
    info.textContent = String(items.length) + " résultat(s) trouvé(s)" + (items.length > maxResults ? " — " + String(maxResults) + " affiché(s)" : "");
    fragment.appendChild(info);

    for (const e of items.slice(0, maxResults)) {
      const item = document.createElement("div");
      item.className = "dictItem";
      const t = document.createElement("div");
      t.className = "dictItem__term";
      t.textContent = e.term;
      const d = document.createElement("div");
      d.className = "dictItem__def";
      d.textContent = e.definition;
      item.appendChild(t);
      item.appendChild(d);
      fragment.appendChild(item);
    }

    els.dictionaryList.innerHTML = "";
    els.dictionaryList.appendChild(fragment);
  }

  function buildMcqMultiFalseChoices(q) {
    const subject = safeText(q && q.subject || "la matière").trim() || "la matière";
    const topic = safeText(q && q.topic || "ce thème").trim() || "ce thème";
    const questionText = normalizeKey(q && q.question || "");

    let proposals;
    if (/signe|symptome|symptome|manifestation|clinique|diagnostic|diagnostique|tableau/.test(questionText)) {
      proposals = [
        "Absence totale de retentissement clinique malgré la situation décrite",
        "Disparition immédiate des signes sans aucune surveillance",
        "Confirmation du diagnostic sur un seul élément isolé, sans examen ni contexte"
      ];
    } else if (/traitement|prise en charge|conduite|soin|surveillance|prevention|prévention|mesure|intervention|administration/.test(questionText)) {
      proposals = [
        "Arrêt de toute surveillance après le premier geste réalisé",
        "Administration systématique d'un traitement non prescrit sans évaluation préalable",
        "Report de la prise en charge sans réévaluation clinique"
      ];
    } else if (/cause|facteur|favorise|risque|etiologie|étiologie|complication/.test(questionText)) {
      proposals = [
        "Facteur sans rapport avec le contexte clinique de " + subject,
        "Cause unique identique chez tous les patients sans exception",
        "Élément qui exclut toujours la complication au lieu de la favoriser"
      ];
    } else if (/objectif|role|rôle|principe|definition|définition|critere|critère/.test(questionText)) {
      proposals = [
        "Principe contraire aux objectifs habituels de " + subject,
        "Définition basée uniquement sur une opinion personnelle",
        "Critère valable seulement hors du thème « " + topic + " »"
      ];
    } else {
      proposals = [
        "Proposition sans lien direct avec " + subject,
        "Réponse contraire à la logique clinique du thème « " + topic + " »",
        "Affirmation systématique applicable à tous les cas sans exception"
      ];
    }

    const existing = new Set((Array.isArray(q && q.choices) ? q.choices : []).map((c) => normalizeKey(c)));
    return proposals.filter((item) => item && !existing.has(normalizeKey(item))).slice(0, 3);
  }

  function ensureMcqMultiHasThreeFalseChoices(q, choices) {
    // Demande utilisateur : ne plus ajouter automatiquement les 3 fausses propositions
    // pour les questions de type mcq_multi. On garde uniquement les propositions
    // déjà présentes dans les fichiers de questions.
    return Array.isArray(choices) ? choices : choices;
  }

  function normalizeQuestion(q) {
    if (!q || typeof q !== "object") return null;
    const level = safeText(q.level || "");
    const subject = safeText(q.subject || "");
    const topic = safeText(q.topic || "");
    const category = safeText(q.category || "");
    const computedCategory =
      level && subject ? `${level} — ${subject}` : category || (level ? level : "Sans catégorie");
    const base = {
      id: safeText(q.id),
      category: computedCategory,
      level: level || "",
      subject: subject || "",
      topic: topic || "",
      question: safeText(q.question),
      explanation: q.explanation ? safeText(q.explanation) : "",
    };

    if (q.type === "tf") {
      if (typeof q.answer !== "boolean") return null;
      return { ...base, type: "tf", answer: q.answer };
    }

    // default: mcq (une ou plusieurs bonnes réponses)
    if (!Array.isArray(q.choices) || q.choices.length < 2) return null;
    let choices = q.choices.map((c) => safeText(c));
    if (q.type === "mcq_multi" || Array.isArray(q.answerIndices)) {
      choices = ensureMcqMultiHasThreeFalseChoices(q, choices);
    }

    if (Array.isArray(q.answerIndices)) {
      const answerIndices = q.answerIndices
        .map((n) => (Number.isInteger(n) ? n : -1))
        .filter((n) => n >= 0 && n < choices.length);
      const uniqueSorted = Array.from(new Set(answerIndices)).sort((a, b) => a - b);
      if (uniqueSorted.length < 1) return null;
      return { ...base, type: "mcq_multi", choices, answerIndices: uniqueSorted };
    }

    const answerIndex = Number.isInteger(q.answerIndex) ? q.answerIndex : -1;
    if (answerIndex < 0 || answerIndex >= choices.length) return null;
    return { ...base, type: "mcq", choices, answerIndex };
  }

  // Les questions d’essai gratuit sont intégrées dans la banque principale avec
  // leur niveau/matière/sujet dédiés, afin que le comptage et le lancement passent
  // par le filtrage général niveaux/matières/sujets sans afficher 0 question.
  const QUIZ_QUESTIONS_SOURCE = (Array.isArray(window.QUIZ_QUESTIONS_QUIZ)
    ? window.QUIZ_QUESTIONS_QUIZ
    : (Array.isArray(window.QUIZ_QUESTIONS) ? window.QUIZ_QUESTIONS : []));
  const DE_QUESTIONS_SOURCE = Array.isArray(window.QUIZ_QUESTIONS_DE) ? window.QUIZ_QUESTIONS_DE : [];
  const ALL_RAW_QUESTIONS = QUIZ_QUESTIONS_SOURCE.concat(DE_QUESTIONS_SOURCE).concat(FREE_TRIAL_QUESTIONS);
  // Exposition non destructive pour la synthèse automatique : elle permet de prendre
  // en compte les questions ajoutées manuellement dans les fichiers JS et les questions EFF.
  window.QDASH_ALL_RAW_QUESTIONS = ALL_RAW_QUESTIONS;

  const QUIZ_SUBJECT_TOPICS =
    (window.SUJETS_PAR_MATIERE_QUIZ && typeof window.SUJETS_PAR_MATIERE_QUIZ === "object")
      ? window.SUJETS_PAR_MATIERE_QUIZ
      : ((window.SUJETS_PAR_MATIERE && typeof window.SUJETS_PAR_MATIERE === "object") ? window.SUJETS_PAR_MATIERE : {});

  function computeDESubjectTopicsFromQuestions() {
    const src = DE_QUESTIONS_SOURCE;
    const bySubject = {};
    for (const q of src) {
      if (!q || typeof q !== "object") continue;
      const subject = safeText(q.subject || "").trim();
      const topic = safeText(q.topic || "").trim();
      if (!subject || !topic) continue;
      if (!bySubject[subject]) bySubject[subject] = new Set();
      bySubject[subject].add(topic);
    }
    const out = {};
    for (const [subject, set] of Object.entries(bySubject)) {
      const topics = Array.from(set);
      // Tri naturel "Sujet 1..9" si applicable, sinon tri alpha
      topics.sort((a, b) => {
        const na = normalizeKey(a);
        const nb = normalizeKey(b);
        const ma = na.match(/^sujet\s*([0-9]+)$/);
        const mb = nb.match(/^sujet\s*([0-9]+)$/);
        if (ma && mb) return Number(ma[1]) - Number(mb[1]);
        return a.localeCompare(b, "fr", { sensitivity: "base" });
      });
      out[subject] = topics;
    }
    return out;
  }

  // Catalogue du bouton « Examen de Fin de Formation ».
  // Source unique demandée : sujets.de.js (window.SUJETS_PAR_MATIERE_DE).
  // On ne complète plus l'affichage avec sujets.js, SUBJECTS_BY_LEVEL ou les questions,
  // car cela masquait/remplaçait certaines matières et sujets spécifiques du fichier DE.
  const DE_SUBJECT_TOPICS = (() => {
    const out = {};
    const dedicated = (window.SUJETS_PAR_MATIERE_DE && typeof window.SUJETS_PAR_MATIERE_DE === "object")
      ? window.SUJETS_PAR_MATIERE_DE
      : {};

    Object.keys(dedicated).forEach((subject) => {
      const s = safeText(subject).trim();
      if (!s) return;
      const seen = new Set();
      out[s] = (Array.isArray(dedicated[subject]) ? dedicated[subject] : [])
        .map((topic) => safeText(topic).trim())
        .filter((topic) => {
          const key = normalizeKey(topic);
          if (!topic || seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      out[s] = sortTopicsList(out[s]);
    });

    return out;
  })();

  function addUniqueLabel(list, seen, value) {
    const label = safeText(value).trim();
    const key = normalizeKey(label);
    if (!label || seen.has(key)) return;
    seen.add(key);
    list.push(label);
  }

  function getEFFSubjectsForTrack(track) {
    // Le bouton EFF doit afficher les matières exactement depuis sujets.de.js.
    // Le paramètre track garde uniquement les droits d'accès ailleurs ; il ne filtre pas cette liste.
    const subjects = [];
    const seen = new Set();
    Object.keys(DE_SUBJECT_TOPICS || {}).forEach((subject) => addUniqueLabel(subjects, seen, subject));
    return subjects;
  }


  function notifySynthesisQuestionsUpdated(source = 'admin') {
    try {
      appSettings.__questionsVersion = (Number(appSettings.__questionsVersion) || 0) + 1;
      if (typeof invalidateQuestionBankCache === 'function') invalidateQuestionBankCache();
      window.dispatchEvent(new CustomEvent('qdash:questions-updated', { detail: { source } }));
      if (typeof window.QDASH_REFRESH_SYNTHESIS === 'function') window.QDASH_REFRESH_SYNTHESIS();
    } catch (_) {}
  }

  let questionBankCacheKey = '';
  let questionBankCache = null;
  function invalidateQuestionBankCache() {
    questionBankCacheKey = '';
    questionBankCache = null;
  }
  window.QDASH_INVALIDATE_QUESTION_BANK = invalidateQuestionBankCache;

  function getQuestionBank() {
    const customQuestions = Array.isArray(appSettings.customQuestions) ? appSettings.customQuestions : [];
    const deletedList = Array.isArray(appSettings.deletedQuestionIds) ? appSettings.deletedQuestionIds : [];
    const cacheKey = [
      ALL_RAW_QUESTIONS.length,
      customQuestions.length,
      deletedList.length,
      appSettings.__questionsVersion || 0
    ].join('|');
    if (questionBankCache && questionBankCacheKey === cacheKey) return questionBankCache;

    const deletedIds = new Set(deletedList.map(String));
    const raw = ALL_RAW_QUESTIONS.concat(customQuestions);
    const normalized = raw.map(normalizeQuestion).filter(Boolean);
    // Suppression des doublons par id : les questions modifiées dans l'administration
    // passent après la base et remplacent donc la version d'origine.
    const byId = new Map();
    for (const q of normalized) {
      if (!q.id) continue;
      byId.set(q.id, q);
    }
    // Suppression globale des doublons de questions :
    // - on garde une seule question quand le libellé est identique dans le même niveau ;
    // - cela concerne les questions des fichiers manuels et celles ajoutées depuis l’administration ;
    // - les questions d’un autre niveau sont conservées pour ne pas vider les comptes d’autres utilisateurs.
    const seenQuestionTexts = new Set();
    const cleanedQuestions = [];
    for (const q of Array.from(byId.values())) {
      if (!q || !q.id || deletedIds.has(String(q.id))) continue;
      const questionText = normalizeKey(q.question || q.text || q.statement || "");
      const levelKey = normalizeKey(q.level || "");
      const duplicateKey = [levelKey, questionText].join("|");
      if (questionText && seenQuestionTexts.has(duplicateKey)) continue;
      if (questionText) seenQuestionTexts.add(duplicateKey);
      cleanedQuestions.push(q);
    }
    questionBankCache = cleanedQuestions;
    questionBankCacheKey = cacheKey;
    return questionBankCache;
  }

  function getFreeTrialQuestionLimit() {
    const n = Math.floor(Number(appSettings.freeTrialQuestions));
    return Number.isFinite(n) && n > 0 ? n : 20;
  }

  function normalizeFreeTrialQuestion(q, index = 0) {
    if (!q || typeof q !== "object") return null;
    const source = {
      ...q,
      id: safeText(q.id || `essai-gratuit-${index + 1}`),
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      question: safeText(q.question || q.text || q.statement || ""),
    };

    // On essaye d'abord la normalisation existante. Si une ancienne structure
    // de question la fait échouer, on reconstruit uniquement pour l'essai gratuit.
    const normalized = normalizeQuestion(source);
    if (normalized) return normalized;

    const base = {
      id: source.id,
      category: `${FREE_TRIAL_LEVEL} — ${FREE_TRIAL_SUBJECT}`,
      level: FREE_TRIAL_LEVEL,
      subject: FREE_TRIAL_SUBJECT,
      topic: FREE_TRIAL_TOPIC,
      question: source.question,
      explanation: source.explanation ? safeText(source.explanation) : "",
    };

    if (source.type === "tf" && typeof source.answer === "boolean" && base.question) {
      return { ...base, type: "tf", answer: source.answer };
    }

    if (Array.isArray(source.choices) && source.choices.length >= 2 && base.question) {
      const choices = source.choices.map((choice) => safeText(choice));
      if (Array.isArray(source.answerIndices)) {
        const answerIndices = source.answerIndices
          .map((n) => (Number.isInteger(n) ? n : -1))
          .filter((n) => n >= 0 && n < choices.length);
        const uniqueSorted = Array.from(new Set(answerIndices)).sort((a, b) => a - b);
        if (uniqueSorted.length) return { ...base, type: "mcq_multi", choices, answerIndices: uniqueSorted };
      }
      const answerIndex = Number.isInteger(source.answerIndex) ? source.answerIndex : 0;
      if (answerIndex >= 0 && answerIndex < choices.length) return { ...base, type: "mcq", choices, answerIndex };
    }

    return null;
  }

  function getFreeTrialAvailableQuestions() {
    // Essai gratuit : les questions intégrées sont d'abord présentes dans la banque,
    // puis elles sont retrouvées par le filtrage général niveau / matière / sujet.
    let filtered = [];
    try {
      filtered = filterBank(getQuestionBank(), {
        level: FREE_TRIAL_LEVEL,
        subject: FREE_TRIAL_SUBJECT,
        topic: FREE_TRIAL_TOPIC,
      });
    } catch (_) {
      filtered = [];
    }

    // Sécurité : si une ancienne version du navigateur n'a pas encore reconstruit
    // la banque, on réinjecte les questions intégrées puis on garde la même structure.
    if (!Array.isArray(filtered) || filtered.length === 0) {
      filtered = FREE_TRIAL_QUESTIONS
        .map((q, index) => normalizeFreeTrialQuestion(q, index))
        .filter(Boolean);
    }

    const byId = new Map();
    filtered.forEach((q, index) => {
      const item = normalizeFreeTrialQuestion(q, index) || normalizeQuestion(q);
      if (item && item.id) byId.set(String(item.id), item);
    });

    return Array.from(byId.values()).slice(0, getFreeTrialQuestionLimit());
  }

  function renderFreeTrialStartInfo() {
    if (!els.selectLevel || !els.selectSubject || !els.selectTopic) return;
    freeTrialSessionActive = true;
    currentMode = "normal";
    session.level = FREE_TRIAL_LEVEL;
    session.subject = FREE_TRIAL_SUBJECT;
    session.topic = FREE_TRIAL_TOPIC;
    setOptions(els.selectLevel, [FREE_TRIAL_LEVEL], FREE_TRIAL_LEVEL);
    setOptions(els.selectSubject, [FREE_TRIAL_SUBJECT], FREE_TRIAL_SUBJECT);
    setOptions(els.selectTopic, [FREE_TRIAL_TOPIC], FREE_TRIAL_TOPIC);
    if (els.modeDE) els.modeDE.classList.add("hidden");
    if (els.modeNormal) els.modeNormal.classList.remove("hidden");
    if (els.btnModeDE) els.btnModeDE.style.display = "none";
    if (els.btnModeQuiz) els.btnModeQuiz.classList.add("active");

    const freeQuestions = getFreeTrialAvailableQuestions();
    if (els.questionBankInfo) {
      els.questionBankInfo.textContent = `${freeQuestions.length} question${freeQuestions.length > 1 ? "s" : ""} dispo`;
    }
    if (els.btnStart) els.btnStart.disabled = freeQuestions.length === 0;
  }

  const ALL_LEVELS = [
    "A1-Base Santé",
    "A2-Niveau moyen",
    "INF/SAG-M",
    "AUXI",
    "L1-Niveau Émergent",
    "L2-Niveau Ascendant",
    "L3-Niveau Accompli SF",
    "L3-Niveau Accompli INF",
  ];

  // Matières affichées dans la liste déroulante.
  // On les tire de `sujets.js` pour éviter les oublis quand on ajoute de nouvelles matières.
  const ALL_SUBJECTS =
    (QUIZ_SUBJECT_TOPICS && typeof QUIZ_SUBJECT_TOPICS === "object")
      ? Object.keys(QUIZ_SUBJECT_TOPICS)
      : ["Pédiatrie", "Santé Publique", "Pathologies churigicale / Sémiologie", "Pathologies médicales / Sémiologie"];

  // Normalisation pour éviter les problèmes quand on saisit/édite des matières et sujets
  // (casse, espaces en trop, accents).
  function normalizeKey(s) {
    return safeText(s)
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase()
      // Retire les accents (ex: "physiologie" == "physiologie")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // Map: subject normalisé -> { originalKey, topics }
  const SUBJECT_TOPICS_BY_NORM = (() => {
    const raw = QUIZ_SUBJECT_TOPICS;
    const out = {};
    for (const [key, topics] of Object.entries(raw)) {
      const norm = normalizeKey(key);
      if (out[norm]) continue; // éviter les collisions : on garde le premier
      out[norm] = {
        originalKey: key,
        topics: Array.isArray(topics) ? topics : [],
      };
    }
    return out;
  })();

 function computeLevels() {
  const user = localStorage.getItem(STORAGE_KEYS.user);

  // Dans « Commencer un quiz », les niveaux EFF ne doivent jamais apparaître.
  // INF/SAG-M et AUXI sont réservés au bouton « Examen de fin de Formation ».
  const QUIZ_LEVELS = [
    "A1-Base Santé",
    "A2-Niveau moyen",
    "L1-Niveau Émergent",
    "L2-Niveau Ascendant",
    "L3-Niveau Accompli SF",
    "L3-Niveau Accompli INF",
  ];

  const isCurrentAdmin = () => {
    const current = safeText(user).trim();
    return !!(
      current &&
      Array.isArray(window.ADMINS) &&
      window.ADMINS.some((admin) => normalizeKey(admin) === normalizeKey(current))
    );
  };

  const canonicalQuizLevel = (level) => {
    const n = normalizeKey(level);
    if (!n) return "";
    if (n === normalizeKey("A1-Base Santé")) return "A1-Base Santé";
    if (n === normalizeKey("A2-Niveau moyen") || n.includes("auxiliaire") || n === normalizeKey("AUXI")) return "A2-Niveau moyen";
    if (n === normalizeKey("L1-Niveau Émergent") || n === normalizeKey("L1-Niveau Emergent") || n.includes("licence 1")) return "L1-Niveau Émergent";
    if (n === normalizeKey("L2-Niveau Ascendant") || n.includes("licence 2")) return "L2-Niveau Ascendant";
    if (n === normalizeKey("L3-Niveau Accompli INF") || n.includes("licence 3 ide")) return "L3-Niveau Accompli INF";
    if (n === normalizeKey("L3-Niveau Accompli SF") || n.includes("licence 3 sfm")) return "L3-Niveau Accompli SF";
    // INF/SAG-M appartient à l'EFF, mais l'utilisateur L3 garde son niveau classique dans Quiz.
    if (n === normalizeKey("INF/SAG-M") || n.includes("licence 3 inf/sag-m")) return "L3-Niveau Accompli SF";
    return QUIZ_LEVELS.find((lv) => normalizeKey(lv) === n) || "";
  };

  const uniqueQuizLevels = (levels) => {
    const out = [];
    const seen = new Set();
    for (const raw of levels || []) {
      const lv = canonicalQuizLevel(raw);
      if (!lv) continue;
      const key = normalizeKey(lv);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(lv);
    }
    return out;
  };

  // En mode essai gratuit, on garde le comportement de découverte, sans afficher INF/SAG-M/AUXI.
  if (isFreeTrialUser(user)) return ["Tous les niveaux", ...QUIZ_LEVELS, FREE_TRIAL_LEVEL];

  const userConfig = getCurrentUserConfig();
  if (!userConfig) return [];

  // Exception demandée : seuls les administrateurs peuvent voir tous les niveaux classiques.
  if (isCurrentAdmin()) {
    return QUIZ_LEVELS;
  }

  // Sécurité : un compte non administrateur ne doit pas obtenir tous les niveaux
  // même si sa configuration contient par erreur levels: "all".
  if (userConfig.levels === "all") {
    return [];
  }

  if (Array.isArray(userConfig.levels)) {
    const hasAll = userConfig.levels.some((lv) => {
      const n = normalizeKey(lv);
      return n === "all" || n === normalizeKey("Tous les niveaux");
    });
    // Sécurité : "Tous les niveaux" ne donne tous les niveaux qu'aux administrateurs.
    if (hasAll && isCurrentAdmin()) return QUIZ_LEVELS;
    if (hasAll) return [];
    return uniqueQuizLevels(userConfig.levels);
  }

  return [];
}


  const SUBJECTS_BY_LEVEL_RESTRICTED = {
  "A1-Base Santé": [
    "Sémiologie médical",
    "Anatomie physiologie",
    "Spécialités médicales et chirurgicales",
    "Pédiatrie",
    "Néonatalogie",
    "Diététique",
    "Santé publique et communautaire et psychologique",
    "Rédaction administrative",
    "Rédaction de rapports de stage",
    "Informatique",
    "Pathologies médicale et chirurgicale",
    "Radiologie",
    "Laboratoire et pharmacologie",
    "Hygiène et assainissement",
    "Biosecurité",
    "Éthique et déontologie",
    "Hygiène hospitalière",
    "Soins infirmiers de bases-accueil",
    "SOINS HUMANISES",
    "ergonomie",
    "Manutention",
    "Secourisme"
  ],
  "L1-Niveau Émergent": [
    "Pédiatrie",
    "Santé Publique",
    "Pathologies churigicale / Sémiologie",
    "Pathologies médicales / Sémiologie",
    "Anatomie physiologie appareils",
    "Anatomie physiologie obstétricale",
    "Anatomie Physiologie : Cellules et tissus/ostéologie/myologie/système nerveux/glandes endocrines",
    "Soins aux enfants",
    "Diététique",
    "Bactériologie",
    "Parasitologie",
    "IST/VIH",
    "Maladies parasitaires et infectieuses",
    "Pathologies respiratoires",
    "Maladies non transmissibles",
    "Théorie et concepts des Soins Infirmiers / Obstétricaux / Relation d’aide",
    "Psycho-sociologie",
    "Anthropologie de la santé",
    "Secourisme",
    "Prévention des infections / Hygiène hospitalière",
    "Soins infirmiers obstétricaux / néonataux de base / infantiles",
    "Déontologie et éthique professionnelle",
    "Législation du travail",
    "Anglais de la santé",
    "Informatique",
    "Hygiène et assainissement",
    "Soins de santé primaire",
    "Epidémiologie",
    "Biochimie",
    "Immunologie",
    "Hématologie",
    "Droit administratif",
    "Droit civil",
    "Pharmacologie",
    "Bonnes pratiques des Infirmier(e)s/Sages-femmes"
  ],
  "L2-Niveau Ascendant": [
    "Chirugie pédiatrique/Pathologies chirurrgicales",
    "Initiation a la kinésitherapie",
    "Déontologie de la sage femme",
    "Santé de la reproduction planification familiale",
    "Gériatrie/Gérontologie",
    "Approche genre/santé sexuelle/santé de la reproduction des adolescents et des jeunes/gestion logistique",
    "Psychologie médicale",
    "Réanimation",
    "Soins obstetricaux et néonataux d'urgence",
    "Pharmacologie",
    "Soins infirmiers dans les pathologies médicales",
    "Techniques de soins infirmiers",
    "Gynécologie-obstétrique (SFM)",
    "Gynécologie-obstétrique (IDE)",
    "Consultation enfant sain",
    "Pédiatrie",
    "Santé Publique",
    "Pathologies churigicale / Sémiologie",
    "Pathologies médicales / Sémiologie",
    "Anglais de la santé",
    "Bonnes pratiques des Infirmier(e)s",
    "Bonnes pratiques des Sages-femmes",
    "IST/VIH",
  ],
  "L3-Niveau Accompli INF": [
    "Imagerie médicale",
    "Gestion des catastrophes",
    "Gouvernance et Organisation du Système de Santé Communautaire",
    "Organisation d’une séance de Vaccination / Sécurité des injections",
    "Oncologie",
    "Neuropsychiatrie",
    "Endocrinologie",
    "Hépato-gastro-entérologie",
    "Cardiologie",
    "Dermatologie",
    "Néphrologie",
    "Odonto-Stomatologie",
    "Ophtalmologie",
    "Neurochirurgie",
    "ORL",
    "Pédiatrie (PCIMNE 'AGE DE 2 mois à 5 ans')",
    "Pédiatrie (PCIMNE 'AGE DE 1 semaine à 2 mois')",
    "Pédiatrie (PCIMNE 'AGE DE 0 à 1 semaine')",
    "Surveillances thérapeutiques",
    "Droit administratif",
    "Soins infirmiers spécialisés en médecine",
    "Soins palliatifs",
    "Soins infirmiers spécialisés en chirurgie",
    "Gestion Hospitalière",
    "Analyse des données quantitatives et qualitatives",
    "Approche genre/santé sexuelle/santé de la reproduction des adolescents et des jeunes/gestion logistique",
    "Psychiatrie",
    "Psychosociologie de la santé",
    "Dermato-Venerologie",
    "Fonction Publique",
    "Pathologies médico-churigicale / Stomatologie",
    "ophtalmologie",
    "Bonnes pratiques des Infirmier(e)s"
  ],
  "L3-Niveau Accompli SF": [
    "Pathologies gynécologiques III",
    "Pathologies obstétricales III",
    "Hygiène menstruelle",
    "Violences Basées sur Genre / Encadrement (Egalité - Equité)",
    "Imagerie médicale",
    "Gestion des catastrophes",
    "Gouvernance et Organisation du Système de Santé Communautaire",
    "Organisation d’une séance de Vaccination / Sécurité des injections",
    "Psychiatrie",
    "Pédiatrie (PCIMNE 'AGE DE 2 mois à 5 ans')",
    "Pédiatrie (PCIMNE 'AGE DE 1 semaine à 2 mois')",
    "Pédiatrie (PCIMNE 'AGE DE 0 à 1 semaine')",
    "Soins obstétricaux et néonataux d’urgence de base (SONUB)",
    "Soins obstétricaux et néonataux d’urgence complets (SONUC)",
    "Présentation de cas cliniques",
    "Stage en soins infirmiers et Obstétricaux",
    "Droit administratif / Responsabilité médicale",
    "Sécurité sociale",
    "Gestion Hospitalière / Rédaction Administrative",
    "Soins infirmiers obstétricaux et néonataux",
    "Consultation Postnatale (CPoN)",
    "Ventouse obstétricale",
    "Aspiration Manuelle Intra- Utérine (AMIU) / Soins Post Avortement",
    "Prise en charge des substances psychoactives",
    "Gériatrie",
    "Soins palliatifs",
    "Analyse des données qualitatives et quantitatives",
    "Clinique Obstetricale",
    "Soins Palliatifs",
    "Neurologie",
    "Approche genre/santé sexuelle/santé de la reproduction des adolescents et des jeunes/gestion logistique",
    "Psychosociologie de la santé",
    "Dermato-Venerologie",
    "Fonction Publique",
    "Pathologies médico-churigicale / Stomatologie",
    "ORL",
    "ophtalmologie",
    "Gynécologie-Obstétrique",
    "Soins obstétricaux et néonataux d’urgence(SONU)",
    "Bonnes pratiques des Sages-femmes"


  ],
  "A2-Niveau moyen": [
    "Sémiologie médical",
    "Anatomie physiologie",
    "Spécialités médicales et chirurgicales",
    "Pédiatrie",
    "Néonatalogie",
    "Diététique",
    "Santé publique et communautaire et psychologique",
    "Rédaction administrative",
    "Rédaction de rapports de stage",
    "Informatique",
    "Pathologies médicale et chirurgicale",
    "Radiologie",
    "Laboratoire et pharmacologie",
    "Hygiène et assainissement",
    "Biosecurité",
    "Éthique et déontologie",
    "Hygiène hospitalière",
    "Soins infirmiers de bases-accueil",
    "SOINS HUMANISES",
    "ergonomie",
    "Manutention",
    "Secourisme"
  ]
};

  function getAllowedSubjectsForLevel(level) {
    const nLevel = normalizeKey(level);
    for (const [levelName, subjects] of Object.entries(SUBJECTS_BY_LEVEL_RESTRICTED)) {
      if (nLevel === normalizeKey(levelName) && Array.isArray(subjects)) {
        return subjects.map((s) => safeText(s).trim()).filter(Boolean);
      }
    }
    if (window.SUBJECTS_BY_LEVEL && typeof window.SUBJECTS_BY_LEVEL === "object") {
      for (const [levelName, subjects] of Object.entries(window.SUBJECTS_BY_LEVEL)) {
        if (nLevel === normalizeKey(levelName) && Array.isArray(subjects)) {
          return subjects.map((s) => safeText(s).trim()).filter(Boolean);
        }
      }
    }
    return [];
  }

  function getCustomSubjectsForLevel(level) {
    const catalog = normalizeCustomCatalog(appSettings.customCatalog || {});
    const subjects = [];
    for (const [levelName, list] of Object.entries(catalog.subjectsByLevel || {})) {
      if (normalizeKey(levelName) === normalizeKey(level)) subjects.push(...(Array.isArray(list) ? list : []));
    }
    return Array.from(new Set(subjects.map((s) => safeText(s).trim()).filter(Boolean)));
  }

  function getCustomTopicsForLevelSubject(level, subject) {
    const catalog = normalizeCustomCatalog(appSettings.customCatalog || {});
    const topics = [];
    for (const [levelName, bySubject] of Object.entries(catalog.topicsByLevelSubject || {})) {
      if (normalizeKey(levelName) !== normalizeKey(level)) continue;
      for (const [subjectName, list] of Object.entries(bySubject || {})) {
        if (normalizeKey(subjectName) === normalizeKey(subject)) topics.push(...(Array.isArray(list) ? list : []));
      }
    }
    return Array.from(new Set(topics.map((t) => safeText(t).trim()).filter(Boolean)));
  }

  function getAllowedSubjectsIncludingCustom(level) {
    const unique = (arr) => Array.from(new Set((arr || []).map((s) => safeText(s).trim()).filter(Boolean)));
    return unique([...(getAllowedSubjectsForLevel(level) || []), ...(getCustomSubjectsForLevel(level) || [])]);
  }

  function isRestrictedQuizLevel(level) {
    const n = normalizeKey(level);
    return n === normalizeKey("A1-Base Santé") ||
      n === normalizeKey("L1-Niveau Émergent") ||
      n === normalizeKey("L1-Niveau Emergent") ||
      n === normalizeKey("L2-Niveau Ascendant");
  }

  function computeSubjectsForLevel(level) {
    if (isFreeTrialUser() && normalizeKey(level) === normalizeKey(FREE_TRIAL_LEVEL)) return [FREE_TRIAL_SUBJECT];
    const unique = (arr) => Array.from(new Set((arr || []).map((s) => safeText(s).trim()).filter(Boolean)));

    // Comptes locaux et comptes serveur : pour A1, L1 et L2, on affiche uniquement
    // les matières liées au niveau choisi. Aucune matière d'un autre niveau ne doit remonter
    // depuis la banque globale de questions.
    const restrictedSubjects = getAllowedSubjectsForLevel(level);
    const customSubjects = getCustomSubjectsForLevel(level);
    const subjectsFromQuestionsSameLevel = getQuestionBank()
      .filter((q) => !level || level === "Tous les niveaux" || levelMatches(q.level, level))
      .map((q) => q.subject);

    // Liste imposée par niveau : pour les comptes locaux et les comptes serveur,
    // un niveau ne doit afficher QUE les matières prévues pour ce niveau.
    // On n'ajoute donc pas les matières trouvées dans la banque globale de questions,
    // car elles peuvent appartenir à un autre niveau.
    if (restrictedSubjects.length > 0) {
      // Les matières ajoutées dans « Paramètres » doivent aussi
      // apparaître pour le niveau choisi. Avant correction, les niveaux avec liste
      // imposée (A1, L1, L2...) ignoraient customSubjects.
      return ["Toutes les matières", ...unique(restrictedSubjects.concat(customSubjects))];
    }

    return ["Toutes les matières", ...unique(ALL_SUBJECTS.concat(customSubjects).concat(subjectsFromQuestionsSameLevel))];
  }

  function sortTopicsList(topics) {
    return Array.from(new Set((topics || []).map((t) => safeText(t).trim()).filter(Boolean))).sort((a, b) => {
      const na = normalizeKey(a);
      const nb = normalizeKey(b);
      const ma = na.match(/^sujet\s*([0-9]+)$/);
      const mb = nb.match(/^sujet\s*([0-9]+)$/);
      if (ma && mb) return Number(ma[1]) - Number(mb[1]);
      return a.localeCompare(b, "fr", { sensitivity: "base" });
    });
  }

  function computeTopicsForLevelSubject(level, subject) {
    const currentLevelForTopics = level || (els.selectLevel && els.selectLevel.value) || session.level || "";

    if (isFreeTrialUser() && normalizeKey(subject) === normalizeKey(FREE_TRIAL_SUBJECT)) return [FREE_TRIAL_TOPIC];
    if (!subject || subject === "Toutes les matières") return ["Tous les sujets"];

    const subjectKey = normalizeKey(subject);
    const entry = SUBJECT_TOPICS_BY_NORM[subjectKey];
    const customTopics = getCustomTopicsForLevelSubject(currentLevelForTopics, subject);

    // Correction : la liste « Sujet (thème) » doit toujours apparaître après le choix
    // du niveau et de la matière. On cherche d'abord les sujets dans les questions du
    // niveau choisi, puis dans le catalogue personnalisé, puis dans sujets.js.
    // Les comparaisons sont normalisées pour accepter les espaces, accents et variantes.
    const topicsFromCurrentLevel = getQuestionBank()
      .filter((q) => !currentLevelForTopics || levelMatches(q.level, currentLevelForTopics))
      .filter((q) => normalizeKey(q.subject) === subjectKey)
      .map((q) => safeText(q.topic).trim())
      .filter(Boolean);

    let topics = [];
    topics = topics.concat(topicsFromCurrentLevel);
    topics = topics.concat(customTopics);
    if (entry && Array.isArray(entry.topics)) topics = topics.concat(entry.topics);

    // Sécurité pour les matières autorisées par niveau qui n'ont pas encore de questions
    // ou dont les sujets n'ont pas encore été enregistrés : le menu reste visible avec
    // les sujets standards afin que l'utilisateur puisse sélectionner un thème.
    const allowedSubjects = getAllowedSubjectsIncludingCustom(currentLevelForTopics).map((s) => normalizeKey(s));
    const isAllowedSubject = allowedSubjects.includes(subjectKey);
    if (isAllowedSubject && topics.length === 0) {
      topics = ["Sujet 1", "Sujet 2", "Sujet 3", "Sujet 4", "Sujet 5"];
    }

    const sorted = sortTopicsList(topics);
    return ["Tous les sujets"].concat(sorted.length ? sorted : ["Sujet 1", "Sujet 2", "Sujet 3", "Sujet 4", "Sujet 5"]);
  }

  function computeTopicsForSubject(subject) {
    const currentLevelForTopics = (els.selectLevel && els.selectLevel.value) || session.level || "";
    return computeTopicsForLevelSubject(currentLevelForTopics, subject);
  }

  function setOptions(select, options, valueToSelect) {
    select.innerHTML = "";
    for (const opt of options) {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      select.appendChild(o);
    }
    if (valueToSelect && options.includes(valueToSelect)) select.value = valueToSelect;
  }

  let currentMode = "normal";
  let activeScreen = null;
  const screenHistory = [];
  let isReturningToPreviousScreen = false;

  const DE_TRACKS_ALL = [
    { value: "INF/SAG-M", label: "INF/SAG-M" },
    { value: "AUXI", label: "AUXI" },
  ];

  function getAllowedDETracks() {
    const user = localStorage.getItem(STORAGE_KEYS.user);
    const userConfig = getCurrentUserConfig();

    const isAdminUser = !!(
      user &&
      Array.isArray(window.ADMINS) &&
      window.ADMINS.some((admin) => normalizeKey(admin) === normalizeKey(user))
    );

    if (isAdminUser) return DE_TRACKS_ALL.slice();
    if (!userConfig) return [];

    // Correction EFF 31/05/2026 : certains comptes admin / super-utilisateurs
    // sont enregistrés sous levels: "all" OU levels: ["all"]. Dans le second cas,
    // le bouton EFF apparaissait grâce à hasDEAccess(), mais la liste des voies
    // restait vide. On traite les deux formats sans toucher aux autres droits.
    if (userConfig.levels === "all") return DE_TRACKS_ALL.slice();
    if (Array.isArray(userConfig.levels)) {
      const hasAll = userConfig.levels.some((lv) => {
        const n = normalizeKey(lv);
        return n === "all" || n === normalizeKey("Tous les niveaux");
      });
      if (hasAll) return DE_TRACKS_ALL.slice();
    }
    if (!Array.isArray(userConfig.levels)) return [];

    const levels = normalizeAccountLevels(userConfig.levels).map((lv) => normalizeKey(lv));
    const tracks = [];

    // A2-Niveau moyen : accès uniquement aux sujets du niveau AUXI.
    if (levels.includes(normalizeKey("A2-Niveau moyen")) || levels.includes(normalizeKey("AUXI"))) {
      tracks.push({ value: "AUXI", label: "AUXI" });
    }

    // L3-Niveau Accompli SF / INF : accès uniquement aux sujets du niveau INF/SAG-M.
    if (
      levels.includes(normalizeKey("L3-Niveau Accompli SF")) ||
      levels.includes(normalizeKey("L3-Niveau Accompli INF")) ||
      levels.includes(normalizeKey("INF/SAG-M"))
    ) {
      tracks.push({ value: "INF/SAG-M", label: "INF/SAG-M" });
    }

    const seen = new Set();
    return tracks.filter((track) => {
      if (seen.has(track.value)) return false;
      seen.add(track.value);
      return true;
    });
  }

  const DE_SUBJECTS_FIXED = [
    "Pédiatrie",
    "Santé Publique",
    "Médecine",
    "Chirurgie",
    "Planning Famillial",
    "Gynécologie",
  ];

  const DE_TOPICS_FIXED = [
    "Sujet 1",
    "Sujet 2",
    "Sujet 3",
    "Sujet 4",
    "Sujet 5",
    "Sujet 6",
    "Sujet 7",
    "Sujet 8",
    "Sujet 9",
  ];

  function getDESubjects(trackValue) {
    // Correction renforcée EFF 31/05/2026 : l'affichage dépend de la voie choisie
    // (INF/SAG-M ou AUXI) et utilise les listes spécifiques déclarées dans sujets.js
    // + sujets.de.js, pas uniquement les questions déjà présentes.
    const track = trackValue || (els.selectDETrack && els.selectDETrack.value) || "";
    const subjects = [];
    const seen = new Set();
    getEFFSubjectsForTrack(track).forEach((value) => addUniqueLabel(subjects, seen, value));
    if (subjects.length === 0) DE_SUBJECTS_FIXED.forEach((value) => addUniqueLabel(subjects, seen, value));
    return subjects.map((label) => ({ value: label, label }));
  }

  function getDETopicsForSubject(subject) {
    // Correction EFF 31/05/2026 : les sujets affichés viennent de la liste
    // spécifique du bouton EFF. Les questions restent filtrées ensuite par
    // niveau/matière/sujet, mais l'affichage du menu ne dépend plus de la banque globale.
    const subjectKey = normalizeKey(subject);
    let configuredTopics = [];

    if (DE_SUBJECT_TOPICS && typeof DE_SUBJECT_TOPICS === 'object') {
      const configuredSubject = Object.keys(DE_SUBJECT_TOPICS).find((key) => normalizeKey(key) === subjectKey);
      if (configuredSubject && Array.isArray(DE_SUBJECT_TOPICS[configuredSubject])) {
        configuredTopics = DE_SUBJECT_TOPICS[configuredSubject];
      }
    }

    const topics = [];
    const seen = new Set();
    const add = (value) => addUniqueLabel(topics, seen, value);

    configuredTopics.forEach(add);

    // Source unique demandée : seuls les sujets déclarés dans sujets.de.js sont affichés.
    if (topics.length === 0) DE_TOPICS_FIXED.forEach(add);
    return sortTopicsList(topics);
  }

  function setOptionsObjects(select, items, valueToSelect) {
    select.innerHTML = "";
    for (const item of items) {
      const o = document.createElement("option");
      o.value = item.value;
      o.textContent = item.label;
      select.appendChild(o);
    }
    if (valueToSelect && items.some((i) => i.value === valueToSelect)) select.value = valueToSelect;
  }

  const LEVEL_ALIASES = {
    "a1-base sante": ["a1-base sante", "auxiliaire 1 annee"],
    "a2-niveau moyen": ["a2-niveau moyen", "auxiliaire 2 annee", "auxi 2 annee", "auxi"],
    "auxi": ["auxi", "a2-niveau moyen", "auxiliaire", "auxiliaire 2 annee", "auxi 2 annee"],
    "inf/sag-m": ["inf/sag-m", "ide/sfm", "licence 3 ide", "licence 3 sfm", "licence 3 ide/sfm", "licence 3 inf/sag-m", "l3-niveau accompli inf", "l3-niveau accompli sf"],
    "l1-niveau emergent": ["l1-niveau emergent", "licence 1 ide/sfm", "licence 1 inf/sag-m"],
    "l2-niveau ascendant": ["l2-niveau ascendant", "licence 2 ide/sfm", "licence 2 inf/sag-m"],
    "l3-niveau accompli inf": ["l3-niveau accompli inf", "licence 3 ide", "licence 3 ide/sfm", "licence 3 inf/sag-m", "inf/sag-m"],
    "l3-niveau accompli sf": ["l3-niveau accompli sf", "licence 3 sfm", "licence 3 ide/sfm", "licence 3 inf/sag-m", "inf/sag-m"],
  };

  function levelMatches(questionLevel, selectedLevel) {
    const nSelected = normalizeKey(selectedLevel);
    const nQuestion = normalizeKey(questionLevel);
    const aliases = LEVEL_ALIASES[nSelected] || [nSelected];
    return aliases.includes(nQuestion);
  }

  function filterBank(bank, { level, subject, topic }) {
  let out = bank;

  if (level && level !== "Tous les niveaux") {
    out = out.filter(q => levelMatches(q.level, level));

    // Sécurité: même avec "Toutes les matières", on ne garde que les matières autorisées du niveau choisi.
    const allowedSubjects = getAllowedSubjectsIncludingCustom(level).map((s) => normalizeKey(s));
    if (allowedSubjects.length > 0) {
      out = out.filter(q => allowedSubjects.includes(normalizeKey(q.subject)));
    }
  }

  if (subject && subject !== "Toutes les matières") {
    out = out.filter(q => normalizeKey(q.subject) === normalizeKey(subject));
  }

  if (topic && topic !== "Tous les sujets") {
    out = out.filter(q => normalizeKey(q.topic) === normalizeKey(topic));
  }

  return out;
}

  function filterBankDE(bank, { track, subject, topic }) {
    let out = bank;
    const nTrack = normalizeKey(track);
    if (nTrack.includes("inf/sag-m")) {
      out = out.filter((q) => {
        const lv = normalizeKey(q.level);
        return lv.includes("inf/sag-m") || lv.includes("ide/sfm") || lv.includes("licence 3 ide") || lv.includes("licence 3 sfm") || lv.includes(normalizeKey("L3-Niveau Accompli INF")) || lv.includes(normalizeKey("L3-Niveau Accompli SF"));
      });
    }
    if (nTrack.includes("auxi")) {
      out = out.filter((q) => {
        const lv = normalizeKey(q.level);
        return lv.includes("auxi") || lv.includes("auxiliaire") || lv.includes(normalizeKey("A2-Niveau moyen"));
      });
    }

    if (subject) out = out.filter((q) => normalizeKey(q.subject) === normalizeKey(subject));
    if (topic) out = out.filter((q) => normalizeKey(q.topic) === normalizeKey(topic));
    return out;
  }

  function updateDEStartInfo() {
    if (!els.selectDETrack || !els.selectDESubject || !els.selectDETopic) return;
    adminDECatalogIndexCache = null; bank = getQuestionBank();
    const track = els.selectDETrack.value;
    const subject = els.selectDESubject.value;
    const topic = els.selectDETopic.value;

    const filtered = filterBankDE(bank, { track, subject, topic });
    els.questionBankInfo.textContent = `${filtered.length} question${filtered.length > 1 ? "s" : ""} dispo`;
    els.btnStart.disabled = filtered.length === 0;
  }

  function setupDESelectors() {
    if (!els.selectDETrack || !els.selectDESubject || !els.selectDETopic) return;

    const tracks = getAllowedDETracks();
    if (tracks.length === 0) {
      setOptionsObjects(els.selectDETrack, [{ value: "", label: "Aucun niveau autorisé" }], "");
      setOptionsObjects(els.selectDESubject, [{ value: "", label: "Aucune matière DE" }], "");
      setOptions(els.selectDETopic, ["Aucun sujet"], "Aucun sujet");
      updateDEStartInfo();
      return;
    }

    setOptionsObjects(els.selectDETrack, tracks, tracks[0].value);
    const subjects = getDESubjects(els.selectDETrack && els.selectDETrack.value);
    if (subjects.length === 0) {
      setOptionsObjects(els.selectDESubject, [{ value: "", label: "Aucune matière DE" }], "");
      setOptions(els.selectDETopic, ["Aucun sujet"], "Aucun sujet");
      updateDEStartInfo();
      return;
    }

    setOptionsObjects(els.selectDESubject, subjects, subjects[0].value);
    const topics = getDETopicsForSubject(els.selectDESubject.value);
    setOptions(els.selectDETopic, topics, topics[0]);

    updateDEStartInfo();
  }

  function setMode(nextMode) {

  if (isFreeTrialUser() && nextMode !== "normal") {
    alert(FREE_TRIAL_BLOCK_MESSAGE);
    return;
  }

  // 🔒 sécurité : bloquer accès DE
  if (nextMode === "de" && !hasDEAccess()) {
    alert("Accès refusé à l'Examen de Fin de Formation.");
    return;
  }

  currentMode = nextMode;

  if (els.modeNormal && els.modeDE) {
    if (nextMode === "normal") {
      els.modeDE.classList.add("hidden");
      els.modeNormal.classList.remove("hidden");
      if (els.btnModeQuiz) els.btnModeQuiz.classList.add("active");
      if (els.btnModeDE) els.btnModeDE.classList.remove("active");
      updateStartInfo();
    } else {
      els.modeNormal.classList.add("hidden");
      els.modeDE.classList.remove("hidden");
      if (els.btnModeQuiz) els.btnModeQuiz.classList.remove("active");
      if (els.btnModeDE) els.btnModeDE.classList.add("active");
      // Recharger les listes au moment où l'utilisateur ouvre l'EFF.
      // Cela évite les listes vides après une connexion locale, une mise à jour
      // de droits ou un cache navigateur ancien.
      setupDESelectors();
      updateDEStartInfo();
    }
  }
}

  function pickQuestions(filtered, shuffleQuestions) {
    const pool = filtered.slice();
    if (shuffleQuestions !== false) shuffleInPlace(pool);
    return pool.slice(0, MAX_QUESTIONS_PER_SESSION);
  }

  function formatMeta({ level, subject, topic, total }, settings) {
    const parts = [];
    if (level && level !== "Tous les niveaux") parts.push(level);
    if (subject && subject !== "Toutes les matières") parts.push(subject);
    if (topic && topic !== "Tous les sujets") parts.push(topic);
    parts.push("QCM + V/F");
    parts.push(`${total} question${total > 1 ? "s" : ""}`);
    const name = settings.studentName.trim();
    if (name) parts.push(`Bon courage, ${name} !`);
    return parts.join(" • ");
  }

  function isAnswered(q, answer) {
    if (!q) return false;
    if (q.type === "mcq") return Number.isInteger(answer?.selectedIndex);
    if (q.type === "mcq_multi") return Array.isArray(answer?.selectedIndices) && answer.selectedIndices.length > 0;
    if (q.type === "tf") return typeof answer?.selectedBool === "boolean";
    return false;
  }

  function normalizeSelectedIndices(indices, maxLen) {
    if (!Array.isArray(indices)) return [];
    const cleaned = indices
      .map((n) => (Number.isInteger(n) ? n : -1))
      .filter((n) => n >= 0 && n < maxLen);
    return Array.from(new Set(cleaned)).sort((a, b) => a - b);
  }

  function isCorrect(q, answer) {
    if (!isAnswered(q, answer)) return false;
    if (q.type === "mcq") return answer.selectedIndex === q.answerIndex;
    if (q.type === "mcq_multi") {
      const selected = normalizeSelectedIndices(answer?.selectedIndices, q.choices.length);
      if (selected.length !== q.answerIndices.length) return false;
      for (let i = 0; i < selected.length; i++) if (selected[i] !== q.answerIndices[i]) return false;
      return true;
    }
    if (q.type === "tf") return answer.selectedBool === q.answer;
    return false;
  }

  let adminDECatalogIndexCache = null; bank = getQuestionBank();
  let settings = loadSettings();

  let session = {
    startedAt: null,
    level: "Tous les niveaux",
    subject: "Toutes les matières",
    topic: "Tous les sujets",
    questions: [],
    answersById: {}, // { [id]: { selectedIndex? , selectedBool? } }
    choiceOrderById: {},
    index: 0,
    abandoned: false,
  };

  function updateStartInfo() {
    adminDECatalogIndexCache = null; bank = getQuestionBank();
    if (!els.selectLevel || !els.selectSubject || !els.selectTopic) return;
    let levels = computeLevels();
    if (!Array.isArray(levels) || levels.length === 0) {
      levels = ['A1-Base Santé'];
    }
    if (isFreeTrialUser()) {
      // En essai gratuit, afficher directement le niveau dédié et compter les
      // questions depuis la source intégrée d'essai, sans filtrage général.
      renderFreeTrialStartInfo();
      return;
    }
    setOptions(els.selectLevel, levels, session.level);
if (!levels.includes(session.level)) {
  session.level = levels[0];
  els.selectLevel.value = session.level;
}
    let subjects = computeSubjectsForLevel(els.selectLevel.value);
    if (!Array.isArray(subjects) || subjects.length === 0) subjects = ['Toutes les matières'];
    const desiredSubject = subjects.includes(session.subject)
      ? session.subject
      : "Toutes les matières";
    setOptions(els.selectSubject, subjects, desiredSubject);
    session.subject = els.selectSubject.value;

    const topics = computeTopicsForLevelSubject(els.selectLevel.value, els.selectSubject.value);
    const desiredTopic = topics.includes(session.topic)
      ? session.topic
      : "Tous les sujets";
    setOptions(els.selectTopic, topics.length ? topics : ["Tous les sujets"], desiredTopic);
    session.topic = els.selectTopic.value || "Tous les sujets";
    if (els.selectTopic) {
      els.selectTopic.classList.remove("hidden");
      els.selectTopic.disabled = false;
      els.selectTopic.style.display = "";
    }

    const filtered = filterBank(bank, {
      level: els.selectLevel.value,
      subject: els.selectSubject.value,
      topic: els.selectTopic.value,
    });
    els.questionBankInfo.textContent = `${filtered.length} question${filtered.length > 1 ? "s" : ""} dispo`;

    const max = filtered.length;
    els.btnStart.disabled = max === 0;
  }

  function getChoiceOrder(q) {
    const len = Array.isArray(q?.choices) ? q.choices.length : 0;
    const normal = Array.from({ length: len }, (_, i) => i);
    if (!appSettings.shuffleAnswers || len < 2) return normal;
    session.choiceOrderById = session.choiceOrderById || {};
    if (!Array.isArray(session.choiceOrderById[q.id]) || session.choiceOrderById[q.id].length !== len) {
      session.choiceOrderById[q.id] = shuffleInPlace(normal.slice());
    }
    return session.choiceOrderById[q.id];
  }

  function appendInstantCorrection(q, answer) {
    if (!appSettings.instantCorrection || !isAnswered(q, answer)) return;
    const ok = isCorrect(q, answer);
    const box = document.createElement('div');
    box.className = `reviewItem ${ok ? 'tag--ok' : 'tag--bad'}`;
    box.style.marginTop = '12px';
    let good = '';
    if (q.type === 'tf') good = q.answer ? 'Vrai' : 'Faux';
    else if (q.type === 'mcq_multi') good = (q.answerIndices || []).map(i => q.choices[i]).filter(Boolean).join(', ');
    else good = q.choices?.[q.answerIndex] || '';
    box.textContent = ok ? `Bonne réponse. ${q.explanation || ''}` : `Réponse incorrecte. Bonne réponse : ${good}. ${q.explanation || ''}`;
    els.answers.appendChild(box);
  }

  function acceptAnswerClick(event, q, choiceKey) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const now = Date.now();
    const key = `${q?.id || 'question'}:${choiceKey}`;
    if (session.lastAnswerClick && session.lastAnswerClick.key === key && now - session.lastAnswerClick.at < 450) {
      return false;
    }
    session.lastAnswerClick = { key, at: now };
    if (session.pendingAutoAdvanceTimer) {
      clearTimeout(session.pendingAutoAdvanceTimer);
      session.pendingAutoAdvanceTimer = null;
    }
    return true;
  }

  function renderQuiz() {
    const q = session.questions[session.index];
    if (!q) return;

    if (session.index !== lastTimedQuestionIndex) {
      lastTimedQuestionIndex = session.index;
      startQuestionTimer();
    }

    const total = session.questions.length;
    const pos = session.index + 1;

    els.quizMeta.textContent = formatMeta(
      { level: session.level, subject: session.subject, topic: session.topic, total },
      settings
    );
    els.questionText.textContent = q.question;

    const pct = total === 0 ? 0 : Math.round((pos / total) * 100);
    els.progressBar.style.width = `${pct}%`;
    const answeredCount = session.questions.reduce(
      (acc, qq) => acc + (isAnswered(qq, session.answersById[qq.id]) ? 1 : 0),
      0
    );
    els.progressText.textContent = `Question ${pos}/${total} • Répondu: ${answeredCount}/${total}`;

    // Bouton Suivant toujours visible à côté de Terminer pour passer les questions.
    if (els.btnNext) {
      els.btnNext.classList.remove("hidden");
      els.btnNext.disabled = session.index >= total - 1;
      els.btnNext.title = session.index >= total - 1 ? "Dernière question" : "Passer à la question suivante";
    }
    if (els.btnSkip) els.btnSkip.classList.add("hidden");
    if (els.btnFinish) {
      els.btnFinish.classList.remove("hidden");
      els.btnFinish.disabled = false;
    }

    els.answers.innerHTML = "";
    const currentAnswer = session.answersById[q.id] || {};

    if (q.type === "tf") {
      const tfChoices = [
        { label: "Vrai", value: true },
        { label: "Faux", value: false },
      ];
      for (const c of tfChoices) {
        const item = document.createElement("label");
        item.className = "answer";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = c.value ? "true" : "false";
        input.checked = currentAnswer.selectedBool === c.value;
        const text = document.createElement("div");
        text.className = "answer__text";
        text.textContent = c.label;
        item.appendChild(input);
        item.appendChild(text);
        if (input.checked) item.classList.add("answer--selected");
        if (appSettings.instantCorrection && isAnswered(q, currentAnswer)) {
          if (c.value === q.answer) item.classList.add("answer--correct");
          else if (input.checked) item.classList.add("answer--wrong");
        }
        item.addEventListener("click", (event) => {
          if (!acceptAnswerClick(event, q, `tf:${c.value}`)) return;
          saveAnswerForCurrentQuestion(q, { selectedBool: c.value });
          renderQuiz();
          if (shouldAutoAdvance()) advanceAfterAnswerSoon(q.id);
        });
        els.answers.appendChild(item);
      }
      appendInstantCorrection(q, currentAnswer);
      return;
    }

    if (q.type === "mcq_multi") {
      const requiredCount = getRequiredAnswerCount(q);
      const instruction = document.createElement("div");
      instruction.className = "pill";
      instruction.style.margin = "0 0 12px 0";
      instruction.textContent = `Nombre de propositions justes à cocher : ${requiredCount}`;
      els.answers.appendChild(instruction);

      const selected = normalizeSelectedIndices(currentAnswer.selectedIndices, q.choices.length);
      for (const idx of getChoiceOrder(q)) {
        const choiceText = q.choices[idx];
        const item = document.createElement("label");
        item.className = "answer";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = "answerMulti";
        input.value = String(idx);
        input.checked = selected.includes(idx);
        const text = document.createElement("div");
        text.className = "answer__text";
        text.textContent = choiceText;
        item.appendChild(input);
        item.appendChild(text);
        if (input.checked) item.classList.add("answer--selected");
        if (appSettings.instantCorrection && isAnswered(q, currentAnswer)) {
          if ((q.answerIndices || []).includes(idx)) item.classList.add("answer--correct");
          else if (input.checked) item.classList.add("answer--wrong");
        }
        item.addEventListener("click", (event) => {
          if (!acceptAnswerClick(event, q, `multi:${idx}`)) return;
          const next = new Set(normalizeSelectedIndices(session.answersById[q.id]?.selectedIndices, q.choices.length));
          if (next.has(idx)) next.delete(idx);
          else next.add(idx);
          const nextSelected = Array.from(next).sort((a, b) => a - b);
          saveAnswerForCurrentQuestion(q, { selectedIndices: nextSelected });
          renderQuiz();
          if (nextSelected.length >= requiredCount && shouldAutoAdvance()) {
            advanceAfterAnswerSoon(q.id);
          }
        });
        els.answers.appendChild(item);
      }
      appendInstantCorrection(q, currentAnswer);
      return;
    }

    for (const idx of getChoiceOrder(q)) {
      const choiceText = q.choices[idx];
      const item = document.createElement("label");
      item.className = "answer";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = String(idx);
      input.checked = currentAnswer.selectedIndex === idx;
      const text = document.createElement("div");
      text.className = "answer__text";
      text.textContent = choiceText;
      item.appendChild(input);
      item.appendChild(text);
      if (input.checked) item.classList.add("answer--selected");
      if (appSettings.instantCorrection && isAnswered(q, currentAnswer)) {
        if (idx === q.answerIndex) item.classList.add("answer--correct");
        else if (input.checked) item.classList.add("answer--wrong");
      }
      item.addEventListener("click", (event) => {
        if (!acceptAnswerClick(event, q, `mcq:${idx}`)) return;
        saveAnswerForCurrentQuestion(q, { selectedIndex: idx });
        renderQuiz();
        if (shouldAutoAdvance()) advanceAfterAnswerSoon(q.id);
      });
      els.answers.appendChild(item);
    }
    appendInstantCorrection(q, currentAnswer);
  }

  function formatNoteSur20(note) {
    if (!Number.isFinite(note)) return "0";
    const rounded = Math.round(note * 100) / 100;
    const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    return text.replace(".", ",");
  }

  function getQuestionBasePoint(q) {
    // Permet d'utiliser une note/pondération personnalisée si elle existe dans une question.
    // Exemples acceptés : note, points, point, bareme, barème, mark, coefficient, coef.
    const values = [q?.note, q?.points, q?.point, q?.bareme, q?.["barème"], q?.mark, q?.coefficient, q?.coef];
    for (const value of values) {
      const n = Number(value);
      if (Number.isFinite(n) && n > 0) return n;
    }
    return 1;
  }

  function getQuestionMarksOn20(questions) {
    const list = Array.isArray(questions) ? questions : [];
    const basePoints = list.map(getQuestionBasePoint);
    const totalBase = basePoints.reduce((sum, n) => sum + n, 0);
    if (!list.length || totalBase <= 0) return new Map();
    const marks = new Map();
    list.forEach((q, index) => {
      marks.set(q.id, (basePoints[index] / totalBase) * 20);
    });
    return marks;
  }

  function getNoteSur20(result) {
    if (Number.isFinite(result?.note20)) return result.note20;
    const total = result?.total || 0;
    if (total === 0) return 0;
    return ((result.score || 0) / total) * 20;
  }

  function formatResultSummary(result) {
    const { answered, total } = result;
    const note20 = formatNoteSur20(getNoteSur20(result));
    return `répondu: ${answered}/${total} • Note sur 20: ${note20}/20`;
  }

  function getResultFeedback(note) {
    const n = Number(note);
    if (n < 0) {
      return {
        color: '#000000',
        emoji: '🚨',
        message: "Alerte ! Il est urgent de revoir la méthode de travail et de reprendre les bases pour éviter l'échec."
      };
    }
    if (n < 5) {
      return {
        color: '#dc2626',
        emoji: '⚠️',
        message: 'Réagis maintenant ! Le potentiel est là, mais il faut davantage d’efforts et de concentration.'
      };
    }
    if (n < 8) {
      return {
        color: '#f97316',
        emoji: '💪',
        message: 'Ne lâche rien ! Tu progresses lentement mais sûrement. Continue à travailler avec régularité.'
      };
    }
    if (n < 10) {
      return {
        color: '#ca8a04',
        emoji: '🌟',
        message: 'Presque la moyenne ! Un peu plus d’application et tu franchiras cette étape avec succès.'
      };
    }
    if (n < 15) {
      return {
        color: '#16a34a',
        emoji: '✅',
        message: 'Mission accomplie ! Les résultats sont satisfaisants. Continue sur cette lancée pour aller encore plus loin.'
      };
    }
    return {
      color: '#7c3aed',
      emoji: '🏆',
      message: 'Excellence ! Tu démontres une excellente maîtrise des connaissances. Toutes nos félicitations !'
    };
  }

  function renderResultSummaryWithFeedback(container, result, cheatText = '') {
    if (!container) return;
    container.innerHTML = '';
    if (appSettings.finalScore === false) {
      container.textContent = 'Quiz soumis avec succès. La note finale est masquée par l’administrateur.' + cheatText;
      container.style.color = '';
      return;
    }

    const noteValue = getNoteSur20(result);
    const feedback = getResultFeedback(noteValue);
    container.style.color = feedback.color;

    const summary = document.createElement('div');
    summary.textContent = formatResultSummary(result);

    const message = document.createElement('div');
    message.className = 'result__message';
    message.textContent = `${feedback.emoji} ${feedback.message}`;

    container.appendChild(summary);
    container.appendChild(message);

    if (cheatText) {
      const cheat = document.createElement('div');
      cheat.className = 'result__cheat';
      cheat.textContent = cheatText.trim();
      container.appendChild(cheat);
    }
  }

  function computeScore() {
    const total = session.questions.length;
    const marksById = getQuestionMarksOn20(session.questions);

    if (session.abandoned) {
      return { correct: 0, wrong: 0, answered: 0, total, score: 0, note20: 0, marksById: {} };
    }

    let correct = 0;
    let answered = 0;
    let wrong = 0;
    let score = 0;
    let note20 = 0;
    const marksResultById = {};

    for (const q of session.questions) {
      const a = session.answersById[q.id];
      const questionMark = marksById.get(q.id) || 0;
      let markObtained = 0;
      const answeredAfterCheat = session.cheatLockedAt && a?.answeredAt && a.answeredAt > session.cheatLockedAt;

      if (isAnswered(q, a) && !answeredAfterCheat) {
        answered++;

        if (isCorrect(q, a)) {
          correct++;
          score += 1;
          markObtained = questionMark;
        } else {
          wrong++;
          if (appSettings.negativePoints) {
            score -= 1;
            markObtained = -questionMark;
          } else {
            markObtained = 0;
          }
        }
      } else if (isAnswered(q, a) && answeredAfterCheat) {
        // Réponse saisie après tentative : visible en correction, mais non comptée.
        marksResultById[q.id] = {
          questionMark,
          obtained: 0,
          ignoredForCheat: true
        };
      }

      note20 += markObtained;
      if (!marksResultById[q.id]) {
        marksResultById[q.id] = {
          questionMark,
          obtained: markObtained
        };
      }
    }

    // Aucune pénalité n'est appliquée en cas de tentative de tricherie.
    // La note reste uniquement celle obtenue avant la première tentative détectée.

    // La note sur 20 applique directement la pondération de chaque question.
    // Les réponses données après la première tentative détectée sont ignorées pour la note.
    return { correct, wrong, answered, total, score, note20, marksById: marksResultById };
  }


  function getHistoryUserKey(username) {
    const raw = String(username || localStorage.getItem(STORAGE_KEYS.user) || "utilisateur_local").trim();
    return raw || "utilisateur_local";
  }

  function getAnswerTextForHistory(q, a) {
    if (!q || !a) return "—";
    if (q.type === "tf") return typeof a.selectedBool === "boolean" ? (a.selectedBool ? "Vrai" : "Faux") : "—";
    if (q.type === "mcq_multi") {
      const selected = normalizeSelectedIndices(a.selectedIndices, Array.isArray(q.choices) ? q.choices.length : 0);
      return selected.length ? selected.map((i) => q.choices[i]).filter(Boolean).join(", ") : "—";
    }
    if (Number.isInteger(a.selectedIndex) && Array.isArray(q.choices) && q.choices[a.selectedIndex] != null) return q.choices[a.selectedIndex];
    return "—";
  }

  function getCorrectTextForHistory(q) {
    if (!q) return "—";
    if (q.type === "tf") return q.answer ? "Vrai" : "Faux";
    if (q.type === "mcq_multi") {
      const right = Array.isArray(q.answerIndices) ? q.answerIndices : [];
      return right.map((i) => Array.isArray(q.choices) ? q.choices[i] : "").filter(Boolean).join(", ") || "—";
    }
    if (Array.isArray(q.choices) && q.choices[q.answerIndex] != null) return q.choices[q.answerIndex];
    return "—";
  }

  function readAllHistory() {
    const data = readJsonStorage(STORAGE_KEYS.history, {});
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  }

  function writeAllHistory(data) {
    try {
      writeJsonStorage(STORAGE_KEYS.history, data || {});
      return true;
    } catch (err) {
      console.warn("Historique local non enregistré", err);
      return false;
    }
  }

  function getCurrentUserHistory() {
    const all = readAllHistory();
    const key = getHistoryUserKey();
    return Array.isArray(all[key]) ? all[key] : [];
  }

  function saveQuizHistory(result) {
    if (!session || session.historySavedId) return session ? session.historySavedId : null;
    const username = getHistoryUserKey();
    const now = Date.now();
    const total = result && result.total ? result.total : 0;
    const noteValue = getNoteSur20(result || {});
    const entry = {
      id: String(now) + "-" + Math.random().toString(36).slice(2, 8),
      username,
      savedAt: now,
      startedAt: session.startedAt || now,
      durationSeconds: Math.max(0, Math.round((now - (session.startedAt || now)) / 1000)),
      mode: currentMode === "de" ? "Examen de Fin de Formation" : "Quiz",
      level: session.level || "",
      subject: session.subject || "",
      topic: session.topic || "",
      correct: result.correct || 0,
      wrong: result.wrong || 0,
      answered: result.answered || 0,
      total,
      score: result.score || 0,
      note20: Number.isFinite(noteValue) ? Number(noteValue.toFixed(2)) : 0,
      percentage: total ? Math.round(((result.correct || 0) / total) * 100) : 0,
      cheatAttempts: Array.isArray(session.cheatAttempts) ? session.cheatAttempts.map((c) => ({ reason: c.reason || "", at: c.at || now })) : [],
      questions: Array.isArray(session.questions) ? session.questions.map((q, index) => {
        const answer = session.answersById && session.answersById[q.id] ? session.answersById[q.id] : {};
        return {
          index: index + 1,
          id: q.id,
          category: q.category || q.subject || "",
          level: q.level || session.level || "",
          subject: q.subject || session.subject || "",
          topic: q.topic || session.topic || "",
          question: q.question || "",
          userAnswer: getAnswerTextForHistory(q, answer),
          correctAnswer: getCorrectTextForHistory(q),
          answered: isAnswered(q, answer),
          correct: isCorrect(q, answer),
          explanation: q.explanation || "",
        };
      }) : [],
    };

    const all = readAllHistory();
    const previous = Array.isArray(all[username]) ? all[username] : [];
    all[username] = [entry, ...previous].slice(0, 50);
    if (!writeAllHistory(all)) {
      all[username] = [entry, ...previous].slice(0, 20);
      writeAllHistory(all);
    }
    session.historySavedId = entry.id;
    return entry.id;
  }

  function formatDuration(seconds) {
    const total = Math.max(0, Number(seconds) || 0);
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return min ? `${min} min ${sec} s` : `${sec} s`;
  }

  function openHistoryScreen(selectedId = "") {
    showScreen(els.screenHistory);
    renderHistory(selectedId);
  }

  function clearCurrentUserHistory() {
    const username = getHistoryUserKey();
    const all = readAllHistory();
    all[username] = [];
    writeAllHistory(all);
    renderHistory();
  }

  function renderHistoryDetail(entry) {
    if (!entry || !els.historyContent) return;
    const questions = Array.isArray(entry.questions) ? entry.questions : [];
    const cheatText = Array.isArray(entry.cheatAttempts) && entry.cheatAttempts.length
      ? `<div class="notice" style="margin-top:10px"><strong>Tentative détectée :</strong> ${entry.cheatAttempts.map((c) => `${escapeHtml(c.reason || "Motif non précisé")} (${escapeHtml(formatDate(c.at))})`).join(" — ")}</div>`
      : "";
    els.historyContent.innerHTML = `
      <div class="admin-box">
        <div class="row row--space">
          <div>
            <h3 class="h3" style="margin:0">Évaluation du ${escapeHtml(formatDate(entry.savedAt))}</h3>
            <div class="muted small">${escapeHtml(entry.mode || "Quiz")} • ${escapeHtml(entry.level || "")} • ${escapeHtml(entry.subject || "")} • ${escapeHtml(entry.topic || "")}</div>
          </div>
          <button class="btn" id="btnBackToHistoryList" type="button">Retour à l’historique</button>
        </div>
        <div class="grid" style="margin-top:12px">
          <div class="pill">Note : <strong>${escapeHtml(formatNoteSur20(entry.note20))}/20</strong></div>
          <div class="pill">Bonnes réponses : <strong>${escapeHtml(entry.correct)}/${escapeHtml(entry.total)}</strong></div>
          <div class="pill">Répondues : <strong>${escapeHtml(entry.answered)}/${escapeHtml(entry.total)}</strong></div>
          <div class="pill">Durée : <strong>${escapeHtml(formatDuration(entry.durationSeconds))}</strong></div>
        </div>
        ${cheatText}
      </div>
      <div class="review">
        ${questions.map((q) => `
          <div class="reviewItem">
            <div class="reviewItem__q">${escapeHtml(q.index)}. ${escapeHtml(q.question)}</div>
            <div class="reviewItem__meta">
              <span class="tag">${escapeHtml(q.category || q.subject || "Question")}</span>
              <span class="tag ${q.correct ? "tag--ok" : q.answered ? "tag--bad" : ""}">${q.correct ? "Correct" : q.answered ? "Incorrect" : "Non répondu"}</span>
            </div>
            <div class="reviewAnswerLine">Ta réponse : <span class="${q.correct ? "review-answer--correct" : "review-answer--wrong"}">${escapeHtml(q.userAnswer || "—")}</span> • Bonne réponse : <span class="review-answer--correct">${escapeHtml(q.correctAnswer || "—")}</span></div>
            ${q.explanation ? `<div class="muted small" style="margin-top:8px"><strong>Explication :</strong> ${escapeHtml(q.explanation)}</div>` : ""}
          </div>
        `).join("")}
      </div>
    `;
    document.getElementById("btnBackToHistoryList")?.addEventListener("click", () => renderHistory());
  }

  function renderHistory(selectedId = "") {
    if (!els.historyContent) return;
    const entries = getCurrentUserHistory();
    if (selectedId) {
      const found = entries.find((item) => item.id === selectedId);
      if (found) { renderHistoryDetail(found); return; }
    }
    if (!entries.length) {
      els.historyContent.innerHTML = `
        <div class="admin-box">
          <h3 class="h3" style="margin-top:0">Aucun historique pour le moment</h3>
          <p class="muted">Termine un quiz pour voir ici tes résultats, tes notes et le détail de ton évaluation.</p>
        </div>
      `;
      return;
    }
    const notes = entries.map((e) => Number(e.note20)).filter(Number.isFinite);
    const avg = notes.length ? notes.reduce((a, b) => a + b, 0) / notes.length : 0;
    const best = notes.length ? Math.max(...notes) : 0;
    els.historyContent.innerHTML = `
      <div class="grid" style="margin-top:12px">
        <div class="stat"><div class="stat__label">Quiz terminés</div><div class="stat__value">${escapeHtml(entries.length)}</div></div>
        <div class="stat"><div class="stat__label">Meilleure note</div><div class="stat__value">${escapeHtml(formatNoteSur20(best))}/20</div></div>
        <div class="stat"><div class="stat__label">Moyenne</div><div class="stat__value">${escapeHtml(formatNoteSur20(avg))}/20</div></div>
      </div>
      <div class="row row--space" style="margin-top:14px">
        <h3 class="h3" style="margin:0">Mes évaluations</h3>
        <button class="btn" id="btnClearMyHistory" type="button">Effacer mon historique</button>
      </div>
      <div class="admin-table-wrap" style="margin-top:10px">
        <table class="mini-table">
          <thead><tr><th>Date</th><th>Type</th><th>Niveau</th><th>Matière / Sujet</th><th>Résultat</th><th>Action</th></tr></thead>
          <tbody>
            ${entries.map((e) => `
              <tr>
                <td>${escapeHtml(formatDate(e.savedAt))}</td>
                <td>${escapeHtml(e.mode || "Quiz")}</td>
                <td>${escapeHtml(e.level || "—")}</td>
                <td><strong>${escapeHtml(e.subject || "—")}</strong><br><small>${escapeHtml(e.topic || "Tous les sujets")}</small></td>
                <td><strong>${escapeHtml(formatNoteSur20(e.note20))}/20</strong><br><small>${escapeHtml(e.correct)}/${escapeHtml(e.total)} bonnes réponses • ${escapeHtml(formatDuration(e.durationSeconds))}</small></td>
                <td><button class="btn btn--primary btnOpenHistoryEval" data-history-id="${escapeHtml(e.id)}" type="button">Voir l’évaluation</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
    document.getElementById("btnClearMyHistory")?.addEventListener("click", () => {
      if (confirm("Effacer tout ton historique local sur ce navigateur ?")) clearCurrentUserHistory();
    });
    els.historyContent.querySelectorAll(".btnOpenHistoryEval").forEach((btn) => {
      btn.addEventListener("click", () => renderHistoryDetail(entries.find((item) => item.id === btn.dataset.historyId)));
    });
  }

function renderResult() {
    const result = computeScore();
    const { correct, answered, total, score } = result;
    const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
    const note20 = formatNoteSur20(getNoteSur20(result));
    const firstCheatAttempt = Array.isArray(session.cheatAttempts) && session.cheatAttempts.length ? session.cheatAttempts[0] : null;
    const autoSubmitInfo = session.autoCheatSubmitted || firstCheatAttempt;
    const cheatText = autoSubmitInfo
      ? `
Auto envoi
Motif : ${autoSubmitInfo.reason}.
Heure : ${new Date(autoSubmitInfo.at).toLocaleString('fr-FR')}.
Les réponses données après cette tentative n’ont pas été prises en compte dans la note.`
      : '';
    renderResultSummaryWithFeedback(els.scoreText, result, cheatText);
    const user = localStorage.getItem(STORAGE_KEYS.user);
    logActivity(user, 'finish_quiz', { correct, answered, total, percentage: pct, score, note20, autoSubmit: !!session.autoCheatSubmitted, autoSubmitInfo: session.autoCheatSubmitted || null });
    saveQuizHistory(result);
    localStorage.setItem(
  STORAGE_KEYS.lastResult,
  JSON.stringify({
    session,
    result: computeScore()
  })
);
  }

  function renderReview() {
    els.reviewList.innerHTML = "";
    const result = computeScore();

const head = document.createElement("div");
head.className = "pill";
head.style.marginBottom = "12px";
head.textContent = appSettings.finalScore === false ? "Correction du quiz — note masquée par l’administrateur." : formatResultSummary(result);
els.reviewList.appendChild(head);

    for (let i = 0; i < session.questions.length; i++) {
      const q = session.questions[i];
      const a = session.answersById[q.id] || {};
      const ok = isCorrect(q, a);
      const answered = isAnswered(q, a);

      const item = document.createElement("div");
      item.className = "reviewItem";

      const qEl = document.createElement("div");
      qEl.className = "reviewItem__q";
      qEl.textContent = `${i + 1}. ${q.question}`;

      const meta = document.createElement("div");
      meta.className = "reviewItem__meta";
      const tag1 = document.createElement("span");
      tag1.className = "tag";
      tag1.textContent = q.category;
      const tag2 = document.createElement("span");
      tag2.className = `tag ${answered ? (ok ? "tag--ok" : "tag--bad") : ""}`;
      tag2.textContent = ok ? "Correct" : answered ? "Incorrect" : "Non répondu";
      meta.appendChild(tag1);
      meta.appendChild(tag2);
      const markInfo = result.marksById && result.marksById[q.id] ? result.marksById[q.id] : null;
      const tag3 = document.createElement("span");
      tag3.className = `tag ${markInfo && markInfo.obtained > 0 ? "tag--ok" : markInfo && markInfo.obtained < 0 ? "tag--bad" : ""}`;
      tag3.textContent = markInfo && markInfo.ignoredForCheat
        ? 'Note question: 0/20 (non comptée après tentative)'
        : `Note question: ${markInfo && markInfo.obtained > 0 ? "+" : ""}${formatNoteSur20(markInfo ? markInfo.obtained : 0)}/20`;
      meta.appendChild(tag3);

      const body = document.createElement("div");
      body.className = "reviewAnswerLine";

      const addText = (text) => body.appendChild(document.createTextNode(text));
      const addAnswerSpan = (text, className) => {
        const span = document.createElement("span");
        span.className = className;
        span.textContent = text;
        body.appendChild(span);
      };

      if (q.type === "tf") {
        const your = typeof a.selectedBool === "boolean" ? (a.selectedBool ? "Vrai" : "Faux") : "—";
        const right = q.answer ? "Vrai" : "Faux";
        addText("Ta réponse: ");
        addAnswerSpan(your, ok ? "review-answer--correct" : "review-answer--wrong");
        addText(" • Bonne réponse: ");
        addAnswerSpan(right, "review-answer--correct");
      } else if (q.type === "mcq_multi") {
        const selected = normalizeSelectedIndices(a.selectedIndices, q.choices.length);
        const rightIndices = Array.isArray(q.answerIndices) ? q.answerIndices : [];
        addText("Tes réponses: ");
        if (selected.length > 0) {
          selected.forEach((i2, index) => {
            if (index > 0) addText(", ");
            addAnswerSpan(q.choices[i2] || "", rightIndices.includes(i2) ? "review-answer--correct" : "review-answer--wrong");
          });
        } else {
          addAnswerSpan("—", "review-answer--wrong");
        }
        addText(" • Bonnes réponses: ");
        rightIndices.forEach((i2, index) => {
          if (index > 0) addText(", ");
          addAnswerSpan(q.choices[i2] || "", "review-answer--correct");
        });
      } else {
        const hasSelected = Number.isInteger(a.selectedIndex) && q.choices[a.selectedIndex] != null;
        const your = hasSelected ? q.choices[a.selectedIndex] : "—";
        const right = q.choices[q.answerIndex];
        addText("Ta réponse: ");
        addAnswerSpan(your, ok ? "review-answer--correct" : "review-answer--wrong");
        addText(" • Bonne réponse: ");
        addAnswerSpan(right, "review-answer--correct");
      }

      const choicesBox = document.createElement("div");
      choicesBox.className = "reviewChoices";
      const appendReviewChoice = (letterIndex, choiceText, isGoodAnswer) => {
        const line = document.createElement("div");
        line.className = `reviewChoice ${isGoodAnswer ? "reviewChoice--correct" : "reviewChoice--wrong"}`;
        const letter = String.fromCharCode(65 + letterIndex);
        line.textContent = `${letter}) ${choiceText}`;
        choicesBox.appendChild(line);
      };

      if (q.type === "tf") {
        [
          { text: "Vrai", value: true },
          { text: "Faux", value: false },
        ].forEach((choice, choiceIndex) => {
          appendReviewChoice(choiceIndex, choice.text, choice.value === q.answer);
        });
      } else if (Array.isArray(q.choices)) {
        const rightIndices = q.type === "mcq_multi"
          ? (Array.isArray(q.answerIndices) ? q.answerIndices : [])
          : [q.answerIndex];
        q.choices.forEach((choiceText, choiceIndex) => {
          appendReviewChoice(choiceIndex, choiceText, rightIndices.includes(choiceIndex));
        });
      }

      item.appendChild(qEl);
      item.appendChild(meta);
      item.appendChild(body);
      if (choicesBox.childElementCount > 0) item.appendChild(choicesBox);

      if (q.explanation) {
        const exp = document.createElement("div");
        exp.className = "small review-explanation";
        exp.style.marginTop = "8px";
        exp.textContent = `Explication: ${q.explanation}`;
        item.appendChild(exp);
      }

      els.reviewList.appendChild(item);
    }
  }

  async function startNewSession() {
    if (isFreeTrialUser()) {
      // Ne pas bloquer l'essai gratuit à cause d'anciens sélecteurs restés en cache.
      renderFreeTrialStartInfo();
      if (getFreeTrialAvailableQuestions().length === 0) {
        alert("Aucune question d’essai gratuit n’a été trouvée.");
        return;
      }
    }

    alert(
      "Règles de score :\n\n" +
        "Bonne réponse : +1\n" +
        (appSettings.negativePoints ? "Mauvaise réponse : -1\n" : "Mauvaise réponse : 0\n") +
        "Réponse non répondue : 0"
    );

    if (currentMode === "de") {
      const track = els.selectDETrack?.value;
      const subject = els.selectDESubject?.value;
      const topic = els.selectDETopic?.value || "";

      const filtered = filterBankDE(bank, { track, subject, topic });
      const picked = pickQuestions(filtered, appSettings.shuffleQuestions);

      lastTimedQuestionIndex = -1;
      session = {
        startedAt: Date.now(),
        level: track,
        subject,
        topic,
        questions: picked,
        answersById: {},
        choiceOrderById: {},
        index: 0,
        abandoned: false,
        cheatAttempts: [],
      };

      if (!(await ensureQuizPhotoAllowed())) return;

      const user = localStorage.getItem(STORAGE_KEYS.user);
      logActivity(user, "start_quiz", { level: track, subject, topic, questionCount: picked.length });

      showScreen(els.screenQuiz);
      renderQuiz();
      return;
    }

    const level = isFreeTrialUser() ? FREE_TRIAL_LEVEL : els.selectLevel.value;
    const subject = isFreeTrialUser() ? FREE_TRIAL_SUBJECT : els.selectSubject.value;
    const topic = isFreeTrialUser() ? FREE_TRIAL_TOPIC : (els.selectTopic?.value || "Tous les sujets");
    const filtered = isFreeTrialUser()
      ? getFreeTrialAvailableQuestions()
      : filterBank(bank, { level, subject, topic });
    const picked = isFreeTrialUser() ? filtered : pickQuestions(filtered, appSettings.shuffleQuestions);

    lastTimedQuestionIndex = -1;
    session = {
      startedAt: Date.now(),
      level,
      subject,
      topic,
      questions: picked,
      answersById: {},
      choiceOrderById: {},
      index: 0,
      abandoned: false,
      cheatAttempts: [],
    };

    if (!(await ensureQuizPhotoAllowed())) return;

    const user = localStorage.getItem(STORAGE_KEYS.user);
    logActivity(user, "start_quiz", { level, subject, topic, questionCount: picked.length });

    try {
      localStorage.setItem(
        STORAGE_KEYS.last,
        JSON.stringify({
          startedAt: session.startedAt,
          level,
          subject,
          questionIds: picked.map((q) => q.id),
        })
      );
    } catch {
      // ignore
    }

    showScreen(els.screenQuiz);
    renderQuiz();
  }

  function goNext() {
    const atLast = session.index >= session.questions.length - 1;
    if (atLast) {
      renderQuiz();
      return;
    }
    session.index++;
    renderQuiz();
  }

  function goPrev() {
    if (session.index <= 0) {
      session.index = 0;
      renderQuiz();
      return;
    }
    session.index--;
    renderQuiz();
  }

  function skipQuestion() {
    const q = session.questions[session.index];
    if (!q) return;
    delete session.answersById[q.id];
    goNext();
  }

  function finishQuiz() {
    showScreen(els.screenResult);
    renderResult();
  }

  function restartCurrentQuizWithNewOrder() {
    if (!Array.isArray(session.questions) || session.questions.length === 0) return;
    const oldOrder = session.questions.map((q) => q.id).join("|");
    const nextQuestions = session.questions.slice();
    shuffleInPlace(nextQuestions);
    if (nextQuestions.length > 1 && nextQuestions.map((q) => q.id).join("|") === oldOrder) {
      nextQuestions.push(nextQuestions.shift());
    }
    clearQuestionTimer();
    lastTimedQuestionIndex = -1;
    session = {
      ...session,
      startedAt: Date.now(),
      questions: nextQuestions,
      answersById: {},
      choiceOrderById: {},
      index: 0,
      abandoned: false,
      cheatAttempts: [],
    };
    renderQuiz();
  }

  function resetAll() {
    localStorage.removeItem(STORAGE_KEYS.last);
    localStorage.removeItem(STORAGE_KEYS.settings);
    settings = loadSettings();
    els.inputStudentName.value = settings.studentName;
    els.toggleShuffle.checked = settings.shuffleQuestions;
    session.index = 0;
    showScreen(els.screenStart);
    if (currentMode === "normal") updateStartInfo();
    else updateDEStartInfo();
  }


  // Démarrage direct d'un quiz depuis la synthèse des questions du tableau de bord.
  // Cette fonction est exposée pour l'interface uniquement : elle ne modifie pas la banque de questions.
  window.QDASH_START_GROUPED_QUIZ = async function qdashStartGroupedQuiz(payload) {
    try {
      const level = safeText(payload && payload.level) || (els.selectLevel && els.selectLevel.value) || session.level || "Tous les niveaux";
      const subject = safeText(payload && payload.subject) || (els.selectSubject && els.selectSubject.value) || session.subject || "Toutes les matières";
      const theme = safeText(payload && payload.theme) || (els.selectTopic && els.selectTopic.value) || "Thème";
      const rawKeys = Array.isArray(payload && payload.keys) ? payload.keys.map(String) : (Array.isArray(payload && payload.ids) ? payload.ids.map(String) : []);
      const keyParts = rawKeys.map((value) => String(value).split('||QDASH_SIG||'));
      const keys = new Set(keyParts.map((parts) => parts[0]).filter(Boolean));
      const sigKeys = new Set(keyParts.map((parts) => parts[1]).filter(Boolean));
      const qdashQuestionKey = (q) => safeText((q && (q.id || q.question || q.text || q.statement)) || '');
      const qdashNormalize = (value) => safeText(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
      const qdashQuestionSignature = (q) => {
        const indexedAnswer = q && Array.isArray(q.answerIndices) && Array.isArray(q.choices) ? q.answerIndices.map((n) => q.choices[n]).join(' ') : '';
        const singleAnswer = q && Number.isInteger(q.answerIndex) && Array.isArray(q.choices) ? q.choices[q.answerIndex] : '';
        return qdashNormalize([
          q && (q.question || q.text || q.statement || ''),
          q && Array.isArray(q.choices) ? q.choices.join(' ') : '',
          q && Array.isArray(q.answer) ? q.answer.join(' ') : (q && (q.answer || q.correct || indexedAnswer || singleAnswer || ''))
        ].join(' ')).replace(/^(q|question)\s*\d+\s*/, '');
      };
      const qdashRemoveDuplicates = (list) => {
        const seen = new Set();
        return list.filter((q) => {
          const sig = qdashQuestionSignature(q) || qdashQuestionKey(q);
          if (!sig || seen.has(sig)) return false;
          seen.add(sig);
          return true;
        });
      };

      if (isFreeTrialUser()) {
        if (level !== FREE_TRIAL_LEVEL || subject !== FREE_TRIAL_SUBJECT) {
          alert(FREE_TRIAL_BLOCK_MESSAGE);
          return;
        }
      }

      bank = getQuestionBank();
      let filtered = filterBank(bank, { level, subject, topic: "Tous les sujets" });
      if (keys.size || sigKeys.size) {
        filtered = filtered.filter((q) => keys.has(qdashQuestionKey(q)) || sigKeys.has(qdashQuestionSignature(q)));
      }
      filtered = qdashRemoveDuplicates(filtered);
      if (!filtered.length) {
        alert("Aucune question trouvée pour ce thème.");
        return;
      }

      alert(
        "Règles de score :\n\n" +
          "Bonne réponse : +1\n" +
          (appSettings.negativePoints ? "Mauvaise réponse : -1\n" : "Mauvaise réponse : 0\n") +
          "Réponse non répondue : 0"
      );

      const picked = isFreeTrialUser()
        ? getFreeTrialAvailableQuestions()
        : pickQuestions(filtered, appSettings.shuffleQuestions);

      lastTimedQuestionIndex = -1;
      session = {
        startedAt: Date.now(),
        level,
        subject,
        topic: theme,
        questions: picked,
        answersById: {},
        choiceOrderById: {},
        index: 0,
        abandoned: false,
        cheatAttempts: [],
      };

      if (!(await ensureQuizPhotoAllowed())) return;

      const user = localStorage.getItem(STORAGE_KEYS.user);
      logActivity(user, "start_quiz_theme", { level, subject, topic: theme, questionCount: picked.length });
      showScreen(els.screenQuiz);
      renderQuiz();
    } catch (err) {
      console.error("QDASH_START_GROUPED_QUIZ", err);
      alert("Impossible de démarrer ce thème pour le moment.");
    }
  };

  // Events
  els.selectLevel.addEventListener("change", () => {
    if (currentMode !== "normal") return;
    session.level = els.selectLevel.value;
    session.subject = "Toutes les matières";
    session.topic = "Tous les sujets";
    updateStartInfo();
  });
  els.selectSubject.addEventListener("change", () => {
    if (currentMode !== "normal") return;
    session.subject = els.selectSubject.value;
    session.topic = "Tous les sujets";
    updateStartInfo();
  });
  if (els.selectTopic) {
    els.selectTopic.addEventListener("change", () => {
      if (currentMode !== "normal") return;
      session.topic = els.selectTopic.value;
      if (isFreeTrialUser() && (els.selectLevel.value !== FREE_TRIAL_LEVEL || els.selectSubject.value !== FREE_TRIAL_SUBJECT || els.selectTopic.value !== FREE_TRIAL_TOPIC)) {
        alert(FREE_TRIAL_BLOCK_MESSAGE);
      }
      updateStartInfo();
    });
  }

  els.btnStart.addEventListener("click", startNewSession);

  // Onglet "Examen de Fin de Formation"
  if (els.btnModeQuiz) {
    els.btnModeQuiz.addEventListener("click", () => setMode("normal"));
  }
  if (els.btnModeDE) {
    els.btnModeDE.addEventListener("click", () => setMode("de"));
  }
  if (els.selectDETrack) {
    els.selectDETrack.addEventListener("change", () => {
      const subjects = getDESubjects(els.selectDETrack && els.selectDETrack.value);
      if (subjects.length === 0) {
        setOptionsObjects(els.selectDESubject, [{ value: "", label: "Aucune matière DE" }], "");
        setOptions(els.selectDETopic, ["Aucun sujet"], "Aucun sujet");
        updateDEStartInfo();
        return;
      }

      setOptionsObjects(els.selectDESubject, subjects, subjects[0].value);
      const topics = getDETopicsForSubject(els.selectDESubject.value);
      setOptions(els.selectDETopic, topics, topics[0]);
      updateDEStartInfo();
    });
  }
  if (els.selectDESubject) {
    els.selectDESubject.addEventListener("change", () => {
      const topics = getDETopicsForSubject(els.selectDESubject.value);
      setOptions(els.selectDETopic, topics, topics[0]);
      updateDEStartInfo();
    });
  }
  if (els.selectDETopic) els.selectDETopic.addEventListener("change", updateDEStartInfo);

  if (els.btnNext) els.btnNext.addEventListener("click", goNext);
  if (els.btnSkip) els.btnSkip.addEventListener("click", goPrev);
  if (els.btnFinish) els.btnFinish.addEventListener("click", finishQuiz);

  els.btnRetry.addEventListener("click", () => {
    showScreen(els.screenStart);
    if (currentMode === "normal") updateStartInfo();
    else updateDEStartInfo();
  });
  els.btnReview.addEventListener("click", () => {
    showScreen(els.screenReview);
    renderReview();
  });
  if (els.btnResultHistory) {
    els.btnResultHistory.addEventListener("click", () => openHistoryScreen(session.historySavedId || ""));
  }
  els.btnBackToStart.addEventListener("click", () => {
    showScreen(els.screenStart);
    if (currentMode === "normal") updateStartInfo();
    else updateDEStartInfo();
  });

  function goHome() {
    showScreen(els.screenStart);
    if (currentMode === "normal") updateStartInfo();
    else updateDEStartInfo();
  }

  if (els.btnHome) {
    els.btnHome.addEventListener("click", goHome);
  }

  function goBackToPreviousScreen() {
    const previousScreen = screenHistory.pop();
    if (previousScreen) {
      isReturningToPreviousScreen = true;
      showScreen(previousScreen);
      isReturningToPreviousScreen = false;
      if (previousScreen === els.screenStart) {
        if (currentMode === "normal") updateStartInfo();
        else updateDEStartInfo();
      }
      return;
    }
    if (window.history && window.history.length > 1) {
      window.history.back();
      return;
    }
    goHome();
  }

  if (els.btnBack) {
    els.btnBack.addEventListener("click", goBackToPreviousScreen);
  }

  if (els.btnHistory) {
    els.btnHistory.addEventListener("click", () => openHistoryScreen());
  }

  if (els.btnBackToStartFromHistory) {
    els.btnBackToStartFromHistory.addEventListener("click", () => {
      showScreen(els.screenStart);
      if (currentMode === "normal") updateStartInfo();
      else updateDEStartInfo();
    });
  }

  if (els.btnHomeQuiz) {
    els.btnHomeQuiz.addEventListener("click", () => {
      // Correction accueil après connexion : le bouton doit vraiment ouvrir
      // l'écran de sélection du quiz, même quand l'interface d'accueil
      // dynamique a masqué les listes avec la classe qdash-dashboard-view.
      document.body.classList.remove("qdash-dashboard-view");
      document.body.classList.add("qdash-quiz-view");
      if (els.startTitle) els.startTitle.textContent = "Commencer un quiz";
      const startDesc = els.screenStart ? els.screenStart.querySelector(":scope > .muted") : null;
      if (startDesc) startDesc.textContent = "Choisis ton niveau, ta matière et ton sujet, puis démarre une session.";
      setMode("normal");
      showScreen(els.screenStart);
      updateStartInfo();
    });
  }

  if (els.btnAdmin) {
    els.btnAdmin.addEventListener("click", async () => {
      showScreen(els.screenAdmin);
      await renderAdminLogs({ silent: true });
    });
  }

  if (els.btnBackToStartFromAdmin) {
    els.btnBackToStartFromAdmin.addEventListener("click", () => {
      showScreen(els.screenStart);
      if (currentMode === "normal") updateStartInfo();
      else updateDEStartInfo();
    });
  }

  if (els.btnDictionary) {
    els.btnDictionary.addEventListener("click", async () => {
      if (isFreeTrialUser()) {
        alert(FREE_TRIAL_BLOCK_MESSAGE);
        return;
      }
      showScreen(els.screenDictionary);
      if (els.dictionaryList) els.dictionaryList.innerHTML = "<p class='muted'>Chargement léger du dictionnaire...</p>";
      await loadMedicalDictionary();
      if (els.inputDictionarySearch) els.inputDictionarySearch.value = "";
      renderDictionary("");
      if (els.inputDictionarySearch) els.inputDictionarySearch.focus();
    });
  }

  if (els.btnBackToStartFromDictionary) {
    els.btnBackToStartFromDictionary.addEventListener("click", () => {
      showScreen(els.screenStart);
      if (currentMode === "normal") updateStartInfo();
      else updateDEStartInfo();
    });
  }


  function isCurrentAdminUser() {
    const current = safeText(localStorage.getItem(STORAGE_KEYS.user)).trim();
    return !!(
      current &&
      Array.isArray(window.ADMINS) &&
      window.ADMINS.some((admin) => normalizeKey(admin) === normalizeKey(current))
    );
  }

  function isPlaceholderResume(item) {
    return normalizeKey(item?.matiere) === normalizeKey("Exemple de matière") &&
      normalizeKey(item?.titre) === normalizeKey("Exemple de résumé");
  }

  function getResumeBank() {
    const raw = window.RESUMES_COURS || {};
    const clean = {};
    Object.entries(raw).forEach(([level, list]) => {
      const key = String(level || "").toUpperCase();
      if (key === "AUXI" || key === "INF/SAG-M") return;
      clean[level] = Array.isArray(list) ? list.filter((item) => !isPlaceholderResume(item)) : [];
    });
    return clean;
  }

  function findResumeLevelName(level, levels) {
    const n = normalizeKey(level);
    return (levels || []).find((lv) => normalizeKey(lv) === n) || "";
  }

  function getResumeLevels() {
    const bank = getResumeBank();
    const bankLevels = Object.keys(bank);

    // Les administrateurs voient tous les niveaux de résumés disponibles.
    if (isCurrentAdminUser()) return bankLevels;

    // Les autres utilisateurs ne voient que les résumés correspondant à leur niveau.
    const allowedQuizLevels = (typeof computeLevels === "function" ? computeLevels() : [])
      .filter((level) => level && normalizeKey(level) !== normalizeKey("Tous les niveaux"));

    const allowed = [];
    const seen = new Set();
    allowedQuizLevels.forEach((level) => {
      const matched = findResumeLevelName(level, bankLevels);
      const key = normalizeKey(matched);
      if (matched && !seen.has(key)) {
        seen.add(key);
        allowed.push(matched);
      }
    });
    return allowed;
  }

  function getResumeItemsForLevel(level) {
    const bank = getResumeBank();
    return Array.isArray(bank[level]) ? bank[level] : [];
  }

  function getResumeSubjectsForLevel(level) {
    const items = getResumeItemsForLevel(level);
    const subjectsFromCatalog = typeof getAllowedSubjectsIncludingCustom === "function"
      ? getAllowedSubjectsIncludingCustom(level)
      : (typeof getAllowedSubjectsForLevel === "function" ? getAllowedSubjectsForLevel(level) : []);
    const subjectsFromResumes = items.map((item) => safeText(item?.matiere).trim()).filter(Boolean);
    const out = [];
    const seen = new Set();
    [...subjectsFromCatalog, ...subjectsFromResumes].forEach((subject) => {
      const clean = safeText(subject).trim();
      const key = normalizeKey(clean);
      if (!clean || seen.has(key)) return;
      seen.add(key);
      out.push(clean);
    });
    return out;
  }

  function getResumesForSelection() {
    const level = els.selectResumeLevel ? els.selectResumeLevel.value : "";
    const subject = els.selectResumeSubject ? els.selectResumeSubject.value : "";
    const items = getResumeItemsForLevel(level);
    return items.filter((item) => !subject || normalizeKey(item.matiere) === normalizeKey(subject));
  }

  function renderResumeView() {
    if (!els.resumeView) return;
    const level = els.selectResumeLevel ? els.selectResumeLevel.value : "";
    const subject = els.selectResumeSubject ? els.selectResumeSubject.value : "";
    const items = getResumesForSelection();
    const title = els.selectResumeTitle ? els.selectResumeTitle.value : "";
    const selected = items.find((item) => item.titre === title) || items[0];
    if (!level || level === "Aucun niveau") {
      els.resumeView.innerHTML = "<p class='muted'>Aucun niveau de résumé disponible pour ce compte.</p>";
      return;
    }
    if (!selected) {
      const safeSubject = subject && subject !== "Aucune matière" ? subject : "Matière";
      els.resumeView.innerHTML = `
        <article class="resume-card">
          <div class="pill">${escapeHtml(safeSubject)}</div>
          <h3 class="h3">Résumé</h3>
          <div class="resume-content"></div>
        </article>
      `;
      return;
    }
    const content = String(selected.contenu || "").trim();
    els.resumeView.innerHTML = `
      <article class="resume-card">
        <div class="pill">${escapeHtml(selected.matiere || "Matière")}</div>
        <h3 class="h3">${escapeHtml(selected.titre || "Résumé")}</h3>
        <div class="resume-content">${content ? escapeHtml(content).replace(/\n/g, "<br>") : ""}</div>
      </article>
    `;
  }

  function populateResumeTitles() {
    const items = getResumesForSelection();
    if (!els.selectResumeTitle) {
      renderResumeView();
      return;
    }
    const titles = items.map((item) => item.titre || "Résumé sans titre");
    setOptions(els.selectResumeTitle, titles.length ? titles : ["Aucun résumé"], titles[0] || "Aucun résumé");
    els.selectResumeTitle.disabled = !titles.length;
    renderResumeView();
  }

  function populateResumeSubjects() {
    if (!els.selectResumeSubject) return;
    const level = els.selectResumeLevel ? els.selectResumeLevel.value : "";
    const subjects = getResumeSubjectsForLevel(level);
    setOptions(els.selectResumeSubject, subjects.length ? subjects : ["Aucune matière"], subjects[0] || "Aucune matière");
    els.selectResumeSubject.disabled = !subjects.length;
    populateResumeTitles();
  }

  function openResumesScreen() {
    if (isFreeTrialUser()) {
      alert(FREE_TRIAL_BLOCK_MESSAGE);
      return;
    }
    const levels = getResumeLevels();
    if (els.selectResumeLevel) {
      const currentQuizLevel = els.selectLevel && els.selectLevel.value ? els.selectLevel.value : "";
      const preferred = findResumeLevelName(currentQuizLevel, levels) || levels[0];
      setOptions(els.selectResumeLevel, levels.length ? levels : ["Aucun niveau"], preferred || "Aucun niveau");
      els.selectResumeLevel.disabled = levels.length <= 1;
    }
    populateResumeSubjects();
    showScreen(els.screenResumes);
  }

  if (els.btnResumes) {
    els.btnResumes.addEventListener("click", openResumesScreen);
  }

  if (els.btnBackToStartFromResumes) {
    els.btnBackToStartFromResumes.addEventListener("click", () => {
      showScreen(els.screenStart);
      if (currentMode === "normal") updateStartInfo();
      else updateDEStartInfo();
    });
  }

  if (els.selectResumeLevel) els.selectResumeLevel.addEventListener("change", populateResumeSubjects);
  if (els.selectResumeSubject) els.selectResumeSubject.addEventListener("change", populateResumeTitles);
  if (els.selectResumeTitle) els.selectResumeTitle.addEventListener("change", renderResumeView);

  if (els.inputDictionarySearch) {
    els.inputDictionarySearch.addEventListener("input", () => {
      renderDictionary(els.inputDictionarySearch.value);
    });
  }

  if (els.btnOpenSettings) {
    els.btnOpenSettings.addEventListener("click", () => {
      els.inputStudentName.value = settings.studentName;
      // Mélange forcé: garder le toggle en "on" et empêcher de le désactiver.
      els.toggleShuffle.checked = true;
      els.toggleShuffle.disabled = true;
      els.settingsDialog.showModal();
    });
  }
  els.btnSaveSettings.addEventListener("click", () => {
    settings = {
      studentName: safeText(els.inputStudentName.value).slice(0, 40),
      shuffleQuestions: true,
    };
    saveSettings(settings);
  });

  if (els.btnReset) {
    els.btnReset.addEventListener("click", () => {
      if (els.screenQuiz && els.screenQuiz.classList.contains("hidden")) return;
      restartCurrentQuizWithNewOrder();
    });
  }

  if (els.btnFreeTrial) {
    els.btnFreeTrial.addEventListener("click", async () => {
      freeTrialSessionActive = true;
      localStorage.setItem(STORAGE_KEYS.user, FREE_TRIAL_USER);
      // Afficher directement le niveau d'essai gratuit avec les questions autorisées.
      session.level = FREE_TRIAL_LEVEL;
      session.subject = FREE_TRIAL_SUBJECT;
      session.topic = FREE_TRIAL_TOPIC;
      localStorage.setItem(STORAGE_KEYS.sessionToken, getSessionToken());
      const ok = await grantAccess(FREE_TRIAL_USER);
      if (!ok) return;
      setMode("normal");
      renderFreeTrialStartInfo();
      showScreen(els.screenStart);
    });
  }

  const btnToggleUsername = document.getElementById('btnToggleUsername');
  if (btnToggleUsername && els.inputUsername) {
    btnToggleUsername.addEventListener('click', () => {
      const visible = els.inputUsername.type === 'text';
      els.inputUsername.type = visible ? 'password' : 'text';
      btnToggleUsername.classList.toggle('is-open', !visible);
      btnToggleUsername.textContent = visible ? '👁️‍🗨️' : '👁️';
      btnToggleUsername.setAttribute('aria-label', visible ? 'Afficher le code d’accès' : 'Masquer le code d’accès');
      els.inputUsername.focus();
    });
  }

  let loginSubmitInProgress = false;

  if (els.formCode) {
    els.formCode.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (loginSubmitInProgress) return;
      loginSubmitInProgress = true;
      const submitButton = els.formCode.querySelector('button[type="submit"], input[type="submit"]');
      const previousButtonText = submitButton && submitButton.tagName === 'BUTTON' ? submitButton.textContent : '';
      if (submitButton) {
        submitButton.disabled = true;
        if (submitButton.tagName === 'BUTTON') submitButton.textContent = 'Connexion...';
      }
      try {
        const username = (els.inputUsername?.value || "").trim();
        if (!username) {
          const msg = "Veuillez entrer votre code d’accès avant de vous connecter.";
          if (els.codeError) {
            els.codeError.textContent = msg;
            els.codeError.style.display = "block";
          }
          alert(msg);
          els.inputUsername?.focus();
          return;
        }
        const ok = await grantAccess(username);
        if (!ok) return;
        els.inputStudentName.value = settings.studentName;
        els.toggleShuffle.checked = settings.shuffleQuestions;
        updateStartInfo();
        setupDESelectors();
        showScreen(els.screenStart);
      } finally {
        loginSubmitInProgress = false;
        if (submitButton) {
          submitButton.disabled = false;
          if (submitButton.tagName === 'BUTTON') submitButton.textContent = previousButtonText;
        }
      }
    });
  }

  if (els.btnLogout) {
    els.btnLogout.addEventListener("click", () => {
      denyAccess();
    });
  }

  // Important : on ne libère plus la session lors d'une actualisation ou fermeture d'onglet.
  // Le compte reste connecté sur le même appareil jusqu'au clic explicite sur "Se déconnecter".


  function isQuizVisible() {
    return els.screenQuiz && !els.screenQuiz.classList.contains('hidden');
  }

  ['copy', 'cut', 'paste'].forEach((eventName) => {
    document.addEventListener(eventName, (event) => {
      if (appSettings.antiCopyPaste && isQuizVisible()) {
        event.preventDefault();
        recordCheatAttempt(eventName === 'paste' ? 'Collage interdit pendant le quiz' : 'Copie interdite pendant le quiz');
      }
    });
  });

  document.addEventListener('contextmenu', (event) => {
    if (appSettings.antiCopyPaste && isQuizVisible()) event.preventDefault();
  });

  document.addEventListener('keydown', (event) => {
    const key = String(event.key || '').toLowerCase();
    const isCopyCombo = (event.ctrlKey || event.metaKey) && ['c', 'x', 'v', 'a', 's', 'p'].includes(key);
    const isPrintScreen = key === 'printscreen' || key === 'printscrn';
    if (appSettings.antiCopyPaste && isQuizVisible() && isCopyCombo) {
      event.preventDefault();
      recordCheatAttempt('Copie/collage interdit pendant le quiz');
    }
    if (appSettings.antiScreenshot && isQuizVisible() && isPrintScreen) {
      event.preventDefault();
      recordCheatAttempt('Capture d’écran interdite pendant le quiz');
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden || !isQuizVisible()) return;
    if (shouldAutoSubmitOnFocusLoss()) recordCheatAttempt(getFocusLossAntiCheatReason());
    else if (appSettings.notifyCheat) recordCheatAttempt('Appel ou notification reçu pendant le quiz');
  });

  window.addEventListener('pagehide', () => {
    if (!isQuizVisible()) return;
    if (shouldAutoSubmitOnFocusLoss()) recordCheatAttempt(getFocusLossAntiCheatReason());
  });

  window.addEventListener('blur', () => {
    if (!isQuizVisible()) return;
    if (shouldAutoSubmitOnFocusLoss()) {
      recordCheatAttempt(getFocusLossAntiCheatReason());
      return;
    }
    if (!appSettings.notifyCheat) return;
    // Le navigateur ne donne pas accès directement aux appels/notifications.
    // On assimile seulement une vraie perte de focus après le début du quiz à ce motif.
    recordCheatAttempt('Appel, notification ou perte de focus pendant le quiz');
  });

  // init
  (async () => {
    await loadAppSettingsFromServer();
    settings = loadSettings();
    adminDECatalogIndexCache = null; bank = getQuestionBank();
    if (await isAccessGranted()) {
      const user = localStorage.getItem(STORAGE_KEYS.user);
      await grantAccess(user);
      els.inputStudentName.value = settings.studentName;
      els.toggleShuffle.checked = settings.shuffleQuestions;
      updateStartInfo();
      setupDESelectors();
      showScreen(els.screenStart);
    } else {
      denyAccess(false);
    }
  })();
})();

/* ===== FIN: app.js ===== */

;
/* ===== DEBUT: interface.dynamique.js ===== */
/* Themes intelligents harmonises - Q Revision Science Medicale
   Version legere : changement uniquement au clic / choix / saisie, sans boucle continue. */
(function () {
  'use strict';

  let qdashSearchSuppressUntil = 0;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const THEMES_NIVEAUX = [
    { k:'a1', re:/a1|base\s*sant/i, p:'#00B8D9', s:'#00C48C', a:'#FFD166', bg:'#E6FFFB', bg2:'#F0F9FF', ink:'#063344' },
    { k:'l1', re:/l1|emergent|émergent/i, p:'#16A34A', s:'#38BDF8', a:'#FACC15', bg:'#ECFDF5', bg2:'#EFF6FF', ink:'#052E16' },
    { k:'l2', re:/l2|ascendant/i, p:'#7C3AED', s:'#2563EB', a:'#22D3EE', bg:'#F5F3FF', bg2:'#EEF2FF', ink:'#1E1B4B' },
    { k:'a2', re:/a2|moyen|auxi/i, p:'#F97316', s:'#F43F5E', a:'#84CC16', bg:'#FFF7ED', bg2:'#FFF1F2', ink:'#431407' },
    { k:'l3inf', re:/l3.*inf|accompli.*inf|ide|infirm/i, p:'#0369A1', s:'#0D9488', a:'#F59E0B', bg:'#E0F2FE', bg2:'#F0FDFA', ink:'#082F49' },
    { k:'l3sf', re:/l3.*sf|accompli.*sf|sfm|sage/i, p:'#DB2777', s:'#7C3AED', a:'#FB923C', bg:'#FDF2F8', bg2:'#F5F3FF', ink:'#500724' },
    { k:'eff', re:/inf\/?sag|sag-m|examen|formation/i, p:'#0F766E', s:'#2563EB', a:'#EAB308', bg:'#ECFEFF', bg2:'#EFF6FF', ink:'#042F2E' }
  ];

  const THEMES_MATIERES = [
    { re:/anatom/i, p:'#EF4444', s:'#FB7185', a:'#F59E0B', bg:'#FFF1F2', label:'Anatomie' },
    { re:/physio/i, p:'#0284C7', s:'#22D3EE', a:'#10B981', bg:'#F0F9FF', label:'Physiologie' },
    { re:/pédiatr|pediatr|enfant|néonat|neonat/i, p:'#F97316', s:'#FBBF24', a:'#06B6D4', bg:'#FFF7ED', label:'Pédiatrie' },
    { re:/gyn|obst|sage|matern|accouche|grossesse/i, p:'#DB2777', s:'#C084FC', a:'#FB923C', bg:'#FDF2F8', label:'Gynécologie / Obstétrique' },
    { re:/chir|bloc|pansement|plaie/i, p:'#B91C1C', s:'#F97316', a:'#FACC15', bg:'#FEF2F2', label:'Chirurgie' },
    { re:/trauma|ortho|fract|luxat|entorse/i, p:'#D97706', s:'#F59E0B', a:'#EF4444', bg:'#FFFBEB', label:'Traumatologie' },
    { re:/uro|rein|urinaire|prostate/i, p:'#0E7490', s:'#2563EB', a:'#22C55E', bg:'#ECFEFF', label:'Urologie' },
    { re:/onco|cancer|tumeur/i, p:'#7C3AED', s:'#A855F7', a:'#06B6D4', bg:'#F5F3FF', label:'Oncologie' },
    { re:/pharma|médic|medic|therap|dose/i, p:'#4F46E5', s:'#8B5CF6', a:'#F59E0B', bg:'#EEF2FF', label:'Pharmacologie' },
    { re:/santé publique|sante publique|communaut|hygiène|hygiene|nutrition|pcimen/i, p:'#059669', s:'#14B8A6', a:'#FACC15', bg:'#ECFDF5', label:'Santé publique' },
    { re:/cardio|coeur|cœur|hta/i, p:'#DC2626', s:'#F43F5E', a:'#06B6D4', bg:'#FEF2F2', label:'Cardiologie' },
    { re:/neuro|cerveau|nerf/i, p:'#4338CA', s:'#0EA5E9', a:'#F59E0B', bg:'#EEF2FF', label:'Neurologie' },
    { re:/orl|ophtalmo|oeil|œil|oreille/i, p:'#0891B2', s:'#10B981', a:'#A3E635', bg:'#ECFEFF', label:'ORL / Ophtalmologie' },
    { re:/dictionnaire|medical|médical/i, p:'#0D9488', s:'#2563EB', a:'#F59E0B', bg:'#F0FDFA', label:'Dictionnaire' }
  ];

  const THEMES_PAGES = {
    start:{ p:'#2563EB', s:'#10B981', a:'#F59E0B', bg:'#F8FAFC', bg2:'#EFF6FF', ink:'#0F172A' },
    quiz:{ p:'#059669', s:'#2563EB', a:'#F59E0B', bg:'#ECFDF5', bg2:'#EFF6FF', ink:'#052E16' },
    admin:{ p:'#EA580C', s:'#7C3AED', a:'#06B6D4', bg:'#FFF7ED', bg2:'#F5F3FF', ink:'#431407' },
    dictionary:{ p:'#0D9488', s:'#2563EB', a:'#F59E0B', bg:'#F0FDFA', bg2:'#EFF6FF', ink:'#042F2E' },
    result:{ p:'#2563EB', s:'#7C3AED', a:'#22C55E', bg:'#EFF6FF', bg2:'#F5F3FF', ink:'#172554' },
    review:{ p:'#0F766E', s:'#4F46E5', a:'#F59E0B', bg:'#F0FDFA', bg2:'#EEF2FF', ink:'#042F2E' },
    code:{ p:'#7C3AED', s:'#06B6D4', a:'#FACC15', bg:'#F5F3FF', bg2:'#ECFEFF', ink:'#1E1B4B' }
  };

  const SUJET_ACCENTS = ['#06B6D4','#22C55E','#F97316','#EC4899','#8B5CF6','#EF4444','#14B8A6','#2563EB','#EAB308','#84CC16'];

  function value(id){ const el = document.getElementById(id); return el ? String(el.value || el.textContent || '').trim() : ''; }
  function hash(text){ let h=0; text=String(text||''); for(let i=0;i<text.length;i++){ h=((h<<5)-h+text.charCodeAt(i))|0; } return Math.abs(h); }
  function match(list, text){ return list.find(x => x.re && x.re.test(text || '')) || null; }
  function page(){
    const ids = [['screenCode','code'],['screenAdmin','admin'],['screenQuiz','quiz'],['screenResult','result'],['screenReview','review'],['screenDictionary','dictionary'],['screenResumes','resumes'],['screenStart','start']];
    for (const [id, p] of ids){ const el=document.getElementById(id); if(el && !el.classList.contains('hidden')) return p; }
    return 'start';
  }
  function context(){
    const de = $('#modeDE') && !$('#modeDE').classList.contains('hidden');
    return {
      page: page(),
      niveau: de ? value('selectDETrack') : value('selectLevel'),
      matiere: de ? value('selectDESubject') : value('selectSubject'),
      sujet: de ? value('selectDETopic') : value('selectTopic')
    };
  }
  function compose(ctx){
    const pg = THEMES_PAGES[ctx.page] || THEMES_PAGES.start;
    const nv = match(THEMES_NIVEAUX, ctx.niveau);
    const mt = match(THEMES_MATIERES, ctx.matiere + ' ' + ctx.sujet);
    return {
      primary: (mt && mt.p) || (nv && nv.p) || pg.p,
      secondary: (mt && mt.s) || (nv && nv.s) || pg.s,
      accent: ctx.sujet ? SUJET_ACCENTS[hash(ctx.sujet) % SUJET_ACCENTS.length] : ((mt && mt.a) || pg.a),
      bg: (mt && mt.bg) || (nv && nv.bg) || pg.bg,
      bg2: (nv && nv.bg2) || pg.bg2,
      ink: (nv && nv.ink) || pg.ink,
      matiereLabel: (mt && mt.label) || 'Matière'
    };
  }
  function apply(){
    const ctx = context();
    const t = compose(ctx);
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', t.primary);
    root.style.setProperty('--theme-secondary', t.secondary);
    root.style.setProperty('--theme-accent', t.accent);
    root.style.setProperty('--theme-bg', t.bg);
    root.style.setProperty('--theme-bg-2', t.bg2);
    root.style.setProperty('--theme-ink', t.ink);
    document.body.dataset.themePage = ctx.page;
    document.body.dataset.themeKey = [ctx.niveau, ctx.matiere, ctx.sujet].join('|');
    paintCards(ctx);
    updatePanel(ctx, t);
  }
  function updatePanel(ctx, t){
    let panel = $('#smartThemePanel');
    const start = $('#screenStart');
    if (!panel && start){
      panel = document.createElement('div');
      panel.id = 'smartThemePanel';
      panel.className = 'smart-theme-panel';
      start.insertBefore(panel, start.firstChild);
    }
    if (!panel) return;
    panel.innerHTML = '<div><small>Niveau</small><strong></strong></div><div><small>Matière</small><strong></strong></div><div><small>Sujet</small><strong></strong></div>';
    const vals = [ctx.niveau || 'À choisir', ctx.matiere || t.matiereLabel, ctx.sujet || 'À choisir'];
    $$('strong', panel).forEach((el,i)=> el.textContent = vals[i]);
  }
  function paintCards(ctx){
    const base = hash(ctx.niveau + ctx.matiere + ctx.sujet + ctx.page);
    $$('.card, .question, .dictItem, .reviewItem, .admin-box, .admin-count-row, .dynamic-accordion-lite').forEach((el, i) => {
      el.style.setProperty('--item-accent', SUJET_ACCENTS[(base + i) % SUJET_ACCENTS.length]);
    });
  }
  function accordions(){
    ['modeNormal','modeDE'].forEach(id => {
      const box = document.getElementById(id);
      if (!box || box.dataset.smartAccordion === '1') return;
      $$('.grid .field', box).forEach((field, i) => {
        if (field.closest('.dynamic-accordion-lite')) return;
        const label = field.querySelector('.label');
        const details = document.createElement('details');
        details.className = 'dynamic-accordion-lite';
        if (i === 0) details.open = true;
        const summary = document.createElement('summary');
        summary.textContent = (i + 1) + '. ' + (label ? label.textContent.trim() : 'Choix');
        field.parentNode.insertBefore(details, field);
        details.appendChild(summary);
        details.appendChild(field);
      });
      box.dataset.smartAccordion = '1';
    });
  }
  function bind(){
    // Interface tableau de bord: on garde les sélecteurs en cartes visibles, sans accordéons.
    apply();
    ['selectLevel','selectSubject','selectTopic','selectDETrack','selectDESubject','selectDETopic','inputDictionarySearch'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.dataset.smartThemeBound !== '1') {
        el.addEventListener('change', apply, { passive:true });
        el.addEventListener('input', apply, { passive:true });
        el.dataset.smartThemeBound = '1';
      }
    });
    document.addEventListener('click', function(){ window.setTimeout(apply, 80); }, { passive:true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, { once:true });
  else bind();
})();

/* Interface type tableau de bord + recherche niveau/matiere/sujet + menu refermable */
(function () {
  'use strict';

  let qdashSearchSuppressUntil = 0;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const norm = (v) => String(v || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
  const text = (v) => String(v || '').trim();

  function optionValues(select) {
    if (!select) return [];
    return Array.from(select.options || []).map(o => o.value).filter(Boolean);
  }

  function isAppVisible() {
    const app = $('#appContent');
    return !!(app && !app.classList.contains('hidden'));
  }

  function forwardClick(targetId) {
    const el = document.getElementById(targetId);
    if (el && !el.classList.contains('hidden') && el.style.display !== 'none') el.click();
  }

  function closeMenu() {
    document.body.classList.add('qdash-menu-collapsed');
    document.body.classList.remove('qdash-menu-open');
  }

  function openMenu() {
    document.body.classList.remove('qdash-menu-collapsed');
    document.body.classList.add('qdash-menu-open');
  }

  function getCurrentLevelLabel() {
    return $('#selectLevel')?.value || $('#selectDETrack')?.value || 'Niveau';
  }



  function getManualLocalInfoForBadge(username) {
    const key = norm(username || '');
    const source = window.UTILISATEURS_LOCAUX_INFOS || window.LOCAL_USER_INFOS || window.localUserInfos || {};
    if (!key || !source || typeof source !== 'object') return null;
    let found = source[username] || null;
    if (!found) {
      for (const [id, value] of Object.entries(source)) {
        if (norm(id) === key) { found = value; break; }
      }
    }
    if (!found || typeof found !== 'object') return null;
    const last = text(found.nom || found.last_name || found.lastName || '');
    const first = text(found.prenom || found.prénom || found.first_name || found.firstName || '');
    const full = text(found.full_name || found.fullName || `${last} ${first}`.trim());
    const level = found.niveau || found.level || (Array.isArray(found.levels) ? found.levels[0] : '');
    return {
      levels: Array.isArray(found.levels) ? found.levels : (level ? [level] : []),
      first_name: first,
      last_name: last,
      full_name: full,
      firstName: first,
      lastName: last,
      fullName: full,
      source: 'local-manual',
      dynamic: true,
      localManual: true,
    };
  }

  function syncUserBadge() {
    const badge = $('#qdashUserName');
    const role = $('#qdashUserRole');
    const level = $('#qdashUserLevel');
    const current = localStorage.getItem('quizRevision.user.v1') || '';
    const lv = getCurrentLevelLabel();
    const manualCfg = getManualLocalInfoForBadge(current);
    if (manualCfg && current) {
      window.USERS = window.USERS || {};
      window.USERS[current] = { ...(window.USERS[current] || {}), ...manualCfg };
    }
    const cfg = manualCfg || (current && window.USERS && window.USERS[current] ? window.USERS[current] : null);
    const first = text(cfg?.first_name || cfg?.firstName || '');
    const last = text(cfg?.last_name || cfg?.lastName || '');
    const full = text(cfg?.full_name || cfg?.fullName || `${last} ${first}`.trim());
    const onlineCreated = !!(cfg && (cfg.dynamic || cfg.source === 'server' || full || first || last));

    if (badge) {
      if (current === '__ESSAI_GRATUIT__') badge.textContent = 'Essai gratuit';
      else badge.textContent = onlineCreated ? (full || current) : 'Étudiant(e)';
    }
    if (role) role.textContent = lv && lv !== 'Niveau' ? lv : 'Niveau non défini';
    if (level) level.textContent = lv;
    const adminBtn = $('#qdashNavAdmin');
    const oldAdmin = $('#btnAdmin');
    if (adminBtn) adminBtn.classList.toggle('hidden', !oldAdmin || oldAdmin.classList.contains('hidden'));
    const examBtn = $('#qdashNavExam');
    const oldExam = $('#btnModeDE');
    if (examBtn) examBtn.classList.toggle('hidden', !oldExam || oldExam.style.display === 'none');
  }

  function ensureShell() {
    const app = $('#appContent');
    if (!app || app.dataset.qdashReady === '1') return;
    app.dataset.qdashReady = '1';
    app.classList.add('qdash-shell');

    const sidebar = document.createElement('aside');
    sidebar.id = 'qdashSidebar';
    sidebar.className = 'qdash-sidebar';
    sidebar.innerHTML = `
      <div class="qdash-brand">
        <div class="qdash-logo">Q</div>
        <div><strong>Q REVISION</strong><span>Science Médicale</span></div>
      </div>
      <nav class="qdash-nav" aria-label="Menu principal">
        <div class="qdash-nav-title">Apprendre</div>
        <button type="button" id="qdashNavQuiz" class="qdash-nav-item"><span>▶</span> Commencer un Quiz</button>
        <button type="button" id="qdashNavDictionary" class="qdash-nav-item"><span>▤</span> Dictionnaire Médical</button>
        <button type="button" id="qdashNavResumes" class="qdash-nav-item"><span>📚</span> Résumés de Cours</button>
        <button type="button" id="qdashNavExam" class="qdash-nav-item"><span>◒</span> Examens de fin de Formation</button>
        <button type="button" id="qdashNavHistory" class="qdash-nav-item"><span>📊</span> Historique et évaluations</button>
        <div class="qdash-nav-title qdash-admin-title">Paramètres</div>
        <button type="button" id="qdashNavAdmin" class="qdash-nav-item hidden"><span>⚙</span> Paramètres</button>
      </nav>
      <div class="qdash-level-card">
        <span>Niveau actuel</span>
        <strong id="qdashUserLevel">Niveau</strong>
        <button type="button" id="qdashLevelHome">Changer de niveau</button>
      </div>
    `;
    app.insertBefore(sidebar, app.firstChild);

    const headerInner = $('.header__inner');
    if (headerInner && !$('#qdashMenuToggle')) {
      const toggle = document.createElement('button');
      toggle.id = 'qdashMenuToggle';
      toggle.className = 'qdash-menu-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-label', 'Ouvrir ou fermer le menu');
      toggle.textContent = '☰';
      headerInner.insertBefore(toggle, headerInner.firstChild);

      const search = document.createElement('div');
      search.className = 'qdash-top-search';
      search.innerHTML = `<input id="qdashGlobalSearch" type="search" placeholder="Rechercher une matière ou un sujet..." autocomplete="off"><button type="button" id="qdashSearchBtn">⌕</button><div id="qdashSearchResults" class="qdash-search-results hidden"></div>`;
      const brand = $('.brand', headerInner);
      if (brand && brand.nextSibling) headerInner.insertBefore(search, brand.nextSibling);
      else headerInner.appendChild(search);

      const homeBtn = document.createElement('button');
      homeBtn.id = 'qdashHomeBtn';
      homeBtn.className = 'qdash-logout-btn qdash-home-btn';
      homeBtn.type = 'button';
      homeBtn.textContent = 'Accueil';
      homeBtn.title = 'Retour à l’accueil';
      headerInner.appendChild(homeBtn);

      const backBtn = document.createElement('button');
      backBtn.id = 'qdashBackBtn';
      backBtn.className = 'qdash-logout-btn qdash-back-btn';
      backBtn.type = 'button';
      backBtn.textContent = 'Retour';
      backBtn.title = 'Revenir à la page précédente';
      headerInner.appendChild(backBtn);

      const logoutBtn = document.createElement('button');
      logoutBtn.id = 'qdashLogoutBtn';
      logoutBtn.className = 'qdash-logout-btn';
      logoutBtn.type = 'button';
      logoutBtn.textContent = 'Se déconnecter';
      logoutBtn.title = 'Se déconnecter';
      headerInner.appendChild(logoutBtn);

      const user = document.createElement('div');
      user.className = 'qdash-user-chip';
      user.innerHTML = `<span class="qdash-bell">🔔</span><span class="qdash-avatar">👩‍🎓</span><span><strong id="qdashUserName">Étudiant(e)</strong><small id="qdashUserRole">Niveau</small></span>`;
      headerInner.appendChild(user);
    }

    bindShellEvents();
    ensureDashboardBlocks();
    syncUserBadge();
  }

  function setActive(which) {
    $$('.qdash-nav-item').forEach(b => b.classList.remove('active'));
    const el = $('#qdashNav' + which);
    if (el) el.classList.add('active');
  }

  function showDashboardMode() {
    document.body.classList.add('qdash-dashboard-view');
    document.body.classList.remove('qdash-quiz-view');
    const title = $('#startTitle');
    const desc = $('#screenStart > .muted');
    if (title) title.textContent = 'Tableau de bord';
    if (desc) desc.textContent = 'Vue générale de vos révisions, matières, questions et synthèses.';
    updateDashboardStats();
  }

  function showQuizMode(mode) {
    document.body.classList.remove('qdash-dashboard-view');
    document.body.classList.add('qdash-quiz-view');
    const title = $('#startTitle');
    const desc = $('#screenStart > .muted');
    if (title) title.textContent = mode === 'de' ? 'Examen de fin de Formation' : 'Commencer un quiz';
    if (desc) desc.textContent = 'Choisis ton niveau, ta matière et ton sujet, puis démarre une session.';
    updateDashboardStats();
  }

  function forceExamModeVisible() {
    // Correction 31/05/2026 : le menu EFF ne doit jamais laisser l'accueil
    // réafficher le bouton rapide « Commencer un Quiz ». On force donc le
    // vrai mode quiz + les listes Voie / Matière / Sujet de l'EFF visibles.
    document.body.classList.remove('qdash-dashboard-view');
    document.body.classList.add('qdash-quiz-view');
    const normal = $('#modeNormal');
    const de = $('#modeDE');
    if (normal) normal.classList.add('hidden');
    if (de) de.classList.remove('hidden');
    const title = $('#startTitle');
    if (title) title.textContent = 'Examen de fin de Formation';
    const desc = $('#screenStart > .muted');
    if (desc) desc.textContent = 'Choisis la voie, la matière et le sujet, puis démarre une session.';
  }

  function bindShellEvents() {
    $('#qdashMenuToggle')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (document.body.classList.contains('qdash-menu-collapsed')) openMenu(); else closeMenu();
    });

    $('#qdashHomeBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setActive('Dashboard');
      forwardClick('btnHome');
      showDashboardMode();
      closeMenu();
    });

    $('#qdashBackBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      forwardClick('btnBack');
      closeMenu();
    });

    // Correction 31/05/2026 : quand l'ancien bouton Accueil de l'en-tête est utilisé,
    // rétablir aussi le vrai mode accueil afin que le bouton "Commencer un Quiz"
    // placé au-dessus de "Synthèse des questions" réapparaisse uniquement sur l'accueil.
    $('#btnHome')?.addEventListener('click', () => {
      if (window.__QDASH_OPENING_EFF_FROM_MENU__) return;
      window.setTimeout(() => {
        if (window.__QDASH_OPENING_EFF_FROM_MENU__) return;
        setActive('Dashboard');
        showDashboardMode();
        closeMenu();
      }, 0);
    });

    $('#qdashLogoutBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const originalLogout = document.getElementById('btnLogout');
      if (originalLogout) originalLogout.click();
    });
    $('#qdashNavQuiz')?.addEventListener('click', () => { setActive('Quiz'); forwardClick('btnHome'); forwardClick('btnModeQuiz'); showQuizMode('normal'); closeMenu(); });
    $('#qdashNavDictionary')?.addEventListener('click', () => { setActive('Dictionary'); forwardClick('btnDictionary'); closeMenu(); });
    $('#qdashNavResumes')?.addEventListener('click', () => { setActive('Resumes'); forwardClick('btnResumes'); closeMenu(); });
    $('#qdashNavExam')?.addEventListener('click', () => {
      setActive('Exam');
      window.__QDASH_OPENING_EFF_FROM_MENU__ = true;
      forwardClick('btnHome');
      forwardClick('btnModeDE');
      showQuizMode('de');
      forceExamModeVisible();
      window.setTimeout(() => {
        forwardClick('btnModeDE');
        showQuizMode('de');
        forceExamModeVisible();
        window.__QDASH_OPENING_EFF_FROM_MENU__ = false;
      }, 0);
      closeMenu();
    });
    $('#qdashNavHistory')?.addEventListener('click', () => { setActive('History'); forwardClick('btnHistory'); closeMenu(); });
    $('#qdashNavAdmin')?.addEventListener('click', () => { setActive('Admin'); forwardClick('btnAdmin'); closeMenu(); });
    $('#qdashLevelHome')?.addEventListener('click', () => { forwardClick('btnHome'); openMenu(); });

    document.addEventListener('click', (e) => {
      const sidebar = $('#qdashSidebar');
      const toggle = $('#qdashMenuToggle');
      if (!isAppVisible() || !sidebar) return;
      if (!sidebar.contains(e.target) && !toggle?.contains(e.target)) closeMenu();
      const searchBox = $('.qdash-top-search');
      if (searchBox && !searchBox.contains(e.target)) hideSearchResults(false);
    }, true);

    ['selectLevel','selectSubject','selectTopic','selectDETrack','selectDESubject','selectDETopic'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.dataset.qdashSync !== '1') {
        el.dataset.qdashSync = '1';
        el.addEventListener('change', () => { window.setTimeout(() => { syncUserBadge(); updateDashboardStats(); runGlobalSearch(); }, 80); });
      }
    });
    $('#qdashGlobalSearch')?.addEventListener('input', runGlobalSearch);
    $('#qdashGlobalSearch')?.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideSearchResults(false); });
    $('#qdashSearchBtn')?.addEventListener('click', runGlobalSearch);
  }

  function ensureDashboardBlocks() {
    const start = $('#screenStart');
    if (!start || start.dataset.qdashDashboard === '1') return;
    start.dataset.qdashDashboard = '1';
    start.classList.add('qdash-dashboard');

    const banner = document.createElement('div');
    banner.className = 'qdash-hero-banner';
    banner.innerHTML = `
      <div><h2>Bienvenue ! 👋</h2><p>Prêt(e) à tester tes connaissances aujourd'hui ? Choisissez un sujet et commencez votre quiz.</p></div>
      <div class="qdash-hero-art" aria-hidden="true">🫀 🧬</div>
    `;
    start.insertBefore(banner, start.firstChild);

    const stats = document.createElement('div');
    stats.className = 'qdash-stat-grid';
    stats.innerHTML = `
      <div class="qdash-stat"><span>📄</span><strong id="qdashStatQuestions">0</strong><small>Questions</small></div>
      <div class="qdash-stat"><span>📚</span><strong id="qdashStatSubjects">0</strong><small>Matières</small></div>
      <div class="qdash-stat"><span>🎯</span><strong id="qdashStatTopics">0</strong><small>Sujets</small></div>
    `;
    banner.after(stats);

    const assistant = document.createElement('div');
    assistant.className = 'qdash-help-row';
    assistant.innerHTML = `
      <div><strong>Révisez à votre rythme</strong><small>Apprenez quand vous voulez, où vous voulez.</small></div>
      <div><strong>Suivez vos progrès</strong><small>Visualisez vos résultats et identifiez vos points faibles.</small></div>
      <div><strong>Entraînez-vous</strong><small>Des milliers de questions pour vous améliorer.</small></div>
      <div><strong>Réussissez</strong><small>Atteignez vos objectifs et soyez fier de vous !</small></div>
    `;
    start.appendChild(assistant);

    const quizAccess = document.createElement('div');
    quizAccess.className = 'qdash-dashboard-quiz-access';
    quizAccess.innerHTML = `
      <button type="button" id="qdashDashboardStartQuiz" class="btn btn--primary qdash-dashboard-start-quiz">▶ Commencer un Quiz</button>
      <small>Accéder directement aux niveaux, matières et sujets du quiz.</small>
    `;

    const synthesis = document.createElement('div');
    synthesis.className = 'qdash-synthesis-card is-collapsed';
    synthesis.id = 'qdashQuestionSynthesis';
    synthesis.innerHTML = `
      <button type="button" class="qdash-synthesis-toggle" id="qdashSynthesisToggle" aria-expanded="false">
        <span>📌 Synthèse des questions</span>
        <small id="qdashSynthesisCount">0 thème</small>
      </button>
      <p class="qdash-synthesis-note">Clique sur le bouton pour afficher les thèmes. Si un thème dépasse 40 questions, il est divisé en groupes de 40.</p>
      <div class="qdash-synthesis-list hidden" id="qdashSynthesisList"></div>
    `;
    assistant.before(quizAccess);
    quizAccess.after(synthesis);

    const openNormalQuizFromDashboard = () => {
      setActive('Quiz');
      forwardClick('btnHomeQuiz');
      forwardClick('btnModeQuiz');
      showQuizMode('normal');
      closeMenu();
    };

    $('#qdashDashboardStartQuiz')?.addEventListener('click', openNormalQuizFromDashboard);
    $('#qdashHeroStartQuiz')?.addEventListener('click', openNormalQuizFromDashboard);

    $('#qdashSynthesisToggle')?.addEventListener('click', () => {
      const card = $('#qdashQuestionSynthesis');
      const list = $('#qdashSynthesisList');
      const toggle = $('#qdashSynthesisToggle');
      const open = list?.classList.contains('hidden');
      if (list) list.classList.toggle('hidden', !open);
      if (card) card.classList.toggle('is-collapsed', !open);
      if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) updateQuestionSynthesis();
    });
    showDashboardMode();
    updateDashboardStats();
  }

  function collectAvailablePairs() {
    const selectLevel = $('#selectLevel');
    const selectSubject = $('#selectSubject');
    const selectTopic = $('#selectTopic');
    const level = selectLevel?.value || '';
    const levelKey = norm(level);
    const subjectOptions = optionValues(selectSubject).filter(s => !/^toutes/i.test(s));
    const subjectKeys = new Set(subjectOptions.map(norm));
    const pairs = [];

    subjectOptions.forEach(subject => pairs.push({ type: 'matiere', level, subject, topic: '' }));

    const questions = Array.isArray(window.QUIZ_QUESTIONS_QUIZ) ? window.QUIZ_QUESTIONS_QUIZ : (Array.isArray(window.QUIZ_QUESTIONS) ? window.QUIZ_QUESTIONS : []);
    questions.forEach(q => {
      const qLevel = text(q.level);
      const qSubject = text(q.subject);
      const qTopic = text(q.topic);
      if (!qSubject || !subjectKeys.has(norm(qSubject))) return;
      if (levelKey && levelKey !== norm('Tous les niveaux') && norm(qLevel) !== levelKey) return;
      if (qTopic) pairs.push({ type: 'sujet', level: qLevel || level, subject: qSubject, topic: qTopic });
    });

    optionValues(selectTopic).filter(t => !/^tous/i.test(t)).forEach(topic => {
      pairs.push({ type: 'sujet', level, subject: selectSubject?.value || '', topic });
    });

    const seen = new Set();
    return pairs.filter(p => {
      const key = [p.type, norm(p.level), norm(p.subject), norm(p.topic)].join('|');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function hideSearchResults(clearContent = false) {
    const results = $('#qdashSearchResults');
    if (!results) return;
    results.classList.add('hidden');
    results.style.display = 'none';
    if (clearContent) results.innerHTML = '';
  }


  const THEME_PATTERNS = [
    ['Paludisme', /palud|plasmodium|anoph[eè]le|acc[eè]s palustre|goutte [eé]paisse|trophozo/i, '🦟'],
    ['Tuberculose', /tubercul|bk|bacille de koch|crachat|h[eé]moptysie|toux chronique/i, '🫁'],
    ['VIH / SIDA', /\bvih\b|\bsida\b|arv|r[eé]troviral|cd4|charge virale/i, '🧫'],
    ['Diabète', /diab[eè]te|insuline|glyc[eé]mie|hyperglyc|hypoglyc|acidoc[eé]tose/i, '🩸'],
    ['Hypertension artérielle', /hypertension|\bhta\b|tension art[eé]rielle|pression art[eé]rielle/i, '❤️'],
    ['Grossesse et accouchement', /grossesse|accouchement|parturiente|travail|dilatation|post[- ]partum|pr[eé][ -]?eclampsie|eclampsie/i, '🤰'],
    ['Nouveau-né / Néonatologie', /nouveau[- ]?n[eé]|n[eé]onat|apgar|pr[eé]matur|macrosom|allaitement/i, '👶'],
    ['Fractures et traumatologie', /fracture|luxation|entorse|traumatisme|humerus|hum[eé]rus|f[eé]mur|bassin|pl[aâ]tre/i, '🦴'],
    ['Plaies et pansements', /plaie|pansement|suppuration|cicatrisation|asepsie|antisepsie|abc[eè]s/i, '🩹'],
    ['Mitose', /\bmitose\b|division cellulaire|chromosome|prophase|metaphase|métaphase|anaphase|telophase|télophase/i, '🧬'],
    ['Méiose', /\bmeiose\b|\bméiose\b|gamete|gamète|haploide|haploïde/i, '🧬'],
    ['Diagnostic', /diagnostic|examen complementaire|examen complémentaire|bilan|scanner|radio|radiograph|echographie|échographie|analyse|s[eé]rologie|test rapide/i, '🩺'],
    ['Signes cliniques des maladies', /signe clinique|symptome|symptôme|douleur|fi[eè]vre|fievre|dyspnee|dyspnée|œdeme|oedeme|saignement|vomissement|diarrh[eé]e|c[eé]phal[eé]e/i, '❤️'],
    ['Physiopathologie / mécanismes importants', /physiopath|mecanisme|mécanisme|cause|etiologie|étiologie|facteur|pathogen|transmission|contamination/i, '⚙️'],
    ['Prise en charge', /prise en charge|traitement|soin|conduite a tenir|conduite à tenir|surveillance|prevention|prévention|infirmier|r[eé]f[eé]rer|urgence/i, '💉'],
    ['Complications', /complication|risque|séquelle|sequelle|choc|hemorrag|hémorrag|infection|d[eé]shydratation|d[eé]tresse/i, '🟣'],
    ['Cas cliniques', /cas clinique|patient|patiente|nouveau-ne|nouveau-né|enfant de|homme de|femme de|se pr[eé]sente/i, '⚕️'],
    ['Définition et classification', /definition|définition|classification|type|forme|stade|grade|d[eé]finir/i, '📘']
  ];

  function synthesisQuestionSignature(q) {
    const main = text(q?.question || q?.text || q?.statement || '');
    const choices = Array.isArray(q?.choices) ? q.choices.map(text).join(' ') : '';
    const indexedAnswer = Array.isArray(q?.answerIndices) ? q.answerIndices.map(n => Array.isArray(q?.choices) ? text(q.choices[n]) : String(n)).join(' ') : '';
    const singleAnswer = Number.isInteger(q?.answerIndex) && Array.isArray(q?.choices) ? text(q.choices[q.answerIndex]) : '';
    const answer = Array.isArray(q?.answer) ? q.answer.map(text).join(' ') : text(q?.answer || q?.correct || indexedAnswer || singleAnswer || '');
    return norm([main, choices, answer].join(' ')).replace(/^(q|question)\s*\d+[.):-]?\s*/i, '').replace(/[^a-z0-9àâäçéèêëîïôöùûüÿñæœ ]/gi, ' ').replace(/\s+/g, ' ').trim();
  }

  function readAppSettingsForSynthesis() {
    try {
      return JSON.parse(localStorage.getItem('quizRevision.appSettings.v1') || '{}') || {};
    } catch (_) {
      return {};
    }
  }

  function questionBankForSynthesis() {
    const settings = readAppSettingsForSynthesis();
    const deletedIds = new Set(Array.isArray(settings.deletedQuestionIds) ? settings.deletedQuestionIds.map(String) : []);
    const banks = [];
    // Sources automatiques : questions natives, questions EFF, questions ajoutées/importées
    // depuis l'administration, et questions ajoutées manuellement dans les tableaux JS.
    const sources = [
      window.QDASH_ALL_RAW_QUESTIONS,
      window.QUIZ_QUESTIONS_QUIZ,
      window.QUIZ_QUESTIONS,
      window.QUIZ_QUESTIONS_DE,
      settings.customQuestions
    ];
    sources.forEach(src => { if (Array.isArray(src)) banks.push(...src); });
    const seen = new Set();
    return banks.filter(q => {
      if (!q || deletedIds.has(String(q.id || ''))) return false;
      // Ne pas afficher ni compter les doublons dans la synthèse :
      // on compare d'abord le contenu de la question, puis les propositions et la réponse,
      // afin de supprimer les doublons même quand leurs identifiants sont différents.
      const signature = synthesisQuestionSignature(q) || norm(text(q.id || JSON.stringify(q).slice(0, 160)));
      if (!signature || seen.has(signature)) return false;
      seen.add(signature);
      return true;
    });
  }

  function themeForQuestion(q) {
    const rawTopic = text(q.topic);
    const ignoredTopic = !rawTopic || /^tous les sujets$/i.test(rawTopic) || /^sujet\s*(examen|\d+|n[°o]?|de)?/i.test(rawTopic) || /^examen/i.test(rawTopic);
    const body = [q.question, q.text, q.statement, q.explanation, Array.isArray(q.choices) ? q.choices.join(' ') : '', ignoredTopic ? '' : rawTopic].map(text).join(' ');
    for (const [label, re, icon] of THEME_PATTERNS) {
      if (re.test(body)) return { label, icon };
    }
    if (!ignoredTopic) return { label: rawTopic, icon: '📚' };
    return { label: 'Autres questions importantes', icon: '📌' };
  }

  function questionKey(q) {
    return text(q.id || q.question || q.text || q.statement || JSON.stringify(q).slice(0, 120));
  }

  function synthesisKeyForQuestion(q) {
    return [questionKey(q), synthesisQuestionSignature(q)].filter(Boolean).join('||QDASH_SIG||');
  }

  function qMatchesCurrentSelection(q) {
    const level = $('#selectLevel')?.value || '';
    const subject = $('#selectSubject')?.value || '';
    if (level && !/^tous les niveaux$/i.test(level) && norm(q.level) !== norm(level)) return false;
    if (subject && !/^toutes les matières$/i.test(subject) && norm(q.subject) !== norm(subject)) return false;
    return true;
  }

  function collectThemeGroups() {
    const groups = new Map();
    questionBankForSynthesis().filter(qMatchesCurrentSelection).forEach(q => {
      const theme = themeForQuestion(q);
      const key = norm(theme.label);
      if (!groups.has(key)) {
        groups.set(key, { label: theme.label, icon: theme.icon, keys: [], subjects: new Set(), topics: new Set(), samples: [] });
      }
      const g = groups.get(key);
      const launchKey = synthesisKeyForQuestion(q);
      if (!launchKey) return;
      g.keys.push(launchKey);
      if (q.subject) g.subjects.add(text(q.subject));
      if (q.topic) g.topics.add(text(q.topic));
      if (g.samples.length < 2 && q.question) g.samples.push(text(q.question));
    });
    return Array.from(groups.values()).sort((a, b) => b.keys.length - a.keys.length || a.label.localeCompare(b.label, 'fr'));
  }

  function startSynthesisGroup({ level, subject, theme, keys }) {
    if (typeof window.QDASH_START_GROUPED_QUIZ === 'function') {
      return window.QDASH_START_GROUPED_QUIZ({ level, subject, theme, keys });
    }
    return forwardClick('btnStart');
  }

  function updateQuestionSynthesis() {
    const box = $('#qdashSynthesisList');
    const count = $('#qdashSynthesisCount');
    if (!box) return;
    const groups = collectThemeGroups().filter(g => Array.isArray(g.keys) && g.keys.length > 0);
    if (count) count.textContent = `${groups.length} thème${groups.length > 1 ? 's' : ''}`;
    box.innerHTML = '';
    if (!groups.length) {
      box.innerHTML = '<div class="qdash-synthesis-empty">Aucune question trouvée pour le niveau et la matière sélectionnés.</div>';
      return;
    }

    groups.slice(0, 20).forEach((g, idx) => {
      const chunks = [];
      for (let i = 0; i < g.keys.length; i += 40) chunks.push(g.keys.slice(i, i + 40));
      const currentSubject = $('#selectSubject')?.value || 'Toutes les matières';
      const subject = (!currentSubject || /^toutes/i.test(currentSubject)) ? 'Toutes les matières' : currentSubject;
      const level = $('#selectLevel')?.value || 'Tous les niveaux';
      const accent = ['#E11D48','#2563EB','#16A34A','#7C3AED','#F97316','#0D9488'][idx % 6];

      if (chunks.length > 1) {
        const card = document.createElement('div');
        card.className = 'qdash-theme-row qdash-theme-row-with-select';
        card.style.setProperty('--theme-row-accent', accent);
        const selectId = `qdashThemeGroupSelect_${idx}_${Date.now()}`;
        const options = chunks.map((keys, chunkIndex) => {
          const from = chunkIndex * 40 + 1;
          const to = chunkIndex * 40 + keys.length;
          return `<option value="${chunkIndex}">Groupe ${chunkIndex + 1} — questions ${from} à ${to}</option>`;
        }).join('');
        card.innerHTML = `
          <span class="qdash-theme-icon">${g.icon}</span>
          <span class="qdash-theme-main">
            <strong>${g.label}</strong>
            <small>${g.keys.length} questions sans doublons, divisées en ${chunks.length} groupes de 40 maximum.</small>
            <select class="qdash-theme-group-select" id="${selectId}" aria-label="Choisir un groupe pour ${g.label.replace(/"/g, '&quot;')}">${options}</select>
          </span>
          <button type="button" class="qdash-theme-start-btn">Commencer</button>
        `;
        const select = card.querySelector('select');
        const startBtn = card.querySelector('.qdash-theme-start-btn');
        const launchSelected = async () => {
          const chunkIndex = Number(select?.value || 0);
          const keys = chunks[chunkIndex] || chunks[0] || [];
          await startSynthesisGroup({ level, subject, theme: `${g.label} — groupe ${chunkIndex + 1}`, keys });
        };
        startBtn?.addEventListener('click', launchSelected);
        select?.addEventListener('click', (e) => e.stopPropagation());
        select?.addEventListener('change', (e) => e.stopPropagation());
        box.appendChild(card);
        return;
      }

      const keys = chunks[0] || [];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'qdash-theme-row';
      btn.style.setProperty('--theme-row-accent', accent);
      const range = g.samples[0] ? `<small>${g.samples[0]}</small>` : '<small>Clique pour lancer directement ce thème.</small>';
      btn.innerHTML = `
        <span class="qdash-theme-icon">${g.icon}</span>
        <span class="qdash-theme-main"><strong>${g.label}</strong>${range}</span>
        <span class="qdash-theme-count">${keys.length} question${keys.length > 1 ? 's' : ''}</span>
      `;
      btn.addEventListener('click', async () => {
        await startSynthesisGroup({ level, subject, theme: g.label, keys });
      });
      box.appendChild(btn);
    });
  }

  function updateDashboardStats() {
    const qInfo = $('#questionBankInfo')?.textContent || '';
    const qMatch = qInfo.match(/\d+/);
    const pairs = collectAvailablePairs();
    const subjects = new Set(pairs.map(p => norm(p.subject)).filter(Boolean));
    const topics = new Set(pairs.map(p => norm(p.topic)).filter(Boolean));
    if ($('#qdashStatQuestions')) $('#qdashStatQuestions').textContent = qMatch ? qMatch[0] : '0';
    if ($('#qdashStatSubjects')) $('#qdashStatSubjects').textContent = String(subjects.size || optionValues($('#selectSubject')).length || 0);
    if ($('#qdashStatTopics')) $('#qdashStatTopics').textContent = String(topics.size || optionValues($('#selectTopic')).length || 0);
    const synthesisList = $('#qdashSynthesisList');
    if (synthesisList && !synthesisList.classList.contains('hidden')) updateQuestionSynthesis();
  }

  function chooseResult(item) {
    const subject = $('#selectSubject');
    const topic = $('#selectTopic');
    const input = $('#qdashGlobalSearch');
    qdashSearchSuppressUntil = Date.now() + 900;
    hideSearchResults(true);
    if (input) {
      input.value = item.topic || item.subject || '';
      input.blur();
    }
    forwardClick('btnModeQuiz');
    if (item.subject && subject) {
      subject.value = item.subject;
      subject.dispatchEvent(new Event('change', { bubbles: true }));
    }
    window.setTimeout(() => {
      if (item.topic && topic) {
        const opt = optionValues(topic).find(v => norm(v) === norm(item.topic));
        if (opt) {
          topic.value = opt;
          topic.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
      hideSearchResults(true);
      forwardClick('btnHome');
      syncUserBadge();
      updateDashboardStats();
      window.setTimeout(() => hideSearchResults(true), 120);
    }, 140);
  }

  function runGlobalSearch() {
    const input = $('#qdashGlobalSearch');
    const results = $('#qdashSearchResults');
    if (!input || !results) return;
    if (Date.now() < qdashSearchSuppressUntil) { hideSearchResults(true); return; }
    const q = norm(input.value);
    if (!q) { hideSearchResults(true); return; }
    const matches = collectAvailablePairs().filter(p => norm(p.subject + ' ' + p.topic).includes(q)).slice(0, 12);
    if (!matches.length) {
      results.innerHTML = `<div class="qdash-result-empty">Aucun résultat dans votre niveau actuel.</div>`;
      results.style.display = '';
      results.classList.remove('hidden');
      return;
    }
    results.innerHTML = '';
    matches.forEach(item => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'qdash-result-item';
      btn.innerHTML = `<strong>${item.type === 'matiere' ? item.subject : item.topic}</strong><small>${item.type === 'matiere' ? 'Matière' : 'Sujet'} • ${item.subject || 'Toutes les matières'} • ${item.level || 'niveau actuel'}</small>`;
      btn.addEventListener('click', (e) => { e.stopPropagation(); chooseResult(item); });
      results.appendChild(btn);
    });
    results.style.display = '';
    results.classList.remove('hidden');
  }

  function qdashSynthesisFingerprint() {
    try {
      const bank = questionBankForSynthesis();
      // Empreinte légère pour garder le site rapide : pas de parcours complet du texte
      // des questions à chaque contrôle automatique. Les ajouts/suppressions/modifications
      // déclenchées par l'administration appellent aussi qdash:questions-updated.
      const first = bank[0] || {};
      const last = bank[bank.length - 1] || {};
      return [bank.length, text(first.id), text(last.id), text(last.subject), text(last.topic)].join('|');
    } catch (_) {
      return String(Date.now());
    }
  }

  let qdashLastSynthesisFingerprint = '';
  let qdashRefreshTimer = null;
  function refreshSynthesisIfVisible() {
    if (qdashRefreshTimer) window.clearTimeout(qdashRefreshTimer);
    qdashRefreshTimer = window.setTimeout(() => {
      qdashLastSynthesisFingerprint = qdashSynthesisFingerprint();
      updateDashboardStats();
      const synthesisList = $('#qdashSynthesisList');
      if (synthesisList && !synthesisList.classList.contains('hidden')) updateQuestionSynthesis();
    }, 120);
  }

  function enableAutomaticSynthesisRefresh() {
    if (window.__qdashSynthesisAutoRefresh) return;
    window.__qdashSynthesisAutoRefresh = true;

    // Fonction publique : l'administration et les ajouts manuels peuvent appeler
    // window.QDASH_REFRESH_SYNTHESIS() après insertion/modification de questions.
    window.QDASH_REFRESH_SYNTHESIS = refreshSynthesisIfVisible;

    const originalSetItem = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function qdashSetItem(key, value) {
      const result = originalSetItem(key, value);
      if (key === 'quizRevision.appSettings.v1') {
        window.dispatchEvent(new CustomEvent('qdash:questions-updated', { detail: { source: 'localStorage' } }));
      }
      return result;
    };

    window.addEventListener('qdash:questions-updated', refreshSynthesisIfVisible);
    window.addEventListener('storage', (event) => {
      if (!event || event.key === 'quizRevision.appSettings.v1') refreshSynthesisIfVisible();
    });

    // Sécurité pour les ajouts manuels dans un fichier JS ou dans la console :
    // si un tableau de questions est modifié sans passer par l'administration,
    // la synthèse se recalcule toute seule.
    qdashLastSynthesisFingerprint = qdashSynthesisFingerprint();
    window.setInterval(() => {
      const app = $('#appContent');
      if (!app || app.classList.contains('hidden')) return;
      const synthesisList = $('#qdashSynthesisList');
      const shouldCheck = synthesisList && !synthesisList.classList.contains('hidden');
      if (!shouldCheck) return;
      const nextFingerprint = qdashSynthesisFingerprint();
      if (nextFingerprint !== qdashLastSynthesisFingerprint) {
        qdashLastSynthesisFingerprint = nextFingerprint;
        refreshSynthesisIfVisible();
      }
    }, 6000);
  }

  function boot() {
    enableAutomaticSynthesisRefresh();
    ensureShell();
    if (isAppVisible()) { openMenu(); syncUserBadge(); updateDashboardStats(); }
    const app = $('#appContent');
    if (app && !app.dataset.qdashObserver) {
      app.dataset.qdashObserver = '1';
      new MutationObserver(() => {
        ensureShell();
        if (isAppVisible()) { syncUserBadge(); updateDashboardStats(); }
      }).observe(app, { attributes: true, attributeFilter: ['class'] });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();

/* Correction connexion : masquer l'interface connectée sans bloquer l'authentification */
(function(){
  'use strict';
  function syncLoginView(){
    var screenCode = document.getElementById('screenCode');
    var appContent = document.getElementById('appContent');
    var loginVisible = !!(screenCode && !screenCode.classList.contains('hidden'));

    document.body.classList.toggle('qdash-login-view', loginVisible);
    document.body.classList.toggle('qdash-auth-view', !loginVisible && !!(appContent && !appContent.classList.contains('hidden')));

    if (loginVisible) {
      document.body.classList.remove('qdash-menu-open');
      document.body.classList.add('qdash-menu-collapsed');
    } else {
      // Très important : dès que la connexion est validée, on retire immédiatement
      // le mode page de connexion afin que le CSS ne bloque jamais l'affichage du site.
      document.body.classList.remove('qdash-login-view');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncLoginView, {once:true});
  else syncLoginView();
  var observer = new MutationObserver(syncLoginView);
  ['screenCode','appContent'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) observer.observe(el, {attributes:true, attributeFilter:['class']});
  });
  window.addEventListener('pageshow', syncLoginView);
})();
/* ===== FIN: interface.dynamique.js ===== */
