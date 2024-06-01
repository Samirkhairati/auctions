import Friend from "@/components/layout/chat/friend"
import { User } from "next-auth"
import { path } from "@/lib/utils"
import session from "@/lib/session"
import getUserRooms from "@/actions/getUserRooms";

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

export default async function Chat() {
    const user = (await session())?.user;
    //@ts-ignore
    const userRooms: UserRoom[] = await getUserRooms(user?.id as string)
    const friends = userRooms?.map((userRoom) => {
        return { userId: userRoom.room.users[0].userId !== user?.id ? userRoom.room.users[0].user : userRoom.room.users[1].user, roomId: userRoom.roomId }
    })

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="grid grid-cols-[300px_1fr] max-w-4xl h-[500px] w-full rounded-lg border">
                <div className="block bg-gray-100/20 p-3 border-r dark:bg-gray-800/20">
                    <div className="grid gap-2">
                        {friends?.map((friend, index) => (
                            <Friend key={index} name={friend?.userId.name as string} image={friend?.userId.image as string} friendId={friend?.roomId as string} />
                        ))}
                    </div>
                </div>
                <div className="md:flex hidden justify-center items-center">
                    <p className="text-3xl leading-none font-bold">Choose a chat</p>

                </div>
            </div>
        </div>

    )
}