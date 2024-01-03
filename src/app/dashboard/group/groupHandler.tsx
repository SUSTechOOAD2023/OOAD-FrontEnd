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
  preName: string;
  preTime: string;
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
          groupPresentation: param.preName,
          presentationTime: param.preTime,
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
    cache: "no-store",
  });
  const out = parseInt(await res.text());
  console.log(out);
  console.log(res);
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
      groupPresentation: "OOAD答辩",
      groupSize: 19,
      groupTask: "ML",
      groupVisible: 1,
      presentationTime: 1706196780000,
    };
  }
  const url = `${path}/group/list?groupId=${id}`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });
  const out = await res.json();
  console.log(out);
  if (res.ok) {
    return out;
  } else {
    return {};
  }
}

export async function getAll(id: number, identity: string) {
  if (debug === "true") {
    return [
      {
        classId: 1,
        groupDeadline: 1684683000000,
        groupId: 4,
        groupName: "aaa",
        groupSize: 18,
        groupTask: "ML",
      },
      {
        classId: 1,
        groupDeadline: 1705483077000,
        groupId: 18,
        groupName: "asdd",
        groupSize: 0,
        groupTask: "",
        groupVisible: 0,
      },
      {
        classId: 1,
        groupDeadline: 1704159188000,
        groupId: 23,
        groupName: "GroupName",
        groupSize: 0,
      },
      {
        classId: 1,
        groupDeadline: 1704474640000,
        groupId: 25,
        groupName: "Group1",
        groupSize: 0,
      },
    ];
  }

  const url =
    identity === "student"
      ? `${path}/group/selectGroupStatus?classId=${id}&expired=0&visible=1`
      : `${path}/group/selectGroupStatus?classId=${id}`;
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

export async function getSelc(
  id: number,
  expired: string,
  valid: string,
  visible: string
) {
  if (debug === "true") {
    return [
      {
        classId: 1,
        groupDeadline: 1684683000000,
        groupId: 4,
        groupName: "aaa",
        groupSize: 18,
        groupTask: "ML",
      },
      {
        classId: 1,
        groupDeadline: 1705483077000,
        groupId: 18,
        groupName: "asdd",
        groupSize: 0,
        groupTask: "",
        groupVisible: 0,
      },
    ];
  }

  let url = `${path}/group/selectGroupStatus?classId=${id}`;
  if (expired !== "-1") url = url + `&expired=${parseInt(expired)}`;
  if (valid !== "-1") url = url + `&valid=${parseInt(valid)}`;
  if (visible !== "-1") url = url + `&visible=${parseInt(visible)}`;
  console.log(expired, valid, visible);
  console.log(url);
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
  return res.ok;
}

export async function Invite(groupid: number, recid: number, sendid: number) {
  if (debug === "true") {
    return true;
  }

  const url = `${path}/joinGroupInvitation/add?groupId=${groupid}&receiveStudentId=${recid}&sendStudentId=${sendid}`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });
  console.log(res.ok);
  return res.ok;
}

export async function getStudent(groupid: number) {
  if (debug === "true") {
    return [
      { studentId: 2, studentName: "sending" },
      { studentId: 3, studentName: "student8" },
    ];
  }

  const url = `${path}/relationshipStudentClassGroup/listStudent?groupId=${groupid}`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });
  const out = await res.json();
  if (out !== null) return out;
  else return [];
}

export interface User {
  id: string;
  name: string;
}
export async function getInvites(groupid: number) {
  if (debug === "true") {
    return [
      { studentId: "7", studentName: "A" },
      { studentId: "8", studentName: "B" },
      { studentId: "9", studentName: "C" },
    ];
  }

  const url = `${path}/group/selectStudentNotInGroup?groupId=${groupid}`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });
  const out = await res.json();
  if (out !== null) return out;
  else return [];
}
