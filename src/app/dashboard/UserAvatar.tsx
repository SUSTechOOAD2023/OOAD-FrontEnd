'use client'

import Image from 'next/image';
import { downloadAvatar } from './avatarHandler';
import { getId } from './accountIdHandler';
import { useEffect, useState } from 'react';

interface UserAvatarParam {
  width: number, 
  height: number
}

export default function UserAvatar({ width, height }: UserAvatarParam) {
  const [avatarSrc, setAvatarSrc] = useState("/paimon.png")

  useEffect(() => {
    getId()
      .then(id => downloadAvatar(id))
      .then(t => {
        if (t !== null) {
          console.log("t is : " + t)
          const binData = atob(t)
          const bytes = new Uint8Array(binData.split("").map(c => c.charCodeAt(0)))
          const url = URL.createObjectURL(new Blob([bytes], { type: "image/jpeg" }))
          setAvatarSrc(url)
        } else {
          setAvatarSrc("/paimon.png")
        }
      })
  }, [])

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