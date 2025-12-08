/* --- CONFIGURACIÓN MUSICAL --- */
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatMap = { "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#" };
const scaleSpanish = ["DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#", "LA", "LA#", "SI"];

/* --- ESTADO GLOBAL (MEMORIA DE FILTROS) --- */
// Aquí guardamos qué filtros están activos actualmente
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
    // 1. Verificar si hay una lista compartida en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedIds = urlParams.get('ids');

    let playlistIds = [];

    if (sharedIds) {
        // Si viene de un link compartido, usamos esos IDs
        playlistIds = sharedIds.split(',').map(Number);
        
        const shareBtn = document.getElementById('shareListBtn');
        if(shareBtn) {
            shareBtn.innerText = "Guardar esta lista compartida";
            shareBtn.onclick = function() {
                myPlaylist = playlistIds;
                localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
                
                // AQUÍ ESTÁ EL CAMBIO: Usamos la notificación personalizada
                showNotification("¡Lista guardada en tu dispositivo!");
                
                // Esperamos 2 segundos antes de limpiar la URL para que se vea el mensaje
                setTimeout(() => {
                    window.location.href = 'lista.html'; 
                }, 2000);
            };
        }
    } else {
        // Si no, usamos la local
        playlistIds = myPlaylist;
    }

    // 2. Filtrar las canciones reales
    displaySongs = playlistIds.map(id => songs[id]).filter(s => s !== undefined);

    // 3. Renderizar tabla especial
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
        // Necesitamos el índice original para abrir la canción correcta
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
    // Crear link con IDs: misitio.com/lista.html?ids=1,5,8
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

// 1. Motor Central de Filtros
function applyGlobalFilters() {
    // Empezamos siempre con la lista completa original
    let filtered = songs.filter(song => {
        // A. Filtro por TIPO (Alabanza/Adoración)
        if (activeFilters.type && song.type !== activeFilters.type) {
            return false; // Si hay filtro de tipo y no coincide, la descartamos
        }

        // B. Filtro por NOTA (Key)
        if (activeFilters.key && song.key !== activeFilters.key) {
            return false; // Si hay filtro de nota y no coincide, la descartamos
        }

        // C. Filtro por BUSCADOR (Título o Artista)
        if (activeFilters.search) {
            const query = activeFilters.search.toLowerCase();
            const matchesTitle = song.title.toLowerCase().includes(query);
            const matchesArtist = song.artist.toLowerCase().includes(query);
            if (!matchesTitle && !matchesArtist) {
                return false;
            }
        }

        return true; // Si pasó todas las pruebas, la incluimos
    });

    // Ordenamiento por defecto: Alfabético (A-Z)
    filtered.sort((a, b) => a.title.localeCompare(b.title));

    // Actualizamos la lista visible
    displaySongs = filtered;
    renderTable(displaySongs);
    updateFilterVisuals(); // Actualizar colores de botones
}

// 2. Manejador de botones de TIPO
function filterByType(type) {
    // Si toco el mismo que ya está, lo quito (toggle), si no, lo pongo.
    if (activeFilters.type === type) {
        activeFilters.type = null; 
    } else {
        activeFilters.type = type;
    }
    applyGlobalFilters();
}

// 3. Manejador de botones de NOTA
function filterByKey(selectedKey) {
    // Si toco la misma nota que ya está, la quito.
    if (activeFilters.key === selectedKey) {
        activeFilters.key = null;
    } else {
        activeFilters.key = selectedKey;
    }
    closeKeyModal();
    applyGlobalFilters();
}

// 4. Manejador del BUSCADOR
function filterSongs() {
    const query = document.getElementById('searchInput').value;
    activeFilters.search = query;
    applyGlobalFilters();
}

// 5. Reset Completo
function resetFilters() {
    // Borramos la memoria de filtros
    activeFilters = { type: null, key: null, search: '' };
    
    // Limpiamos el input visual
    document.getElementById('searchInput').value = '';
    
    // Recargamos
    applyGlobalFilters();
}

// 6. Actualizar visualmente qué botones están activos
function updateFilterVisuals() {
    // Limpiar todos primero
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));

    // Buscar botones de Tipo y activarlos si coincide
    const typeButtons = document.querySelectorAll(".filter-btn");
    typeButtons.forEach(btn => {
        if (btn.innerText === activeFilters.type) {
            btn.classList.add('active');
        }
        // Para el botón de "Por Nota", si hay una nota activa, lo iluminamos
        if (btn.innerText === "Por Nota" && activeFilters.key) {
            btn.classList.add('active');
            btn.innerText = "Nota: " + activeFilters.key; // Opcional: Mostrar la nota en el botón
        } else if (btn.innerText.startsWith("Nota: ")) {
             btn.innerText = "Por Nota"; // Restaurar texto si no hay nota
        }
    });
}

/* --- ORDENAMIENTO EXTRA (Por Artista) --- */
function sortSongs(criteria) {
    // Este ordena sobre lo que ya está filtrado
    let sorted = [...displaySongs];
    
    if (criteria === 'artist') {
        sorted.sort((a, b) => a.artist.localeCompare(b.artist));
        // Marcamos visualmente el botón
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        if(event && event.target) event.target.classList.add('active');
    }
    
    renderTable(sorted);
}

/* --- (RESTO DE FUNCIONES VISUALES IGUAL QUE ANTES) --- */

function goHome() {
    // Si estamos en lista.html y tocamos el logo o "volver", la vista detalle se oculta
    document.getElementById('songDetailView').style.display = 'none';
    
    // Si hay una tabla (ya sea lista o index), la mostramos
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
    // Al hacer clic en un artista, usamos el buscador global
    // Esto permite combinarlo con Type y Key también si quisieras, 
    // pero por ahora simplificamos llenando el search.
    document.getElementById('searchInput').value = artistName;
    activeFilters.search = artistName;
    applyGlobalFilters();
    event.stopPropagation();
}

/* --- LÓGICA PRINCIPAL (INDEX.HTML) --- */
function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay resultados.</td></tr>';
        return;
    }

    data.forEach((song, index) => {
        const originalIndex = songs.indexOf(song);
        
        // Verificar si ya está en la lista para cambiar el botón
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

// Configuración del Modal de Notas
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
        // Llamamos a la nueva función centralizada
        btn.onclick = function() { filterByKey(key); };
        grid.appendChild(btn);
    });
}
window.onclick = function(event) {
    let keyModal = document.getElementById('keyModal');
    if (event.target == keyModal) keyModal.style.display = "none";
}

function shareApp() {
    if (navigator.share) {
        navigator.share({ title: 'Acordes Hathaway', url: window.location.href });
    } else {
        navigator.clipboard.writeText(window.location.href);
        // Alerta personalizada
        showNotification("¡Enlace de la app copiado!");
    }
}

/* --- Modal de notificación --- */
function showNotification(message) {
    const toast = document.getElementById("toastNotification");
    if (!toast) return; // Seguridad por si no pusiste el HTML

    toast.innerText = message;
    toast.className = "custom-notification show"; // Mostrar

    // Ocultar después de 3 segundos
    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}

/* --- PWA: LÓGICA DE INSTALACIÓN Y OFFLINE --- */

// 1. Registrar el Service Worker (Para que funcione Offline)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrado', reg))
            .catch(err => console.log('Error SW:', err));
    });
}

// 2. Lógica del Botón de Instalación
let deferredPrompt;
const installModal = document.getElementById('installAppModal');
const btnInstall = document.getElementById('btnInstall');
const btnCloseInstall = document.getElementById('btnCloseInstall');

// El navegador dispara este evento si la app NO está instalada y cumple requisitos
window.addEventListener('beforeinstallprompt', (e) => {
    // Evitamos que Chrome muestre su barrita automática fea
    e.preventDefault();
    // Guardamos el evento para dispararlo cuando queramos
    deferredPrompt = e;
    
    // Mostramos TU modal personalizado
    if(installModal) {
        installModal.classList.add('show');
        installModal.style.visibility = 'visible'; // Forzamos visibilidad
        installModal.style.display = 'flex';       // Aseguramos display
    }
});

if(btnInstall) {
    btnInstall.addEventListener('click', async () => {
        if (deferredPrompt) {
            // Mostramos el prompt nativo del sistema
            deferredPrompt.prompt();
            // Esperamos a ver qué decidió el usuario
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Usuario decidió: ${outcome}`);
            // Ya no sirve el evento, lo limpiamos
            deferredPrompt = null;
        }
        // Cerramos tu modal
        closeInstallModal();
    });
}

if(btnCloseInstall) {
    btnCloseInstall.addEventListener('click', () => {
        closeInstallModal();
    });
}

function closeInstallModal() {
    if(installModal) {
        installModal.classList.remove('show');
        setTimeout(() => {
            installModal.style.display = 'none';
        }, 500); // Esperar la transición
    }
}