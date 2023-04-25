const createUser = async (userBody: any) => {
  return User.create(userBody);
};

const getUserById = async (userId: string) => {
  return await User.findById(userId);
};
