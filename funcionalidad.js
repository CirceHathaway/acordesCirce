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
let showChords = true; // Estado de visibilidad de acordes
let myPlaylist = JSON.parse(localStorage.getItem('myPlaylist')) || [];
let currentContextList = []; // <--- Guarda el orden de IDs actual de la lista

/* --- INICIALIZACIÓN --- */
window.onload = function() {
    if (window.location.hash === '#song') {
        history.replaceState(null, null, ' ');
    }
    if (typeof songs !== 'undefined') {
        if (window.location.pathname.includes('lista.html')) {
            loadPlaylistMode();
        } else {
            applyGlobalFilters(); 
        }
        generateKeyButtons();
    } else {
        alert("Error: No se cargó canciones.js");
    }
};

/* --- NAVEGACIÓN Y HISTORIAL --- */
function openSong(indexInGlobalArray) {
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

    // --- NUEVO: LÓGICA DEL COMENTARIO ---
    const commentEl = document.getElementById('detailComment');
    
    if (song.comentario) {
        commentEl.innerText = song.comentario; // Ponemos el texto
        commentEl.style.display = 'block';     // Lo mostramos
    } else {
        commentEl.innerText = '';              // Limpiamos texto anterior
        commentEl.style.display = 'none';      // Ocultamos el elemento para que no ocupe espacio
    }
    // -------------------------------------
    
    updateSongView();
    updateChordIcon(); 
    window.scrollTo(0,0);
}

function goHome() {
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
    closeAllModals();
    window.scrollTo(0,0);
}

/* --- LÓGICA MUSICAL Y VISUALIZACIÓN --- */
function updateSongView() {
    if (currentSongIndex === -1) return;
    const songOriginal = songs[currentSongIndex].content;
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = songOriginal;
    const chords = tempDiv.querySelectorAll('.chord');
    
    chords.forEach(element => {
        // 1. Transformar Nota
        let parts = element.innerText.split('/');
        let newChord = transformNote(parts[0]);
        if (parts.length > 1) {
            let newBass = transformNote(parts[1]);
            element.innerText = newChord + "/" + newBass;
        } else {
            element.innerText = newChord;
        }

        // 2. NUEVO: Ocultar o Mostrar según el estado
        if (!showChords) {
            element.style.display = 'none'; // Desaparece el acorde
        } else {
            element.style.display = ''; // Vuelve al valor por defecto (CSS)
        }
    });

    const contentDiv = document.getElementById('songContent');
    contentDiv.innerHTML = tempDiv.innerHTML;
    contentDiv.style.fontSize = currentFontSize + 'px';
}

// NUEVO: Función para alternar acordes
function toggleChords() {
    showChords = !showChords;
    updateSongView();
    updateChordIcon();
}

// NUEVO: Cambiar el icono del botón (Ojo abierto / Ojo tachado)
function updateChordIcon() {
    const btn = document.getElementById('btnToggleChords');
    if (!btn) return;

    if (showChords) {
        // Ojo Abierto
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        btn.style.color = "var(--text-primary)"; // Color normal
    } else {
        // Ojo Tachado (Cerrado)
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
        btn.style.color = "#e55039"; // Color rojo para indicar "apagado"
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

/* --- FILTROS Y BÚSQUEDA --- */
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
    if (activeFilters.type === type) activeFilters.type = null; 
    else activeFilters.type = type;
    applyGlobalFilters();
}

function filterByKey(selectedKey) {
    if (activeFilters.key === selectedKey) activeFilters.key = null;
    else activeFilters.key = selectedKey;
    closeKeyModal();
    applyGlobalFilters();
}

function filterByArtist(artistName) {
    document.getElementById('searchInput').value = artistName;
    activeFilters.search = artistName;
    applyGlobalFilters();
    event.stopPropagation();
}

function filterSongs() {
    const query = document.getElementById('searchInput').value;
    activeFilters.search = query;
    applyGlobalFilters();
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

function resetFilters() {
    activeFilters = { type: null, key: null, search: '' };
    document.getElementById('searchInput').value = '';
    applyGlobalFilters();
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
function addToPlaylist(index, btnElement) {
    if (!myPlaylist.includes(index)) {
        myPlaylist.push(index);
        localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
        btnElement.innerText = "✓";
        btnElement.classList.add('added');
        showNotification("Canción agregada a tu lista");
    }
}

function removeFromPlaylist(index) {
    myPlaylist = myPlaylist.filter(id => id !== index);
    localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
    loadPlaylistMode();
}

function loadPlaylistMode() {
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
                showNotification("¡Lista guardada!");
                setTimeout(() => window.location.href = 'lista.html', 2000);
            };
        }
    }
    displaySongs = playlistIds.map(id => songs[id]).filter(s => s !== undefined);
    renderPlaylistTable(displaySongs, playlistIds);
}

function renderPlaylistTable(songsData, originalIds) {
    const tbody = document.getElementById('tableBody');
    
    // IMPORTANTE: Asegurarnos de que el Header NO tenga la columna extra si la agregamos antes
    const theadRow = document.querySelector('thead tr');
    // Si por error quedó la columna de la manija (5 columnas), la borramos
    if (theadRow && theadRow.children.length > 5) { 
       // Ajusta esto según cuantas columnas tengas. 
       // Simplemente recargando la página debería limpiarse si el HTML está bien, 
       // pero aquí asumimos el HTML original de 5 columnas.
    }

    tbody.innerHTML = '';
    
    if (songsData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px;">Lista vacía.</td></tr>';
        return;
    }

    songsData.forEach((song, i) => {
        const globalIndex = originalIds[i]; 
        
        let row = document.createElement('tr');
        row.setAttribute('data-index', globalIndex); // Guardamos el ID real
        row.classList.add('draggable-row'); // Clase para el CSS

        // Nota: Agregamos oncontextmenu="return false" para evitar el menú de click derecho en Android
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

    // Activamos la lógica de "Mantener presionado"
    enableLongPressDrag();
}

function sharePlaylistUrl() {
    if (myPlaylist.length === 0) { showNotification("Lista vacía."); return; }
    const shareUrl = window.location.origin + window.location.pathname + '?ids=' + myPlaylist.join(',');
    if (navigator.share) navigator.share({ title: 'Mi Lista', url: shareUrl });
    else { navigator.clipboard.writeText(shareUrl); showNotification("Link copiado!"); }
}

/* --- SISTEMA DE REORDENAMIENTO: LONG PRESS (MANTENER) --- */

function enableLongPressDrag() {
    const rows = document.querySelectorAll('.draggable-row');
    const tbody = document.getElementById('tableBody');
    
    let pressTimer;
    let isDragging = false;
    let draggingRow = null;
    let startY = 0;

    rows.forEach(row => {
        
        // 1. Al tocar la pantalla
        row.addEventListener('touchstart', (e) => {
            // Si tocan el botón de borrar (X), no iniciamos nada
            if (e.target.classList.contains('btn-remove')) return;

            isDragging = false;
            startY = e.touches[0].clientY;
            
            // Iniciamos el temporizador: Si en 600ms no mueve el dedo, activamos el modo arrastrar
            pressTimer = setTimeout(() => {
                isDragging = true;
                draggingRow = row;
                
                // Efecto visual y háptico (vibración)
                row.classList.add('dragging');
                if (navigator.vibrate) navigator.vibrate(50); 
                
            }, 600); // 600ms para considerar "Mantener presionado"
            
        }, { passive: false });

        // 2. Al mover el dedo
        row.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;

            if (!isDragging) {
                // Si movemos el dedo ANTES de que se cumpla el tiempo, es un SCROLL normal.
                // Cancelamos el temporizador de arrastre.
                if (Math.abs(currentY - startY) > 10) {
                    clearTimeout(pressTimer);
                }
            } else {
                // Si YA estamos arrastrando (pasaron los 600ms)
                e.preventDefault(); // Bloqueamos el scroll de la pantalla
                
                // Lógica de intercambio (Swap)
                const elementBelow = document.elementFromPoint(e.touches[0].clientX, currentY);
                const rowBelow = elementBelow ? elementBelow.closest('tr') : null;

                if (rowBelow && rowBelow !== draggingRow && rowBelow.parentNode === tbody) {
                    const bounding = rowBelow.getBoundingClientRect();
                    const offset = bounding.y + (bounding.height / 2);
                    
                    if (currentY - offset > 0) {
                        rowBelow.after(draggingRow);
                    } else {
                        rowBelow.before(draggingRow);
                    }
                }
            }
        }, { passive: false });

        // 3. Al soltar el dedo
        row.addEventListener('touchend', (e) => {
            // Limpiamos el timer (por si soltó rápido, fue un click normal)
            clearTimeout(pressTimer);
            
            if (isDragging) {
                // Si estaba arrastrando, finalizamos y guardamos
                isDragging = false;
                draggingRow.classList.remove('dragging');
                draggingRow = null;
                saveNewOrder();
                
                // Evitamos que se dispare el click de "abrir canción" al soltar
                e.preventDefault(); 
            }
        });
        
        // Cancelar si pasa algo raro (salir de la pantalla, alerta, etc)
        row.addEventListener('touchcancel', () => {
            clearTimeout(pressTimer);
            if (draggingRow) draggingRow.classList.remove('dragging');
            isDragging = false;
        });
    });
}

// Reutilizamos la misma función de guardar orden del paso anterior
function saveNewOrder() {
    const rows = document.querySelectorAll('#tableBody tr');
    const newPlaylist = [];

    rows.forEach(row => {
        const id = row.getAttribute('data-index');
        if (id !== null) {
            newPlaylist.push(parseInt(id));
        }
    });

    myPlaylist = newPlaylist;
    localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
    
    // Actualizamos contexto para Swipe
    if (typeof currentContextList !== 'undefined') {
        currentContextList = newPlaylist;
    }

    // Renumeramos visualmente
    rows.forEach((row, index) => {
        const indexCell = row.querySelector('.index-col');
        if(indexCell) indexCell.innerText = index + 1;
    });

    showNotification("Orden guardado");
}

/* --- SISTEMA DE BORRADO CON MODAL --- */

// 1. Abre el modal
function askClearPlaylist() {
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'flex'; // Usamos flex para centrarlo con tu CSS existente
}

// 2. Cierra el modal (Botón Cancelar)
function closeConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

// 3. Ejecuta el borrado (Botón Sí, vaciar)
function executeClearList() {
    myPlaylist = []; // Vacía el array
    localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist)); // Guarda vacío
    
    closeConfirmModal(); // Cierra el modal
    showNotification("Lista vaciada correctamente"); // Muestra el aviso
    
    loadPlaylistMode(); // Recarga la tabla para que se vea vacía
}

// Cierra el modal si tocan afuera (en lo oscuro)
window.addEventListener('click', function(event) {
    const modal = document.getElementById('confirmModal');
    if (event.target == modal) {
        closeConfirmModal();
    }
});

/* --- UTILIDADES --- */
const filterKeys = ["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"];
function openKeyModal() { document.getElementById('keyModal').style.display = 'flex'; }
function closeKeyModal() { document.getElementById('keyModal').style.display = 'none'; }
function generateKeyButtons() {
    const grid = document.getElementById('keyGrid');
    
    if (!grid) return; // Si no existe el elemento (estamos en lista.html), salimos.

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

function showNotification(message) {
    const toast = document.getElementById("toastNotification");
    if (!toast) return; 
    toast.innerText = message;
    toast.className = "custom-notification show"; 
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

/* --- PWA: LÓGICA INVERTIDA --- */
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
        } else shareApp();
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

function shareApp() {
    if (navigator.share) navigator.share({ title: 'Acordify', url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); showNotification("Enlace copiado!"); }
}

/* --- NAVEGACIÓN SWIPE (DESLIZAR la lista) --- */

let touchStartX = 0;
let touchStartY = 0;
let touchEndY = 0;

// Escuchar el inicio del toque
document.addEventListener('touchstart', function(e) {
    // Solo registramos si estamos viendo una canción (songDetailView visible)
    if(document.getElementById('songDetailView').style.display === 'block') {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }
}, false);

// Escuchar el final del toque
document.addEventListener('touchend', function(e) {
    if(document.getElementById('songDetailView').style.display === 'block') {
        touchEndY = e.changedTouches[0].screenY;
        let touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture(touchStartX, touchEndX, touchStartY, touchEndY);
    }
}, false);

function handleSwipeGesture(startX, endX, startY, endY) {
    const minSwipeDistance = 50; // Mínima distancia para considerar swipe
    const maxVerticalVariance = 100; // Máxima desviación vertical permitida (para no afectar el scroll)

    const diffX = startX - endX;
    const diffY = startY - endY;

    // Verificamos que sea un movimiento horizontal predominante
    if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffY) < maxVerticalVariance) {
        if (diffX > 0) {
            // Deslizar a la IZQUIERDA -> Siguiente Canción
            changeSongInPlaylist(1);
        } else {
            // Deslizar a la DERECHA -> Canción Anterior
            changeSongInPlaylist(-1);
        }
    }
}

function changeSongInPlaylist(direction) {
    // Si no hay lista de contexto (por ejemplo, filtro global), usamos el array global o fallamos suavemente
    // Para lista.html, currentContextList ya tiene los IDs de la playlist.
    
    if (!currentContextList || currentContextList.length === 0) return;

    // 1. Encontrar la posición de la canción actual dentro de la lista que estamos viendo
    let currentPos = currentContextList.indexOf(currentSongIndex);

    if (currentPos === -1) return; // La canción actual no está en la lista activa

    // 2. Calcular la nueva posición (Circular)
    let newPos = currentPos + direction;

    if (newPos >= currentContextList.length) {
        newPos = 0; // Si es la última, volver a la primera
    } else if (newPos < 0) {
        newPos = currentContextList.length - 1; // Si es la primera, ir a la última
    }

    // 3. Obtener el ID global de la nueva canción
    let nextSongID = currentContextList[newPos];

    // 4. Abrir la canción
    // Nota: Usamos un pequeño timeout para dar sensación de cambio si quisieras, 
    // pero directo es más rápido.
    openSong(nextSongID);
}