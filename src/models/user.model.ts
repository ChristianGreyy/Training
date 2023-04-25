import mongoose from "mongoose";
const { Schema } = mongoose;
// import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      require: true,
    },
    pass_word: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    latest_rent_day: {
      type: Date,
      require: true,
    },
    books: [
      {
        book: {
          type: Schema.Types.ObjectId,
          ref: "Book",
        },
        start_time: {
          type: Date,
          require: true,
        },
        end_time: {
          type: Date,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
