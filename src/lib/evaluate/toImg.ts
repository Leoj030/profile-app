import * as mupdf from "mupdf";
import uploadFile from "../supabase/uploadFile";

export default async function toImg(uint8Array: Uint8Array, filename: string) {
    const document = mupdf.Document.openDocument(uint8Array, "application/pdf");
    const page = document.loadPage(0);
    const pixmap = page.toPixmap(mupdf.Matrix.scale(1, 1), mupdf.ColorSpace.DeviceRGB, false);
    const pngBytes = pixmap.asPNG();
    const pngBuffer = Buffer.from(pngBytes);
    
    const imgData = await uploadFile({ file: pngBuffer, bucketName: "ResumeIMG", filename: filename, filetype: "image/png" });
    return imgData.id;
}
