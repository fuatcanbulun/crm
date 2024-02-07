import jwt from "jsonwebtoken";

//Generate an access token and a refresh token for this database user
function jwtTokens({ id, email, first_name, last_name }) {
  const user = { id, email, first_name, last_name };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10000000",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10000000",
  });
  return { accessToken, refreshToken };
}

export { jwtTokens };
