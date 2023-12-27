'use server'

const debug = process.env.debug
const path = process.env.path

export interface SubmitOverView {
    studentName: string,
    score: number,
    comment?: string,
    content: string,
}
export default async function getSubmitOverview(id: number) {
    return [
        {
            studentName: "Hu Tao",
            score: 100,
            comment: "Good",
            content: "print('I love Genshin')"
        },
        {
            studentName: "Sending Liu",
            score: 100,
            comment: "Great",
            content: "print('I love Genshin too')"
        }
    ]
}