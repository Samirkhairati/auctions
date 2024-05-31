'use client'

import { pusherClient } from '@/lib/pusher'
import { useEffect } from 'react'

function Page() {

  useEffect(() => {
    pusherClient.subscribe('y123')
    pusherClient.bind('event', function (data: any) {
      alert(data)
    })
  },[])

  return (
    <div>Page</div>
  )
}

export default Page