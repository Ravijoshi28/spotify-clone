import { User } from "../database/user.model.js";

export const callback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;


    await User.updateOne(
      { clerkId: id },          
      {
        $setOnInsert: {
          fullName: `${firstName} ${lastName}`,
          imageUrl
        }
      },
      { upsert: true }           
    );

    res.status(200).json({ message: "User has been registered..." });
  } catch (error) {
    console.log("Error at the callback function in auth controller", error);
    next(error);
  }
};
