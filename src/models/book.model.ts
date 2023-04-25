import mongoose from "mongoose";
const { Schema } = mongoose;
// import bcrypt from "bcryptjs";

const bookSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      enum: ["action", "love", "knowledge", "detective"],
    },
    description: {
      type: String,
      require: true,
    },
    outdated: {
      type: Date,
      reuqie: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
