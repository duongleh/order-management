const CONSTANTS = require("../constants");
const axios = require("axios");

let userId;
let sessionId;

module.exports.auth = async (req, res) => {
  let user;
  let checkSession;
  if (userId && sessionId) {
    try {
      checkSession = await axios.get(
        `http://secure-mountain-93147.herokuapp.com/api/getsession/${sessionId}`
      );
      if (checkSession.data === "no") {
        userId = null;
        sessionId = null;
        return res.status(200).json({ success: false });
      }
      user = await axios.get(`${CONSTANTS.ENDPOINT.USER}/user/${userId}`);
    } catch (error) {
      console.log(error.response.data);
    }
    res.status(200).json({ success: true, data: user.data });
  } else return res.status(200).json({ success: false });
};

module.exports.set = (req, res) => {
  // http://secure-mountain-93147.herokuapp.com/requirelogin?url=http://localhost:3000/auth
  userId = req.query.user_id;
  sessionId = req.query.session_id;
  res.redirect("/");
};

module.exports.destroy = (req, res) => {
  // http://secure-mountain-93147.herokuapp.com/logout?url=http://localhost:3000/auth
  userId = null;
  sessionId = null;
  res.redirect("/");
};
