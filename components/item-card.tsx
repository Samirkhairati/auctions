import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/layout/icons"
import Image from "next/image"




export default function Component() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto">
      <div className="relative">
        <Carousel className="aspect-[4/3]">
          <CarouselContent>
            <CarouselMedia /> <CarouselMedia /> <CarouselMedia /> <CarouselMedia />
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
        <h2 className="text-xl font-bold">Vintage Leather Satchel</h2>
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-bold">$99.99</div>
          <div className="text-gray-500 line-through">$149.99</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-gray-500 text-sm">Listed on May 15, 2023</div>
          <div className="text-gray-500 text-sm">10 bids</div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage alt="Seller Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="font-medium text-sm">John Doe</div>
          </div>
          <Button size="sm" variant="outline">
            Chat with Seller
          </Button>
        </div>
      </div>
    </div>
  )
}

function CarouselMedia() {
  return (
    <CarouselItem>
      <Image
        alt="Item Image"
        className="object-cover w-full h-full"
        height={225}
        src="/placeholder.svg"
        style={{
          aspectRatio: "300/225",
          objectFit: "cover",
        }}
        width={300}
      />
    </CarouselItem>
  )
}