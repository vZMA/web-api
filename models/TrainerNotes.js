import m from 'mongoose';
import softDelete from 'mongoose-delete';

const trainerNotesSchema = new m.Schema({
	description: String,
	content: String,
	tags: String,
	authorCid: Number,
	cid: Number
}, {
	collection: "trainerNotes",
	timestamps: true
});

trainerNotesSchema.plugin(softDelete, {
	deletedAt: true
});

trainerNotesSchema.virtual('author', { 
	ref: 'User',
	localField: 'authorCid',
	foreignField: 'cid',
	justOne: true
});

export default m.model('trainerNotes', trainerNotesSchema);