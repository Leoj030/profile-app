import { createClient } from "@supabase/supabase-js";

export default async function getFile(bucketName: string, filename: string, duration=60) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase.storage
    .from(bucketName)
    .createSignedUrl(filename, duration);

    if (error) {
        console.error("HELLO: " + error);
        throw error;
    }

    return data.signedUrl;
}