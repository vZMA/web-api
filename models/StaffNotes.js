import m from 'mongoose';
import softDelete from 'mongoose-delete';

const staffNotesSchema = new m.Schema({
	description: String,
	content: String,
	tags: String,
	authorCid: Number,
	cid: Number
}, {
	collection: "staffNotes",
	timestamps: true
});

staffNotesSchema.plugin(softDelete, {
	deletedAt: true
});

staffNotesSchema.virtual('author', {
	ref: 'User',
	localField: 'authorCid',
	foreignField: 'cid',
	justOne: true
});

export default m.model('staffNotes', staffNotesSchema);