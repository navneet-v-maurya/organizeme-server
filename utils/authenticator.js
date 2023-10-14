import { verifyAccessToken, verifyRefreshToken } from "./webTokens.js";

const authenticator = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.headers["refresh-token"];

  if (!accessToken || !refreshToken) {
    return res.sendStatus(401);
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
      return res.sendStatus(403);
    }
  }
};

export default authenticator;
