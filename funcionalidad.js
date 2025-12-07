/* --- CONFIGURACIÓN MUSICAL --- */
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatMap = { "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#" };
const scaleSpanish = ["DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#", "LA", "LA#", "SI"];

/* --- ESTADO GLOBAL --- */
let displaySongs = []; 
let currentSongIndex = -1; 
let currentSemitones = 0; 
let isSpanish = false; 
let currentFontSize = 17;

/* --- INICIALIZACIÓN --- */
window.onload = function() {
    if (typeof songs !== 'undefined') {
        // Ordenar A-Z por defecto al cargar
        songs.sort((a, b) => a.title.localeCompare(b.title));
        
        displaySongs = [...songs];
        renderTable(displaySongs);
        generateKeyButtons();
    } else {
        alert("Error: No se cargó canciones.js");
    }
};

/* --- NUEVA LÓGICA DE FILTROS --- */

// Filtrar por Tipo (Alabanza / Adoración)
function filterByType(type) {
    // Filtrar
    displaySongs = songs.filter(s => s.type === type);
    
    // Y mantener orden A-Z dentro del filtro
    displaySongs.sort((a, b) => a.title.localeCompare(b.title));
    
    // Activar botón visualmente
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');

    renderTable(displaySongs);
}

// Reset (Vuelve a mostrar todo ordenado A-Z)
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    
    // Recargar todo y ordenar A-Z
    displaySongs = [...songs];
    displaySongs.sort((a, b) => a.title.localeCompare(b.title));
    
    renderTable(displaySongs);
}

// Ordenar (Solo quedó "Por Artista")
function sortSongs(criteria) {
    let sorted = [...displaySongs];
    
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');
    
    if (criteria === 'artist') {
        sorted.sort((a, b) => a.artist.localeCompare(b.artist));
    } 
    // Ya no necesitamos az/za porque es el default o por tipo
    
    renderTable(sorted);
}

/* --- (RESTO DEL CÓDIGO IGUAL: RenderTable, Search, Modals, Transpose...) --- */

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
window.onclick = function(event) {
    let keyModal = document.getElementById('keyModal');
    if (event.target == keyModal) keyModal.style.display = "none";
}
function shareApp() {
    if (navigator.share) navigator.share({ title: 'Acordes Hathaway', url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); alert("Enlace copiado!"); }
}