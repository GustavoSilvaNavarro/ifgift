import UserModel from '../schemas/user-schemas';

export const retrieveAllUsers = async () => {
  const allUsers = await UserModel.find({});

  return allUsers;
};
