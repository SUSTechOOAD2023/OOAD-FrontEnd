'use server'

import { clearCookie } from "../../cookie"

const debug = process.env.debug
const path = process.env.path

export default async function logout() {
  if (debug === "true") {
    return
  }

  fetch(`${path}/account/logout`)
  clearCookie()
}