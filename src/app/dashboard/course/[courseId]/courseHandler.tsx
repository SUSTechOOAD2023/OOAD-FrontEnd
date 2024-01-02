'use server'

import { revalidateTag } from "next/cache"
import { User } from "./User"

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

  const res = await fetch(`${path}/class/list`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify({
      classId: parseInt(id), 
    }), 
    next: {
      tags: ["course" + id]
    }
  })

  if (res.ok) {
    return res.json().then((course): Course => ({
      name: course[0].courseName, 
      title: course[0].courseTitle, 
      teacher: [], 
      groupLow: course[0].minimumGroupSize, 
      groupHigh: course[0].maximumGroupSize, 
      notice: []
    }))
  } else {
    console.log(`Error on getting course ${id}`)
    return null
  }
}

export async function addCourse(name: string, title: string): Promise<string> {
  if (debug === "true") {
    return "7"
  }

  const res = await fetch(`${path}/class/new?shortName=${name}&name=${title}`, {
    method: "POST", 
    cache: "no-store"
  })

  revalidateTag("course")
  
  if (res.ok) {
    return res.text()
  } else {
    console.log(`Error on adding course, status code ${res.status}`)
    return "7"
  }

}

export async function deleteCourse(id: string): Promise<boolean> {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/class/delete?classId=${id}`, {
    method: "PATCH", 
    cache: "no-store"
  })

  return res.ok
}

interface CourseEditInfo {
  id: string, 
  name?: string, 
  title?: string, 
  groupLow?: number, 
  groupHigh?: number
}

export async function editCourse(payload: CourseEditInfo): Promise<boolean> {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/class/update`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify({
      classId: payload.id, 
      courseName: payload.name, 
      courseTitle: payload.title, 
      maximumGroupSize: payload.groupHigh, 
      minimumGroupSize: payload.groupLow
    }), 
    cache: "no-store"
  })

  revalidateTag("course")
  revalidateTag("course" + payload.id)

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
    method: "POST", 
    next: {
      tags: ["notice"]
    }
  })

  if (res.ok) {
    return res.json().then((notices): Notice[] => notices.map(notice => ({
      id: notice.noticeId.toString(), 
      title: notice.noticeTitle, 
      description: notice.noticeContent
    })))
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

  const res = await fetch(`${path}/notice/delete?noticeId=${id}`, {
    cache: "no-store"
  })

  revalidateTag("notice")

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
    body: JSON.stringify({
      ...payload, 
      noticeId: parseInt(payload.noticeId), 
      classId: parseInt(payload.classId), 
      listStudentId: payload.listStudentId 
        ? payload.listStudentId.map(item => parseInt(item)) 
        : payload.listStudentId
    }), 
    cache: "no-store"
  })

  revalidateTag("notice")

  return res.ok
}

interface NoticeAddInfo {
  teacherId?: string, 
  classId: string, 
  noticeTitle: string, 
  noticeContent: string, 
  listStudentId: string[]
}

export async function addNotice(payload: NoticeAddInfo): Promise<string> {
  if (debug === "true") {
    return "8"
  }

  const res = await fetch(`${path}/notice/new`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify({
      ...payload, 
      classId: parseInt(payload.classId), 
      listStudentId: payload.listStudentId.map(item => parseInt(item))
    }), 
    cache: "no-store"
  })

  revalidateTag("notice")

  if (res.ok) {
    return res.text()
  } else {
    console.log(`Error on adding notice, status code ${res.status}`)
    return ""
  }
}

export async function getVisibleStudents(id: string): Promise<string[]> {
  if (debug === "true") {
    return ["0", "1", "2", "3"]
  }

  // TODO: verify notice search

  const res = await fetch(`${path}/notice/noticeSearch?noticeId=${id}`, {
    method: "POST", 
    next: {
      tags: ["notice"]
    }
  })

  if (res.ok) {
    return res.json().then(students => students.map(item => item.toString()))
  } else {
    console.log(`Error on getting visible students of notice ${id}`)
    return []
  }
}

export async function getStudents(id?: string): Promise<User[]> {
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
  
  const res = id === undefined
    ? await fetch(`${path}/student/listAllStudent`, {
      next: {
        tags: ["students"]
      }
    })
    : await fetch(`${path}/relationshipCourse/selectStudent`, {
      method: "POST", 
      headers: {
        'Content-Type': "application/json", 
      }, 
      body: JSON.stringify({ courseId: parseInt(id) }), 
      next: {
        tags: ["students" + id]
      }
    })

  if (res.ok) {
    return res.json().then((users): User[] => users.map(user => ({
      id: user.studentId.toString(), 
      name: user.studentName
    })))
  } else {
    console.log(`Error in getting student, status code ${res.status}`)
    return []
  }
}

export async function setCourseStudents(courseId: string, studentId: string[]): Promise<boolean> {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/relationshipCourse/addStudentList`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify({
      id: studentId.map(item => parseInt(item)), 
      courseId: parseInt(courseId)
    }), 
    cache: "no-store"
  })

  revalidateTag("students")
  revalidateTag("students" + courseId)

  return res.ok
}

export async function getTeachers(id?: string): Promise<User[]> {
  if (debug === "true") {
    return [
      {
        id: "1", 
        name: "Amiya"
      }, 
      {
        id: "2", 
        name: "Bo Tang"
      }, 
      {
        id: "3", 
        name: "Paimon"
      }
    ]
  }

  const res = id === undefined
    ? await fetch(`${path}/teacher/listAll`, {
      next: {
        tags: ["teachers"]
      }
    })
    : await fetch(`${path}/relationshipCourse/selectTeacher`, {
      method: "POST", 
      headers: {
        'Content-Type': "application/json", 
      }, 
      body: JSON.stringify({ courseId: parseInt(id) }), 
      next: {
        tags: ["teachers" + id]
      }
    })

  if (res.ok) {
    return res.json().then((users): User[] => users.map(user => ({
      id: user.teacherId.toString(), 
      name: user.teacherName
    })))
  } else {
    console.log(`Error in getting teacher, status code ${res.status}`)
    return []
  }
}

export async function setCourseTeachers(courseId: string, teacherId: string[]): Promise<boolean> {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/relationshipCourse/addTeacherList`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify({
      id: teacherId.map(item => parseInt(item)), 
      courseId: parseInt(courseId)
    }), 
    cache: "no-store"
  })

  revalidateTag("teachers")
  revalidateTag("teachers" + courseId)

  return res.ok
}

export async function getSAs(id?: string): Promise<User[]> {
  if (debug === "true") {
    return [
      {
        id: "7", 
        name: "Chen Kangrui"
      }, 
      {
        id: "8", 
        name: "Kuang Liang"
      }, 
      {
        id: "9", 
        name: "Cao Zhezhen"
      }
    ]
  }

  if (id === undefined) {
    const res = await fetch(`${path}/student/listAllSA`, {
      next: {
        tags: ["sas"]
      }
    })

    if (res.ok) {
      return res.json().then((users): User[] => users.map(user => ({
        id: user.studentId.toString(), 
        name: user.studentName
      })))
    } else {
      console.log(`Error in getting SA, status code ${res.status}`)
      return []
    }
  } else {
    const res = await fetch(`${path}/relationshipCourse/selectSA`, {
      method: "POST", 
      headers: {
        'Content-Type': "application/json", 
      }, 
      body: JSON.stringify({ courseId: parseInt(id) }), 
      next: {
        tags: ["sas" + id]
      }
    })
  
    if (res.ok) {
      return res.json().then((users): User[] => users.map(user => ({
        id: user.SAId.toString(), 
        name: user.SAName
      })))
    } else {
      console.log(`Error in getting SA, status code ${res.status}`)
      return []
    }
  }
}

export async function setCourseSAs(courseId: string, saId: string[]): Promise<boolean> {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/relationshipCourse/addSAList`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify({
      id: saId.map(item => parseInt(item)), 
      courseId: parseInt(courseId)
    }), 
    cache: "no-store"
  })

  revalidateTag("sas")
  revalidateTag("sas" + courseId)

  return res.ok
}