'use server'

import { revalidateTag } from "next/cache"

const debug = process.env.debug
const path = process.env.path

export interface SubmitOverView {
    studentName?: string,
    score?: number,
    comment?: string,
    content?: string,
    id: number | null,
    modified?: boolean,
    submitTime?: string,
    studentId: number
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
                  studentName: submission.studentName === null ? submission.studentName : submission.groupName,
                  score: submission.submissionScore,
                  comment: submission.submissionComment || "",
                  content: submission.submissionContent,
                  id: submission.submissionId,
                  deadline: submission.homeworkDdl,
                  modified: false,
                  studentId: submission.studentId
                };
              });
            return formattedArr;
          } catch (error) {
            console.error('Error:', error);
            return null;
          }
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
export async function reviewSubmission(submissionId: string, submissionScore, submissionComment) {
  const url = `${path}/submission/review`;

  const body: any = {
      submissionId: parseInt(submissionId),
  };
  if (submissionScore) body.submissionScore = submissionScore;
  if (submissionComment) body.submissionComment = submissionComment;

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      });

      if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status);
      }

      // Assuming the response is JSON. Modify as needed based on your API's response format.
      const responseData = await response.json();
      return responseData;
  } catch (error) {
      console.error('Error in reviewSubmission:', error);
      throw error;
  }
}
export async function getFileList(studentId, homeworkId) {
  try {
    const response = await fetch(`${path}/download/viewFileNames?fileName=file/${studentId}/${homeworkId}/`);
      const responseData = await response.json()
      const datas =responseData.data
      // console.log(datas)
      if (!datas || datas.length === 0) return []
      const maxElement = datas.reduce((max, current) => {
        if (current > max) {
          return current;
        } else {
          return max;
        }
      });
      const response2 = await fetch(`${path}/download/viewFileNames?fileName=${maxElement}`);
      console.log(`${path}/download/viewFileNames?fileName=file/${studentId}/${homeworkId}/${maxElement}/`)
      const responseData2 = await response2.json()
      const datas2 = responseData2.data
      console.log(datas2)
      return datas2
  } catch (error) {
      console.error('Error in getFile:', error);
      throw error;
  }
}
export async function downloadFile(filepath) {
  try {
    const response = await fetch(`${path}/download/file?fileName=file/${filepath}`,{
      next: {
        tags: ["file" + filepath]
      }
    });
    if (response.ok) {
      revalidateTag("file" + filepath)
      const data = await response.json()
      return data.data.body
    }
  }catch (error) {
    console.error('Error in getFile:', error);
    throw error;
}
}