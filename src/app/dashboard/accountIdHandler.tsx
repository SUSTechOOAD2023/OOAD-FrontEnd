'use server'

import { getCookie } from "@/cookie"
import { revalidateTag } from "next/cache";

const debug = process.env.debug
const path = process.env.path

export async function getId() {
  if (debug === "true") {
    return "1";
  }


  const request = new Request(`${path}/account/getID`);
  return getCookie(request)
    .then((response) => fetch(response))
    .then((res) => {
      if (res.ok) {
        revalidateTag("identity")
        revalidateTag("course")
        revalidateTag("notice")
        revalidateTag("students")
        revalidateTag("teachers")
        revalidateTag("sas")
        return res.text();
      } else {
        console.log(`Error in getting ID: status code ${res.status}`);
        return "0";
      }
    })
    .catch((error) => {
      console.log(`Error in getting ID: ${error}`);
      return "0";
    });
}