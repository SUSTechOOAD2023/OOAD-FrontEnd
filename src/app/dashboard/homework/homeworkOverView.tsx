'use server'

const debug = process.env.debug
const path = process.env.path

export interface HomeworkOverview {
    id: string,
    uid: string,
    name: string,
    deadline: Date,
    courseName?: string,
    resubmission: number,
    description: string
}

export default async function getHomeworkOverview(id: string): Promise<HomeworkOverview[]> {
    const debugValue = [
        {
            id: "CS666",
            uid: "1",
            name: "Assignment 1",
            deadline: new Date('2023-11-30T23:59:59'),
            courseName: "Data Structure and Analysis",
            resubmission: 6,
            description: "6"
        },
        {
            id: "CS888",
            uid: "3",
            name: "Assignment 2",
            deadline: new Date('2023-11-17T23:59:59'),
            courseName: "Object Oriented Analysis Design",
            resubmission: 6,
            description: "6"
        },
    ]
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
        deadline: new Date(responseData2.homeworkDdl),
        courseName: '',
        resubmission: 0,
        description: responseData2.homeworkContent
    };
}
export async function addHomework(homework: HomeworkOverview) {
    //TODO
}