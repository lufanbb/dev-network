import { Router, Request, Response } from "express";
import { UserModel, User } from "../infrastructure";
import * as bcrypt from "bcryptjs";
import gravatar = require("gravatar");
import * as jwt from "jsonwebtoken";
import config = require("../../../config/keys");
import passport = require("passport");
import { JWTPayload } from "../../common/authentication";
import {
  validateLogin,
  validateRegistration,
  UserValidationError
} from "../business";

const router = Router();
/**
 * @route       : /api/user/register
 * @description : Register a user with email and password
 * @access      : public
 */
router.post("/register", (req: Request, res: Response) => {
  const { errors, isValid }: UserValidationError = validateRegistration(
    req.body
  );

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email: string = req.body.email;
  UserModel.findOne({ email }).then(user => {
    const avatar = gravatar.url(email, {
      s: "400", //size
      r: "pg", //rating
      d: "retro" //default
    });

    if (user) {
      return res.status(400).json({ email: `Email ${email} already exists` });
    } else {
      const newUser: User = new UserModel({
        name: req.body.name,
        email,
        avatar,
        password: req.body.password
      });
      bcrypt
        .genSalt(10)
        .then(salt => {
          return bcrypt.hash(newUser.password, salt);
        })
        .then(hashedPassword => {
          newUser.password = hashedPassword;
          return newUser.save().then(
            user => {
              return res.json(user);
            },
            error => console.log(`Failed to create new User: ${error}`)
          );
        });
    }
  });
});

/**
 * @route       : /api/user/login
 * @description : User login by email and password
 * @access      : public
 */
router.post("/login", (req: Request, res: Response) => {
  const { errors, isValid }: UserValidationError = validateLogin(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const email: User["email"] = req.body.email;
  const password: User["password"] = req.body.password;

  UserModel.findOne({ email }).then((user: User) => {
    if (!user) {
      errors.email = `User with email ${email} not found!`;
      return res.status(404).json(errors);
    } else {
      bcrypt.compare(password, user.password).then(isValidPassword => {
        if (isValidPassword) {
          const jwtPayload: JWTPayload = {
            id: user._id,
            email: user.email,
            avatar: user.avatar
          };
          const secret = config.jwtTokenSecret;
          jwt.sign(jwtPayload, secret, { expiresIn: "1h" }, (error, token) => {
            if (error) {
              errors.password = `Error creating token ${error}`;
              return res.status(500).json(errors);
            }
            return res.json({ success: true, token: `Bearer ${token}` });
          });
        } else {
          errors.password = "Password is not valid";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

/**
 * @route       : /api/user/current
 * @description : Get current user by jwt token
 * @access      : private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
);

export default router;
