'use server'

import { getIdentity } from "../identityHandler"
import { getStudentId } from "../identityIdHandler"
import { getTeacherID } from "../teacherHandler"
import { transformHomeworkData } from "./detail/utils"

const debug = process.env.debug
const path = process.env.path

export interface HomeworkOverview {
    id?: string,
    uid?: string,
    name: string,
    deadline: string,
    courseName?: string,
    resubmission: number,
    description: string,
    passed?: boolean,
    grade?: number,
    comment?: string,
    classId?: string,
    type?: string,
    maxGrade?: number
}
const debugValue = [
    {
        id: "CS666",
        uid: "1",
        name: "Assignment 1",
        deadline: "2024-01-01 22:15:00",
        courseName: "Data Structure and Analysis",
        resubmission: 6,
        description: "6"
    },
    {
        id: "CS888",
        uid: "3",
        name: "Assignment 2",
        deadline: "2024-01-01 22:15:00",
        courseName: "Object Oriented Analysis Design",
        resubmission: 6,
        description: "6"
    },
]
export default async function getHomeworkOverview(id: string): Promise<HomeworkOverview[]> {
    if (debug === "true") {
        return debugValue
    }
    const res = await fetch(`${path}/homework/list`, {
        next: {
            tags: ["homeworkOverview" + id]
        }
    })

    if (res.ok) {
        return await res.json()
    } else {
        console.log(`Error on getting homework overview ${id}`)
        return debugValue
    }
}
const urls = {
    "ddl": "listDDL",
    "end": "listDDL2"
}
export async function getDDLHomework(studentId: string, mode) {
    if (debug === "true") {
        return debugValue
    }
    const res = await fetch(`${path}/homework/${urls[mode]}?studentId=${studentId}`, {
        method: 'POST'
    })
    if (res.ok) {
        return await res.json()
    } else {
        console.log(`Error on getting homework overview`)
        return debugValue
    }
}

export async function getHomeworkByAccount(id: string) {
    const t = await getIdentity();
    if (t === 'student' || t === 'SA') {
        const studentId = await getStudentId(id); //TODO
        const list1 = await getDDLHomework(studentId, 'ddl');
        const list1_ = list1.map((obj) => ({
            ...obj,
            passed: false
        }));
        const list2 = await getDDLHomework(studentId, 'end');
        // console.log(list2)
        const list2_ = list2.map((obj) => ({
            ...obj,
            passed: true,
        }));
        const list_ = list1_.concat(list2_);
        return transformHomeworkData(list_);
    } else {
        const ass = await getTeacherHomework(id)
        return transformHomeworkData(ass);
    }
}
export async function searchHomework(homeworkId: string) {
    const res = await fetch(`${path}/homework/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            homeworkId: homeworkId

        })
    })
    if (!res.ok) {
        throw new Error('Request failed');
    }

    const responseData = await res.json();
    const responseData2 = responseData[0];
    return {
        id: responseData2.classId.toString(),
        name: responseData2.homeworkTitle,
        deadline: new Date(responseData2.homeworkDdl).toLocaleString(),
        courseName: '',
        resubmission: responseData2.allowResubmit | 1,
        description: responseData2.homeworkContent
    };
}
export async function addHomework(homework: HomeworkOverview) {
    const body: any = {
        homeworkTitle: homework.name,
        homeworkDdl: homework.deadline,
        allowResubmit: homework.resubmission,
        homeworkContent: homework.description,
        homeworkType: homework.type,
        maxScore: homework.maxGrade
    }
    console.log(333555)
    console.log(homework)
    body.classId = (homework.classId) ? (homework.classId) : 1

    const res = await fetch(`${path}/homework/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        
    })
    if (!res.ok) {
        throw new Error('Request failed');
    }
    return true;
}
export async function getMaxScore(studentId: string, homework: any) {
    const bodys: any = {
        homeworkId: parseInt(homework.id),
        studentId: parseInt(studentId)
    }
    const res = await fetch(`${path}/submission/queryMaxScore`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        },
        body: JSON.stringify(bodys)
    })
    console.log(bodys)
    if (!res.ok) {
        throw new Error('Request failed');
    }
    const arrJson = await res.json()
    if (!arrJson[0]) {
        return {}
    }
    return {
        "grade": arrJson[0].score,
        "comment": arrJson[0].comment
    }
}
export async function getClassById(classId: string | undefined) {
    if (!classId) return "unknown"
    const bodys: any = {
        classId: parseInt(classId)
    }
    const res = await fetch(`${path}/class/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        },
        body: JSON.stringify(bodys)
    })
    if (!res.ok) {
        throw new Error('Request failed');
    }
    const arrJson = await res.json()
    return arrJson[0]
}
export async function searchGrade(accountID: string, homework: HomeworkOverview, identity: string) {
    let newHomework = homework
    if (identity === "student") {
        const studentId = await getStudentId(accountID)
        console.log(studentId)
        console.log("????")
        const arrJson = await getMaxScore(studentId
        , homework)
        console.log(arrJson)
        // console.log(arrJson)
        newHomework.grade = arrJson["grade"];
        newHomework.comment = arrJson["comment"];
    }
    const classJson = await getClassById(homework.classId)
    newHomework.courseName = classJson["courseName"]
    // console.log(newHomework.className)
    return newHomework
}
export async function processHomeworkArray(accountID: string, homeworkArray: HomeworkOverview[], identity: string): Promise<HomeworkOverview[]> {
    const processedArray: HomeworkOverview[] = [];
    for (const homework of homeworkArray) {
        const processedHomework = await searchGrade(accountID, homework, identity);
        processedArray.push(processedHomework);
    }

    return processedArray;
}
export async function getTeacherClass(accountID: string) {
    const teacherID = await getTeacherID(parseInt(accountID))
    const bodys: any = {
        teacherId: teacherID 
    }
    const res = await fetch(`${path}/class/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        },
        body: JSON.stringify(bodys)
    })
    if (!res.ok) {
        throw new Error('Request failed');
    }
    const arr = await res.json()
    return arr
}
export async function getTeacherHomework(accountID: string) {
    const teacherID = await getTeacherID(parseInt(accountID))
    console.log(accountID)
    // const res = await fetch(`${path}/homework/listTeacher?teacherId=${teacherID}`
    const res = await fetch(`${path}/homework/all`
    , {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        }
    })
    if (!res.ok) {
        throw new Error('Request failed');
    }
    const arr = await res.json()
    return arr
}

export async function getGroup(accountID: string, classId: string) {
    // const res = await fetch(`${path}/homework/listTeacher?teacherId=${teacherID}`
    const res = await fetch(`${path}/group/selectGroup?classId=${classId}&studentId=${await getStudentId(accountID)}`
    , {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        }
    })
    if (!res.ok) {
        throw new Error('Request failed');
    }
    const arr = await res.json()
    return arr.groupId
}