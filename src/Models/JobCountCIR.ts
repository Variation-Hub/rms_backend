import mongoose from 'mongoose';

const CounterSchemaCIR = new mongoose.Schema({
    seq: { type: Number, default: 0 }
});

export default mongoose.model('CounterCIR', CounterSchemaCIR);