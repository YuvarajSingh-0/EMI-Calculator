import { cookies } from "next/headers";
export async function GET(req, res) {
    const cookieStore = cookies();
    // const token = cookieStore.get("outjwt");
    // const token = jwt.sign({ email }, secret, { expiresIn: -1 });
    cookies().delete('outjwt');
    return new Response(JSON.stringify({ lol: "asa" }));
}

// export async function handler(req, res) {
//     const { method } = req;
//     switch (method) {
//         case "GET":
//             return await GET(req, res);
//         case "POST":
//             return await POST(req, res);
//         case "PUT":
//             return await PUT(req, res);
//         case "DELETE":
//             return await DELETE(req, res);
//         default:
//             return res.status(405).end(`Method ${method} Not Allowed`);
//     }
// }
// export async function GET(req, res) {
//     // const res1 = await sql `SELECT * FROM estimates WHERE email=${email}`;
//     return res.status(200).json({lol:"asa"});
// }