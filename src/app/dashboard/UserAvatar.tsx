'use client'

const path = process.env.path
import Image from 'next/image';
import { downloadAvatar } from './avatarHandler';
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
    if ((!id || id === "-1")) {
      getId().then(id => {
        const idCurrent = id;
        downloadAvatar(idCurrent).then(t => {
          if (t !== null) {
            const binData = atob(t);
            const bytes = new Uint8Array(binData.split("").map(c => c.charCodeAt(0)));
            const url = URL.createObjectURL(new Blob([bytes], { type: "image/jpeg" }));
            setAvatarSrc(url);
          } else {
            setAvatarSrc("/paimon.png");
          }
        });
      });
    } else {
      // const idCurrent = id;
      // downloadAvatar("6")//.then(t => {
      //   if (t !== null) {
      //     const binData = atob(t);
      //     const bytes = new Uint8Array(binData.split("").map(c => c.charCodeAt(0)));
      //     const url = URL.createObjectURL(new Blob([bytes], { type: "image/jpeg" }));
      //     setAvatarSrc(url);
      //   } else {
      //     setAvatarSrc("/paimon.png");
      //   }
      // });
    }
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