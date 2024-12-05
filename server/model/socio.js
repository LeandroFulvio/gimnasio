import mongoose from 'mongoose';

const socioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dni: { type: Number, required: true, index: true },
  active: { type: Boolean, default: true },
  pays: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pay' }],
  enrolledClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
}, { timestamps: true });

const Socio = mongoose.model('Socio', socioSchema);

export default Socio;