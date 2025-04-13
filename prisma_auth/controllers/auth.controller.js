import { PrismaClient } from "@prisma/client/extension"

const prisma = new PrismaClient();

const registerUser = async (req,res) => {
     console.log('User Registered')
     await prisma.user.findUnique({
          where: {email}
     })
};



export {registerUser,
     
}