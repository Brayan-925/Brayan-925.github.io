// ================================================================
// SELECTOR DE IDIOMA (ES / EN / JA) - Exclusivo de index.html
// Guarda la preferencia en localStorage bajo la clave "idioma"
// ================================================================

// Textos estáticos de la página (se aplican vía atributo data-i18n)
const traducciones = {
    es: {
        tagline: "Tu espacio académico de concentración",
        explorar: "Explorar ambientes",
        nav_inicio: "Inicio",
        nav_ambientes: "Ambientes",
        nav_cursos: "Cursos",
        nav_salas: "Salas",
        nav_metodos: "Métodos",
        nav_contacto: "Contacto",
        nav_login: "Iniciar sesión",
        nav_registro: "Registrarse",
        card1_titulo: "Entrar a una sala",
        card1_texto: "Únete a un stream de estudio con otros compañeros y evita distracciones.",
        card1_link: "Ver salas disponibles ➔",
        card2_titulo: "Mis Cursos",
        card2_texto: "Revisa tu horario de hoy y organiza los temas que necesitas repasar.",
        card2_link: "Ir a mis cursos ➔",
        card3_titulo: "Técnicas de Estudio",
        card3_texto: "Aplica Pomodoro o Active Recall para maximizar tu retención de información.",
        card3_link: "Elegir un método ➔",
        card4_titulo: "Ambientes Solo",
        card4_texto: "Si prefieres estudiar solo, elige un fondo relajante y música lo-fi.",
        card4_link: "Explorar ambientes ➔",
        rendimiento_titulo: "Mi Rendimiento Semanal",
        horas_concentracion: "Horas de concentración",
        racha_label: "Racha de estudio 🔥",
        salas_populares: "Salas populares ahora",
        sala1_desc: "18 estudiantes conectados.",
        sala2_desc: "12 estudiantes estudiando.",
        sala3_desc: "24 estudiantes concentrándose.",
        sala4_desc: "9 estudiantes activos.",
        progreso_diario: "Progreso diario",
        tareas_dia: "Tareas del día",
        tarea_placeholder: "Escribe una tarea...",
        estado_titulo: "Estado",
        estado_activo: "🔥 En concentración",
        estado_musica: "🎧 Lo-fi activo",
        motivacion_titulo: "Motivación",
        sobre_titulo: "Sobre FocusWave",
        sobre_texto: "FocusWave es una plataforma diseñada para mejorar la concentración y productividad de los estudiantes mediante ambientes virtuales y herramientas académicas.",
        player_title: "Música de Concentración",
        player_badge: "Spotify Integrado",
        tab_lofi: "🎧 Lofi Girl",
        tab_piano: "🎹 Piano Deep",
        tab_synth: "🌌 Synthwave"
    },
    en: {
        tagline: "Your academic focus space",
        explorar: "Explore environments",
        nav_inicio: "Home",
        nav_ambientes: "Environments",
        nav_cursos: "Courses",
        nav_salas: "Rooms",
        nav_metodos: "Methods",
        nav_contacto: "Contact",
        nav_login: "Log in",
        nav_registro: "Sign up",
        card1_titulo: "Join a room",
        card1_texto: "Join a study stream with other students and avoid distractions.",
        card1_link: "View available rooms ➔",
        card2_titulo: "My Courses",
        card2_texto: "Check today's schedule and organize the topics you need to review.",
        card2_link: "Go to my courses ➔",
        card3_titulo: "Study Techniques",
        card3_texto: "Apply Pomodoro or Active Recall to maximize your information retention.",
        card3_link: "Choose a method ➔",
        card4_titulo: "Solo Environments",
        card4_texto: "If you prefer to study alone, choose a relaxing background and lo-fi music.",
        card4_link: "Explore environments ➔",
        rendimiento_titulo: "My Weekly Performance",
        horas_concentracion: "Focus hours",
        racha_label: "Study streak 🔥",
        salas_populares: "Popular rooms now",
        sala1_desc: "18 students connected.",
        sala2_desc: "12 students studying.",
        sala3_desc: "24 students focusing.",
        sala4_desc: "9 students active.",
        progreso_diario: "Daily progress",
        tareas_dia: "Today's tasks",
        tarea_placeholder: "Write a task...",
        estado_titulo: "Status",
        estado_activo: "🔥 Focusing",
        estado_musica: "🎧 Lo-fi playing",
        motivacion_titulo: "Motivation",
        sobre_titulo: "About FocusWave",
        sobre_texto: "FocusWave is a platform designed to improve students' focus and productivity through virtual environments and academic tools.",
        player_title: "Focus Music",
        player_badge: "Spotify Embed",
        tab_lofi: "🎧 Lofi Girl",
        tab_piano: "🎹 Deep Piano",
        tab_synth: "🌌 Synthwave"
    },  
    ja: {
        tagline: "集中力を高める、あなたの学習スペース",
        explorar: "環境を探す",
        nav_inicio: "ホーム",
        nav_ambientes: "環境",
        nav_cursos: "授業",
        nav_salas: "ルーム",
        nav_metodos: "勉強法",
        nav_contacto: "お問い合わせ",
        nav_login: "ログイン",
        nav_registro: "登録",
        card1_titulo: "ルームに参加",
        card1_texto: "他の学生と一緒に勉強配信に参加して、気が散るのを防ぎましょう。",
        card1_link: "利用可能なルームを見る ➔",
        card2_titulo: "マイコース",
        card2_texto: "今日の時間割を確認し、復習が必要なトピックを整理しましょう。",
        card2_link: "マイコースへ ➔",
        card3_titulo: "勉強法",
        card3_texto: "ポモドーロやアクティブリコールを使って、記憶の定着率を最大化しましょう。",
        card3_link: "勉強法を選ぶ ➔",
        card4_titulo: "一人用の環境",
        card4_texto: "一人で勉強したいときは、リラックスできる背景とローファイ音楽を選びましょう。",
        card4_link: "環境を探す ➔",
        rendimiento_titulo: "今週のパフォーマンス",
        horas_concentracion: "集中時間",
        racha_label: "学習の連続記録 🔥",
        salas_populares: "現在人気のルーム",
        sala1_desc: "18人が接続中。",
        sala2_desc: "12人が勉強中。",
        sala3_desc: "24人が集中中。",
        sala4_desc: "9人がアクティブ。",
        progreso_diario: "今日の進捗",
        tareas_dia: "今日のタスク",
        tarea_placeholder: "タスクを入力...",
        estado_titulo: "ステータス",
        estado_activo: "🔥 集中中",
        estado_musica: "🎧 ローファイ再生中",
        motivacion_titulo: "モチベーション",
        sobre_titulo: "FocusWaveについて",
        sobre_texto: "FocusWaveは、仮想環境と学習ツールを通じて学生の集中力と生産性を高めるために設計されたプラットフォームです。",
        player_title: "集中用BGM",
        player_badge: "Spotify連携",
        tab_lofi: "🎧 ローファイ Girl",
        tab_piano: "🎹 ディープピアノ",
        tab_synth: "🌌 シンセウェーブ"
    }
};

// Textos que usa inicio.js para generar contenido dinámico (saludo, horario, frases, etc.)
// "formatoProximaClase" es una función porque el orden de las palabras cambia según el idioma
// (el japonés, por ejemplo, tiene un orden gramatical distinto al español/inglés).
const textosDinamicos = {
    es: {
        buenosDias: "Buenos días",
        buenasTardes: "Buenas tardes",
        buenasNoches: "Buenas noches",
        estudiante: "Estudiante",
        horaActual: "Hora actual",
        clasesDeHoy: "Clases de Hoy",
        diaLibre: "¡Día libre! No tienes clases registradas para hoy.",
        clasesTerminadas: "Ya terminaste tus clases de hoy. ¡Buen trabajo!",
        sinClasesHoy: "No tienes clases programadas para hoy.",
        sinTareas: "Aún no tienes tareas para hoy. ¡Agrega la primera! ✍️",
        tareasCompletadas: "tareas completadas",
        de: "de",
        dia: "Día",
        dias: "Días",
        nombresDias: { Domingo: "Domingo", Lunes: "Lunes", Martes: "Martes", Miércoles: "Miércoles", Jueves: "Jueves", Viernes: "Viernes", Sábado: "Sábado" },
        formatoProximaClase: (nombre, hora, profesor, faltan) =>
            `📌 <strong>Tu próxima clase:</strong> ${nombre} a las ${hora} con ${profesor} — faltan ${faltan}`,
        frases: [
            "La disciplina supera a la motivación.",
            "Un pequeño paso hoy es mejor que un gran plan mañana.",
            "El enfoque es la clave de todo logro.",
            "No cuentes los días, haz que los días cuenten.",
            "El progreso, aunque lento, sigue siendo progreso.",
            "Cada sesión de estudio te acerca a tu meta.",
            "La constancia vence al talento cuando el talento no es constante."
        ]
    },
    en: {
        buenosDias: "Good morning",
        buenasTardes: "Good afternoon",
        buenasNoches: "Good evening",
        estudiante: "Student",
        horaActual: "Current time",
        clasesDeHoy: "Today's Classes",
        diaLibre: "Free day! You have no classes scheduled for today.",
        clasesTerminadas: "You've already finished your classes for today. Great job!",
        sinClasesHoy: "You have no classes scheduled for today.",
        sinTareas: "You don't have any tasks for today yet. Add the first one! ✍️",
        tareasCompletadas: "tasks completed",
        de: "of",
        dia: "Day",
        dias: "Days",
        nombresDias: { Domingo: "Sunday", Lunes: "Monday", Martes: "Tuesday", Miércoles: "Wednesday", Jueves: "Thursday", Viernes: "Friday", Sábado: "Saturday" },
        formatoProximaClase: (nombre, hora, profesor, faltan) =>
            `📌 <strong>Your next class:</strong> ${nombre} at ${hora} with ${profesor} — ${faltan} left`,
        frases: [
            "Discipline beats motivation.",
            "A small step today beats a big plan for tomorrow.",
            "Focus is the key to every achievement.",
            "Don't count the days, make the days count.",
            "Progress, even if slow, is still progress.",
            "Every study session brings you closer to your goal.",
            "Consistency beats talent when talent isn't consistent."
        ]
    },
    ja: {
        buenosDias: "おはようございます",
        buenasTardes: "こんにちは",
        buenasNoches: "こんばんは",
        estudiante: "学生",
        horaActual: "現在時刻",
        clasesDeHoy: "今日の授業",
        diaLibre: "今日は授業がありません。自由な一日です！",
        clasesTerminadas: "今日の授業はすべて終わりました。お疲れ様でした！",
        sinClasesHoy: "今日予定されている授業はありません。",
        sinTareas: "今日のタスクはまだありません。最初のタスクを追加しましょう！✍️",
        tareasCompletadas: "件完了",
        de: "/",
        dia: "日",
        dias: "日",
        nombresDias: { Domingo: "日曜日", Lunes: "月曜日", Martes: "火曜日", Miércoles: "水曜日", Jueves: "木曜日", Viernes: "金曜日", Sábado: "土曜日" },
        formatoProximaClase: (nombre, hora, profesor, faltan) =>
            `📌 <strong>次の授業:</strong> ${hora}〜 ${nombre}（担当: ${profesor}）— あと${faltan}`,
        frases: [
            "モチベーションより規律。",
            "今日の小さな一歩は、明日の大きな計画より価値がある。",
            "集中こそがすべての成果の鍵。",
            "日数を数えるのではなく、その日を意味あるものにしよう。",
            "たとえ遅くても、進歩は進歩だ。",
            "一回一回の勉強が、目標に近づける。",
            "才能が続かないとき、継続が才能に勝る。"
        ]
    }
};

// Idioma guardado, o español por defecto la primera vez
function obtenerIdioma() {
    return localStorage.getItem("idioma") || "es";
}

// Aplica el diccionario "traducciones" a todos los elementos con data-i18n
function aplicarTraduccionesEstaticas(idioma) {
    const dic = traducciones[idioma];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
        const clave = el.getAttribute("data-i18n");
        if (dic[clave] === undefined) return;

        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            el.placeholder = dic[clave];
        } else {
            el.textContent = dic[clave];
        }
    });

    const selectorIdioma = document.getElementById("selector-idioma");
    if (selectorIdioma) {
        selectorIdioma.value = idioma;
    }

    document.documentElement.lang = idioma;
}

// Cambia de idioma, guarda la preferencia y refresca todo sin recargar
function cambiarIdioma(nuevoIdioma) {
    if (!traducciones[nuevoIdioma]) return;

    localStorage.setItem("idioma", nuevoIdioma);
    aplicarTraduccionesEstaticas(nuevoIdioma);

    // inicio.js expone esta función para refrescar sus textos dinámicos
    if (typeof window.refrescarTextosDinamicos === "function") {
        window.refrescarTextosDinamicos();
    }
}

// Exponemos el diccionario dinámico para que inicio.js lo use directamente
window.textosDinamicos = textosDinamicos;
window.obtenerIdioma = obtenerIdioma;

document.addEventListener("DOMContentLoaded", function () {
    aplicarTraduccionesEstaticas(obtenerIdioma());

    const selectorIdioma = document.getElementById("selector-idioma");
    if (selectorIdioma) {
        selectorIdioma.addEventListener("change", function (event) {
            cambiarIdioma(event.target.value);
        });
    }
});