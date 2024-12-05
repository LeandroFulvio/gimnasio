import express from 'express';
import Socio from '../model/socio.js';
import Class from '../model/class.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  try {
    const socios = await Socio.find()
      .populate('pays')
      .populate('enrolledClasses');
    res.json(socios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    const socio = await Socio.findById(req.params.id)
      .populate('pays')
      .populate('enrolledClasses');
    if (socio) {
      res.json(socio);
    } else {
      res.status(404).json({ message: 'Socio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST
router.post('/', async (req, res) => {
  const socio = new Socio({
    name: req.body.name,
    dni: req.body.dni,
    active: true
  });

  try {
    const newSocio = await socio.save();
    res.status(201).json(newSocio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT socio
router.put('/:id', async (req, res) => {
  try {
    const socio = await Socio.findById(req.params.id);
    if (socio) {
      socio.name = req.body.name || socio.name;
      socio.dni = req.body.dni || socio.dni;
      socio.active = req.body.active ?? socio.active;
      
      const updatedSocio = await socio.save();
      res.json(updatedSocio);
    } else {
      res.status(404).json({ message: 'Socio no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST inscribir a clase
router.post('/:socioId/enroll/:classId', async (req, res) => {
  try {
    const socio = await Socio.findById(req.params.socioId);
    const classItem = await Class.findById(req.params.classId);
    
    if (!socio) {
      return res.status(404).json({ message: 'Socio no encontrado' });
    }
    if (!classItem) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    // Check pago
    const activePay = await Pay.findOne({
      socioId: socio._id,
      status: 'active',
      endDate: { $gte: new Date() }
    });

    if (!activePay) {
      return res.status(400).json({ message: 'No se encontro pago activo' });
    }

    if (!socio.enrolledClasses.includes(classItem._id)) {
      socio.enrolledClasses.push(classItem._id);
      classItem.enrolledStudents.push(socio._id);
      
      await socio.save();
      await classItem.save();
    }

    res.json(socio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const socio = await Socio.findById(req.params.id);
    if (socio) {
      await socio.deleteOne();
      res.json({ message: 'Socio eliminado' });
    } else {
      res.status(404).json({ message: 'Socio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;