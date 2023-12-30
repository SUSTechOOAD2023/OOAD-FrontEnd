'use server'

const debug = process.env.debug
const path = process.env.path

export async function getCaptcha(email: string, identity: string) {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/account/sendMail?email=${email}&identity=${identity}`, {
    method: "POST", 
  })

  return res.ok
}

export async function checkCaptcha(
  email: string, 
  identity: string, 
  password: string, 
  captcha: string
) {
  if (debug === "true") {
    return "Password is reset successfully!"
  }

  const res = await fetch(`${path}/account/forgetPassword?email=${email}&identity=${identity}&newPassword=${password}&verifyCode=${captcha}`, {
    method: "POST", 
  })

  if (res.ok) {
    return await res.text()
  } else {
    return "Unknown error!"
  }
}