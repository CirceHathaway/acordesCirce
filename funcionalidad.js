/* --- CONFIGURACIÓN MUSICAL --- */
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatMap = { "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#" };
const scaleSpanish = ["DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#", "LA", "LA#", "SI"];

/* --- ESTADO GLOBAL (MEMORIA DE FILTROS) --- */
let activeFilters = {
    type: null,   // 'Alabanza', 'Adoración' o null
    key: null,    // 'C', 'D', etc. o null
    search: ''    // Texto del buscador
};

let displaySongs = []; 
let currentSongIndex = -1; 
let currentSemitones = 0; 
let isSpanish = false; 
let currentFontSize = 17;

// Playlist en memoria (Array de índices)
let myPlaylist = JSON.parse(localStorage.getItem('myPlaylist')) || [];

/* --- INICIALIZACIÓN --- */
window.onload = function() {
    if (typeof songs !== 'undefined') {
        
        // Detectar si estamos en lista.html
        if (window.location.pathname.includes('lista.html')) {
            loadPlaylistMode();
        } else {
            // Estamos en index.html
            applyGlobalFilters(); //carga con orden A-Z
        }
        
        generateKeyButtons();
    } else {
        alert("Error: No se cargó canciones.js");
    }
};

/* --- LÓGICA DE PLAYLIST (LISTA.HTML) --- */

function addToPlaylist(index, btnElement) {
    if (!myPlaylist.includes(index)) {
        myPlaylist.push(index);
        localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
        
        // Feedback visual
        btnElement.innerText = "✓";
        btnElement.classList.add('added');
        
        // Notificación elegante
        showNotification("Canción agregada a tu lista");
    }
}

function removeFromPlaylist(index) {
    myPlaylist = myPlaylist.filter(id => id !== index);
    localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
    loadPlaylistMode(); // Recargar la tabla
}

function loadPlaylistMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedIds = urlParams.get('ids');

    let playlistIds = [];

    if (sharedIds) {
        playlistIds = sharedIds.split(',').map(Number);
        
        const shareBtn = document.getElementById('shareListBtn');
        if(shareBtn) {
            shareBtn.innerText = "Guardar esta lista compartida";
            shareBtn.onclick = function() {
                myPlaylist = playlistIds;
                localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
                showNotification("¡Lista guardada en tu dispositivo!");
                setTimeout(() => {
                    window.location.href = 'lista.html'; 
                }, 2000);
            };
        }
    } else {
        playlistIds = myPlaylist;
    }

    displaySongs = playlistIds.map(id => songs[id]).filter(s => s !== undefined);
    renderPlaylistTable(displaySongs, playlistIds);
}

function renderPlaylistTable(songsData, originalIds) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    if (songsData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px;">Tu lista está vacía. Ve al inicio para agregar canciones.</td></tr>';
        return;
    }

    songsData.forEach((song, i) => {
        const globalIndex = originalIds[i]; 

        let row = `
            <tr>
                <td class="index-col">${i + 1}</td>
                <td class="song-title" onclick="openSong(${globalIndex})">${song.title}</td>
                <td><span style="background:#333; color: #ffda93; padding:2px 8px; border-radius:4px; font-weight:bold;">${song.key}</span></td>
                <td style="color: var(--text-white);">${song.artist}</td>
                <td class="action-col">
                    <button class="btn-remove" onclick="removeFromPlaylist(${globalIndex})">×</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function sharePlaylistUrl() {
    if (myPlaylist.length === 0) {
        showNotification("Tu lista está vacía, agrega canciones primero.");
        return;
    }
    const idsString = myPlaylist.join(',');
    const shareUrl = window.location.origin + window.location.pathname + '?ids=' + idsString;

    if (navigator.share) {
        navigator.share({ title: 'Mi Lista de Adoración', url: shareUrl });
    } else {
        navigator.clipboard.writeText(shareUrl);
        showNotification("¡Enlace de lista copiado al portapapeles!");
    }
}

/* --- LÓGICA DE FILTROS COMBINADOS --- */

function applyGlobalFilters() {
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

function filterByType(type) {
    if (activeFilters.type === type) {
        activeFilters.type = null; 
    } else {
        activeFilters.type = type;
    }
    applyGlobalFilters();
}

function filterByKey(selectedKey) {
    if (activeFilters.key === selectedKey) {
        activeFilters.key = null;
    } else {
        activeFilters.key = selectedKey;
    }
    closeKeyModal();
    applyGlobalFilters();
}

function filterSongs() {
    const query = document.getElementById('searchInput').value;
    activeFilters.search = query;
    applyGlobalFilters();
}

function resetFilters() {
    activeFilters = { type: null, key: null, search: '' };
    document.getElementById('searchInput').value = '';
    applyGlobalFilters();
}

function updateFilterVisuals() {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const typeButtons = document.querySelectorAll(".filter-btn");
    typeButtons.forEach(btn => {
        if (btn.innerText === activeFilters.type) {
            btn.classList.add('active');
        }
        if (btn.innerText === "Por Nota" && activeFilters.key) {
            btn.classList.add('active');
            btn.innerText = "Nota: " + activeFilters.key; 
        } else if (btn.innerText.startsWith("Nota: ")) {
             btn.innerText = "Por Nota"; 
        }
    });
}

function sortSongs(criteria) {
    let sorted = [...displaySongs];
    if (criteria === 'artist') {
        sorted.sort((a, b) => a.artist.localeCompare(b.artist));
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        if(event && event.target) event.target.classList.add('active');
    }
    renderTable(sorted);
}

/* --- VISUALIZACIÓN Y MODALES --- */

function goHome() {
    document.getElementById('songDetailView').style.display = 'none';
    const listView = document.getElementById('songListView');
    if(listView) listView.style.display = 'block';
    closeAllModals();
    window.scrollTo(0,0);
}

function openSong(indexInGlobalArray) {
    currentSongIndex = indexInGlobalArray;
    const song = songs[currentSongIndex];
    currentSemitones = 0;
    document.getElementById('songListView').style.display = 'none';
    document.getElementById('songDetailView').style.display = 'block';
    document.getElementById('detailTitle').innerText = song.title;
    document.getElementById('detailArtist').innerText = song.artist;
    updateSongView();
    window.scrollTo(0,0);
}

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
    });
    const contentDiv = document.getElementById('songContent');
    contentDiv.innerHTML = tempDiv.innerHTML;
    contentDiv.style.fontSize = currentFontSize + 'px';
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

function applyTranspose(amount) { currentSemitones += amount; updateSongView(); }
function resetTranspose() { currentSemitones = 0; updateSongView(); closeAllModals(); }
function toggleNotation() { isSpanish = !isSpanish; updateSongView(); }

function changeFontSize(amount) {
    currentFontSize += amount;
    if (currentFontSize < 8) currentFontSize = 8; 
    if (currentFontSize > 30) currentFontSize = 30; 
    updateSongView();
}

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modalOverlay');
    if (modal.classList.contains('active')) {
        closeAllModals();
    } else {
        closeAllModals();
        modal.classList.add('active');
        modal.style.display = 'flex';
        overlay.style.display = 'block';
    }
}

function closeAllModals() {
    document.querySelectorAll('.mini-modal').forEach(m => {
        m.classList.remove('active');
        m.style.display = 'none';
    });
    document.getElementById('modalOverlay').style.display = 'none';
}

function filterByArtist(artistName) {
    document.getElementById('searchInput').value = artistName;
    activeFilters.search = artistName;
    applyGlobalFilters();
    event.stopPropagation();
}

/* --- RENDERIZADO PRINCIPAL (INDEX.HTML) --- */
function renderTable(data) {
    const tbody = document.getElementById('tableBody');
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
                <td class="action-col">
                    <button class="${btnClass}" ${btnAction}>${btnText}</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

const filterKeys = ["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"];
function openKeyModal() { document.getElementById('keyModal').style.display = 'flex'; }
function closeKeyModal() { document.getElementById('keyModal').style.display = 'none'; }
function generateKeyButtons() {
    const grid = document.getElementById('keyGrid');
    grid.innerHTML = '';
    filterKeys.forEach(key => {
        let btn = document.createElement('button');
        btn.className = 'key-btn';
        btn.innerText = key;
        btn.onclick = function() { filterByKey(key); };
        grid.appendChild(btn);
    });
}
window.onclick = function(event) {
    let keyModal = document.getElementById('keyModal');
    if (event.target == keyModal) keyModal.style.display = "none";
}

/* --- Modal de notificación --- */
function showNotification(message) {
    const toast = document.getElementById("toastNotification");
    if (!toast) return; 

    toast.innerText = message;
    toast.className = "custom-notification show"; 

    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}

/* =========================================================
   PWA: LÓGICA DE BOTÓN INTELIGENTE (UNIFICADO)
   ========================================================= */

// 1. Registrar Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW registrado'))
            .catch(err => console.log('SW error', err));
    });
}

// 2. Variables y Referencias
let deferredPrompt; 
const actionBtn = document.getElementById('actionBtn'); 

// 3. VERIFICACIONES DE ESTADO
// A. ¿Ya está instalada?
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
// B. ¿Es escritorio/PC? (Pantalla mayor a 1024px)
const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

// LÓGICA INICIAL:
// Si ya está instalada O si es una PC de escritorio -> Muestra "Compartir"
if (isStandalone || isDesktop) {
    setShareMode();
}

// 4. Escuchar evento de instalación (Chrome/Android)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); 
    deferredPrompt = e; 
    console.log("Evento de instalación capturado.");
    // NOTA: Si es Desktop, aunque capturemos el evento, el botón seguirá diciendo "Compartir"
    // gracias al chequeo "if (isDesktop) setShareMode()" de arriba.
});

// 5. Manejar el clic del botón único
if (actionBtn) {
    actionBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        // CASO A: Modo Compartir
        // Entra aquí si: Ya está instalada, O es Desktop, O el usuario aceptó instalar antes
        if (actionBtn.classList.contains('mode-share')) {
            shareApp(); 
            return;
        }

        // CASO B: Modo Instalar (Móvil Android)
        if (deferredPrompt) {
            deferredPrompt.prompt(); 
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Usuario eligió: ${outcome}`);
            deferredPrompt = null; 
            
            if (outcome === 'accepted') {
                setShareMode();
            }
        } else {
            // CASO C: Modo Instalar (iPhone / Manual)
            showManualInstallInstructions();
        }
    });
}

// 6. Detectar instalación exitosa
window.addEventListener('appinstalled', () => {
    setShareMode();
});

// --- Funciones Auxiliares ---

function setShareMode() {
    if (!actionBtn) return;
    actionBtn.innerHTML = "Compartir"; 
    actionBtn.style.color = "#ffffff"; 
    actionBtn.classList.add('mode-share'); 
}

function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'Acordes Hathaway',
            text: '¡Mira este cancionero digital!',
            url: window.location.href
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(window.location.href);
        showNotification("¡Enlace copiado al portapapeles!");
    }
}

function showManualInstallInstructions() {
    const modal = document.getElementById('installAppModal');
    if(modal) {
        modal.style.display = 'flex';
        const btnClose = document.getElementById('btnCloseInstall');
        if(btnClose) btnClose.onclick = () => { modal.style.display = 'none'; };
        
        const btnInside = document.getElementById('btnInstall');
        if(btnInside) {
            btnInside.onclick = async () => {
                if(deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt = null;
                    modal.style.display = 'none';
                } else {
                    alert("En iPhone/iPad: \n1. Toca Compartir ⬆️ \n2. Busca 'Agregar a Inicio' ➕");
                }
            };
        }
    } else {
        alert("Para instalar: Busca la opción 'Agregar a pantalla de inicio' en el menú.");
    }
}