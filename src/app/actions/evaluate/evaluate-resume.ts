'use server';

import path from "path";
import getFile from "@/lib/supabase/getFile";
import uploadFile from "@/lib/supabase/uploadFile";
import toImg from "@/lib/evaluate/toImg";
import { aiAnalysis } from "@/lib/evaluate/aiAnalysis";
import { module1, module2, module3, module4 } from "@/lib/evaluate/prompts";
import post from "@/lib/supabase/post";
import { createClient } from "@/lib/supabase/server";

export default async function evaluateResume(formData: FormData) {
    const file = formData.get('file') as File;

    if (!file) {
        throw new Error("No file uploaded");
    }

    if (!(file instanceof File)) {
        throw new Error("Invalid file upload");
    }

    const filename = path.parse(file.name).name;
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const pathName = `${Date.now()}-${filename}`;

    await uploadFile({ file: uint8Array, bucketName: "ResumePDF", filename: pathName, filetype: "application/pdf" });
    await toImg(uint8Array, pathName);

    const imgUrl = await getFile("ResumeIMG", pathName);

    const [result1, result2, result3, result4] = await Promise.all([
        aiAnalysis(imgUrl, module1),
        aiAnalysis(imgUrl, module2),
        aiAnalysis(imgUrl, module3),
        aiAnalysis(imgUrl, module4),
    ]);

    console.log(result1);
    console.log(result2);
    console.log(result3);
    console.log(result4);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        return await post({
            owner_id: user.id,
            result: {
                module1: result1,
                module2: result2,
                module3: result3,
                module4: result4,
            },
            reference_id: pathName
        }, "authenticated_results");
    }
    else {
        return await post({
            result: {
                module1: result1,
                module2: result2,
                module3: result3,
                module4: result4,
            },
            reference_id: pathName
        }, "public_results")
    }
}
