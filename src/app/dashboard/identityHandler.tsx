'use server'

import { getCookie } from "@/cookie"

const debug = process.env.debug
const path = process.env.path

export async function getIdentity() {
  if (debug === "true") {
    return "teacher";
  }

  const request = new Request(`${path}/account/getIdentity`);
  return getCookie(request)
    .then(fetch)
    .then((res) => {
      if (res.ok) {
        return res.text();
      } else {
        console.log(`Error in getting identity: status code ${res.status}`);
        return "";
      }
    });
}