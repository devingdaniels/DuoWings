import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    // Hash the password using bcrypt with a salt rounds value of 10
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
