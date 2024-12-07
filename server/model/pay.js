import mongoose from 'mongoose';

const paySchema = new mongoose.Schema({
    socioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Socio', required: true },
    type: {
      type: String,
      enum: ['Diario', 'Semanal', 'Quincenal', 'Mensual', 'Semestral', 'Anual'],
      required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'expired'], default: 'active' }
  }, { timestamps: true });

const Pay = mongoose.model('Pay', paySchema);

export default Pay;