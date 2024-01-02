'use client'

import {downloadAvatar2} from "@/app/dashboard/testHandler";

const path = process.env.path
import Image from 'next/image';
import {downloadAvatar} from './avatarHandler';
import { getId } from './accountIdHandler';
import { useEffect, useState } from 'react';

interface UserAvatarParam {
  width: number,
  height: number,
  id?: string,
  student?: boolean
}

export default function UserAvatar({ width, height, id = "-1" }: UserAvatarParam) {
  const [avatarSrc, setAvatarSrc] = useState("/paimon.png")

  useEffect(() => {
    let idCurrent = id;
    const fetchData = async () => {
      console.log(id);
      idCurrent = (!id || id === "-1") ? await getId() : id
      const t = await downloadAvatar(idCurrent);
      if (t !== null) {
        const binData = atob(t);
        const bytes = new Uint8Array(binData.split("").map(c => c.charCodeAt(0)));
        const url = URL.createObjectURL(new Blob([bytes], { type: "image/jpeg" }));
        setAvatarSrc(url);
      } else {
        setAvatarSrc("/paimon.png");
      }
    };

    fetchData();
  }, []);

  return (
    <Image
      src={avatarSrc}
      alt="Avatar"
      width={width}
      height={height}
      style={{
        objectFit: "cover"
      }}
      priority
    />
  )
}