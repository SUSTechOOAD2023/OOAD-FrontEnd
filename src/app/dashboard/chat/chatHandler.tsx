'use server'

const debug = process.env.debug
const path = process.env.path

export interface ChatInfo {
  content: string, 
  name: string
}

export async function getChat(): Promise<ChatInfo[]> {
  if (debug === "true") {
    return []
  }

  const res = await fetch(`${path}/messageBoard/all`, {
    cache: "no-store"
  })

  if (res.ok) {
    return res.json().then(res => res.reverse().map(info => ({
      content: info.message, 
      name: info.studentName
    })))
  } else {
    console.log("Error on getting chat!")
    return []
  }
}

export async function sendChat(id: string, content: string): Promise<boolean> {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/messageBoard/new`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify({
      studentId: parseInt(id), 
      message: content
    }), 
    cache: "no-store"
  })

  return res.ok
}