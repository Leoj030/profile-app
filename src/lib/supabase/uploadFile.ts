import { createClient } from "@supabase/supabase-js";

interface IUploadFile {
    file: File | Uint8Array; 
    bucketName: string;
    filename: string; 
    filetype: string;
}

export default async function uploadFile({ file, bucketName, filename, filetype }: IUploadFile) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filename, file, {
        contentType: filetype,
    });

    if (error) {
        throw error;
    }

    return data;
}