"use server";

import { downloadAvatar } from "../avatarHandler";
const debug = process.env.debug;
const path = process.env.path;

interface Group {
  classId: number;
  groupDeadline: string;
  groupName: string;
  groupTask: string;
  groupVisible: number;
}


export async function groupEdit(kind: number, param: Group) {
  if (debug === "true") {
    return "success!";
  }
  console.log("---------------");
  const body =
    kind === 0
      ? {
          groupDeadline: param.groupDeadline,
          groupName: param.groupName,
          groupVisible: param.groupVisible,
        }
      : {
          groupDeadline: param.groupDeadline,
          groupName: param.groupName,
          groupTask: param.groupTask,
        };

  const res = await fetch(`${path}/group/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log(res);
  console.log(res.ok);
  if (res.ok) {
    return "success!";
  } else {
    return "Unknown error!";
  }
}

export async function groupNew(id: number, name: string, deadline: string) {
  if (debug === "true") {
    return 12110924;
  }
  const url = `${path}/group/new?classId=${id}&groupDeadline=${deadline}&groupName=${name}`;
  const res = await fetch(url, {
    method: "POST",
  });
  const out = parseInt(await res.text());
  if (res.ok) {
    return out;
  } else {
    return 0;
  }
}

export async function getInfo(id: number) {
  if (debug === "true") {
    return {
      classId: 1,
      groupDeadline: 1684683000000,
      groupId: 4,
      groupName: "aaa",
      groupSize: 3,
      groupTask: "ML",
    };
  }
  const url = `${path}/group/list?groupId=${id}`;
  const res = await fetch(url, {
    method: "POST",
  });
  const out = await res.json();
  if (res.ok) {
    return out;
  } else {
    return {};
  }
}

export async function getAll(id: number) {
  if (debug === "true") {
    return true;
  }

  const url = `${path}/group/selectGroupStatus?classId=${id}`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });
  const out = await res.json();
  console.log("---------------");
  console.log(out);
  console.log("---------------");
  if (out !== null) return out;
  else return [];
}

export async function getMy(classid: number, id: string) {
  if (debug === "true") {
    return [];
  }

  const url = `${path}/group/selectGroup?classId=${classid}&studentId=${id}`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });
  const out = await res.json();
  console.log("---------------");
  console.log(out);
  console.log("---------------");
  if (out !== null) return out;
  else return [];
}

export async function DeleteGroup(id: number) {
  if (debug === "true") {
    return true;
  }

  const url = `${path}/group/delete?groupId=${id}`;
  const res = await fetch(url, {
    method: "POST",
  });
  return res.ok;
}

export async function Join(groupid: number, id: number) {
  if (debug === "true") {
    return true;
  }
  const url = `${path}/relationshipStudentClassGroup/addStudentToGroup?groupId=${groupid}&studentId=${id}`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
    
  });
  console.log("join",groupid,id);
  console.log("suc");
  console.log(res)
  console.log(res.ok);
  return res.ok;
}

export async function Exit(groupid: number, id: number) {
  if (debug === "true") {
    return true;
  }

  const url = `${path}/relationshipStudentClassGroup/deleteStudentFromGroup?groupId=${groupid}&studentId=${id}`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });
  console.log("exit",groupid,id)
  console.log(res)
  console.log(res.ok);
  return res.ok;
}

export async function Invite(groupid: number, recid: number, sendid: number) {
  if (debug === "true") {
    return true;
  }

  const url = `${path}/joinGroupInvitation/add?groupId=${groupid}&receiveStudentId=${recid}&sendStudentId=${sendid}`;
  const res = await fetch(url, {
    method: "POST",
  });
  console.log(res.ok);
  return res.ok;
}

export async function getStudent(groupid: number) {
  if (debug === "true") {
    return [
      { studentId: 1, studentName: "sending" },
      { studentId: 3, studentName: "student8" },
    ];
  }

  const url = `${path}/relationshipStudentClassGroup/listStudent?groupId=${groupid}`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });
  const out = await res.json();
  console.log("---------------");
  console.log(out);
  console.log("---------------");
  if (out !== null) return out;
  else return [];
}

export interface User {
  id: string;
  name: string;
}
export async function getInvites(groupid: number) :Promise<User[]> {
  if (debug === "true") {
    return [
      { id: "7", name: "A" },
      { id: "8", name: "B" },
      { id: "9", name: "C" },
    ];
  }

  const url = `${path}/relationshipStudentClassGroup/listStudent?groupId=${groupid}`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });
  const out = await res.json();
  console.log("---------------");
  console.log(out);
  console.log("---------------");
  if (out !== null) return out;
  else return [];
}