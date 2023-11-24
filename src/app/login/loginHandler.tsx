'use server'

const debug = process.env.debug
const path = process.env.path

interface loginInformation {
  email: string, 
  password: string
}

export default async function postLogin(param: loginInformation) {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/...`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify(param)
  })

  return res.ok
}