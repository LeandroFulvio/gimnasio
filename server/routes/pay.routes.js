import express from 'express';
import Pay from '../model/pay.js';
import Socio from '../model/socio.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  try {
    const payments = await Pay.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Pay.findById(req.params.id);
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: 'Pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET payments by socio
router.get('/socio/:socioId', async (req, res) => {
    try {
      const payments = await Pay.find({ socioId: req.params.socioId });
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

//Valida que socio tenga pago activo
router.get('/validate/:socioId', async (req, res) => {
  try {
    const now = new Date();
    const activePay = await Pay.findOne({
      socioId: req.params.socioId,
      status: 'active',
      startDate: { $lte: now },
      endDate: { $gte: now }
    });

    res.json({isValid: !!activePay});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST 
router.post('/', async (req, res) => {
    const pay = new Pay({
        socioId: req.body.socioId,
        amount: req.body.amount,
        type: req.body.type,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: 'active'
    });

    try {
        const newPay = await pay.save();
        const socio = await Socio.findById(req.body.socioId);
        socio.pays.push(newPay._id);
        await socio.save();
        
        res.status(201).json(newPay);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT 
router.put('/:id', async (req, res) => {
  try {
    const payment = await Pay.findById(req.params.id);
    if (payment) {
      payment.name = req.body.name || payment.name;
      payment.type = req.body.type || payment.type;
      payment.date = req.body.date || payment.date;
      
      const updatedPayment = await payment.save();
      res.json(updatedPayment);
    } else {
      res.status(404).json({ message: 'Pago no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const payment = await Pay.findById(req.params.id);
    if (payment) {
      await payment.deleteOne();
      res.json({ message: 'Pago eliminado' });
    } else {
      res.status(404).json({ message: 'Pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;