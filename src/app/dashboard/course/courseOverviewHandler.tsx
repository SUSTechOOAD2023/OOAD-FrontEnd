'use server'

const debug = process.env.debug
const path = process.env.path

export interface CourseOverview {
  id: string, 
  name: string, 
  title: string, 
  teacher: string[], 
  group?: string
}

export default async function getCourseOverview(id: string): Promise<CourseOverview[]> {
  if (debug === "true") {
    return [
      {
        id: "1", 
        name: "CS666", 
        title: "Data Structure and Analysis", 
        teacher: [
          "Amiya", 
          "Bo Tang"
        ], 
      }, 
      {
        id: "2", 
        name: "CS123", 
        title: "Genshin Impact", 
        teacher: [
          "Paimon"
        ], 
        group: "Liyue"
      }
    ]
  }

  const res = await fetch(`${path}/dd?accountID=${id}`, {
    next: {
      tags: ["courseOverview" + id]
    }
  })

  if (res.ok) {
    return await res.json()
  } else {
    console.log(`Error on getting course overview ${id}`)
    return []
  }
}