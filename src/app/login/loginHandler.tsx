'use server'

import { getCookie, setCookie, testCookie } from "../../cookie"
import { cookies } from "next/headers"

const debug = process.env.debug
const path = process.env.path

interface loginInformation {
  email: string, 
  password: string, 
  identity: string
}

export default async function postLogin(param: loginInformation) {
  if (debug === "true") {
    console.log(6);
    cookies().set("6", "6")
    return "success!"
  }

  const isEmailSignIn = param.email.includes("@")

  const api = isEmailSignIn ? "emailSignIn" : "signin"
  const body =  isEmailSignIn
    ? { email: param.email, accountPassword: param.password }
    : { accountName: param.email, accountPassword: param.password }

  const request = new Request(`${path}/account/${api}?identity=${param.identity}`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify(body)
  })
  const res = await fetch(await getCookie(request))
  // console.log(await testCookie())

  if (res.ok) {
    const resText = await res.text()
    if (resText === "success!") {
      // console.log("Login!")
      setCookie(res)
    }
    return resText
  } else {
    return "Unknown error!"
  }
}