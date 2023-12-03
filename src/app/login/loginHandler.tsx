'use server'

const debug = process.env.debug
const path = process.env.path

interface loginInformation {
  email: string, 
  password: string, 
  identity: string
}

export default async function postLogin(param: loginInformation) {
  if (debug === "true") {
    return "success!"
  }

  const isEmailSignIn = param.email.includes("@")

  const api = isEmailSignIn ? "emailSignIn" : "signin"
  const body =  isEmailSignIn
    ? { email: param.email, accountPassword: param.password }
    : { accountName: param.email, accountPassword: param.password }

  const res = await fetch(`${path}/account/${api}?identity=${param.identity}`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify(body)
  })

  if (res.ok) {
    return await res.text()
  } else {
    return "Unknown error!"
  }
}