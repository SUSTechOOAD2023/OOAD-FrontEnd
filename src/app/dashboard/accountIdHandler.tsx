'use server'

import { getCookie } from "@/cookie"

const debug = process.env.debug
const path = process.env.path

export async function getId() {
  console.log("getid")
  if (debug === "true") {
    return "1"
  }

  const request = new Request(`${path}/account/getID`)
  const res = await fetch(await getCookie(request))

  if (res.ok) {
    return await res.text()
  } else {
    console.log(`Error in getting ID: status code ${res.status}`)
    return "0"
  }
}