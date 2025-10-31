import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required")
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(req) {
  // Support both Next.js/Fetch Request headers (Headers.get)
  // and Node/Express style objects (req.headers.authorization)
  let authHeader = null

  if (req && req.headers) {
    // If headers is a Headers instance (Next.js Request), use .get
    if (typeof req.headers.get === "function") {
      authHeader = req.headers.get("authorization")
    } else if (typeof req.headers.authorization === "string") {
      authHeader = req.headers.authorization
    } else if (req.headers["authorization"]) {
      authHeader = req.headers["authorization"]
    }
  }

  if (!authHeader) return null

  const parts = authHeader.split(" ")
  if (parts.length !== 2 || parts[0] !== "Bearer") return null

  return parts[1]
}
