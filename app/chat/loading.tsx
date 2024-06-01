import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="flex flex-row space-x-3">
            <Skeleton className="h-[600px] w-[700px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-10 w-[450px]" />
                <Skeleton className="h-10 w-[400px]" />
                <Skeleton className="h-10 w-[450px]" />
                <Skeleton className="h-10 w-[400px]" />
                <Skeleton className="h-10 w-[450px]" />
                <Skeleton className="h-10 w-[400px]" />
                <Skeleton className="h-10 w-[450px]" />
                <Skeleton className="h-10 w-[400px]" />
            </div>
        </div>)
}