import { User } from "next-auth"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { path } from '@/lib/utils'
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/layout/icons"
import Contact from "@/components/layout/contact"
import session from "@/lib/session"
import Bids from "@/components/screens/bids"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

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
    winner: Winner
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

interface Winner {
    id: string;
    claimed: boolean;
    itemId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    item: Item;
    user: User;
}

export default async function page({ params }: { params: { id: string } }) {
    const res = await fetch(path + '/api/items/' + params.id, { cache: 'no-store' })
    const user = (await session())?.user;
    const item: Item = await res.json()
    //@ts-ignore
    const winner = item?.winner[0]

    return (
        <div key="1" className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
            <div>
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
            <div className="grid gap-4 md:gap-8">
                <div className="flex items-center gap-4">
                    <Avatar className="w-6 h-6">
                        <AvatarImage alt="Seller Avatar" src={item?.user.image || "/placeholder-user.jpg"} />
                        <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{item?.user.name || "Full Name"}</span>
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{item?.name || "Item Name"}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-5">
                        {item?.description || "Item Description"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">₹{item?.bids.length === 0 ? item?.basePrice : item?.bids.slice(-1)[0].amount}</span>
                    {item?.bids.length != 0 && <span className="text-gray-500 line-through">{item?.basePrice}</span>}
                </div>
                <div className={`${item?.active ? 'text-emerald-600' : 'text-rose-600'} text-sm`}>{item?.active ? "Closing on " : "Closed on "} {item?.endedAt?.toString().slice(0, 10)}</div>
                {winner?.claimed && <p className="text-lg font-bold">🎉 Item has been claimed</p>}

                <Contact claimed={winner?.claimed} active={item.active} seller={item.user.id} buyer={user?.id} chat={'h'} details={item?.id} />

                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Bid</TableHead>
                                <TableHead>Date/Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="w-4 h-4">
                                            <AvatarImage alt="Seller Avatar" src={item?.user?.image || "/placeholder-user.jpg"} />
                                            <AvatarFallback>JS</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{item?.user.name || "Full Name"}</span>
                                    </div>
                                </TableCell>
                                <TableCell>₹{item?.basePrice}</TableCell>
                                <TableCell>{item?.createdAt.toString().slice(0, 10)} ~ {item?.createdAt.toString().slice(11, 16)}</TableCell>
                            </TableRow>

                            {item?.bids?.map((bid, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <Avatar className="w-4 h-4">
                                                    <AvatarImage alt="Seller Avatar" src={bid.user.image || "/placeholder-user.jpg"} />
                                                </Avatar>
                                                <span className="font-medium">{bid.user.name || "Full Name"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>₹{bid.amount}</TableCell>
                                        <TableCell>{bid.createdAt.toString().slice(0, 10)} ~ {bid.createdAt.toString().slice(11, 16)}</TableCell>
                                    </TableRow>
                                )
                            })}

                            <Bids id={params.id} />

                        </TableBody>
                    </Table>
                </div>

            </div>
        </div >
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