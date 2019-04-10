import { Router, Request, Response } from "express";
import {User} from "../infrastructure/model/User";
import * as bcrypt from "bcryptjs";
import gravatar = require("gravatar");

const router = Router();

router.get("/test", (req: Request, res: Response) =>
  res.json({ msg: "User route works" })
);

router.post("/register", (req: Request, res: Response) => {
    const email: string = req.body.email;
    User.findOne({email})
        .then(user => {

            const avatar = gravatar.url(email, {
                s: '400',   //size
                r: "pg",    //rating
                d:"retro"   //default
            });
            
            if(user) {
                return res.status(400).json({email: `Email ${email} already exists`})
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(req.body.password, salt);
                const newUser = new User({
                    name: req.body.name,
                    email,
                    avatar,
                    password: hash
                })

                newUser.save().then((user) => {
                    return res.json(user)
                }, error => console.log(`Failed to create new User: ${error}`))
            }

        })
})

export default router;
