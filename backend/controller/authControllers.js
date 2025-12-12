import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(password, salt);

    const userDoc = await User.create({
      name,
      email,
      password: hashedPass,
    });

    res.json(userDoc);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOK = await bcrypt.compare(password, userDoc.password);
      if (passOK) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtsecret,
          {},
          (error, token) => {
            if (error) throw error;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("error logging in");
      }
    } else {
      res.json("error logging ng");
    }
  } catch (error) {
    res.json(`Error while logging :\n${error}`);
  }
};

export const profile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtsecret, {}, async (error, userData) => {
      if (error) throw error;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "").json(true);
};
