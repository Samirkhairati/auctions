"use client"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { CloudUploadIcon, XIcon, CalendarDaysIcon } from "@/components/layout/icons"
import { useEffect, useState } from "react"
function ItemForm() {

    // FORM STATE
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [date, setDate] = useState<Date | undefined>(() => new Date(new Date().setDate(new Date().getDate() + 1)));

    useEffect(() => {
        console.log(name, description, price, date)
    }, [name, description, price, date])

    return (
        <form className="space-y-6">


            <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter item name" type="text" />
            </div>


            <div className="space-y-2">
                <Label htmlFor="description">Item Description</Label>
                <Textarea onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Enter item description" rows={3} />
            </div>


            <div className="space-y-2">
                <Label htmlFor="price">Base Price</Label>
                <Input onChange={(e) => setPrice(Number(e.target.value))} id="price" placeholder="Enter base price" type="number" min='0' />
            </div>



            <div>
                <label className="block text-sm font-medium dark:text-gray-300" htmlFor="date">
                    Bidding End Date
                </label>
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm" id="date" type="button"><span className="flex items-center justify-between"><span className="truncate">Select a date</span><span className="ml-3 flex-shrink-0"><CalendarDaysIcon className="h-5 w-5" /></span></span></button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                        <Calendar selected={date} onSelect={setDate} initialFocus mode="single" />
                    </PopoverContent>
                </Popover>
            </div>



            <div>
                <label className="block text-sm font-medium" htmlFor="media">
                    Upload Media
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                        <CloudUploadIcon className="mx-auto h-12 w-12" />
                        <div className="flex text-sm text-gray-600">
                            <label
                                className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-600"
                                htmlFor="media"
                            >
                                <span>Upload a file</span>
                                <input accept="image/*,video/*" className="sr-only" id="media" multiple name="media" type="file" />
                            </label>
                        </div>
                        <p className="text-xs">PNG, JPG, MP4</p>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3">
                    <div className="relative group">
                        <Image
                            alt="Media Preview"
                            className="h-24 w-full rounded-md object-cover"
                            height={100}
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: "100/100",
                                objectFit: "cover",
                            }}
                            width={100}
                        />
                        <button
                            className="absolute top-1 right-1 hidden group-hover:block rounded-full bg-gray-800 bg-opacity-70 p-1 text-white hover:bg-gray-900"
                            type="button"
                        >
                            <XIcon className="h-4 w-4" />
                        </button>
                    </div>

                </div>
            </div>
            <div className="flex justify-end">
                <Button className=" hover:bg-primary-600" type="submit">
                    List Item
                </Button>
            </div>
        </form>
    )
}

export default ItemForm