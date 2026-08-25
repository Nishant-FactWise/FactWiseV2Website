import Home from "../page";
import { locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.filter((locale) => locale !== "en").map((locale) => ({ locale }));
}

export default Home;
