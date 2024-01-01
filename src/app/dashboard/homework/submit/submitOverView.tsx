'use server'

const debug = process.env.debug
const path = process.env.path

export interface SubmitOverView {
    studentName: string,
    score: number,
    comment?: string,
    content: string,
}
export default async function getSubmitOverview(studentId: string, homeworkId: string) {
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
            const response = await fetch(`${path}/submission/list`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                homeworkId: homeworkId

              })
            });
        
            if (!response.ok) {
                console.log(`${studentId}, ${homeworkId}`)
              throw new Error('Request failed');
            }
        
            const responseData = await response.json();
            // const jsonArr = JSON.parse(responseData)
            const formattedArr = responseData.map((submission) => {
                return {
                  studentName: String( submission.studentId),
                  score: submission.submissionScore,
                  comment: submission.submissionComment || "",
                  content: submission.submissionContent
                };
              });
            return formattedArr;
          } catch (error) {
            console.error('Error:', error);
            return null;
          }
    }
}