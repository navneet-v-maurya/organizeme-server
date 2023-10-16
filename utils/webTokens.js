import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

export const generateRefreshToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

export const verifyAccessToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

export const verifyRefreshToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
