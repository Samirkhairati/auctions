'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Link from "next/link"
import { SendIcon } from "@/components/layout/icons"
import Message from "@/components/layout/chat/message"
import Friend from "@/components/layout/chat/friend"

export default function Chat() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="grid grid-cols-[300px_1fr] max-w-4xl h-[500px] w-full rounded-lg border">
                <div className="md:block hidden bg-gray-100/20 p-3 border-r dark:bg-gray-800/20">

                    <div className="grid gap-2">
                        <Friend />
                    </div>
                </div>
                <div className="">
                    <div className="p-3 flex border-b items-center">
                        <div className="flex items-center gap-2">
                            <Avatar className="border w-10 h-10">
                                <AvatarImage alt="Image" src="/placeholder-user.jpg" />
                                <AvatarFallback>O</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 p-3 h-[370px] overflow-y-auto">

                        <Message />

                    </div>
                    <div className="border-t">
                        <form className="flex w-full items-center space-x-2 p-3">
                            <Input autoComplete="off" className="flex-1" id="message" placeholder="Type your message..." />
                            <Button size="icon" type="submit">
                                <span className="sr-only">Send</span>
                                <SendIcon className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}