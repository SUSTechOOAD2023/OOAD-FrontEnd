'use server'

import { revalidateTag } from "next/cache"

const debug = process.env.debug
const path = process.env.path

export async function downloadFile(id: string)  {
    if (debug === "true") {
        return null
    }

    const res = await fetch(`${path}/download/file?accountID=${id}`, {
        next: {
            tags: ["file" + id]
        }
    })

    if (res.ok) {
        return await res.text().then(t => JSON.parse(t).data.body)
    } else {
        console.log(`Error on downloading file, id ${id}`)
        return null
    }
}

export async function uploadFile(filename: string, data: FormData) {
    if (debug === "true") {
        return true
    }

    const res = await fetch(`${path}/upload/file?fileName=${filename}`, {
        method: "POST",
        body: data
    })

    revalidateTag("file" + filename)

    return res.ok
}
export async function uploadFiles(id: string, data: FormData) {
    if (debug === "true") {
        return true
    }

    const res = await fetch(`${path}/upload/files?accountID=${id}`, {
        method: "POST",
        body: data, 
        next: {
            tags: ["file" + id]
        }
    })

    revalidateTag("file" + id)

    return res.ok
}