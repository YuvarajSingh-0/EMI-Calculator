import {cookies} from 'next/headers'
import jwt from 'jsonwebtoken';

export async function GET(req) {
    const cookieStore = cookies();
    const token = cookieStore.get("outjwt");
    const secret = process.env.JWT_SECRET || "";
    try{
        if(token){
            const { email } = jwt.verify(token.value, secret);
            const response={
                email:email,
                isLoggedIn:true
            }
            return new Response(JSON.stringify(response));

        }
        return new Response(JSON.stringify({error:"no token",isLoggedIn:false}));
    }catch(e){
        console.log(e);
        return new Response(JSON.stringify({error:e,isLoggedIn:false}));
    }

}