const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Mock data 
let mockRefugios = Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString(),
    nombre: `Refugio de Montaña ${i + 1}`,
    descripcion: `Refugio ubicado a ${2000 + i * 50}m de altitud. Ideal para excursiones largas y ascensos a cumbres. Cuenta con camas, cocina compartida y vistas panorámicas.`,
    contacto: `contacto${i + 1}@refugios.com`,
    altitud: `${2000 + i * 50} msnm`,
    capacidad: `${10 + (i % 20)} personas`,
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

// ─── API FOR MOBILE APP ──────────────────────────────────────────────────────

// GET lista (infinite scroll)
router.get('/api/refugios', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = mockRefugios.slice(startIndex, endIndex);
    res.json(results);
});

// GET refugio por ID
router.get('/api/refugios/:id', (req, res) => {
    const refugio = mockRefugios.find(r => r.id === req.params.id);
    if (!refugio) {
        return res.status(404).json({ error: 'Refugio no encontrado' });
    }
    res.json(refugio);
});

// POST create refugio
router.post('/api/refugios', (req, res) => {
    const { nombre, descripcion, contacto, altitud, capacidad } = req.body;

    if (!nombre || !descripcion || !contacto) {
        return res.status(400).json({ error: 'Nombre, descripción y contacto son obligatorios' });
    }

    const newRefugio = {
        id: (mockRefugios.length + 1).toString(),
        nombre,
        descripcion,
        contacto,
        altitud: altitud || 'No especificada',
        capacidad: capacidad || 'No especificada',
        img: "https://via.placeholder.com/150",
        img2: "https://via.placeholder.com/150",
        img3: "https://via.placeholder.com/150"
    };

    mockRefugios.push(newRefugio);
    console.log(`Nuevo refugio creado: ${newRefugio.nombre}`);
    res.status(201).json(newRefugio);
});

// ─── WEB ROUTES ──────────────────────────────────────────────────────────────

router.get("/info-refugios", (req, res) => {
    return res.status(200).json(mockRefugios);
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/info_footer', (req, res) => {
    const footerPath = path.join(__dirname, '../public/pagina-refugio/info_footer.json');
    fs.readFile(footerPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error");
        res.send(data);
    });
});

router.get('/refugio/:id', (req, res) => {
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
    console.log("Web form data:", req.body);
    res.render('refugio', { id: req.params.id });
});

module.exports = router;
