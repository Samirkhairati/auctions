import { auth } from "@/lib/auth";
import { cache } from "react";

export default cache(auth)

// This is to not call auth() multiple times in the app