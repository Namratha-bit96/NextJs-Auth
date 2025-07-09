import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
    
    try {

        const token= request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET!);
        if (typeof decodedToken === 'object' && decodedToken !== null && 'id' in decodedToken) {
            return (decodedToken as { id: string }).id;
        }
        throw new Error('Invalid token');
    } catch (error: unknown) {
        let message = 'Unknown error';
        if (error instanceof Error) {
            message = error.message;
        }
        throw new Error(message);
    }
}