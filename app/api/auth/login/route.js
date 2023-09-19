import {sql} from '@vercel/postgres'
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
const MAX_AGE=60*60*24*7;
export async function POST(req){
    await sql`CREATE TABLE IF NOT EXISTS USERS( user_id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)`;
    const body=await req.json();
    const {email,password}=body;
    // console.log(username,password);
    const res=await sql`SELECT * FROM USERS WHERE email=${email} AND password=${password}`;
    if(res.rows.length==0){
        return new Response(JSON.stringify({message:"Invalid username or password"}),{
            status:401,
        });
    }

    const secret=process.env.JWT_SECRET || "";
    const token=jwt.sign({email},secret,{expiresIn:MAX_AGE});
    const serialized=serialize("outjwt",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        path:"/"
    })
    return new Response(JSON.stringify({message:"Login successful"}),{
        status:200,
        headers:{
            "Set-Cookie":serialized
        },

    })
}