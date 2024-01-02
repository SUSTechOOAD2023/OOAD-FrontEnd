'use server'

import { revalidateTag } from "next/cache"

const debug = process.env.debug
const path = process.env.path

export async function downloadAvatar(id: string) {
  if (debug === "true") {
    return null
  }

  const res = await fetch(`${path}/download/userimg?accountID=${id}`, {
    next: {
      tags: ["avatar" + id]
    }
  })

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
  // console.log('upload!')
  fetch(`${path}/upload/userimg?accountID=${id}`, {
    method: "POST",
    body: data
  }).then(res => {
    revalidateTag("avatar" + id);
    // console.log(res) 
    return res.ok
  })
  // const res = await fetch(`${path}/upload/userimg?accountID=${id}`, {
  //   method: "POST", 
  //   body: data
  // })
  // console.log(res.body)

  revalidateTag("avatar" + id)

  return false
}