import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
});

export const UserModel = mongoose.model("User", UserSchema);
