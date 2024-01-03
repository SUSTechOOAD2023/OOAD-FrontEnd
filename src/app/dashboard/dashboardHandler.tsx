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

export interface HomeworkEvent {
  homeworkId: number, 
  homeworkTitle: string, 
  classId: number, 
  courseName: string
}

export interface ReceiveInvitationEvent {
  groupId: number, 
  groupName: string, 
  sendStudentId: number, 
  sendStudentName: string, 
  joinGroupInvitationId: number
}

export interface SendInvitationEvent {
  groupId: number, 
  groupName: string, 
  receiveStudentId: number, 
  receiveStudentName: string, 
}

export interface HomeworkReviewEvent {
  homeworkId: number, 
  homeworkName: string, 
  submissionScore: number
}

export interface NoticeEvent {
  classId: number, 
  classShortName: string, 
  noticeTitle: string
}

export type EventType = HomeworkEvent 
  | ReceiveInvitationEvent 
  | SendInvitationEvent 
  | HomeworkReviewEvent 
  | NoticeEvent

export interface EventObject {
  eventContent: EventType, 
  eventTime: string, 
  eventType: string
}

export async function getEvent(id: string): Promise<EventObject[]> {
  if (debug === "true") {
    return []
  }

  if (!id) {
    return []
  }

  const res = await fetch(`${path}/student/recentEvent?studentId=${id}`, {
    method: "POST", 
    cache: "no-store"
  })

  if (res.ok) {
    return res.json().then(events => events.reverse().slice(0, 10))
  } else {
    console.log(`Error on getting events of student ${id}, status code ${res.status}`)
    return []
  }
}

export async function acceptInvitation(id: number): Promise<boolean> {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/joinGroupInvitation/accept?joinGroupInvitationId=${id}`, {
    method: "POST", 
    cache: "no-store"
  })

  if (!res.ok) {
    console.log(`Accept invitation ${id} failed, status code ${res.status}`)
  }

  return res.ok
}

export async function rejectInvitation(id: number): Promise<boolean> {
  if (debug === "true") {
    return true
  }

  const res = await fetch(`${path}/joinGroupInvitation/reject?joinGroupInvitationId=${id}`, {
    method: "POST", 
    cache: "no-store"
  })

  if (!res.ok) {
    console.log(`Reject invitation ${id} failed, status code ${res.status}`)
  }

  return res.ok
}