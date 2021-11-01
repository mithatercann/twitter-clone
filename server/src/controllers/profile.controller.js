import Profile from "../models/profile.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// sign-up end point controller.
export const signUp = async (req, res) => {
  let { fname, lname, username, email, password } = req.body;

  const user = await Profile.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (user)
    return res
      .status(401)
      .json({ errors: [{ msg: "This user is already exist" }] });

  const profile = await Profile.create(req.body);
  const token = generateToken(profile._id);
  res.cookie("token", "hey", { maxAge: 86400000 });
  res.send({ ...profile._doc, token });
};

// sign-in end point controller.
export const signIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await Profile.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    res.cookie("token", "hey", { maxAge: 86400000 }, { httpOnly: true });
    res.status(200).send({ ...user._doc, token: token });
  } else {
    res.status(401).json({ errors: [{ msg: "Invalid credentials!" }] });
  }
};

export const follow = async (req, res) => {
  const { id, username } = req.query;
  const user = req.user;

  const profile = await Profile.findOne({
    $or: [{ username: username }, { _id: id }],
  });

  user.follow(profile);
  res.status(200).send(profile);
};

export const unfollow = async (req, res) => {
  const { id, username } = req.query;
  const user = req.user;
  const profile = await Profile.findOne({
    $or: [{ username: username }, { _id: id }],
  });

  user.unfollow(profile);
  res.send(200);
};

// get profiles
export const getProfile = (req, res) => {
  const { username, id } = req.query;
  if (username || id) {
    Profile.findOne(
      {
        $or: [{ username: username }, { _id: id }],
      },
      { password: 0 }
    )
      .then((result) => res.send(result))
      .catch((err) => res.status(err.code).json({ errors: [{ msg: err }] }));
  } else {
    Profile.find({}, { password: 0 })
      .then((result) => res.send(result))
      .catch((err) => res.status(err.code).json({ errors: [{ msg: err }] }));
  }
};
