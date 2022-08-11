const authorizedUser = async (authorizationHeader, firebaseAuth) => {
  if(!authorizationHeader) {
    //eslint-disable-next-line no-throw-literal
    throw 'no authorization provided!';
  }

  const token = authorizationHeader.split(" ")[1]; //access JWT from authorizationHeader

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(token);

    return decodedToken;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  authorizedUser
};