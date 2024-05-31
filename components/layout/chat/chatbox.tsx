/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { User } from "next-auth";
import { useEffect, useState } from "react";
import Message from "@/components/layout/chat/message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "@/components/layout/icons";
import toast from "react-hot-toast";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  roomId: string;
  user: User;
  room: Room;
}
interface UserRoom {
  userId: string;
  roomId: string;
  user: User;
  room: Room;
}
interface Room {
  id: string;
  users: UserRoom[];
}


export default function Chatbox({ initialMessages, roomId, userId }: { initialMessages: any, roomId: string, userId: string }) {

  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [text, setText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    pusherClient.subscribe(roomId)
    pusherClient.bind('message', (data: any) => {
      setMessages((prev) => [...prev, data])
    })

    return () => {
      pusherClient.unsubscribe(roomId)
    }
  }, [])

  const handleEnter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await axios.post(`/api/messages/`, { content: text, userId, roomId })
      .then((res: any) => {
        setLoading(false)
      })
      .catch((error: any) => {
        toast.error(error.response.data.message)
        setLoading(false)
      })
    setText("")
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-3 h-[370px] overflow-y-auto">
        {messages?.map((message, index) => {
          return <Message key={index} text={message.content} user={message.user} />
        })}
      </div>
      <div className="border-t">
        <form onSubmit={handleEnter} className="flex w-full items-center space-x-2 p-3">
          <Input value={text} onChange={(e) => setText(e.target.value)} autoComplete="off" className="flex-1" id="message" placeholder="Type your message..." />
          <Button disabled={loading} size="icon" type="submit">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> :<SendIcon className="h-4 w-4" />}
          </Button>
        </form>
      </div>

    </>

  )
}




