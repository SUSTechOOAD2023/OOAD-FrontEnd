'use server'

import { revalidateTag } from "next/cache"
import { User } from "./[courseId]/User"

const debug = process.env.debug
const path = process.env.path

export interface CourseOverview {
  id: string, 
  name: string, 
  title: string, 
  teacher: User[], 
  sa: User[], 
  group?: string
}

export default async function getCourseOverview(id: string, identity: string): 
  Promise<CourseOverview[]> {
  if (debug === "true") {
    return [
      {
        id: "1", 
        name: "CS666", 
        title: "Data Structure and Analysis", 
        teacher: [
          { id: "1", name: "Amiya" }, 
          { id: "2", name: "Bo Tang"}
        ], 
        sa: [
          { id: "7", name: "Chen Kangrui"}
        ]
      }, 
      {
        id: "2", 
        name: "CS123", 
        title: "Genshin Impact", 
        teacher: [
          { id: "3", name: "Bo Tang"}
        ], 
        sa: [], 
        group: "Liyue"
      }
    ]
  }

  const body = {}

  if (identity !== "admin") {
    body[identity + "Id"] = parseInt(id)
  }

  console.log("body="+JSON.stringify(body))

  const res = await fetch(`${path}/relationshipCourse/selectCourse`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify(body),
    next: {
      tags: ["course"]
    }
  })

  if (res.ok) {
    return res.json().then((courses): CourseOverview[] => courses.map(course => ({
      id: course.courseId.toString(), 
      name: course.courseShortName, 
      title: course.courseName, 
      teacher: course.teacherName.map((t, index) => ({ 
        id: course.teacherId[index].toString(), 
        name: t
      })),
      sa: course.SAName.map((t, index) => ({ 
        id: course.SAId[index].toString(), 
        name: t
      }))
    })))
  } else {
    console.log(`Error on getting course overview ${id}`)
    return []
  }
}