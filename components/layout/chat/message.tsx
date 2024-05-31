import { User } from "next-auth";

export default function Message({ text, user }: { text: string, user: User }) {
    return (
        <div className="flex flex-col gap-2 rounded-lg px-4 py-2 text-sm h-20 bg-gray-100 dark:bg-gray-800">
            <div className="font-bold">{user?.name}</div>
            <p>{text}</p>
        </div>
    )
}