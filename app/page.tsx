

import fs from "fs";
import path from "path";
import { sanity } from "@/lib/sanity.client";



export default async function HomePage() {
  // 1) Charger ton fichier HTML Webflow
  const filePath = path.join(process.cwd(), "public", "home-one.html");
  let html = fs.readFileSync(filePath, "utf8");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
