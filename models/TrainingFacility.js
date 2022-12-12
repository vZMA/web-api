import m from 'mongoose';
import softDelete from 'mongoose-delete';

const trainingFacilitySchema = new m.Schema({
	facilityName: String
});

export default m.model('TrainingFacility', trainingFacilitySchema, 'trainingFacilities');