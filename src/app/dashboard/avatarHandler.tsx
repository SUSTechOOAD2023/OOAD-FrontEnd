'use server'

const debug = process.env.debug
const path = process.env.path

export async function downloadAvatar(id: string)  {
  if (debug === "true") {
    return null
  }

  const res = await fetch(`${path}/download/userimg?accountID=${id}`)

  if (res.ok) {
    return await res.text().then(t => JSON.parse(t).data.body)
  } else {
    console.log(`Error on downloading avatar, id ${id}`)
    return null
  }
}

export async function uploadAvatar(id: string, data: FormData) {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/upload/userimg?accountID=${id}`, {
    method: "POST", 
    body: data
  })

  return res.ok
}