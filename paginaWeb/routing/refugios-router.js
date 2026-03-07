const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const BASE_IMG_URL = 'http://192.168.1.132:3000/resources_refugio/img';

const realRefugios = [
    {
        id: '1',
        nombre: 'Refugio Frey',
        descripcion: 'Refugio ubicado a 1700 msnm en el Cerro Catedral, Bariloche. Ideal para escaladores y excursionistas. Cuenta con camas, cocina compartida y vistas espectaculares al lago y la cordillera.',
        contacto: 'refugiofrey@bariloche.com',
        altitud: '1700 msnm',
        capacidad: '60 personas',
        img: `${BASE_IMG_URL}/refugio-frey/refugio-frey-1.jpg`,
        img2: `${BASE_IMG_URL}/refugio-frey/refugio-frey-2.jpg`,
        img3: `${BASE_IMG_URL}/refugio-frey/refugio-frey-3.jpg`,
    },
    {
        id: '2',
        nombre: 'Refugio Jakob',
        descripcion: 'Refugio de montaña ubicado en el Valle del Rucaco a 1900 msnm. Punto de partida para ascensos al Cerro Negro y travesías hacia el Refugio Frey. Ambiente tranquilo rodeado de bosque nativo.',
        contacto: 'refugiojakob@bariloche.com',
        altitud: '1900 msnm',
        capacidad: '40 personas',
        img: `${BASE_IMG_URL}/refugio-jakob/refugio-jakob-1.jpg`,
        img2: `${BASE_IMG_URL}/refugio-jakob/refugio-jakob-2.jpg`,
        img3: `${BASE_IMG_URL}/refugio-jakob/refugio-jakob-3.jpg`,
    },
    {
        id: '3',
        nombre: 'Refugio Laguna Negra',
        descripcion: 'Refugio a orillas de la Laguna Negra a 1600 msnm. Rodeado de bosques de lenga y vistas panorámicas hacia los picos nevados. Muy frecuentado en temporada de verano por senderistas.',
        contacto: 'lagunanegra@montania.com',
        altitud: '1600 msnm',
        capacidad: '30 personas',
        img: `${BASE_IMG_URL}/refugio-laguna-negra/laguna-negra-refugio-1.jpg`,
        img2: `${BASE_IMG_URL}/refugio-laguna-negra/laguna-negra-refugio-2.jpg`,
        img3: `${BASE_IMG_URL}/refugio-laguna-negra/laguna-negra-refugio-3.jpg`,
    },
    {
        id: '4',
        nombre: 'Refugio López',
        descripcion: 'Uno de los refugios más accesibles de Bariloche, ubicado a 1628 msnm en el Cerro López. Ofrece vistas únicas al Lago Nahuel Huapi y los Andes. Punto de partida para la travesía de los Refugios.',
        contacto: 'refugiolopez@bariloche.com',
        altitud: '1628 msnm',
        capacidad: '50 personas',
        img: `${BASE_IMG_URL}/refugio-lopez/refugio-lopez-1.jpeg`,
        img2: `${BASE_IMG_URL}/refugio-lopez/refugio-lopez-2.jpeg`,
        img3: `${BASE_IMG_URL}/refugio-lopez/refugio-lopez-3.jpg`,
    },
];


const mockRefugios = [
    ...realRefugios,
    ...Array.from({ length: 46 }, (_, i) => ({
        id: (i + 5).toString(),
        nombre: `Refugio de Montaña ${i + 5}`,
        descripcion: `Refugio ubicado a ${2000 + i * 50}m de altitud. Ideal para excursiones largas y ascensos a cumbres. Cuenta con camas, cocina compartida y vistas panorámicas.`,
        contacto: `contacto${i + 5}@refugios.com`,
        altitud: `${2000 + i * 50} msnm`,
        capacidad: `${10 + (i % 20)} personas`,
        img: 'https://via.placeholder.com/400x200',
        img2: 'https://via.placeholder.com/400x200',
        img3: 'https://via.placeholder.com/400x200',
    })),
];


router.use('/', express.static('public'));
router.use('refugio', express.static('public/pagina-refugio'));
router.use('/resources-refugio', express.static('public/resources-refugio'));
router.use('css', express.static('public/css'));
router.use(express.json());

// ─── MOBILE APP ──────────────────────────────────────────────────────

// GET list (infinite scroll)
router.get('/api/refugios', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = mockRefugios.slice(startIndex, endIndex);
    res.json(results);
});

// GET refugio by ID
router.get('/api/refugios/:id', (req, res) => {
    const refugio = mockRefugios.find(r => r.id === req.params.id);
    if (!refugio) {
        return res.status(404).json({ error: 'Refugio no encontrado' });
    }
    res.json(refugio);
});

// POST create refugio
router.post('/api/refugios', (req, res) => {
    const { nombre, descripcion, contacto } = req.body;
    if (!nombre || !descripcion || !contacto) {
        return res.status(400).json({ error: 'Nombre, descripción y contacto son obligatorios' });
    }
    const newRefugio = {
        id: (mockRefugios.length + 1).toString(),
        nombre,
        descripcion,
        contacto,
        altitud: req.body.altitud || 'No especificada',
        capacidad: req.body.capacidad || 'No especificada',
        img: 'https://via.placeholder.com/400x200',
        img2: 'https://via.placeholder.com/400x200',
        img3: 'https://via.placeholder.com/400x200',
    };
    mockRefugios.push(newRefugio);
    res.status(201).json(newRefugio);
});

// ─── ROUTES ──────────────────────────────────────────────────────────────

router.get('/info-refugios', (req, res) => {
    return res.status(200).json(mockRefugios);
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/info_footer', (req, res) => {
    const footerPath = path.join(__dirname, '../public/pagina-refugio/info_footer.json');
    fs.readFile(footerPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error');
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
            idRefugio: refugio.id,
        });
    } else {
        res.status(404).send('Refugio no encontrado');
    }
});

router.post('/refugio/:id', (req, res) => {
    console.log('Web form data:', req.body);
    res.render('refugio', { id: req.params.id });
});

module.exports = router;
