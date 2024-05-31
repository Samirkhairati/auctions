import { User } from "next-auth"
import { path } from "@/lib/utils"
import session from "@/lib/session"
import Message from "@/components/layout/chat/message"
import Friend from "@/components/layout/chat/friend"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SendIcon } from "@/components/layout/icons"
import Chatbox from "@/components/layout/chat/chatbox"

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

export default async function Chat({ params }: { params: { id: string } }) {
    const user = (await session())?.user;
    const userRooms: UserRoom[] = await (await fetch(`${path}/api/rooms/${user?.id}`, { cache: 'no-store' })).json();
    const friends = userRooms?.map((userRoom) => {
        return { userId: userRoom.room.users[0].userId !== user?.id ? userRoom.room.users[0].user : userRoom.room.users[1].user, roomId: userRoom.roomId }
    })
    const currentRoom = userRooms.find((userRoom) => userRoom.roomId === params.id)
    const currentFriend = currentRoom?.room.users[0].userId !== user?.id ? currentRoom?.room.users[0].user : currentRoom?.room.users[1].user
    const messages = await (await fetch(`${path}/api/messages/${params.id}`, { cache: 'no-store' })).json();
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="grid grid-cols-[300px_1fr] max-w-4xl h-[500px] w-full rounded-lg border">
                <div className="md:block hidden bg-gray-100/20 p-3 border-r dark:bg-gray-800/20">
                    <div className="grid gap-2">
                        {friends?.map((friend, index) => (
                            <Friend key={index} name={friend?.userId.name as string} image={friend?.userId.image as string} friendId={friend?.roomId as string} />
                        ))}
                    </div>
                </div>
                <div className="">
                    <div className="p-3 flex border-b items-center">
                        <div className="flex items-center gap-2">
                            <Avatar className="border w-10 h-10">
                                <AvatarImage alt="Image" src={currentFriend?.image || "/placeholder-user.jpg"} />
                                <AvatarFallback>O</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                                <p className="text-sm font-medium leading-none">{currentFriend?.name}</p>
                            </div>
                        </div>
                    </div>
                    <Chatbox initialMessages={messages} roomId={params.id} userId={user?.id as string} />
                </div>
            </div>
        </div>

    )
}