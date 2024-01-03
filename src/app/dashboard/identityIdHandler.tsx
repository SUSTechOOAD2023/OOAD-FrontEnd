'use server'

const debug = process.env.debug
const path = process.env.path

export async function getStudentId(id: string) {
  if (debug === "true") {
    return "1"
  }

  const res = await fetch(`${path}/student/getStudentID?accountID=${id}`, {
    method: "POST", 
    next: {
      tags: ["identity"]
    }
  })

  if (res.ok) {
    return res.text()
  } else {
    console.log(`Error in getting student ID of ${id}: status code ${res.status}`)
    return "0"
  }
}

export async function getTeacherId(id: string) {
  if (debug === "true") {
    return "1"
  }

  const res = await fetch(`${path}/teacher/getTeacherID?accountID=${id}`, {
    method: "POST", 
    next: {
      tags: ["identity"]
    }
  })

  if (res.ok) {
    return res.text()
  } else {
    console.log(`Error in getting teacher ID of ${id}: status code ${res.status}`)
    return "0"
  }
}