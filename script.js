const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY=process.env.SECRET_KEY;
const ENCRYPTION_KEY=Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const IV=Buffer.from(process.env.ENCRYPTION_IV, "hex");

const encrypt = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});

  const cipher = crypto.createCipheriv("aes-256-gcm", ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(token, "utf-8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return{
    content: encrypted,
    tag: authTag.toString("hex"),
  };
};

const decrypt = (token) => {
  const {content, tag} = token;
  const decipher = crypto.createDecipheriv("aes-256-gcm", ENCRYPTION_KEY, IV);
  decipher.setAuthTag(Buffer.from(tag, "hex"));

  let decrypted = decipher.update(content, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return jwt.verify(decrypted, SECRET_KEY);
};

module.exports = {encrypt, decrypt};