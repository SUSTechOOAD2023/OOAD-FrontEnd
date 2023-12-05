'use server'

const debug = process.env.debug
const path = process.env.path

import { redirect } from 'next/navigation'
import { getCookie, setCookie } from './cookie'

export async function landingRedirect() {
  if (debug === "true") {
    return
  }

  const request = new Request(`${path}/account/checkLogin`)
  const res = await fetch(await getCookie(request))

  if (res.ok) {
    if (await res.text() === "存在") {
      redirect("/dashboard")
    }
  }
}
export async function isLogin() {
  if (debug === "true") {
    return true
  }

  const request = new Request(`${path}/account/checkLogin`)
  const res = await fetch(await getCookie(request))

  if (!res.ok) {
    if (await res.text() === "存在") {
      return true
    }
    return false
  }
  return false
}