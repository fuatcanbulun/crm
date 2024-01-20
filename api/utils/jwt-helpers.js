import jwt from "jsonwebtoken";

//Generate an access token and a refresh token for this database user
function jwtTokens({ id, email }) {
  const user = { id, email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "43200s",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "43200",
  });
  return { accessToken, refreshToken };
}

export { jwtTokens };
