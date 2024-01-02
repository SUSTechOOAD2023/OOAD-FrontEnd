'use server'

import dayjs, { Dayjs } from "dayjs"

const debug = process.env.debug
const path = process.env.path

export interface AllNoticeInfo {
  classId: string, 
  classShortName: string, 
  noticeTitle: string, 
  noticeContent: string
}

export async function getAllNotice(id: string): Promise<AllNoticeInfo[]> {
  if (debug === "true") {
    return []
  }

  const res = await fetch(`${path}/notice/list`, {
    method: "POST", 
    headers: {
      'Content-Type': "application/json", 
    }, 
    body: JSON.stringify({
      studentId: id
    }), 
    next: {
      tags: ["notice"]
    }
  })

  if (res.ok) {
    return res.json().then(notices => notices.reverse().map(notice => ({
      ...notice, 
      classId: notice.classId.toString()
    })))
  } else {
    console.log(`Error on getting all notice of student ${id}, status code ${res.status}`)
    return []
  }
}

export interface DeadlineInfo {
  homeworkId: string, 
  homeworkTitle: string, 
  homeworkDdl: Dayjs, 
  classId: string, 
  courseName: string
}

export async function getDeadline(id: string): Promise<DeadlineInfo[]> {
  if (debug === "true") {
    return []
  }

  const res = await fetch(`${path}/homework/listDDL?studentId=${id}`, {
    method: "POST", 
    cache: "no-store"
  })

  if (res.ok) {
    return res.json().then(homework => homework.map(homework => ({
      ...homework, 
      homeworkId: homework.homeworkId.toString(),  
      classId: homework.classId.toString()
    })))
  } else {
    console.log(`Error on getting deadline of student ${id}, status code ${res.status}`)
    return []
  }
}