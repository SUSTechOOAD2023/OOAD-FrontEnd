
'use server'

const debug = process.env.debug
const path = process.env.path
import { getIdentity } from "./identityHandler";
import { getStudentId } from "./identityIdHandler";
import { getTeacherID } from "./teacherHandler";
export interface AccountInfo {
    name: string,
    sign?: string,
    joinedDate?: String,
    techStack?: string[],
    email: string
}

export default async function getAccountInfo(id: string): Promise<AccountInfo> {
    const identity = await getIdentity()
    if (identity === "student" || identity === "sa") {
        const studentId = await getStudentId(id)
        const res = await fetch(`${path}/student/list?studentId=${studentId}`)
        if (!res.ok) {
            throw new Error('Request failed');
        }
        const responseData = await res.json();
        let stack = []
        if (responseData.student && responseData.student.technicalStack) stack = responseData.student.technicalStack.split('?');
        return {
            name: responseData.student.studentName,
            sign: responseData.student.studentInformation,
            techStack:stack,
            email: responseData.account.email
        };
    }
    else if (identity === "teacher") {
        const teacherId = await getTeacherID(parseInt(id))
        const res = await fetch(`${path}/student/list?studentId=${teacherId}`)
        if (!res.ok) {
            throw new Error('Request failed');
        }
        const responseData = await res.json();
        return {
            name: responseData.teacher.teacherName,
            email: responseData.account.email
        };
    }
    else {
        return {
            name: "admin",
            email: ""
        }
    }
}
export async function getStudentInfo(studentId: string): Promise<AccountInfo> {
    const res = await fetch(`${path}/student/list?studentId=${studentId}`)
    if (!res.ok) {
        throw new Error('Request failed');
    }
    const responseData = await res.json();
    let stack = []
    if (responseData.student && responseData.student.technicalStack) stack = responseData.student.technicalStack.split('?');
    return {
        name: responseData.student.studentName,
        sign: responseData.student.studentInformation,
        techStack:stack,
        email: responseData.account.email
    };
}