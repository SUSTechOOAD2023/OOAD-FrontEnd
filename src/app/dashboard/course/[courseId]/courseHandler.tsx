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
  studentVis?: string[]
}

export interface Student {
  id: string, 
  name: string
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
      notice: []
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

export async function deleteCourse(id: string): Promise<boolean> {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/dC?courseID=${id}`, {
    method: "POST"
  })

  return res.ok
}

export async function getNotice(id: string, sid?: string): Promise<Notice[]> {
  if (debug === "true") {
    return [
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

  // TODO: verify get notice

  const url = sid === undefined
    ? `${path}/notice/Search?classId=${id}`
    : `${path}/notice/studentSearch?classId=${id}&studentId=${sid}`

  const res = await fetch(url, {
    method: "POST"
  })

  if (res.ok) {
    return res.json()
  } else {
    console.log(`Error on getting notice of course ${id}`)
    return []
  }
}

export async function deleteNotice(id: string) : Promise<boolean> {
  if (debug === "true") {
    return true;
  }

  // TODO: verify delete notice

  const res = await fetch(`${path}/notice/delete?noticeId=${id}`)

  return res.ok
}

interface NoticeEditInfo {
  noticeId: string, 
  teacherId?: string, 
  classId: string, 
  noticeTitle: string, 
  noticeContent: string, 
  listStudentId?: string[]
}

export async function editNotice(payload: NoticeEditInfo): Promise<boolean> {
  if (debug === "true") {
    return true
  }

  // TODO: verify edit notice

  const res = await fetch(`${path}/notice/modify`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify(payload)
  })

  return res.ok
}

export async function getVisibleStudents(id: string): Promise<string[]> {
  if (debug === "true") {
    return ["0", "1", "2", "3"]
  }

  // TODO: verify notice search

  const res = await fetch(`${path}/notice/noticeSearch?noticeId=${id}`)

  if (res.ok) {
    return res.json()
  } else {
    console.log(`Error on getting visible students of notice ${id}`)
    return []
  }
}

export async function getStudents(id?: string): Promise<Student[]> {
  if (debug === "true") {
    return [
      {
        id: "1", 
        name: "Li Haoyu"
      }, 
      {
        id: "2", 
        name: "Liu Shengding"
      }, 
      {
        id: "3", 
        name: "Cheng Sizhe"
      }, 
      {
        id: "4", 
        name: "Deng Qingwen"
      }
    ]
  }
  
  const url = id === undefined ? `${path}/dC` : `${path}/dC?courseID=${id}`
  const res = await fetch(url)

  if (res.ok) {
    return res.json()
  } else {
    return []
  }
}