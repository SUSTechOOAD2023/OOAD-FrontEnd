'use server'

const debug = process.env.debug
const path = process.env.path

import { redirect } from 'next/navigation'
import { getCookie, setCookie, testCookie } from '../cookie'

export async function landingRedirect() {
  if (debug === "true") {
    return
  }

  const request = new Request(`${path}/account/checkLogin`)
  const res = await fetch(await getCookie(request))

  if (res.ok) {
    if (await res.text() === "存在") {
      setCookie(res)
      redirect("/dashboard")
    }
  }
}
export async function isLogin() {
  if (debug === "true") {
    return testCookie();
  }

  const request = new Request(`${path}/account/checkLogin`)
  const res = await fetch(await getCookie(request))
  // console.log(res.text())
  // console.log(await testCookie())
  // console.log(await getCookie(request))

  if (res.ok) {
    if (await res.text() === "存在") {
      return true
    }
    return false
  }
  return false
}