import ItemCard from '@/components/screens/item-card'
import React from 'react'

function page() {
  return (
    <>
      <video className="shadow-md" height="225" controls>
        <source src={"https://res.cloudinary.com/dkytadhg9/video/upload/v1717021093/zna96z3ts1wf6j1q9icg.mp4" || "/placeholder.svg"} type="video/mp4" />
      </video>
    </>
  )
}

export default page
