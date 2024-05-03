"use server";

import { cookies } from "next/headers";


export default async function SignOut() {
    cookies().delete("authToken");
}