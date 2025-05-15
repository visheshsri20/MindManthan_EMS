const userRegister = async () => {
    connectDB();
    try {
      const existingUser = await User.findOne({ email: "admin@gmail.com" });
      if (existingUser) {
        console.log("Admin user already exists");
        return;
      }
  
      const hashPassword = await bcrypt.hash("admin", 10);
      const newUser = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashPassword,
        role: "admin",
      });
      await newUser.save();
      console.log("Admin user created successfully");
    } catch (error) {
      console.log(error);
    }
  };