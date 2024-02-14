import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    // Hash the password using bcrypt with a salt rounds value of 10
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
