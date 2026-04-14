import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

    // LOGIN
    if (req.method === "POST") {
        const { username, password } = req.body;

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('name', username)
            .eq('email', password);

        if (data && data.length > 0) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false });
        }
    }

    // OPTIONAL: GET USERS
    if (req.method === "GET") {
        const { data } = await supabase
            .from('users')
            .select('*');

        return res.status(200).json(data);
    }
}