import {sql} from '@vercel/postgres'

export async function POST(req) {
    await sql`CREATE TABLE IF NOT EXISTS USERS( user_id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)`;
    const body = await req.json();
    const { email, password } = body;
    // console.log(username,password);
    const res = await sql`INSERT INTO USERS( email,password) VALUES(${email},${password}) RETURNING *`;
    return new Response(JSON.stringify(res.rows));
}