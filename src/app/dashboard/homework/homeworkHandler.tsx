'use server'
const debug = process.env.debug
const path = process.env.path
export async function getHomeworkById(homeworkId: string | undefined) {
    if (!homeworkId) return "unknown"
    const bodys: any = {
        homeworkId: parseInt(homeworkId)
    }
    const res = await fetch(`${path}/homework/list`, {
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