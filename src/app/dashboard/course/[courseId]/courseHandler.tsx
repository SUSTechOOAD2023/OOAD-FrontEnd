'use server'

const debug = process.env.debug
const path = process.env.path

export interface Course {
  name: string, 
  title: string, 
  teacher: string[], 
  groupLow: number, 
  groupHigh: number, 
  notice: Notice[]
}

export interface Notice {
  id: string, 
  title: string, 
  description: string, 
  visibilityStudent?: string[], 
  visibilityGroup?: string[]
}

export async function getCourse(id: string): Promise<Course | null> {
  if (debug === "true") {
    return {
      name: "CS666", 
      title: "Data Structure and Analysis", 
      teacher: [
        "Amiya", 
        "Bo Tang"
      ], 
      groupLow: 2, 
      groupHigh: 5, 
      notice: [
        {
          id: "1", 
          title: "Assignment 1 Released", 
          description: "The first assignment has been released and is due by next Monday."
        }, 
        {
          id: "2", 
          title: "Guest Lecture on Algorithms", 
          description: "There will be a guest lecture on advanced algorithms next week."
        }
      ]
    }
  }

  const res = await fetch(`${path}/dd?courseID=${id}`, {
    next: {
      tags: ["course" + id]
    }
  })

  if (res.ok) {
    return await res.json()
  } else {
    console.log(`Error on getting course ${id}`)
    return null
  }
}