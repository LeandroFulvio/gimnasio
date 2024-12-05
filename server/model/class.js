import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    professor: { type: String, required: true },
    schedule: { type: String, required: true },
    capacity: { type: Number, required: true },
    enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Socio' }]
  }, { timestamps: true } );

const Class = mongoose.model('Class', classSchema);

export default Class;