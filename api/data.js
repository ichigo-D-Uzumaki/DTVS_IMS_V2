import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

    if (req.method === "GET") {
        const { data } = await supabase
            .from('users')
            .select('*');

        res.status(200).json(data);
    }

    if (req.method === "POST") {
        const { name, email } = req.body;

        const { data } = await supabase
            .from('users')
            .insert([{ name, email }]);

        res.status(200).json(data);

    }
    if (req.method === "POST") {
        const { name, email } = req.body;

        const { data } = await supabase
            .from('users')
            .select('*')
            .eq('name', name)
            .eq('email', email);

        if (data.length > 0) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false });
        }
    }
}