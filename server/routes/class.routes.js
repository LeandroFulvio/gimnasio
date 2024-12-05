import express from 'express';
import Class from '../model/class.js';

const router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        const classes = await Class.find()
            .populate('enrolled');
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET by ID
router.get('/:id', async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id)
            .populate('enrolled');
        if (classItem) {
        res.json(classItem);
        } else {
        res.status(404).json({ message: 'Clase no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET socios a class
router.get('/:id/socios', async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id).populate('enrolled');
    if (classItem) {
        res.json(classItem.enrolled);
    } else {
        res.status(404).json({ message: 'Clase no encontrada' });
    }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST
router.post('/', async (req, res) => {
    const classItem = new Class({
        name: req.body.name,
        professor: req.body.professor,
        schedule: req.body.schedule,
        capacity: req.body.capacity,
        enrolled: []
    });

    try {
        const newClass = await classItem.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id);
        if (classItem) {
            classItem.name = req.body.name || classItem.name;
            classItem.professor = req.body.professor || classItem.professor;
            classItem.schedule = req.body.schedule || classItem.schedule;
            classItem.capacity = req.body.capacity || classItem.capacity;
            
            const updatedClass = await classItem.save();
            res.json(updatedClass);
        } else {
            res.status(404).json({ message: 'Clase no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (classItem) {
      await classItem.deleteOne();
      res.json({ message: 'Clase eliminada' });
    } else {
      res.status(404).json({ message: 'Clase no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;