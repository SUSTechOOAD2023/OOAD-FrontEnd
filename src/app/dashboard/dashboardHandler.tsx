'use server'

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