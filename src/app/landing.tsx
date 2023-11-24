'use server'

const debug = process.env.debug
const path = process.env.path

import { redirect } from 'next/navigation'

export default async function landingRedirect() {
  if (debug === "true") {
    return
  }

  const res = await fetch(`${path}/...`)

  if (res.ok) {
    redirect("/dashboard")
  }
}