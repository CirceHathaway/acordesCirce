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

/* --- INICIALIZACIÓN --- */
window.onload = function() {
    if (typeof songs !== 'undefined') {
        applyGlobalFilters(); // Carga inicial con orden A-Z
        generateKeyButtons();
    } else {
        alert("Error: No se cargó canciones.js");
    }
};

/* --- NUEVA LÓGICA DE FILTROS COMBINADOS --- */

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
    document.getElementById('songListView').style.display = 'block';
    document.getElementById('songDetailView').style.display = 'none';
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

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px;">No se encontraron canciones con estos filtros.</td></tr>';
        return;
    }

    data.forEach((song, index) => {
        const originalIndex = songs.indexOf(song);
        let row = `
            <tr>
                <td class="index-col">${index + 1}</td>
                <td class="song-title" onclick="openSong(${originalIndex})">${song.title}</td>
                <td><span style="background:#333; color: #ffda93; padding:2px 8px; border-radius:4px; font-weight:bold;">${song.key}</span></td>
                <td><span class="artist-link" onclick="filterByArtist('${song.artist}')">${song.artist}</span></td>
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
    if (navigator.share) navigator.share({ title: 'Acordes Hathaway', url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); alert("Enlace copiado!"); }
}