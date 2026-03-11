import { createClient } from "@supabase/supabase-js";

export default async function post(data: unknown, table: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: dataPost, error } = await supabase.from(table).insert(data).select().single();

    if (error) throw new Error(error.message);
    
    return dataPost?.id;
}