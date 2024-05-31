"use client"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CloudUploadIcon, XIcon, CalendarDaysIcon } from "@/components/layout/icons"
import { useState } from "react"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
import Preview from "../layout/preview"
import axios from 'axios';

interface UploadedFile {
    resource_type: string;
    secure_url: string;
}


function ItemForm() {

    // FORM FIELDS
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [date, setDate] = useState<Date | undefined>(() => new Date(new Date().setDate(new Date().getDate() + 1)));
    const [files, setFiles] = useState<UploadedFile[]>([])

    // LOADING STATES
    const [fileLoading, setFileLoading] = useState<boolean>(false)
    const [formLoading, setFormLoading] = useState<boolean>(false)

    // Upload to cloudinary
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const data = new FormData();
        data.append('file', e.target.files![0]);
        data.append('upload_preset', 'preset');

        try {
            setFileLoading(true)
            const result = await fetch('https://api.cloudinary.com/v1_1/dkytadhg9/auto/upload', {
                method: 'POST',
                body: data,
            });
            const file = await result.json()
            setFiles((prev) => [...prev, {
                resource_type: file.resource_type,
                secure_url: file.secure_url,
            }])

        } catch (error) {
            toast.error("Couldn't upload file")
        } finally {
            setFileLoading(false)
        }

    }

    //post data
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormLoading(true)
        await axios.post('/api/items', {
            name,
            description,
            price,
            date,
            files
        })
            .then(function (response) {
                toast.success("Item listed successfully")
                setFormLoading(false)

            })
            .catch(function (error) {
                toast.error("Couldn't list item. Make sure all fields are correct." )
                setFormLoading(false)
            });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

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
                        <button className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm" id="date" type="button"><span className="flex items-center justify-between"><span className="truncate">Select a date ({date?.toISOString().slice(0, 10)})</span><span className="ml-3 flex-shrink-0"><CalendarDaysIcon className="h-5 w-5" /></span></span></button>
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
                                <input onChange={handleFileChange} accept="image/*,video/*" className="sr-only" id="media" name="media" type="file" />
                            </label>
                        </div>
                        <p className="text-xs">PNG, JPG, MP4</p>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3">

                    {files.map((file, index) => (
                        <Preview key={index} {...file} />
                    ))}

                </div>
            </div>
            <div className="flex justify-end">
                <Button disabled={fileLoading || formLoading} className=" hover:bg-primary-600" type="submit">
                    {(fileLoading || formLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    List Item
                </Button>
            </div>
        </form>
    )
}

export default ItemForm