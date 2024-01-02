'use server'

const debug = process.env.debug
const path = process.env.path

export interface SubmitOverView {
    studentName: string,
    score: number,
    comment?: string,
    content: string,
    id: number,
    modified: boolean
}
const urls = {
  "all": "/submission/list",
  "max": "/submission/queryMaxScore",
  "latest": "/submission/listLatest"
}
export default async function getSubmitOverview(studentId: string | null, homeworkId: string, mode="all") {
    const debugValue = [
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
    if (debug === 'true') return debugValue;
    else {
        try {
          console.log("finding submission")
            const bodys: any = {
              homeworkId: homeworkId
            }
            if (studentId) {
              bodys.studentId = studentId
            }
            console.log(`${path}${urls[mode]}`)

            const response = await fetch(`${path}${urls[mode]}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
              },
              body: JSON.stringify(bodys)
            });
        
            if (!response.ok) {
              throw new Error('Request failed');
            }
        
            const responseData = await response.json();
            // const jsonArr = JSON.parse(responseData)
            const formattedArr = responseData.map((submission) => {
                return {
                  studentName: submission.studentName,
                  score: submission.submissionScore,
                  comment: submission.submissionComment || "",
                  content: submission.submissionContent,
                  id: submission.submissionId,
                  modified: false
                };
              });
            return formattedArr;
          } catch (error) {
            console.error('Error:', error);
            return null;
          }
    }
}