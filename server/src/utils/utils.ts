export default {
  dbURL: process.env.MONGODB_URI_LINK as string,
  secretKeyJWT: process.env.SECRET_KEY_JWT as string,
};
