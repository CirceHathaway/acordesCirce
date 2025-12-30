/* --- IMPORTACIONES DE FIREBASE (CDN) --- */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue, off, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* --- CONFIGURACIÓN MUSICAL --- */
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatMap = { "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#" };
const scaleSpanish = ["DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#", "LA", "LA#", "SI"];

/* --- ESTADO GLOBAL --- */
let activeFilters = { type: null, key: null, search: '' };
let displaySongs = []; 
let currentSongIndex = -1; 
let currentSemitones = 0; 
let isSpanish = false; 
let currentFontSize = 17;
let showChords = true; 
let myPlaylist = JSON.parse(localStorage.getItem('myPlaylist')) || [];
let currentContextList = []; 

/* --- VARIABLES LIVE (SESIÓN ÚNICA) --- */
const FIXED_ROOM_ID = "SESSION_1"; 
const VALID_KEYS = ['SOL', 'SAM', 'PASTOR', 'SAMU'];

let currentUserKey = sessionStorage.getItem('acordify_user_key'); 
let isConnected = !!currentUserKey; 

/* --- INICIALIZACIÓN --- */
window.onload = function() {
    if (window.location.hash === '#song') {
        history.replaceState(null, null, ' ');
    }
    
    if (typeof songs !== 'undefined') {
        if (window.location.pathname.includes('lista.html')) {
            window.loadPlaylistMode();
            window.generateKeyButtons();
        } else {
            window.applyGlobalFilters(); 
            window.generateKeyButtons();
        }

        if (isConnected) {
            reconnectSession();
        }

        // --- SOLUCIÓN TECLADO MÓVIL (CON DELAY) ---
        const sessionInput = document.getElementById('sessionCodeInput');
        const liveModal = document.getElementById('liveModal'); 
        
        if (sessionInput && liveModal) {
            // Al tocar el input (FOCUS), subimos el modal
            sessionInput.addEventListener('focus', () => {
                liveModal.classList.add('keyboard-active');
            });

            // Al salir del input (BLUR)
            sessionInput.addEventListener('blur', () => {
                // IMPORTANTE: Esperamos 200ms antes de bajar el modal.
                // Esto permite que el evento CLICK del botón ocurra primero.
                setTimeout(() => {
                    liveModal.classList.remove('keyboard-active');
                }, 200);
            });

            // BONUS: Permitir entrar tocando "Enter" en el teclado del celular
            sessionInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Evitar comportamientos raros
                    window.connectToSession();
                    sessionInput.blur(); // Bajar el teclado
                }
            });
        }
        // ------------------------------------------

    } else {
        console.error("Error: No se cargó canciones.js");
    }
};

/* --- NAVEGACIÓN Y HISTORIAL --- */
window.openSong = function(indexInGlobalArray) {
    if (window.location.hash === '#song') {
        history.replaceState({ view: 'song' }, null, '#song');
    } else {
        history.pushState({ view: 'song' }, null, '#song');
    }

    currentSongIndex = indexInGlobalArray;
    const song = songs[currentSongIndex];
    currentSemitones = 0;
    
    document.getElementById('songListView').style.display = 'none';
    document.getElementById('songDetailView').style.display = 'block';
    
    document.getElementById('detailTitle').innerText = song.title;
    document.getElementById('detailArtist').innerText = song.artist;

    const commentEl = document.getElementById('detailComment');
    if (song.comentario) {
        commentEl.innerText = song.comentario; 
        commentEl.style.display = 'block';     
    } else {
        commentEl.innerText = '';              
        commentEl.style.display = 'none';      
    }
    
    updateSongView();
    updateChordIcon(); 
    window.scrollTo(0,0);
}

window.goHome = function() {
    if (window.location.hash === '#song') {
        history.back();
    } else {
        closeSongUI();
    }
}

window.addEventListener('popstate', (event) => {
    if (window.location.hash !== '#song') {
        closeSongUI();
    }
});

function closeSongUI() {
    document.getElementById('songDetailView').style.display = 'none';
    const listView = document.getElementById('songListView');
    if(listView) listView.style.display = 'block';
    window.closeAllModals();
    window.scrollTo(0,0);
}

/* --- LÓGICA MUSICAL --- */
function updateSongView() {
    if (currentSongIndex === -1) return;
    const songOriginal = songs[currentSongIndex].content;
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = songOriginal;
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

        if (!showChords) {
            element.style.display = 'none'; 
        } else {
            element.style.display = ''; 
        }
    });

    const contentDiv = document.getElementById('songContent');
    contentDiv.innerHTML = tempDiv.innerHTML;
    contentDiv.style.fontSize = currentFontSize + 'px';
}

window.toggleChords = function() {
    showChords = !showChords;
    updateSongView();
    updateChordIcon();
}

function updateChordIcon() {
    const btn = document.getElementById('btnToggleChords');
    if (!btn) return;

    if (showChords) {
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        btn.style.color = "var(--text-primary)"; 
    } else {
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
        btn.style.color = "#e55039"; 
    }
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

window.changeFontSize = function(amount) {
    currentFontSize += amount;
    if (currentFontSize < 8) currentFontSize = 8; 
    if (currentFontSize > 30) currentFontSize = 30; 
    updateSongView();
}

window.toggleModal = function(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modalOverlay');
    if (modal.classList.contains('active')) {
        window.closeAllModals();
    } else {
        window.closeAllModals();
        modal.classList.add('active');
        modal.style.display = 'flex';
        overlay.style.display = 'block';
    }
}

window.closeAllModals = function() {
    document.querySelectorAll('.mini-modal').forEach(m => {
        m.classList.remove('active');
        m.style.display = 'none';
    });
    const overlay = document.getElementById('modalOverlay');
    if(overlay) overlay.style.display = 'none';
}

/* --- FILTROS Y BÚSQUEDA --- */
window.applyGlobalFilters = function() {
    let filtered = songs.filter(song => {
        if (activeFilters.type && song.type !== activeFilters.type) return false;
        if (activeFilters.key && song.key !== activeFilters.key) return false;
        if (activeFilters.search) {
            const query = activeFilters.search.toLowerCase();
            const matchesTitle = song.title.toLowerCase().includes(query);
            const matchesArtist = song.artist.toLowerCase().includes(query);
            if (!matchesTitle && !matchesArtist) return false;
        }
        return true;
    });
    filtered.sort((a, b) => a.title.localeCompare(b.title));
    displaySongs = filtered;
    renderTable(displaySongs);
    updateFilterVisuals(); 
}

window.filterByType = function(type) {
    if (activeFilters.type === type) activeFilters.type = null; 
    else activeFilters.type = type;
    window.applyGlobalFilters();
}

window.filterByKey = function(selectedKey) {
    if (activeFilters.key === selectedKey) activeFilters.key = null;
    else activeFilters.key = selectedKey;
    window.closeKeyModal();
    window.applyGlobalFilters();
}

window.filterByArtist = function(artistName) {
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        searchInput.value = artistName;
        activeFilters.search = artistName;
        window.applyGlobalFilters();
    }
    if(event) event.stopPropagation();
}

window.filterSongs = function() {
    const query = document.getElementById('searchInput').value;
    activeFilters.search = query;
    window.applyGlobalFilters();
}

window.sortSongs = function(criteria) {
    let sorted = [...displaySongs];
    if (criteria === 'artist') {
        sorted.sort((a, b) => a.artist.localeCompare(b.artist));
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        if(event && event.target) event.target.classList.add('active');
    }
    renderTable(sorted);
}

window.resetFilters = function() {
    activeFilters = { type: null, key: null, search: '' };
    const searchInput = document.getElementById('searchInput');
    if(searchInput) searchInput.value = '';
    window.applyGlobalFilters();
}

function updateFilterVisuals() {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const typeButtons = document.querySelectorAll(".filter-btn");
    typeButtons.forEach(btn => {
        if (btn.innerText === activeFilters.type) btn.classList.add('active');
        if (btn.innerText === "Por Nota" && activeFilters.key) {
            btn.classList.add('active');
            btn.innerText = "Nota: " + activeFilters.key; 
        } else if (btn.innerText.startsWith("Nota: ")) {
             btn.innerText = "Por Nota"; 
        }
    });
}

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay resultados.</td></tr>';
        return;
    }
    data.forEach((song, index) => {
        const originalIndex = songs.indexOf(song);
        const isAdded = myPlaylist.includes(originalIndex);
        const btnClass = isAdded ? "btn-add added" : "btn-add";
        const btnText = isAdded ? "✓" : "+";
        const btnAction = isAdded ? "" : `onclick="addToPlaylist(${originalIndex}, this)"`;

        let row = `
            <tr>
                <td class="index-col">${index + 1}</td>
                <td class="song-title" onclick="openSong(${originalIndex})">${song.title}</td>
                <td><span style="background:#333; color: #ffda93; padding:2px 8px; border-radius:4px; font-weight:bold;">${song.key}</span></td>
                <td><span class="artist-link" onclick="filterByArtist('${song.artist}')">${song.artist}</span></td>
                <td class="action-col"><button class="${btnClass}" ${btnAction}>${btnText}</button></td>
            </tr>`;
        tbody.innerHTML += row;
    });
}

/* --- PLAYLIST --- */
window.addToPlaylist = function(index, btnElement) {
    if (!myPlaylist.includes(index)) {
        myPlaylist.push(index);
        localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
        btnElement.innerText = "✓";
        btnElement.classList.add('added');
        window.showNotification("Canción agregada a tu lista");
        
        // SYNC: Avisar a Firebase
        broadcastChange();
    }
}

window.removeFromPlaylist = function(index) {
    myPlaylist = myPlaylist.filter(id => id !== index);
    localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
    window.loadPlaylistMode();
    
    // SYNC: Avisar a Firebase
    broadcastChange();
}

window.loadPlaylistMode = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedIds = urlParams.get('ids');
    let playlistIds = sharedIds ? sharedIds.split(',').map(Number) : myPlaylist;
    currentContextList = playlistIds;

    if (sharedIds) {
        const shareBtn = document.getElementById('shareListBtn');
        if(shareBtn) {
            shareBtn.innerText = "Guardar esta lista compartida";
            shareBtn.onclick = function() {
                myPlaylist = playlistIds;
                localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
                window.showNotification("¡Lista guardada!");
                setTimeout(() => window.location.href = 'lista.html', 2000);
            };
        }
    }
    displaySongs = playlistIds.map(id => songs[id]).filter(s => s !== undefined);
    renderPlaylistTable(displaySongs, playlistIds);
}

function renderPlaylistTable(songsData, originalIds) {
    const tbody = document.getElementById('tableBody');
    if(!tbody) return;
    
    const theadRow = document.querySelector('thead tr');
    if (theadRow && theadRow.children.length > 5) { 
       // Limpieza header si hace falta
    }

    tbody.innerHTML = '';
    
    if (songsData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px;">Lista vacía.</td></tr>';
        return;
    }

    songsData.forEach((song, i) => {
        const globalIndex = originalIds[i]; 
        
        let row = document.createElement('tr');
        row.setAttribute('data-index', globalIndex); 
        row.classList.add('draggable-row'); 

        row.oncontextmenu = function(event) { event.preventDefault(); event.stopPropagation(); return false; };

        row.innerHTML = `
            <td class="index-col">${i + 1}</td>
            <td class="song-title" onclick="openSong(${globalIndex})">${song.title}</td>
            <td><span style="background:#333; color: #ffda93; padding:2px 8px; border-radius:4px; font-weight:bold;">${song.key}</span></td>
            <td style="color: var(--text-white);">${song.artist}</td>
            <td class="action-col"><button class="btn-remove" onclick="removeFromPlaylist(${globalIndex})">×</button></td>
        `;
        
        tbody.appendChild(row);
    });

    enableLongPressDrag();
}

window.sharePlaylistUrl = function() {
    if (myPlaylist.length === 0) { window.showNotification("Lista vacía."); return; }
    const shareUrl = window.location.origin + window.location.pathname + '?ids=' + myPlaylist.join(',');
    if (navigator.share) navigator.share({ title: 'Mi Lista', url: shareUrl });
    else { navigator.clipboard.writeText(shareUrl); window.showNotification("Link copiado!"); }
}

/* --- DRAG & DROP: LONG PRESS --- */
function enableLongPressDrag() {
    const rows = document.querySelectorAll('.draggable-row');
    const tbody = document.getElementById('tableBody');
    
    let pressTimer;
    let isDragging = false;
    let draggingRow = null;
    let startY = 0;

    rows.forEach(row => {
        row.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('btn-remove')) return;
            isDragging = false;
            startY = e.touches[0].clientY;
            
            pressTimer = setTimeout(() => {
                isDragging = true;
                draggingRow = row;
                row.classList.add('dragging');
                if (navigator.vibrate) navigator.vibrate(50); 
            }, 600); 
        }, { passive: false });

        row.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            if (!isDragging) {
                if (Math.abs(currentY - startY) > 10) clearTimeout(pressTimer);
            } else {
                e.preventDefault(); 
                const elementBelow = document.elementFromPoint(e.touches[0].clientX, currentY);
                const rowBelow = elementBelow ? elementBelow.closest('tr') : null;
                if (rowBelow && rowBelow !== draggingRow && rowBelow.parentNode === tbody) {
                    const bounding = rowBelow.getBoundingClientRect();
                    const offset = bounding.y + (bounding.height / 2);
                    if (currentY - offset > 0) rowBelow.after(draggingRow);
                    else rowBelow.before(draggingRow);
                }
            }
        }, { passive: false });

        row.addEventListener('touchend', (e) => {
            clearTimeout(pressTimer);
            if (isDragging) {
                isDragging = false;
                draggingRow.classList.remove('dragging');
                draggingRow = null;
                saveNewOrder();
                e.preventDefault(); 
            }
        });
        
        row.addEventListener('touchcancel', () => {
            clearTimeout(pressTimer);
            if (draggingRow) draggingRow.classList.remove('dragging');
            isDragging = false;
        });
    });
}

function saveNewOrder() {
    const rows = document.querySelectorAll('#tableBody tr');
    const newPlaylist = [];
    rows.forEach(row => {
        const id = row.getAttribute('data-index');
        if (id !== null) newPlaylist.push(parseInt(id));
    });
    myPlaylist = newPlaylist;
    localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
    
    if (typeof currentContextList !== 'undefined') currentContextList = newPlaylist;
    rows.forEach((row, index) => {
        const indexCell = row.querySelector('.index-col');
        if(indexCell) indexCell.innerText = index + 1;
    });
    window.showNotification("Orden guardado");
    
    // SYNC: Avisar a Firebase
    broadcastChange();
}

/* --- VACIAR LISTA --- */
window.askClearPlaylist = function() {
    const modal = document.getElementById('confirmModal');
    if(modal) modal.style.display = 'flex';
}
window.closeConfirmModal = function() {
    const modal = document.getElementById('confirmModal');
    if(modal) modal.style.display = 'none';
}
window.executeClearList = function() {
    myPlaylist = []; 
    localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist)); 
    window.closeConfirmModal(); 
    window.showNotification("Lista vaciada correctamente"); 
    window.loadPlaylistMode(); 
    
    // SYNC: Avisar a Firebase
    broadcastChange();
}

/* --- LIVE SESSION (SALA ÚNICA: SESIÓN 1) --- */

window.openLiveModal = function() {
    document.getElementById('liveModal').style.display = 'flex';
    // Si ya hay sesión activa
    if (isConnected) {
        showConnectedScreen();
    } else {
        window.resetLiveModal();
    }
}
window.closeLiveModal = function() {
    document.getElementById('liveModal').style.display = 'none';
}
window.resetLiveModal = function() {
    document.getElementById('liveConnectionScreen').style.display = 'block';
    document.getElementById('liveConnected').style.display = 'none';
    document.getElementById('sessionCodeInput').value = '';
}

function showConnectedScreen() {
    document.getElementById('liveConnectionScreen').style.display = 'none';
    document.getElementById('liveConnected').style.display = 'block';
    const keyDisplay = document.getElementById('connectedKeyDisplay');
    if(keyDisplay) keyDisplay.innerText = currentUserKey;
}

window.connectToSession = function() {
    const codeInput = document.getElementById('sessionCodeInput').value.trim().toUpperCase();
    
    if (!codeInput) { alert("Ingresa la clave."); return; }
    
    // VERIFICAR CLAVES
    if (!VALID_KEYS.includes(codeInput)) {
        alert("Clave incorrecta. Intenta con: SOL, SAM, PASTOR o SAMU");
        return;
    }

    // 1. Guardar clave
    currentUserKey = codeInput; 
    sessionStorage.setItem('acordify_user_key', currentUserKey);
    isConnected = true;
    
    const roomRef = ref(db, 'sessions/' + FIXED_ROOM_ID);

    // 2. LOGICA INTELIGENTE: ¿Descargo o Subo?
    get(roomRef).then((snapshot) => {
        if (snapshot.exists() && snapshot.val()) {
            window.showNotification("Sincronizando con la banda... 📡");
        } else {
            set(roomRef, myPlaylist)
                .then(() => window.showNotification("Sala iniciada. Lista subida ☁️"));
        }
        
        // 3. Activar escucha permanente
        startListening(roomRef);
        updateUIConnected();
        
        // Cerrar modal automáticamente
        window.closeLiveModal(); 

    }).catch((error) => {
        console.error(error);
        alert("Error de conexión");
    });
}

function reconnectSession() {
    const roomRef = ref(db, 'sessions/' + FIXED_ROOM_ID);
    startListening(roomRef);
    updateUIConnected();
}

function startListening(roomRef) {
    onValue(roomRef, (snapshot) => {
        const cloudPlaylist = snapshot.val();
        // Si hay cambios en la nube, actualizamos local
        if (JSON.stringify(cloudPlaylist) !== JSON.stringify(myPlaylist)) {
            myPlaylist = cloudPlaylist || [];
            localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
            
            if (window.location.pathname.includes('lista.html')) {
                window.loadPlaylistMode();
            } else {
                window.applyGlobalFilters();
            }
        }
    });
}

function updateUIConnected() {
    const btnLive = document.getElementById('btnLiveHeader');
    if(btnLive) {
        btnLive.classList.add('active');
        btnLive.innerText = "📡 " + currentUserKey;
    }
}

// Desconectar y cerrar
window.disconnectSession = function() {
    if (!isConnected) return;

    const roomRef = ref(db, 'sessions/' + FIXED_ROOM_ID);
    off(roomRef); // Dejar de escuchar

    isConnected = false;
    currentUserKey = null;
    sessionStorage.removeItem('acordify_user_key');

    const btnLive = document.getElementById('btnLiveHeader');
    if(btnLive) {
        btnLive.classList.remove('active');
        btnLive.innerText = "📡 LIVE";
    }

    window.resetLiveModal();
    window.showNotification("Desconectado 🔌");
    window.closeLiveModal();
}

function broadcastChange() {
    if (!isConnected) return; // Si no estamos conectados, no enviamos nada
    const roomRef = ref(db, 'sessions/' + FIXED_ROOM_ID);
    set(roomRef, myPlaylist).catch((e) => console.error(e));
}

/* --- UTILIDADES --- */
const filterKeys = ["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"];
window.openKeyModal = function() { document.getElementById('keyModal').style.display = 'flex'; }
window.closeKeyModal = function() { document.getElementById('keyModal').style.display = 'none'; }
window.generateKeyButtons = function() {
    const grid = document.getElementById('keyGrid');
    if (!grid) return; 
    grid.innerHTML = '';
    filterKeys.forEach(key => {
        let btn = document.createElement('button');
        btn.className = 'key-btn';
        btn.innerText = key;
        btn.onclick = function() { window.filterByKey(key); };
        grid.appendChild(btn);
    });
}
window.onclick = function(event) {
    let keyModal = document.getElementById('keyModal');
    let confirmModal = document.getElementById('confirmModal');
    if (event.target == keyModal) keyModal.style.display = "none";
    if (event.target == confirmModal) window.closeConfirmModal();
}

window.showNotification = function(message) {
    const toast = document.getElementById("toastNotification");
    if (!toast) return; 
    toast.innerText = message;
    toast.className = "custom-notification show"; 
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

/* --- PWA --- */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}
let deferredPrompt; 
const actionBtn = document.getElementById('actionBtn'); 
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); deferredPrompt = e;
    if (actionBtn) {
        actionBtn.innerHTML = "📲 Instalar";
        actionBtn.style.color = "#4cd137";
        actionBtn.classList.add('mode-install');
        actionBtn.classList.remove('mode-share');
    }
});
if (actionBtn) {
    actionBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null; 
            if (outcome === 'accepted') resetToShare();
        } else window.shareApp();
    });
}
window.addEventListener('appinstalled', () => resetToShare());
function resetToShare() {
    if (!actionBtn) return;
    actionBtn.innerHTML = "Compartir";
    actionBtn.style.color = "#ffffff"; 
    actionBtn.classList.remove('mode-install');
    actionBtn.classList.add('mode-share');
}
window.shareApp = function() {
    if (navigator.share) navigator.share({ title: 'Acordify', url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); window.showNotification("Enlace copiado!"); }
}

/* --- SWIPE --- */
let touchStartX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    if(document.getElementById('songDetailView').style.display === 'block') {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }
}, false);

document.addEventListener('touchend', function(e) {
    if(document.getElementById('songDetailView').style.display === 'block') {
        touchEndY = e.changedTouches[0].screenY;
        let touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture(touchStartX, touchEndX, touchStartY, touchEndY);
    }
}, false);

function handleSwipeGesture(startX, endX, startY, endY) {
    const minSwipeDistance = 50; 
    const maxVerticalVariance = 100; 

    const diffX = startX - endX;
    const diffY = startY - endY;

    if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffY) < maxVerticalVariance) {
        if (diffX > 0) changeSongInPlaylist(1);
        else changeSongInPlaylist(-1);
    }
}

function changeSongInPlaylist(direction) {
    if (!currentContextList || currentContextList.length === 0) return;
    let currentPos = currentContextList.indexOf(currentSongIndex);
    if (currentPos === -1) return; 

    let newPos = currentPos + direction;
    if (newPos >= currentContextList.length) newPos = 0; 
    else if (newPos < 0) newPos = currentContextList.length - 1; 

    let nextSongID = currentContextList[newPos];
    window.openSong(nextSongID);
}