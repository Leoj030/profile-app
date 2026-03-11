import { createClient } from "@supabase/supabase-js";
import 'dotenv/config.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testSupabase() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    console.log("Testing insert into public_results...");
    try {
        const { data, error } = await supabase.from("public_results").insert({
            result: {
                module1: { title: "Test", result: "Test" },
                module2: { title: "Test", result: "Test" },
                module3: { title: "Test", result: "Test" },
                module4: { title: "Test", result: "Test" },
            },
            reference_id: "test-reference-id"
        }).select().single();

        if (error) {
            console.error("Insert error:", error);
        } else {
            console.log("Insert success! ID:", data.id);
            
            console.log("Testing fetch from public_results...");
            // Use anon key for fetch like the web code does
            const supabaseAnon = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );
            
            const { data: fetchData, error: fetchError } = await supabaseAnon
                .from("public_results")
                .select("result, reference_id")
                .eq("id", data.id)
                .single();
                
            if (fetchError) {
                console.error("Fetch error:", fetchError);
            } else {
                console.log("Fetch success!", fetchData);
            }
        }
    } catch (e) {
        console.error("Exception:", e);
    }
}

testSupabase();
