import mongoose from "mongoose";
const { Schema } = mongoose;

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    expires: {
      type: Date,
      require: true,
    },
    blacklisted: {
      type: Boolean,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", tokenSchema);

export default Token;
