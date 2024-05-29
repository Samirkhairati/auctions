
import ItemForm from "@/components/screens/item-form";
import session from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Sell() {

    // AUTHENTICATION
    const user = (await session())?.user;
    if (!user) redirect("/api/auth/signin?next=/sell")


    return (
        <div className="flex flex-col items-center justify-center">
            <div className="shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">List an Item</h2>
                <ItemForm />
            </div>
        </div>
    )
}


