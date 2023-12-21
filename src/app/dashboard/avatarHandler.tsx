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