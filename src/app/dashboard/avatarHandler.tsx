'use server'

import { noCacheHeader } from "@/noCacheHeader"
import { revalidateTag } from "next/cache"

const debug = process.env.debug
const path = process.env.path

export async function downloadAvatar(id: string) {
  if (debug === "true") {
    return null;
  }

  return fetch(`${path}/download/userimg?accountID=${id}`, {
    next: {
      tags: ["avatar" + id]
    }
  })
  .then(res => {
    if (res.ok) {
      return res.text();
    } else {
      console.log(`Error on downloading avatar, id ${id}`);
      return null;
    }
  })
  .then(t => {
    if (t) {
      return JSON.parse(t).data.body;
    } else {
      return null;
    }
  });
}


export async function uploadAvatar(id: string, data: FormData) {
  if (debug === "true") {
    return true;
  }

  console.log('upload!');

  try {
    const res = await fetch(`${path}/upload/userimg?accountID=${id}`, {
      method: "POST", 
      body: data,
      headers: noCacheHeader()
    });

    revalidateTag("avatar" + id);

    if (res.ok) {
      // console.log(await res.text())
      return "ok";
    } else {
      // 处理错误情况
      const message = (await res.json()).message
      console.error('Error uploading avatar:', message);
      return message;
    }
  } catch (error) {
    console.error('Error:', error);
    return "Upload Error";
  }
}
