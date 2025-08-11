import { hash, compare, verify } from "bcryptjs";
import { sign } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const generateToken = (data) => {
  const token = sign({ ...data }, process.env.privateKey, { expiresIn: "24h" });
  return token;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

const verifyToken = (token) => {
  try {
    const validateResult = jwt.verify(token, process.env.privateKey);
    return validateResult;
  } catch (error) {
    console.log("verify token =>", error);
    return false;
  }
};

export { hashPassword, generateToken, verifyPassword, verifyToken };
