import { verifyToken } from "../utils/jwt.js";

export const authRequired = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { authorization } = req.headers;

    console.log({ token });
    console.log({ authorization });

    if (!authorization && !token) {
      return res
        .status(401)
        .json({ message: "no token, authorization denied" });
    }

    const dataToken = await verifyToken(token || authorization);

    if (!dataToken) {
      return res
        .status(401)
        .json({ message: "token invalid, authorization denied" });
    }

    req.user = dataToken;
    next();
  } catch (error) {
    res.status(501).json(error);
  }
};
