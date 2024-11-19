import { Request, Response } from "express";
import Users from "./../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateJWT } from "../helpers/GenerateJWT";
import mongoose from "mongoose";

const createUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    const existingUserByEmail = await Users.findOne({ email });
    const existingUserByUsername = await Users.findOne({ username });

    if (String(username).trim().length <= 2) {
      return res.status(401).json({
        ok: false,
        msg: "Username has less of 3 characters !!"
      });
    }

    if (existingUserByUsername) {
      return res.status(400).json({
        ok: false,
        msg: "Username exists in database!!!!",
      });
    }

    if (existingUserByEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Email exists!!!!",
      });
    }

    const bcryptSalts = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, bcryptSalts);

    const dbUser = new Users({ ...req.body, password: hashedPassword, status: true });

    await dbUser.save();

    return res.status(200).json({
      ok: true,
      msg: "User created successfully",
      _idUser: dbUser.id,
      email: dbUser.email,
    });
  } catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).json({
      ok: false,
      msg: "Error to create a new user!!!!",
      error: err.message || err
    });
  }
};


const loginUsers = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const dbUser = await Users.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "User not found!!!",
      });
    }

    const validPassword = await bcrypt.compare(password, dbUser.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    const token = await generateJWT(dbUser._id, dbUser.email);

    return res.status(200).json({
      ok: true,
      msg: "Welcome User to the System",
      _id: dbUser.id,
      email: dbUser.email,
      name: dbUser.username,
      token
    });

  } catch (err) {
    console.error("Error during login:", err);
    if (!res.headersSent) {
      return res.status(500).json({
        ok: false,
        msg: "Error logging in",
        error: err.message || err,
      });
    }
  }
};


const getUsersById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const resp = await Users.findById(id);
    if (!resp) {
      return res.status(404).json({ ok: false, msg: "User not found!!!" });
    }
    return res.status(200).json({ msg: resp });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};


const getUsersByEmail = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.params;
  try {
    const resp = await Users.find({ email });
    return res.status(200).json({ ...resp });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};


const getUsersByStatus = async (req: Request, res: Response): Promise<Response> => {
  const { status } = req.params;
  try {
    const resp = await Users.find({ status });
    return res.status(200).json({ msg: resp });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};


const getUsersByUsername = async (req: Request, res: Response): Promise<Response> => {
  const { username } = req.params;
  try {
    const resp = await Users.find({ username });
    return res.status(200).json({ msg: resp });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};


const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, msg: err.message });
  }
};


const updateUsers = async (req: Request, res: Response): Promise<Response> => {
  const { email, username, password } = req.body;

  try {
    const dbUser = await Users.findById(req.params.id);

    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: "User not found!!!",
      });
    }

    const existingUserByEmail = await Users.findOne({ email });
    const existingUserByUsername = await Users.findOne({ username });

    if (existingUserByUsername) {
      return res.status(400).json({
        ok: false,
        msg: "User exists in Database!!!!",
      });
    }

    if (existingUserByEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Email registred in database!!!!",
      });
    }

    const bcryptSalts = bcrypt.genSaltSync(10);
    dbUser.username = username;
    dbUser.email = email;
    dbUser.password = bcrypt.hashSync(password, bcryptSalts);

    const token = generateJWT(dbUser.id, dbUser.email);

    await dbUser.save();

    return res.status(200).json({
      ok: true,
      msg: "User updated!!!",
      dbUser,
      token,
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      msg: "User not updated",
    });
  }
};


const deleteUsers = async (req: Request, res: Response): Promise<Response> => {
  const { idUser } = req.body;

  try {
    const dbUser = await Users.findById(idUser);
    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: "User not found!!!",
      });
    }

    dbUser.status = false;
    await dbUser.save();

    return res.status(200).json({
      ok: true,
      msg: "User deleted!!!!",
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      msg: "User not deleted!!!",
    });
  }
};


export {
  createUsers,
  loginUsers,
  getUsers,
  updateUsers,
  deleteUsers,
  getUsersById,
  getUsersByEmail,
  getUsersByUsername,
  getUsersByStatus,
};
