'use server'

import { getCookie } from "@/cookie"

const debug = process.env.debug
const path = process.env.path

export async function getIdentity() {
  if (debug === "true") {
    return "admin"
  }

  const request = new Request(`${path}/account/getIdentity`)
  const res = await fetch(await getCookie(request))

  if (res.ok) {
    return await res.text()
  } else {
    console.log(`Error in getting identity: status code ${res.status}`)
    return ""
  }
}