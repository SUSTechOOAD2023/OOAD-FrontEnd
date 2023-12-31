
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
    email?: string,
    id?: string
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
    return fetch(`${path}/student/list?studentId=${studentId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Request failed');
        }
        return res.json();
      })
      .then((responseData) => {
        let stack = [];
        if (responseData.student && responseData.student.technicalStack) {
          stack = responseData.student.technicalStack.split(';');
        }
        return {
          name: responseData.student.studentName,
          sign: responseData.student.studentInformation,
          techStack: stack,
          email: responseData.account.email,
          id: responseData.student.accountId
        };
      })
      .catch((error) => {
        console.log("Invalid JSON response");
        return {
          name: "No Such Student",
          email: "404",
          techStack: [],
            id: "-2"
        };
      });
  }
interface RequestBody {
    studentId?: number;
    teacherId?: number;
    studentName?: string;
    studentInformation?: string;
    technicalStack?: string;
    teacherName?: string;
}
export async function updateStudentInfo(studentId: string, studentInfo: AccountInfo) {
    // console.log(studentInfo)
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
    console.log(requestBody)
    const jsonString = JSON.stringify(requestBody);
    return fetch(`${path}/student/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonString
    })
    .then(response => {
        // console.log(response.text())
        if (!response.ok) {
            console.log(`modify failed`);
            throw new Error('Request failed');
            return response.json();
        }
        return "response.json();"
    })
    .then(responseData => {
        return true;
    })
    .catch(error => {
        console.error(error);
        return false;
    });
}

export async function updateTeacherInfo(teacherId: string, info: AccountInfo) {
    console.log(info)
    const requestBody: RequestBody = {};

    if (teacherId !== undefined) {
        requestBody.teacherId = parseInt(teacherId);
    }

    if (info.name !== undefined) {
        requestBody.teacherName = info.name;
    }
    console.log(requestBody)

    const jsonString = JSON.stringify(requestBody);
    return fetch(`${path}/teacher/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonString
    })
    .then(response => {
        if (!response.ok) {
            console.log(`modify failed`);
            throw new Error('Request failed');
        }
        return true;//response.json();
    })
    .then(responseData => {
        return true;
    })
    .catch(error => {
        console.error(error);
        return false;
    });
}

export async function updateInfo(id: string, info: AccountInfo) {
    return getIdentity()
      .then((identity) => {
        if (identity === 'student' || identity === 'SA') {
          return getStudentId(id).then((studentId) => updateStudentInfo(studentId, info));
        } else if (identity === 'teacher') {
          return getTeacherID(parseInt(id)).then((teacherId) => updateTeacherInfo(teacherId.toString(), info));
        } else {
          return false;
        }
      });
  }