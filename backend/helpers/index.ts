import bcrypt from "bcryptjs";

const hashPassword = async (password: string): Promise<string> => {
  try {
    // Hash the password using bcrypt with a salt rounds value of 10
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const helpers = {
  hashPassword,
};

export default helpers;
