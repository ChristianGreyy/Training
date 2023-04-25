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
      require: true,
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
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.pass_word = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);

export default User;
