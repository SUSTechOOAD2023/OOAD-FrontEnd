'use server'

const debug = process.env.debug
const path = process.env.path

interface registerInformation {
  invitationCode: string, 
  identity: string, 
  id: string, 
  email: string, 
  password: string, 
}

export default async function postRegister(param: registerInformation) {
  if (debug === "true") {
    return "Success!"
  }

  const url = `${path}/account/new?code=${param.invitationCode}&identity=${param.identity}`
  const body = {
    accountName: param.id, 
    accountPassword: param.password, 
    email: param.email
  }

  const res = await fetch(url, {
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

  // const registerRes = await fetch(`${path}/account/new`, {
  //   method: "POST", 
  //   headers: {
  //     'Content-Type': "application/json", 
  //   }, 
  //   body: JSON.stringify({
  //     accountName: param.id, 
  //     accountPassword: param.password, 
  //     accountType: param.identity, 
  //     email: param.email
  //   })
  // })

  // if (registerRes.ok) {
  //   if (await registerRes.text() !== "success") {
  //     return "ID or email is used!"
  //   } else {
  //     return "okay"
  //   }
  // } else {
  //   return "Unknown error!"
  // }
}