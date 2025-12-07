/* --- CONFIGURACIÓN MUSICAL --- */
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatMap = { "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#" };

// Diccionario de traducción
const scaleSpanish = ["DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#", "LA", "LA#", "SI"];

/* --- ESTADO GLOBAL --- */
let displaySongs = []; 
let currentSongIndex = -1; // Índice de la canción actual
let currentSemitones = 0;  // Cuánto hemos transpuesto (0 es original)
let isSpanish = false;     // Estado del cifrado
let currentFontSize = 17;  // Tamaño de letra base

/* --- INICIALIZACIÓN --- */
window.onload = function() {
    if (typeof songs !== 'undefined') {
        displaySongs = [...songs];
        renderTable(displaySongs);
        generateKeyButtons();
    } else {
        alert("Error: No se cargó canciones.js. Asegúrate de que el archivo existe y está vinculado antes de este script.");
    }
};

/* --- NAVEGACIÓN --- */
function goHome() {
    document.getElementById('songListView').style.display = 'block';
    document.getElementById('songDetailView').style.display = 'none';
    closeAllModals();
    window.scrollTo(0,0);
}

function openSong(indexInGlobalArray) {
    currentSongIndex = indexInGlobalArray;
    const song = songs[currentSongIndex];
    
    // Resetear estados al abrir nueva canción
    currentSemitones = 0;
    // Mantenemos isSpanish y fontSize como preferencia del usuario

    document.getElementById('songListView').style.display = 'none';
    document.getElementById('songDetailView').style.display = 'block';

    document.getElementById('detailTitle').innerText = song.title;
    document.getElementById('detailArtist').innerText = song.artist;
    
    // Renderizar la canción con los ajustes actuales
    updateSongView();
    
    window.scrollTo(0,0);
}

/* --- LÓGICA DE RENDERIZADO (CORAZÓN DEL SISTEMA) --- */
function updateSongView() {
    if (currentSongIndex === -1) return;

    const songOriginal = songs[currentSongIndex].content;
    
    // Creamos un elemento temporal para manipular el HTML string
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
    
    // 1. Normalizar a sostenidos (English)
    if (flatMap[root]) root = flatMap[root];

    // 2. Encontrar índice
    let index = scale.indexOf(root);
    if (index !== -1) {
        // 3. Aplicar Transposición Matemática
        let newIndex = (index + currentSemitones + scale.length) % scale.length;
        // Asegurar que el módulo maneje números negativos grandes correctamente
        newIndex = (newIndex + scale.length) % scale.length;

        // 4. Decidir si devolvemos Inglés o Español
        let finalNote = isSpanish ? scaleSpanish[newIndex] : scale[newIndex];
        
        return finalNote + suffix;
    }
    return noteStr;
}

/* --- FUNCIONES DE BOTONES CIRCULARES --- */

// 1. Tono
function applyTranspose(amount) {
    currentSemitones += amount;
    updateSongView();
}

function resetTranspose() {
    currentSemitones = 0;
    updateSongView();
    closeAllModals();
}

// 2. Notación (Cifrado)
function toggleNotation() {
    isSpanish = !isSpanish; // Invierte el valor (true/false)
    updateSongView();
}

// 3. Formato
function changeFontSize(amount) {
    currentFontSize += amount;
    if (currentFontSize < 10) currentFontSize = 10; // Límite mínimo
    if (currentFontSize > 40) currentFontSize = 40; // Límite máximo (Aumentado un poco por si acaso)
    updateSongView();
}

/* --- GESTIÓN DE MODALES --- */
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modalOverlay');
    
    // Si ya está abierto, lo cerramos
    if (modal.classList.contains('active')) {
        closeAllModals();
    } else {
        // Cerramos otros primero
        closeAllModals();
        modal.classList.add('active'); // Usamos la clase active que definimos en CSS
        modal.style.display = 'flex';  // Aseguramos display
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

/* --- TABLA, FILTROS Y BÚSQUEDA --- */

function filterByArtist(artistName) {
    document.getElementById('searchInput').value = artistName;
    filterSongs();
    event.stopPropagation();
}

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
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

function filterSongs() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    displaySongs = songs.filter(s => 
        s.title.toLowerCase().includes(query) || 
        s.artist.toLowerCase().includes(query)
    );
    renderTable(displaySongs);
}

function sortSongs(criteria) {
    let sorted = [...displaySongs];
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');
    
    if (criteria === 'az') sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (criteria === 'za') sorted.sort((a, b) => b.title.localeCompare(a.title));
    else if (criteria === 'artist') sorted.sort((a, b) => a.artist.localeCompare(b.artist));
    
    renderTable(sorted);
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    displaySongs = [...songs];
    renderTable(displaySongs);
}

/* --- LOGICA MODAL FILTRO NOTAS (Grande) --- */
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

function filterByKey(selectedKey) {
    displaySongs = songs.filter(s => s.key === selectedKey);
    renderTable(displaySongs);
    closeKeyModal();
}

// Cierre global de modales al hacer clic afuera
window.onclick = function(event) {
    // Para el modal grande de notas
    let keyModal = document.getElementById('keyModal');
    if (event.target == keyModal) keyModal.style.display = "none";
}

/* --- COMPARTIR --- */
function shareApp() {
    if (navigator.share) navigator.share({ title: 'Acordes Hathaway', url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); alert("Enlace copiado!"); }
}