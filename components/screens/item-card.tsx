import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/layout/icons"
import Image from "next/image"
import { User } from "next-auth"
import Options from "../layout/options"

interface Item {
  id: string;
  name?: string;
  description?: string;
  basePrice?: number;
  active: boolean;
  endedAt?: Date;
  userId: string;
  user: User;
  media: Media[];
  bids: Bid[];
  createdAt: Date;
  updatedAt: Date;
}

interface Media {
  id: string;
  resource_type: string;
  secure_url: string;
  itemId: string;
  item: Item;
}

interface Bid {
  id: string;
  amount: number;
  itemId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  item: Item;
  user: User;
}


export default function Component({ item }: { item: Item }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm mx-auto pb-3">
      <div className="relative">
        <Carousel className="aspect-[4/3]">
          <CarouselContent>
            {item?.media.map((media2, index) => {
              return <CarouselMedia key={index} resource_type={media2.resource_type} secure_url={media2.secure_url} />
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
            <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
          </CarouselPrevious>
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
            <ChevronRightIcon className="h-4 w-4 text-gray-600" />
          </CarouselNext>
        </Carousel>
      </div>
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-bold">{item?.name}</h2>
        <div className="flex item?s-center space-x-3">
          <div className="text-2xl font-bold">₹{item?.bids.length === 0 ? item?.basePrice : item?.bids.slice(-1)[0].amount}</div>
          {item?.bids.length != 0 && <div className="text-gray-500 line-through">{item?.basePrice}</div>}
        </div>
        <div className="flex item?s-center justify-between">
          <div className={`${item?.active ? 'text-emerald-600' : 'text-rose-600'} text-sm`}>{item?.active ? "Closing on " : "Closed on "} {item?.endedAt?.toString().slice(0, 10)}</div>
          <div className="text-gray-500 text-sm">{item?.bids.length} bids</div>
        </div>
        <div className="flex items-center space-x-3 my-10">
          <div className="flex item?s-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage alt="Seller Avatar" src={item?.user.image || "/placeholder-user.jpg"} />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="font-medium text-sm">{item?.user.name}</div>
          </div>
          <Options chat={'hi'} details={item.id} />
        </div>
      </div>
    </div>
  )
}

function CarouselMedia({ resource_type, secure_url }: { resource_type: string, secure_url: string }) {
  if (resource_type === "image") {
    return (
      <CarouselItem>
        <Image
          alt="Item Image"
          className="object-cover w-full h-full"
          height={225}
          src={secure_url || "/placeholder.svg"}
          style={{
            aspectRatio: "300/225",
            objectFit: "cover",
          }}
          width={300}
        />
      </CarouselItem>
    )
  } else if (resource_type === "video") {
    return (
      <CarouselItem>
        <div className="w-full h-full flex items-center justify-center">
          <video className="shadow-md h-60" controls>
            <source src={secure_url || "/placeholder.svg"} type="video/mp4" />
          </video>
        </div>
      </CarouselItem>

    )
  }
}

