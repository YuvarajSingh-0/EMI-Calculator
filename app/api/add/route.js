import { sql } from '@vercel/postgres'
import {cookies} from 'next/headers'
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const cookieStore = cookies();
    const token = cookieStore.get("outjwt");
    const secret = process.env.JWT_SECRET || "";
    const { username } = jwt.verify(token.value, secret);
    await sql`CREATE TABLE IF NOT EXISTS estimates(estimate_id SERIAL PRIMARY KEY, username TEXT NOT NULL,loanAmount NUMERIC NOT NULL,tenure NUMERIC NOT NULL,rateOfInterest NUMERIC NOT NULL,emi NUMERIC NOT NULL,totalAmount NUMERIC NOT NULL,totalInterest NUMERIC NOT NULL)`;
    const body = await req.json();
    const res = await sql`INSERT INTO estimates (username,loanAmount,tenure,rateOfInterest,emi,totalAmount,totalInterest) VALUES (${username},${body.loanAmount},${body.tenure},${body.rateOfInterest},${body.emi},${body.totalAmount},${body.totalInterest}) RETURNING *`;
    return new Response(JSON.stringify(res.rows));
}

