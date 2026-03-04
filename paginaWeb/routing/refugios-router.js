
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// --- DATABASE REMOVED ---
// const database = require('../public/iniciarDB'); 

// 1. MOCK DATA (This replaces your Database for all routes)
const mockRefugios = Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString(),
    nombre: `Refugio Lab ${i + 1}`,
    descripcion: `Este es el refugio número ${i + 1}. Es un espacio dedicado al cuidado y protección, parte del proyecto AppLab Programación.`,
    contacto: `contacto${i + 1}@applab.com`,
    img: "https://via.placeholder.com/150",
    img2: "https://via.placeholder.com/150",
    img3: "https://via.placeholder.com/150"
}));

// Static files
router.use('/', express.static('public'));
router.use('refugio', express.static('public/pagina-refugio'));
router.use('resources-refugio', express.static('public/resources-refugio'));
router.use('css', express.static('public/css'));
router.use(express.json());

// --- API FOR MOBILE APP (Infinite Scroll) ---
router.get('/api/refugios', (req, res) => {
    console.log("--- Mobile app requesting Mock Data ---");
    const page = parseInt(req.query.page) || 1;
    const limit = 10; 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = mockRefugios.slice(startIndex, endIndex);
    res.json(results);
});

// --- UPDATED WEB ROUTES (Now using Mock Data) ---

router.get("/info-refugios", (req, res) => {
    // Returns the whole list to the web page
    return res.status(200).json(mockRefugios);
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/info_footer', (req, res) => {
    // Fixed the hardcoded path to be relative
    const footerPath = path.join(__dirname, '../public/pagina-refugio/info_footer.json');
    fs.readFile(footerPath, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading footer JSON");
            return res.status(500).send("Error");
        }
        res.send(data);
    });
});

router.get('/refugio/:id', (req, res) => {
    // Find the refugio in our fake array instead of the DB
    const refugio = mockRefugios.find(r => r.id === req.params.id);
    
    if (refugio) {
        res.render('refugio', {
            img1: refugio.img,
            img2: refugio.img2,
            img3: refugio.img3,
            idRefugio: refugio.id
        });
    } else {
        res.status(404).send("Refugio no encontrado");
    }
});

router.post('/refugio/:id', (req, res) => {
    // Simulates a successful save
    console.log("Mock: Data received from form:", req.body);
    res.render('refugio', { id: req.params.id });
});

module.exports = router;