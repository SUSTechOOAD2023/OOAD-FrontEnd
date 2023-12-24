"use server";

import { getCookie, setCookie } from "../../../cookie";
import { cookies } from "next/headers";

const debug = process.env.debug;
const path = process.env.path;

interface NewGroupInformation {
  groupDeadline: any;
  groupName: string;
  groupNumber: number;
  groupSize: number;
  groupTask: string;
  teacherId: number;
}

export default async function groupNew(param: NewGroupInformation) {
  if ("true" === "true") {
    return "success!";
  }

  const api = "new";
  const body = {
    groupDeadline: param.groupDeadline,
    groupName: param.groupName,
    groupNumber: param.groupNumber,
    groupSize: param.groupSize,
    groupTask: param.groupTask,
    teacherId: param.teacherId,
  };

  const request = new Request(
    `${path}/group/${api}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const res = await fetch(await getCookie(request));

  if (res.ok) {
    const resText = await res.text();
    if (resText == "success!") {
      setCookie(res);
    }
    return resText;
  } else {
    return "Unknown error!";
  }
}
