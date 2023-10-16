import { verifyAccessToken, verifyRefreshToken } from "./webTokens.js";

const authenticator = (req, res, next) => {
  const accessToken = req.headers["token"];
  const refreshToken = req.headers["refresh-token"];

  if (!accessToken || !refreshToken) {
    return res
      .status(401)
      .send({ message: "Failed to authenticate at lvl 1", status: 401 });
  }

  try {
    const decodedAccessToken = verifyAccessToken(accessToken);
    req.user = decodedAccessToken;
    next();
  } catch (error) {
    try {
      const decodedRefreshToken = verifyRefreshToken(refreshToken);
      req.user = decodedRefreshToken;
      next();
    } catch (error) {
      return res
        .status(401)
        .send({ message: "Failed to authenticate at lvl 1", status: 401 });
    }
  }
};

export default authenticator;
