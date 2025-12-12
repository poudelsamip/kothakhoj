import jwt from "jsonwebtoken";

export function getUserData(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) return reject(err);
      resolve(userData);
    });
  });
}
