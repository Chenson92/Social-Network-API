const { User, Thought } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get a single user
  async getSingleUser(req, res) {
    //res.json({ debug: req.params.userId });
    //try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v");

    if (!user) {
      return res.status(404).json({ message: "No user with that ID" });
    }

    res.json(user);
    //} catch (err) {
    //  res.status(500).json(err);
    //}
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update an user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        {
          new: true,
        }
      );

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete an user
  async deleteUser(req, res) {
    try {
      const dlUser = await User.findOneAndDelete({ _id: req.params.userId });

      if (!dlUser) {
        return res.status(404).json({ message: "No such user exists" });
      }
      res.json(dlUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to an user
  async addFriend(req, res) {
    console.log("You are adding a friend");
    // console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } }, // set is in math/programming: unique values array
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete friend from a student
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }, // push can add duplicates
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
