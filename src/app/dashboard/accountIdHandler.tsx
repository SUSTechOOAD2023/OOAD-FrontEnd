'use server'

import { getCookie } from "@/cookie"

const debug = process.env.debug
const path = process.env.path

export async function getId() {
  console.log("getid");
  if (debug === "true") {
    return Promise.resolve("1");
  }

  const request = new Request(`${path}/account/getID`);
  return getCookie(request)
    .then((response) => fetch(response))
    .then((res) => {
      if (res.ok) {
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