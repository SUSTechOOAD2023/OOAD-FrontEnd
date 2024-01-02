'use client'

import Image from 'next/image';
import { downloadAvatar } from './avatarHandler';
import { getId } from './accountIdHandler';
import { useEffect, useState } from 'react';

interface UserAvatarParam {
  width: number,
  height: number,
  id?: string
}

export default function UserAvatar({ width, height, id = "-1" }: UserAvatarParam) {
  const [avatarSrc, setAvatarSrc] = useState("/paimon.png")

  useEffect(() => {
    let idCurrent = id;
    const fetchData = async () => {
      let t: Promise<any> | null = null
      // console.log(id);
      if ((!id || id === "-1")) getId()
        .then(id => downloadAvatar(id))
        .then((t) => {
          if (t !== null) {
            const binData = atob(t);
            const bytes = new Uint8Array(binData.split("").map(c => c.charCodeAt(0)));
            const url = URL.createObjectURL(new Blob([bytes], { type: "image/jpeg" }));
            setAvatarSrc(url);
          } else {
            setAvatarSrc("/paimon.png");
          }
        }
        )
      // const t = await downloadAvatar(idCurrent);

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