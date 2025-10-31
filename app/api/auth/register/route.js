import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import { hashPassword, generateToken } from "@/lib/auth"

export async function POST(req) {
  try {
    console.log("Starting registration process...")
    
    // Connect to database
    await connectDB()
    console.log("Database connected successfully")

    const { name, email, password, confirmPassword } = await req.json()
    console.log("Request data received:", { name, email, hasPassword: !!password, hasConfirmPassword: !!confirmPassword })

    if (!name || !email || !password || !confirmPassword) {
      return Response.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return Response.json({ error: "Passwords do not match" }, { status: 400 })
    }

    console.log("Checking for existing user...")
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json({ error: "Email already registered" }, { status: 400 })
    }

    console.log("Hashing password...")
    const hashedPassword = await hashPassword(password)

    console.log("Creating new user...")
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()
    console.log("User saved successfully")

    const token = generateToken(user._id.toString())
    console.log("Token generated successfully")

    return Response.json(
      {
        message: "User registered successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return Response.json({ 
      error: "Registration failed", 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    }, { status: 500 })
  }
}
