'use server'

const debug = process.env.debug
const path = process.env.path

export interface SubmitOverView {
    studentName?: string,
    score?: number,
    comment?: string,
    content?: string,
    id: number,
    modified?: boolean
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
            console.log(bodys)

            const response = await fetch(`${path}${urls[mode]}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(bodys),
              cache: "no-store"
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
                  deadline: submission.homeworkDdl,
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



export const reviewHomeworks = (submission: SubmitOverView) => {
  const id = submission.id
  const bodys: any = {
    }

}
export const submitHomework = async (homeworkId, submissionContent, studentId: any = null, groupId: any = null) => {
  // Check that either studentId or groupId is provided, but not both
  // console.log(studentId)
  // console.log(groupId)
  if ((studentId === null && groupId === null) || (studentId !== null && groupId !== null)) {
      throw new Error('Either studentId or groupId must be provided, but not both');
  }

  // Prepare the body of the request
  const body: any = {
      homeworkId: homeworkId,
      submissionContent: submissionContent
  };

  // Add studentId or groupId to the request body
  if (studentId) {
      body.studentId = studentId;
  } else {
      body.groupId = groupId;
  }

  try {
      const response = await fetch(`${path}/submission/new`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store'
          },
          body: JSON.stringify(body)
      });

      // Check if the response is OK
      if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status);
      }

      // Parse and return the response data
      const responseData = await response.json();
      return responseData;

  } catch (error) {
      console.error('Error submitting homework:', error);
      throw error;
  }
};
