
'use server'

const debug = process.env.debug
const path = process.env.path
import { array } from "prop-types";
import { getIdentity } from "./identityHandler";
import { getStudentId } from "./identityIdHandler";
import { getTeacherID } from "./teacherHandler";
export interface AccountInfo {
    name: string,
    sign?: string,
    joinedDate?: String,
    techStack?: string[],
    email?: string
}

export default async function getAccountInfo(id: string): Promise<AccountInfo> {
    return getIdentity().then(identity => {
        if (identity === "student" || identity === "SA") {
            return getStudentId(id).then(studentId => {
                return fetch(`${path}/student/list?studentId=${studentId}`).then(res => {
                    if (!res.ok) {
                        throw new Error('Request failed');
                    }
                    return res.json().then(responseData => {
                        let stack = [];
                        if (responseData.student && responseData.student.technicalStack) {
                            stack = responseData.student.technicalStack.split(';');
                        }
                        return {
                            name: responseData.student.studentName,
                            sign: responseData.student.studentInformation,
                            techStack: stack,
                            email: responseData.account.email
                        };
                    }).catch(error => {
                        console.log("Invalid JSON response");
                        return {
                            name: "No Such Student",
                            email: "404"
                        };
                    });
                });
            });
        } else if (identity === "teacher") {
            return getTeacherID(parseInt(id)).then(teacherId => {
                return fetch(`${path}/teacher/list?teacherId=${teacherId}`).then(res => {
                    if (!res.ok) {
                        throw new Error('Request failed');
                    }
                    return res.json().then(responseData => {
                        return {
                            name: responseData.teacher.teacherName,
                            email: responseData.account.email
                        };
                    }).catch(error => {
                        console.log("Invalid JSON response");
                        return {
                            name: "No Such Teacher",
                            email: "404"
                        };
                    });
                });
            });
        } else {
            return {
                name: "admin",
                email: ""
            };
        }
    });
}

export async function getStudentInfo(studentId: string): Promise<AccountInfo> {
    const res = await fetch(`${path}/student/list?studentId=${studentId}`)
    if (!res.ok) {
        throw new Error('Request failed');
    }
    try {
        const responseData = await res.json();
        let stack = []
        if (responseData.student && responseData.student.technicalStack) stack = responseData.student.technicalStack.split('?');
        return {
            name: responseData.student.studentName,
            sign: responseData.student.studentInformation,
            techStack: stack,
            email: responseData.account.email
        };
    }
    catch (error) {
        console.log("Invalid JSON response");

        return {
            name: "No Such Student",
            email: "404"
        }
    }
}
interface RequestBody {
    studentId?: number;
    studentName?: string;
    studentInformation?: string;
    technicalStack?: string;
}
export async function updateStudentInfo(studentId: string, studentInfo: AccountInfo) {
    console.log(studentInfo)
    const requestBody: RequestBody = {};

    if (studentId !== undefined) {
        requestBody.studentId = parseInt(studentId);
    }

    if (studentInfo.name !== undefined) {
        requestBody.studentName = studentInfo.name;
    }

    if (studentInfo.sign !== undefined) {
        requestBody.studentInformation = studentInfo.sign;
    }

    if (Array.isArray(studentInfo.techStack)) {
        requestBody.technicalStack = studentInfo.techStack.join(';');
    }

    const jsonString = JSON.stringify(requestBody);
    try {
        const response = await fetch(`${path}/student/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        });

        if (!response.ok) {
            console.log(`modify failed`)
            throw new Error('Request failed');
        }

        const responseData = await response.json();
        return true
    }
    catch (error) {
        return false
    }
    return false
}
export async function updateTeacherInfo(teacherId: string, info: AccountInfo) {
    console.log(info)
    const requestBody: RequestBody = {};

    if (teacherId !== undefined) {
        requestBody.studentId = parseInt(teacherId);
    }

    if (info.name !== undefined) {
        requestBody.studentName = info.name;
    }
    const jsonString = JSON.stringify(requestBody);
    try {
        const response = await fetch(`${path}/teacher/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        });

        if (!response.ok) {
            console.log(`modify failed`)
            throw new Error('Request failed');
        }

        const responseData = await response.json();
        return true
    }
    catch (error) {
        return false
    }
    return false
}
export async function updateInfo(id: string, info: AccountInfo) {
    const identity = await getIdentity();
    if (identity === 'student' || identity === 'SA') return updateStudentInfo(await getStudentId(id), info);
    else if (identity === 'teacher') {
        return updateTeacherInfo((await getTeacherID(parseInt(id))).toString(), info)
    }
    else return false
}