// --- CONFIGURACIÓN DE FIREBASE PARA EL EDITOR ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCbvS4syteiVz4g7fWdDF-jvm1kv8QFtaU",
    authDomain: "acordify-live.firebaseapp.com",
    databaseURL: "https://acordify-live-default-rtdb.firebaseio.com",
    projectId: "acordify-live",
    storageBucket: "acordify-live.firebasestorage.app",
    messagingSenderId: "553273090812",
    appId: "1:553273090812:web:cc45175e08f90d6eb72d79"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let songSections = [];
let editingFirebaseId = null; 

window.showNotification = function(message) {
    const toast = document.getElementById("toastNotification");
    toast.innerText = message;
    toast.className = "custom-notification show"; 
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

// Navegación de Pestañas
window.switchTab = function(tabName) {
    document.querySelectorAll('.editor-view').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById('view-' + tabName).classList.add('active');
    document.getElementById('tab-' + tabName).classList.add('active');
    
    if(tabName === 'estructura') renderStructureView();
}

window.checkChanges = function() {
    const title = document.getElementById('songTitle').value.trim();
    const artist = document.getElementById('songArtist').value.trim();
    document.getElementById('btnSave').disabled = !(title && artist && songSections.length > 0);
}

// Gestión de Secciones (Contenido)
window.addSection = function() {
    const name = document.getElementById('sectionTypeSelector').value;
    const newSection = { id: Date.now(), name: name, text: "", multiplier: 1 };
    songSections.push(newSection);
    renderSections();
    checkChanges();
}

window.deleteSection = function(id) {
    songSections = songSections.filter(s => s.id !== id);
    renderSections();
    checkChanges();
}

window.updateSectionText = function(id, text) {
    const sec = songSections.find(s => s.id === id);
    if(sec) sec.text = text;
    checkChanges();
}

function renderSections() {
    const container = document.getElementById('sectionsContainer');
    container.innerHTML = '';
    songSections.forEach(sec => {
        const div = document.createElement('div');
        div.className = 'editor-section-card';
        div.innerHTML = `
            <div class="editor-section-header">
                <span class="editor-section-title">${sec.name}</span>
                <button class="btn-remove-sec" onclick="deleteSection(${sec.id})">🗑️</button>
            </div>
            <textarea class="editor-textarea" placeholder="Escribe la letra y acordes aquí..." oninput="updateSectionText(${sec.id}, this.value)">${sec.text}</textarea>
        `;
        container.appendChild(div);
    });
}

// Gestión de Multiplicadores (Estructura)
window.changeMultiplier = function(id, delta) {
    const sec = songSections.find(s => s.id === id);
    if(sec) {
        sec.multiplier += delta;
        if(sec.multiplier < 1) sec.multiplier = 1;
        renderStructureView();
        checkChanges();
    }
}

function renderStructureView() {
    const container = document.getElementById('structureContainer');
    container.innerHTML = '';
    if(songSections.length === 0) { container.innerHTML = '<p style="text-align:center;">No hay secciones creadas.</p>'; return; }
    
    songSections.forEach(sec => {
        const div = document.createElement('div');
        div.className = 'structure-row';
        div.innerHTML = `
            <span class="structure-name">${sec.name}</span>
            <div class="multiplier-controls">
                <button class="btn-mult" onclick="changeMultiplier(${sec.id}, -1)">-</button>
                <span class="mult-value">x${sec.multiplier}</span>
                <button class="btn-mult" onclick="changeMultiplier(${sec.id}, 1)">+</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// El Traductor de [A] a HTML
function parseToAcordifyHTML(rawText) {
    // Reemplaza [Acorde]resto_de_palabra por la estructura HTML
    return rawText.replace(/\[(.*?)\]([^\s.,;?!]*)([,;?!.]*)/g, '<span class="g"><span class="chord">$1</span>$2$3</span>');
}

window.saveSongToFirebase = async function() {
    document.getElementById('btnSave').innerText = "Guardando...";
    document.getElementById('btnSave').disabled = true;

    let finalContent = "";
    songSections.forEach(sec => {
        if(!sec.text.trim()) return;
        const parsedHtml = parseToAcordifyHTML(sec.text);
        const multTag = sec.multiplier > 1 ? ` [x${sec.multiplier}]` : "";
        finalContent += `\n[${sec.name}]${multTag}\n${parsedHtml}\n`;
    });

    const newSong = {
        title: document.getElementById('songTitle').value.trim(),
        artist: document.getElementById('songArtist').value.trim(),
        key: document.getElementById('songKey').value,
        type: document.getElementById('songType').value,
        tempo: document.getElementById('songTempo').value || "",
        content: finalContent,
        raw_sections: songSections // Guardamos la data cruda para poder editarla en el futuro
    };

    try {
        const songsRef = ref(db, 'custom_songs');
        if (editingFirebaseId) {
            await set(ref(db, `custom_songs/${editingFirebaseId}`), newSong);
            window.showNotification("Cambios guardados ☁️");
        } else {
            await push(songsRef, newSong);
            window.showNotification("Canción subida ☁️");
        }
        setTimeout(() => window.location.href = 'index.html', 1500);
    } catch (e) {
        console.error(e);
        alert("Error al guardar.");
        document.getElementById('btnSave').innerText = "Guardar";
        document.getElementById('btnSave').disabled = false;
    }
}

// Lógica para modo "Edición" si pasamos un ID por la URL
window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    if (editId) {
        editingFirebaseId = editId;
        const songRef = ref(db, `custom_songs/${editId}`);
        const snapshot = await get(songRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById('songTitle').value = data.title;
            document.getElementById('songArtist').value = data.artist;
            document.getElementById('songKey').value = data.key;
            document.getElementById('songType').value = data.type || 'Alabanza';
            document.getElementById('songTempo').value = data.tempo || '';
            songSections = data.raw_sections || [];
            renderSections();
            document.getElementById('btnSave').disabled = false;
        }
    }
}