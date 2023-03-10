if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Answers = require("./models/answers.js");
const passport = require('passport')
const cookieSession = require("cookie-session")
const passportStrategy = require("./passport");

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());


mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB not Connected");
  });

//   io = require('socket.io')(server,{
//     cors:{
//         origin:'*',
//     }
//   })

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Grootan Coding Task");
});

app.get("/auth/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

app.get("/auth/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

app.get("/auth/google", passport.authenticate("google", ["profile", "email"]));

app.get(
"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: 'http://localhost:3000/question',
		failureRedirect: "/login/failed",
	})
);

app.get("/auth/logout", (req, res) => {
	req.logout();
	res.redirect('http://localhost:3000/login');
});


app.post("/question/:id", async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    const answer = new Answers({ ...req.body, id });
    console.log(answer);
    await answer.save();
    res.status(200).json("Submitted Successfully");
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/response/:id", async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    const answer = await Answers.find({ id: id });
    // console.log(answer[0],"test");
    if (answer.length == 0) {
      res.status(200).json({ submitted: false });
      // console.log("ahi");
      return ;
    }
    res.status(200).json({ submitted: true });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`server is running on ${port}`)
);

//   io.on("connection",(socket)=>{
//     console.log("Socket connected", socket.id);
//     // socket.emit('submited', 'submitted successfully' );
//     socket.on("error", () => {});
//     socket.on('disconnect',() => {
//         console.log("not submited");
//       })
//   })
