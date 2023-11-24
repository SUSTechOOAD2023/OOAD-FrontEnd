'use server'

const debug = process.env.debug
const path = process.env.path

interface registerInformation {
  invitationCode: string, 
  identity: number, 
  id: string, 
  email: string, 
  password: string, 
}

export default async function postRegister(param: registerInformation) {
  if (debug === "true") {
    return "Success"
  }

  const res = await fetch(`${path}/...`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify(param)
  })

  return "Code Incorrect"
}