import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
  street: { type: String, required: [true, "Please enter your street address"], },
  city: { type: String, required: [true, "Please enter your city"], },
  state: { type: String, required: [true, "Please enter your state"], },
  phoneNumber: { type: String, required: [true, "Please enter your phone number"], },
  zipCode: { type: String, required: [true, "Please enter your zip code"], },
  country: { type: String, required: [true, "Please enter your country"], },
  createdAt: { type: Date, default: Date.now, },
});

export default mongoose.models.Address || mongoose.model("Address", addressSchema);