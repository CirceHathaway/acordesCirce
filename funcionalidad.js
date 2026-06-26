/* --- VARIABLES GLOBALES DE FIREBASE (Inicializadas en null) --- */
let app, db, storage;
let ref, set, onValue, off, get, push, onChildAdded, remove, onDisconnect; 
let firebaseLoaded = false; 

/* --- CONFIGURACIÓN DE FIREBASE --- */
const firebaseConfig = {
    apiKey: "AIzaSyCbvS4syteiVz4g7fWdDF-jvm1kv8QFtaU",
    authDomain: "acordify-live.firebaseapp.com",
    databaseURL: "https://acordify-live-default-rtdb.firebaseio.com",
    projectId: "acordify-live",
    storageBucket: "acordify-live.firebasestorage.app",
    messagingSenderId: "553273090812",
    appId: "1:553273090812:web:cc45175e08f90d6eb72d79"
};

/* --- CONFIGURACIÓN MUSICAL --- */
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatMap = { "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#" };
const scaleSpanish = ["DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#", "LA", "LA#", "SI"];

/* --- ESTADO GLOBAL (CON PERSISTENCIA) --- */
let activeFilters = { type: null, key: null, search: '' };
let displaySongs = []; 
let currentSongIndex = -1; 
let currentSemitones = 0; 
let isSpanish = false; 
let currentSectionNoteId = null; 

// LEER MEMORIA
let savedSize = localStorage.getItem('acordify_fontSize');
let currentFontSize = savedSize ? parseInt(savedSize) : 17;
let showChords = localStorage.getItem('acordify_showChords') !== 'false'; 

let myPlaylist = JSON.parse(localStorage.getItem('myPlaylist')) || [];
let currentContextList = []; 
let lastCloudPlaylistString = ""; 

/* --- VARIABLES LIVE & CHAT --- */
const FIXED_ROOM_ID = "SESSION_1"; 
const VALID_KEYS = ['SOL', 'SAM', 'PASTOR', 'SAMU', 'ANGEL', 'CRIS'];

let currentUserKey = sessionStorage.getItem('acordify_user_key'); 
let isConnected = !!currentUserKey; 

// Chat & Presence
let isChatOpen = false;
let unreadMessages = 0;
let myConnectionRef = null; 

/* --- FUNCIÓN DE CARGA DINÁMICA DE FIREBASE --- */
async function initFirebase() {
    try {
        const appModule = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
        const dbModule = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js");
        ref = dbModule.ref; set = dbModule.set; onValue = dbModule.onValue; off = dbModule.off; get = dbModule.get; push = dbModule.push; onChildAdded = dbModule.onChildAdded; remove = dbModule.remove; onDisconnect = dbModule.onDisconnect;
        app = appModule.initializeApp(firebaseConfig); db = dbModule.getDatabase(app);
        firebaseLoaded = true;
        if (isConnected) reconnectSession();
    } catch (error) {
        console.warn("Modo Offline: No se pudo cargar Firebase.", error);
        firebaseLoaded = false;
    }
}

/* --- INICIALIZACIÓN --- */
window.onload = function() {
    if (window.location.hash === '#song') history.replaceState(null, null, ' ');
    if (typeof songs !== 'undefined') {
        if (window.location.pathname.includes('lista.html')) {
            window.loadPlaylistMode(); window.generateKeyButtons(); setupDelegatedDragEvents(); 
        } else {
            window.applyGlobalFilters(); window.generateKeyButtons();
        }
        const sessionInput = document.getElementById('sessionCodeInput'); const liveModal = document.getElementById('liveModal'); const chatInput = document.getElementById('chatInput'); const stickerInput = document.getElementById('stickerInput');
        if (sessionInput && liveModal) {
            sessionInput.addEventListener('focus', () => liveModal.classList.add('keyboard-active'));
            sessionInput.addEventListener('blur', () => setTimeout(() => liveModal.classList.remove('keyboard-active'), 200));
            sessionInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); window.connectToSession(); sessionInput.blur(); } });
        }
        if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') window.sendMessage(); });
        if (stickerInput) stickerInput.addEventListener('change', handleStickerSelection);
    }
    setTimeout(initFirebase, 10); 
};

window.addEventListener('online', () => { if (!firebaseLoaded) initFirebase(); });
window.addEventListener('popstate', (event) => { if (isChatOpen) { window.toggleChat(); return; } if (window.location.hash !== '#song') closeSongUI(); });

/* --- LÓGICA MUSICAL --- */
window.openSong = function(indexInGlobalArray) {
    if (window.location.hash === '#song') history.replaceState({ view: 'song' }, null, '#song');
    else history.pushState({ view: 'song' }, null, '#song');

    currentSongIndex = indexInGlobalArray;
    const song = songs[currentSongIndex];
    currentSemitones = 0;
    
    document.getElementById('songListView').style.display = 'none';
    document.getElementById('songDetailView').style.display = 'block';
    
    const mainHeader = document.querySelector('header');
    if (mainHeader) mainHeader.style.display = 'none';
    
    const stickyHeader = document.getElementById('songHeaderSticky');
    if(stickyHeader) stickyHeader.classList.remove('scrolled');
    window.closeHamburgerDropdown();

    document.getElementById('detailTitle').innerText = song.title;
    document.querySelectorAll('.song-key-display').forEach(el => el.innerText = song.key);

    const fullCommentEl = document.getElementById('fullCommentText');
    const btnNotaMain = document.getElementById('btnNotaMain');
    const btnNotaBurger = document.getElementById('hamburgerCommentBtn');
    
    if (song.comentario) {
        if (fullCommentEl) fullCommentEl.innerText = song.comentario;
        if (btnNotaMain) { btnNotaMain.style.display = 'flex'; btnNotaMain.classList.add('active-note-blink'); }
        if (btnNotaBurger) { btnNotaBurger.style.display = 'flex'; btnNotaBurger.classList.add('active-note-blink'); }
    } else {
        if (btnNotaMain) { btnNotaMain.style.display = 'none'; btnNotaMain.classList.remove('active-note-blink'); }
        if (btnNotaBurger) { btnNotaBurger.style.display = 'none'; btnNotaBurger.classList.remove('active-note-blink'); }
    }
    
    updateSongView();
    updateChordIcon();
    window.scrollTo(0,0);
}

window.goHome = function() { if (window.location.hash === '#song') history.back(); else closeSongUI(); }

function closeSongUI() {
    document.getElementById('songDetailView').style.display = 'none';
    const listView = document.getElementById('songListView');
    if(listView) listView.style.display = 'block';
    const mainHeader = document.querySelector('header');
    if (mainHeader) mainHeader.style.display = '';
    window.closeAllModals();
    window.closeHamburgerDropdown();
    window.scrollTo(0,0);
}

function updateSongView() {
    if (currentSongIndex === -1) return;
    const song = songs[currentSongIndex];
    let songOriginal = song.content;
    
    let savedSectionNotes = JSON.parse(localStorage.getItem('acordify_section_notes')) || {};
    let currentSongNotes = savedSectionNotes[song.title] || {};
    
    let hasIntro = false, hasV1 = false, hasV2 = false, hasV3 = false, hasV4 = false, hasV5 = false, hasV6 = false, hasP = false, hasP2 = false, hasC = false, hasC2 = false, hasC3 = false, hasC4 = false, hasIns = false, hasFinal = false;
    
    const sections = songOriginal.split(/\[(.*?)\]/g);
    let htmlOutput = "";

    if (sections[0] && sections[0].trim() !== "") {
        htmlOutput += `<div class="song-card"><div class="song-lyrics">${sections[0]}</div></div>`;
    }

    for (let i = 1; i < sections.length; i += 2) {
        let tag = sections[i].trim();
        let content = sections[i+1] ? sections[i+1] : "";
        
        let secId = "", secClass = "", abrv = "", label = tag;
        const lowerTag = tag.toLowerCase();

        if (lowerTag === 'intro') { secId = 'intro'; secClass = 'bg-intro'; abrv = 'IN'; hasIntro = true; }
        else if (lowerTag === 'verso' || lowerTag === 'verso 1') { secId = 'v1'; secClass = 'bg-v1'; abrv = 'V1'; hasV1 = true; }
        else if (lowerTag === 'verso 2') { secId = 'v2'; secClass = 'bg-v2'; abrv = 'V2'; hasV2 = true; }
        else if (lowerTag === 'verso 3') { secId = 'v3'; secClass = 'bg-v3'; abrv = 'V3'; hasV3 = true; }
        else if (lowerTag === 'verso 4') { secId = 'v4'; secClass = 'bg-v4'; abrv = 'V4'; hasV4 = true; }
        else if (lowerTag === 'verso 5') { secId = 'v5'; secClass = 'bg-v5'; abrv = 'V5'; hasV5 = true; }
        else if (lowerTag === 'verso 6') { secId = 'v6'; secClass = 'bg-v6'; abrv = 'V6'; hasV6 = true; }
        else if (lowerTag === 'puente') { secId = 'p'; secClass = 'bg-p'; abrv = 'P'; hasP = true; }
        else if (lowerTag === 'puente 2') { secId = 'p2'; secClass = 'bg-p2'; abrv = 'P2'; hasP2 = true; }
        else if (lowerTag === 'coro') { secId = 'c'; secClass = 'bg-c'; abrv = 'C'; hasC = true; }
        else if (lowerTag === 'coro 2') { secId = 'c2'; secClass = 'bg-c2'; abrv = 'C2'; hasC2 = true; }
        else if (lowerTag === 'coro 3') { secId = 'c3'; secClass = 'bg-c3'; abrv = 'C3'; hasC3 = true; }
        else if (lowerTag === 'coro 4') { secId = 'c4'; secClass = 'bg-c4'; abrv = 'C4'; hasC4 = true; }
        else if (lowerTag === 'instrumental') { secId = 'ins'; secClass = 'bg-ins'; abrv = 'INS'; hasIns = true; }
        else if (lowerTag === 'final') { secId = 'final'; secClass = 'bg-final'; abrv = 'F'; hasFinal = true; }
        else { secId = 'misc'; secClass = 'bg-v1'; abrv = tag.substring(0,2).toUpperCase(); } 
        
        content = content.replace(/^\s+|\s+$/g, '');
        
        let hasNote = !!currentSongNotes[secId];
        let noteIcon = hasNote 
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>` 
            : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`; 
        
        let noteBtnClass = hasNote ? "section-note-btn has-note" : "section-note-btn";

        htmlOutput += `
        <div id="sec-${secId}" class="song-card">
            <div class="song-card-header">
                <div class="song-badge ${secClass}">
                    <span class="badge-circle">${abrv}</span>
                    <span class="badge-label">${label}</span>
                </div>
                <button class="${noteBtnClass}" onclick="window.openSectionNoteModal('${secId}', '${label}')" title="Anotaciones de ${label}">
                    ${noteIcon}
                </button>
            </div>
            <div class="song-lyrics">${content}</div>
        </div>`;
    }

    if(document.getElementById('nav-intro')) document.getElementById('nav-intro').style.display = hasIntro ? 'flex' : 'none';
    if(document.getElementById('nav-v1')) document.getElementById('nav-v1').style.display = hasV1 ? 'flex' : 'none';
    if(document.getElementById('nav-v2')) document.getElementById('nav-v2').style.display = hasV2 ? 'flex' : 'none';
    if(document.getElementById('nav-v3')) document.getElementById('nav-v3').style.display = hasV3 ? 'flex' : 'none';
    if(document.getElementById('nav-v4')) document.getElementById('nav-v4').style.display = hasV4 ? 'flex' : 'none';
    if(document.getElementById('nav-v5')) document.getElementById('nav-v5').style.display = hasV5 ? 'flex' : 'none';
    if(document.getElementById('nav-v6')) document.getElementById('nav-v6').style.display = hasV6 ? 'flex' : 'none';
    if(document.getElementById('nav-p'))  document.getElementById('nav-p').style.display  = hasP  ? 'flex' : 'none';
    if(document.getElementById('nav-p2')) document.getElementById('nav-p2').style.display = hasP2 ? 'flex' : 'none';
    if(document.getElementById('nav-c'))  document.getElementById('nav-c').style.display  = hasC  ? 'flex' : 'none';
    if(document.getElementById('nav-c2')) document.getElementById('nav-c2').style.display = hasC2 ? 'flex' : 'none';
    if(document.getElementById('nav-c3')) document.getElementById('nav-c3').style.display = hasC3 ? 'flex' : 'none';
    if(document.getElementById('nav-c4')) document.getElementById('nav-c4').style.display = hasC4 ? 'flex' : 'none';
    if(document.getElementById('nav-ins')) document.getElementById('nav-ins').style.display = hasIns ? 'flex' : 'none';
    if(document.getElementById('nav-final')) document.getElementById('nav-final').style.display = hasFinal ? 'flex' : 'none';

    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlOutput;
    
    const chords = tempDiv.querySelectorAll('.chord');
    chords.forEach(element => {
        let parts = element.innerText.split('/');
        let newChord = transformNote(parts[0]);
        if (parts.length > 1) {
            let newBass = transformNote(parts[1]);
            element.innerText = newChord + "/" + newBass;
        } else {
            element.innerText = newChord;
        }
        element.style.display = !showChords ? 'none' : ''; 
    });

    const contentDiv = document.getElementById('songContent');
    contentDiv.innerHTML = tempDiv.innerHTML;
    contentDiv.style.fontSize = currentFontSize + 'px';
}

window.scrollToSection = function(secId) {
    const el = document.getElementById('sec-' + secId);
    if (el) {
        const offset = 100; 
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
}

window.toggleChords = function() { showChords = !showChords; localStorage.setItem('acordify_showChords', showChords); updateSongView(); updateChordIcon(); }

function updateChordIcon() {
    const svgs = document.querySelectorAll('.chord-icon-svg');
    svgs.forEach(svg => {
        if (showChords) {
            svg.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
            svg.parentElement.style.color = "var(--text-primary)"; 
        } else {
            svg.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
            svg.parentElement.style.color = "#e55039"; 
        }
    });
}

function transformNote(noteStr) {
    let rootMatch = noteStr.match(/^[A-G][#b]?/);
    if (!rootMatch) return noteStr;
    let root = rootMatch[0];
    let suffix = noteStr.substring(root.length);
    if (flatMap[root]) root = flatMap[root];
    let index = scale.indexOf(root);
    if (index !== -1) {
        let newIndex = (index + currentSemitones + scale.length) % scale.length;
        newIndex = (newIndex + scale.length) % scale.length;
        let finalNote = isSpanish ? scaleSpanish[newIndex] : scale[newIndex];
        return finalNote + suffix;
    }
    return noteStr;
}

window.applyTranspose = function(amount) { currentSemitones += amount; updateSongView(); }
window.resetTranspose = function() { currentSemitones = 0; updateSongView(); window.closeAllModals(); }
window.toggleNotation = function() { isSpanish = !isSpanish; updateSongView(); }
window.changeFontSize = function(amount) { currentFontSize += amount; if (currentFontSize < 8) currentFontSize = 8; if (currentFontSize > 30) currentFontSize = 30; localStorage.setItem('acordify_fontSize', currentFontSize); updateSongView(); }
window.resetFontSize = function() { currentFontSize = 17; localStorage.setItem('acordify_fontSize', currentFontSize); updateSongView(); window.closeAllModals(); }

window.toggleModal = function(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modalOverlay');
    if (modal.classList.contains('active')) {
        window.closeAllModals();
    } else {
        window.closeAllModals();
        modal.classList.add('active');
        modal.style.display = 'flex';
        if(overlay) overlay.style.display = 'block';
    }
}

window.closeAllModals = function() {
    document.querySelectorAll('.mini-modal').forEach(m => { m.classList.remove('active'); m.style.display = 'none'; });
    const overlay = document.getElementById('modalOverlay'); if(overlay) overlay.style.display = 'none';
}

/* --- CONTROLADOR DE SCROLL --- */
window.addEventListener('scroll', () => {
    const header = document.getElementById('songHeaderSticky');
    if (header && document.getElementById('songDetailView').style.display === 'block') {
        if (window.scrollY > 10) { header.classList.add('scrolled'); } 
        else { header.classList.remove('scrolled'); window.closeHamburgerDropdown(); }
    }
}, { passive: true });

window.toggleHamburgerDropdown = function(event) { event.stopPropagation(); const dropdown = document.getElementById('hamburgerDropdownMenu'); if (dropdown) { dropdown.classList.toggle('active'); } }
window.closeHamburgerDropdown = function() { const dropdown = document.getElementById('hamburgerDropdownMenu'); if (dropdown) { dropdown.classList.remove('active'); } }

/* --- MANEJO DE ESTADOS DE NOTAS POR SECCIÓN (LECTURA Y EDICIÓN) --- */
window.openSectionNoteModal = function(secId, secLabel) {
    currentSectionNoteId = secId;
    const songTitle = songs[currentSongIndex].title;
    let savedSectionNotes = JSON.parse(localStorage.getItem('acordify_section_notes')) || {};
    let currentSongNotes = savedSectionNotes[songTitle] || {};
    
    document.getElementById('sectionNoteLabel').innerText = `(${secLabel})`;
    const textarea = document.getElementById('sectionNoteTextarea');
    
    if (currentSongNotes[secId]) {
        // MODO LECTURA: Mostrar los íconos de Editar/Borrar arriba. Ocultar los botones de abajo.
        textarea.value = currentSongNotes[secId];
        textarea.setAttribute('readonly', true);
        document.getElementById('sectionNoteHeaderActions').style.display = 'flex';
        document.getElementById('sectionNoteEditActions').style.display = 'none';
    } else {
        // MODO EDICIÓN: El campo está vacío. Ocultar íconos de arriba, mostrar botones de abajo.
        textarea.value = '';
        textarea.removeAttribute('readonly');
        document.getElementById('sectionNoteHeaderActions').style.display = 'none';
        document.getElementById('sectionNoteEditActions').style.display = 'flex';
    }
    
    document.getElementById('sectionNoteModal').style.display = 'flex';
}

window.activateSectionNoteEdit = function() {
    const textarea = document.getElementById('sectionNoteTextarea');
    textarea.removeAttribute('readonly');
    textarea.focus();
    
    document.getElementById('sectionNoteHeaderActions').style.display = 'none';
    document.getElementById('sectionNoteEditActions').style.display = 'flex';
}

window.cancelSectionNoteEdit = function() {
    const songTitle = songs[currentSongIndex].title;
    let savedSectionNotes = JSON.parse(localStorage.getItem('acordify_section_notes')) || {};
    let currentSongNotes = savedSectionNotes[songTitle] || {};
    
    if (currentSongNotes[currentSectionNoteId]) {
        // Restaurar estado de Lectura si ya existía una nota
        document.getElementById('sectionNoteTextarea').value = currentSongNotes[currentSectionNoteId];
        document.getElementById('sectionNoteTextarea').setAttribute('readonly', true);
        document.getElementById('sectionNoteHeaderActions').style.display = 'flex';
        document.getElementById('sectionNoteEditActions').style.display = 'none';
    } else {
        // Si era nueva y canceló, cerramos el modal
        window.closeSectionNoteModal();
    }
}

window.closeSectionNoteModal = function() {
    document.getElementById('sectionNoteModal').style.display = 'none';
    currentSectionNoteId = null;
}

window.saveSectionNote = function() {
    if (!currentSectionNoteId) return;
    const text = document.getElementById('sectionNoteTextarea').value.trim();
    const songTitle = songs[currentSongIndex].title;
    
    let savedSectionNotes = JSON.parse(localStorage.getItem('acordify_section_notes')) || {};
    if (!savedSectionNotes[songTitle]) savedSectionNotes[songTitle] = {};
    
    if (text === '') {
        delete savedSectionNotes[songTitle][currentSectionNoteId];
    } else {
        savedSectionNotes[songTitle][currentSectionNoteId] = text;
    }
    
    localStorage.setItem('acordify_section_notes', JSON.stringify(savedSectionNotes));
    window.closeSectionNoteModal();
    updateSongView(); 
    window.showNotification("Anotación guardada 📝");
}

window.deleteSectionNote = function() {
    if (!currentSectionNoteId) return;
    const songTitle = songs[currentSongIndex].title;
    
    let savedSectionNotes = JSON.parse(localStorage.getItem('acordify_section_notes')) || {};
    if (savedSectionNotes[songTitle]) {
        delete savedSectionNotes[songTitle][currentSectionNoteId];
        localStorage.setItem('acordify_section_notes', JSON.stringify(savedSectionNotes));
    }
    
    window.closeSectionNoteModal();
    updateSongView();
    window.showNotification("Anotación eliminada 🗑️");
}

// Ventanas Modales Generales
window.openCommentModal = function() { const modal = document.getElementById('commentModal'); if (modal) modal.style.display = 'flex'; }
window.closeCommentModal = function() { const modal = document.getElementById('commentModal'); if (modal) modal.style.display = 'none'; }

window.onclick = function(event) {
    let keyModal = document.getElementById('keyModal'); let subKeyModal = document.getElementById('subKeyModal'); let confirmModal = document.getElementById('confirmModal'); let commentModal = document.getElementById('commentModal'); let sectionNoteModal = document.getElementById('sectionNoteModal');
    if (event.target == keyModal) keyModal.style.display = "none"; if (subKeyModal && event.target == subKeyModal) window.closeSubKeyModal(); if (event.target == confirmModal) window.closeConfirmModal(); if (commentModal && event.target == commentModal) window.closeCommentModal(); if (sectionNoteModal && event.target == sectionNoteModal) window.closeSectionNoteModal();
    window.closeHamburgerDropdown(); 
}

/* --- FILTROS Y RENDER DE INICIO --- */
window.applyGlobalFilters = function() { let filtered = songs.filter(song => { if (activeFilters.type && song.type !== activeFilters.type) return false; if (activeFilters.key && song.key !== activeFilters.key) return false; if (activeFilters.search) { const query = activeFilters.search.toLowerCase(); const matchesTitle = song.title.toLowerCase().includes(query); const matchesArtist = song.artist.toLowerCase().includes(query); if (!matchesTitle && !matchesArtist) return false; } return true; }); filtered.sort((a, b) => a.title.localeCompare(b.title)); displaySongs = filtered; renderTable(displaySongs); updateFilterVisuals();  }
window.filterByType = function(type) { activeFilters.type = activeFilters.type === type ? null : type; window.applyGlobalFilters(); }
window.filterByKey = function(selectedKey) { activeFilters.key = activeFilters.key === selectedKey ? null : selectedKey; window.closeKeyModal(); window.applyGlobalFilters(); }
window.filterByArtist = function(artistName) { const searchInput = document.getElementById('searchInput'); if(searchInput) { searchInput.value = artistName; activeFilters.search = artistName; window.applyGlobalFilters(); } if(event) event.stopPropagation(); }
window.filterSongs = function() { const query = document.getElementById('searchInput').value; activeFilters.search = query; window.applyGlobalFilters(); }
window.sortSongs = function(criteria) { let sorted = [...displaySongs]; if (criteria === 'artist') { sorted.sort((a, b) => a.artist.localeCompare(b.artist)); document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); if(event && event.target) event.target.classList.add('active'); } renderTable(sorted); }
window.resetFilters = function() { activeFilters = { type: null, key: null, search: '' }; document.getElementById('searchInput').value = ''; window.applyGlobalFilters(); }

function updateFilterVisuals() { document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active')); document.querySelectorAll(".filter-btn").forEach(btn => { if (btn.innerText === activeFilters.type) btn.classList.add('active'); if (btn.innerText === "Por Nota" && activeFilters.key) { btn.classList.add('active'); btn.innerText = "Nota: " + activeFilters.key; } else if (btn.innerText.startsWith("Nota: ")) { btn.innerText = "Por Nota"; } }); }

function renderTable(data) { const tbody = document.getElementById('tableBody'); if (!tbody) return; if (data.length === 0) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay resultados.</td></tr>'; return; } let htmlContent = ''; data.forEach((song, index) => { const originalIndex = songs.indexOf(song); const isAdded = myPlaylist.includes(originalIndex); const btnClass = isAdded ? "btn-add added" : "btn-add"; const btnText = isAdded ? "✓" : "+"; const btnAction = isAdded ? "" : `onclick="addToPlaylist(${originalIndex}, this)"`; htmlContent += `<tr><td class="index-col">${index + 1}</td><td class="song-title" onclick="openSong(${originalIndex})">${song.title}</td><td><span style="background:#333; color: #ffda93; padding:2px 8px; border-radius:4px; font-weight:bold;">${song.key}</span></td><td><span class="artist-link" onclick="filterByArtist('${song.artist}')">${song.artist}</span></td><td class="action-col"><button id="addBtn-${originalIndex}" class="${btnClass}" ${btnAction}>${btnText}</button></td></tr>`; }); tbody.innerHTML = htmlContent; }

/* --- GESTIÓN DE PLAYLIST --- */
window.addToPlaylist = function(index, btnElement) { if (!myPlaylist.includes(index)) { myPlaylist.push(index); localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist)); if(btnElement) { btnElement.innerText = "✓"; btnElement.classList.add('added'); btnElement.onclick = null; } window.showNotification("Canción agregada a tu lista"); broadcastChange(); } }
window.removeFromPlaylist = function(index, rowElement) { myPlaylist = myPlaylist.filter(id => id !== index); localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist)); if (rowElement && rowElement.parentNode) { rowElement.parentNode.removeChild(rowElement); document.querySelectorAll('#tableBody .index-col').forEach((td, i) => { td.innerText = i + 1; }); if(myPlaylist.length === 0) { document.getElementById('tableBody').innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px;">Lista vacía.</td></tr>'; } } else { window.loadPlaylistMode(); } broadcastChange(); }
window.loadPlaylistMode = function() { const urlParams = new URLSearchParams(window.location.search); const sharedIds = urlParams.get('ids'); let playlistIds = sharedIds ? sharedIds.split(',').map(Number) : myPlaylist; currentContextList = playlistIds; if (sharedIds) { const shareBtn = document.getElementById('shareListBtn'); if(shareBtn) { shareBtn.innerText = "Guardar esta lista compartida"; shareBtn.onclick = function() { myPlaylist = playlistIds; localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist)); window.showNotification("¡Lista guardada!"); setTimeout(() => window.location.href = 'lista.html', 2000); }; } } displaySongs = playlistIds.map(id => songs[id]).filter(s => s !== undefined); renderPlaylistTable(displaySongs, playlistIds); }
function renderPlaylistTable(songsData, originalIds) { const tbody = document.getElementById('tableBody'); if(!tbody) return; if (songsData.length === 0) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px;">Lista vacía.</td></tr>'; return; } let htmlContent = ''; songsData.forEach((song, i) => { const globalIndex = originalIds[i]; htmlContent += `<tr data-index="${globalIndex}" class="draggable-row" oncontextmenu="event.preventDefault(); event.stopPropagation(); return false;"><td class="index-col">${i + 1}</td><td class="song-title" onclick="openSong(${globalIndex})">${song.title}</td><td><span style="background:#333; color: #ffda93; padding:2px 8px; border-radius:4px; font-weight:bold;">${song.key}</span></td><td style="color: var(--text-white);">${song.artist}</td><td class="action-col"><button class="btn-remove" onclick="removeFromPlaylist(${globalIndex}, this.closest('tr'))">×</button></td></tr>`; }); tbody.innerHTML = htmlContent; }
window.sharePlaylistUrl = function() { if (myPlaylist.length === 0) { window.showNotification("Lista vacía."); return; } const shareUrl = window.location.origin + window.location.pathname + '?ids=' + myPlaylist.join(','); if (navigator.share) navigator.share({ title: 'Mi Lista', url: shareUrl }); else { navigator.clipboard.writeText(shareUrl); window.showNotification("Link copiado!"); } }

function setupDelegatedDragEvents() {
    const tbody = document.getElementById('tableBody'); if (!tbody) return; let pressTimer, isDragging = false, draggingRow = null, startY = 0;
    tbody.addEventListener('touchstart', (e) => { const row = e.target.closest('.draggable-row'); if (!row || e.target.classList.contains('btn-remove')) return; isDragging = false; startY = e.touches[0].clientY; pressTimer = setTimeout(() => { isDragging = true; draggingRow = row; row.classList.add('dragging'); if (navigator.vibrate) navigator.vibrate(50); }, 600); }, { passive: false });
    tbody.addEventListener('touchmove', (e) => { if (!isDragging) { const currentY = e.touches[0].clientY; if (Math.abs(currentY - startY) > 10) clearTimeout(pressTimer); } else { e.preventDefault(); const currentY = e.touches[0].clientY; const elementBelow = document.elementFromPoint(e.touches[0].clientX, currentY); const rowBelow = elementBelow ? elementBelow.closest('tr') : null; if (rowBelow && rowBelow !== draggingRow && rowBelow.parentNode === tbody) { const bounding = rowBelow.getBoundingClientRect(); const offset = bounding.y + (bounding.height / 2); if (currentY - offset > 0) rowBelow.after(draggingRow); else rowBelow.before(draggingRow); } } }, { passive: false });
    const endDrag = (e) => { clearTimeout(pressTimer); if (isDragging && draggingRow) { isDragging = false; draggingRow.classList.remove('dragging'); draggingRow = null; saveNewOrder(); if(e) e.preventDefault(); } };
    tbody.addEventListener('touchend', endDrag); tbody.addEventListener('touchcancel', () => { clearTimeout(pressTimer); if (draggingRow) draggingRow.classList.remove('dragging'); isDragging = false; draggingRow = null; });
}
function saveNewOrder() { const rows = document.querySelectorAll('#tableBody tr'); const newPlaylist = []; rows.forEach(row => { const id = row.getAttribute('data-index'); if (id !== null) newPlaylist.push(parseInt(id)); }); myPlaylist = newPlaylist; localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist)); if (typeof currentContextList !== 'undefined') currentContextList = newPlaylist; rows.forEach((row, index) => { const indexCell = row.querySelector('.index-col'); if(indexCell) indexCell.innerText = index + 1; }); window.showNotification("Orden guardado"); broadcastChange(); }
window.askClearPlaylist = function() { const modal = document.getElementById('confirmModal'); if(modal) modal.style.display = 'flex'; }
window.closeConfirmModal = function() { const modal = document.getElementById('confirmModal'); if(modal) modal.style.display = 'none'; }
window.executeClearList = function() { myPlaylist = []; localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist)); window.closeConfirmModal(); window.showNotification("Lista vaciada correctamente"); if (window.location.pathname.includes('lista.html')) window.loadPlaylistMode(); broadcastChange(); }

window.openLiveModal = function() { if (!firebaseLoaded) { window.showNotification("Necesitas internet para esto 📡"); return; } document.getElementById('liveModal').style.display = 'flex'; if (isConnected) showConnectedScreen(); else window.resetLiveModal(); }
window.closeLiveModal = function() { document.getElementById('liveModal').style.display = 'none'; }
window.resetLiveModal = function() { document.getElementById('liveConnectionScreen').style.display = 'block'; document.getElementById('liveConnected').style.display = 'none'; document.getElementById('sessionCodeInput').value = ''; }
function showConnectedScreen() { document.getElementById('liveConnectionScreen').style.display = 'none'; document.getElementById('liveConnected').style.display = 'block'; const keyDisplay = document.getElementById('connectedKeyDisplay'); if(keyDisplay) keyDisplay.innerText = currentUserKey; }
window.connectToSession = function() { if (!firebaseLoaded) { window.showNotification("Sin conexión para Live"); return; } const codeInput = document.getElementById('sessionCodeInput').value.trim().toUpperCase(); if (!codeInput) { alert("Ingresa la clave."); return; } if (!VALID_KEYS.includes(codeInput)) { alert("Clave incorrecta."); return; } currentUserKey = codeInput; sessionStorage.setItem('acordify_user_key', currentUserKey); isConnected = true; const roomRef = ref(db, 'sessions/' + FIXED_ROOM_ID); const chatRef = ref(db, 'chats/' + FIXED_ROOM_ID); const connectionsRef = ref(db, 'connections/' + FIXED_ROOM_ID); myConnectionRef = push(connectionsRef); set(myConnectionRef, currentUserKey); onDisconnect(myConnectionRef).remove(); get(roomRef).then((snapshot) => { if (snapshot.exists() && snapshot.val()) { window.showNotification("Sincronizando con la banda... 📡"); } else { set(roomRef, myPlaylist).then(() => window.showNotification("Sala iniciada. Lista subida ☁️")); set(chatRef, null); } startListening(roomRef); startChatListener(); updateUIConnected(); window.closeLiveModal(); }).catch((error) => { console.error(error); alert("Error de conexión"); }); }
function reconnectSession() { if (!firebaseLoaded || !currentUserKey) return; const roomRef = ref(db, 'sessions/' + FIXED_ROOM_ID); const connectionsRef = ref(db, 'connections/' + FIXED_ROOM_ID); myConnectionRef = push(connectionsRef); set(myConnectionRef, currentUserKey); onDisconnect(myConnectionRef).remove(); startListening(roomRef); startChatListener(); updateUIConnected(); broadcastChange(); }
function startListening(roomRef) { onValue(roomRef, (snapshot) => { const cloudPlaylist = snapshot.val() || []; const cloudString = JSON.stringify(cloudPlaylist); if (cloudString !== JSON.stringify(myPlaylist) && cloudString !== lastCloudPlaylistString) { myPlaylist = cloudPlaylist; localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist)); lastCloudPlaylistString = cloudString; if (window.location.pathname.includes('lista.html')) { window.loadPlaylistMode(); } else if (!window.location.hash) { document.querySelectorAll('.btn-add').forEach(btn => { const rowId = parseInt(btn.id.split('-')[1]); if (myPlaylist.includes(rowId)) { btn.innerText = "✓"; btn.classList.add('added'); btn.onclick = null; } else { btn.innerText = "+"; btn.classList.remove('added'); btn.setAttribute('onclick', `addToPlaylist(${rowId}, this)`); } }); } } }); }
function updateUIConnected() { const btnLive = document.getElementById('btnLiveHeader'); const btnChat = document.getElementById('btnChatHeader'); if(btnLive) { btnLive.classList.add('active'); btnLive.innerText = "📡 " + currentUserKey; } if(btnChat) btnChat.style.display = 'flex'; }
window.disconnectSession = function() { if (!isConnected) return; if (!firebaseLoaded) { isConnected = false; updateUIDisconnected(); return; } const roomRef = ref(db, 'sessions/' + FIXED_ROOM_ID); const chatRef = ref(db, 'chats/' + FIXED_ROOM_ID); const connectionsRef = ref(db, 'connections/' + FIXED_ROOM_ID); get(connectionsRef).then((snapshot) => { if (snapshot.size <= 1) { set(chatRef, null); } if(myConnectionRef) remove(myConnectionRef); off(roomRef); off(chatRef); isConnected = false; currentUserKey = null; sessionStorage.removeItem('acordify_user_key'); lastCloudPlaylistString = ""; updateUIDisconnected(); window.resetLiveModal(); window.showNotification("Desconectado 🔌"); window.closeLiveModal(); }); }
function updateUIDisconnected() { const btnLive = document.getElementById('btnLiveHeader'); const btnChat = document.getElementById('btnChatHeader'); if(btnLive) { btnLive.classList.remove('active'); btnLive.innerText = "📡 LIVE"; } if(btnChat) { btnChat.style.display = 'none'; document.getElementById('chatOverlay').style.display = 'none'; isChatOpen = false; } }
function broadcastChange() { if (!isConnected || !firebaseLoaded) return; const roomRef = ref(db, 'sessions/' + FIXED_ROOM_ID); lastCloudPlaylistString = JSON.stringify(myPlaylist); set(roomRef, myPlaylist).catch((e) => console.error(e)); }
window.toggleChat = function() { if (!firebaseLoaded) { window.showNotification("Necesitas internet para chatear"); return; } const overlay = document.getElementById('chatOverlay'); const badge = document.getElementById('chatBadge'); isChatOpen = !isChatOpen; if(isChatOpen) { overlay.style.display = 'flex'; history.pushState({chat: true}, null, "#chat"); unreadMessages = 0; if(badge) { badge.innerText = '0'; badge.style.display = 'none'; } setTimeout(() => { const chatBox = document.getElementById('chatMessages'); if(chatBox) chatBox.scrollTop = chatBox.scrollHeight; }, 100); } else { overlay.style.display = 'none'; if(window.location.hash === '#chat') history.back(); } }
window.sendMessage = function() { const input = document.getElementById('chatInput'); const msgText = input.value.trim(); if(!msgText || !isConnected || !firebaseLoaded) return; sendToFirebase(msgText, 'TEXT'); input.value = ''; }
function handleStickerSelection(event) { const file = event.target.files[0]; if (!file || !isConnected || !firebaseLoaded) { if(!firebaseLoaded) window.showNotification("Necesitas internet para stickers"); return; } if (file.size > 2 * 1024 * 1024) { alert("La imagen es muy pesada. Usa una más pequeña."); return; } const reader = new FileReader(); reader.onload = function(e) { const base64String = e.target.result; sendToFirebase(base64String, 'STICKER'); }; reader.readAsDataURL(file); event.target.value = ''; }
function sendToFirebase(content, type) { if (!firebaseLoaded) return; const chatRef = ref(db, 'chats/' + FIXED_ROOM_ID); const newMessage = { user: currentUserKey, text: content, type: type, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }; push(chatRef, newMessage); }
function startChatListener() { const chatRef = ref(db, 'chats/' + FIXED_ROOM_ID); const chatBox = document.getElementById('chatMessages'); const badge = document.getElementById('chatBadge'); if (!chatBox) return; chatBox.innerHTML = ''; onChildAdded(chatRef, (snapshot) => { const msg = snapshot.val(); renderMessage(msg); if(!isChatOpen) { unreadMessages++; if(badge) { badge.innerText = unreadMessages; badge.style.display = 'flex'; } } else { if(chatBox) chatBox.scrollTop = chatBox.scrollHeight; } }); }
function renderMessage(msg) { const chatBox = document.getElementById('chatMessages'); if(!chatBox) return; const isMe = msg.user === currentUserKey; const div = document.createElement('div'); let bubbleClass = 'message-bubble'; if (msg.type === 'STICKER') bubbleClass += ' msg-sticker'; if (isMe) { bubbleClass += ' msg-me'; } else { bubbleClass += ' msg-other'; if (msg.user === 'SOL') bubbleClass += ' user-SOL'; else if (msg.user === 'SAM') bubbleClass += ' user-SAM'; else if (msg.user === 'PASTOR') bubbleClass += ' user-PASTOR'; else if (msg.user === 'SAMU') bubbleClass += ' user-SAMU'; else if (msg.user === 'ANGEL') bubbleClass += ' user-ANGEL'; else if (msg.user === 'CRIS') bubbleClass += ' user-CRIS'; else bubbleClass += ' user-UNKNOWN'; } div.className = bubbleClass; let contentHtml = ''; if (msg.type === 'STICKER') contentHtml = `<img src="${msg.text}" alt="sticker" loading="lazy">`; else contentHtml = msg.text; div.innerHTML = `<span class="msg-sender">${isMe ? 'Tú' : msg.user}</span>${contentHtml}<span class="msg-time">${msg.time}</span>`; chatBox.appendChild(div); }

if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js')); }
let deferredPrompt; const actionBtn = document.getElementById('actionBtn'); window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; if (actionBtn) { actionBtn.innerHTML = "📲 Instalar"; actionBtn.style.color = "#4cd137"; actionBtn.classList.add('mode-install'); actionBtn.classList.remove('mode-share'); } });
if (actionBtn) { actionBtn.addEventListener('click', async (e) => { e.preventDefault(); if (deferredPrompt) { deferredPrompt.prompt(); const { outcome } = await deferredPrompt.userChoice; deferredPrompt = null; if (outcome === 'accepted') resetToShare(); } else window.shareApp(); }); }
window.addEventListener('appinstalled', () => resetToShare());
function resetToShare() { if (!actionBtn) return; actionBtn.innerHTML = "Compartir"; actionBtn.style.color = "#ffffff"; actionBtn.classList.remove('mode-install'); actionBtn.classList.add('mode-share'); }
window.shareApp = function() { if (navigator.share) navigator.share({ title: 'Acordify', url: window.location.href }); else { navigator.clipboard.writeText(window.location.href); window.showNotification("Enlace copiado!"); } }

let touchStartX = 0; let touchStartY = 0;
document.addEventListener('touchstart', function(e) { if (document.getElementById('songDetailView').style.display === 'block') { touchStartX = e.changedTouches[0].screenX; touchStartY = e.changedTouches[0].screenY; } }, { passive: true }); 
document.addEventListener('touchend', function(e) { if (document.getElementById('songDetailView').style.display === 'block') { let touchEndX = e.changedTouches[0].screenX; let touchEndY = e.changedTouches[0].screenY; handleSwipeGesture(touchStartX, touchEndX, touchStartY, touchEndY); } }, { passive: true });
function handleSwipeGesture(startX, endX, startY, endY) { const diffX = startX - endX; const diffY = startY - endY; const absDiffX = Math.abs(diffX); const absDiffY = Math.abs(diffY); const minSwipeDistance = 60; if (absDiffX > absDiffY && absDiffX > minSwipeDistance) { if (diffX > 0) { changeSongInPlaylist(1); } else { changeSongInPlaylist(-1); } } }
function changeSongInPlaylist(direction) { if (!currentContextList || currentContextList.length === 0) return; let currentPos = currentContextList.indexOf(currentSongIndex); if (currentPos === -1) return; let newPos = currentPos + direction; if (newPos >= currentContextList.length) newPos = 0; else if (newPos < 0) newPos = currentContextList.length - 1; let nextSongID = currentContextList[newPos]; window.openSong(nextSongID); }