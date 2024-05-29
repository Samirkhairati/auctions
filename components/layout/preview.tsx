import Image from "next/image"

interface PreviewProps {
    resource_type: string;
    secure_url: string;
}

export default function Preview({ resource_type, secure_url }: PreviewProps) {

    if (resource_type === "image") {
        return (
            <div className="relative group">
                <Image
                    alt="Media Preview"
                    className="h-24 w-full rounded-md object-cover shadow-md"
                    height={100}
                    src={secure_url || "/placeholder.svg"}
                    style={{
                        aspectRatio: "100/100",
                        objectFit: "cover",
                    }}
                    width={100}
                />
            </div>
        )
    } else if (resource_type === "video") {
        return (
            <div className="relative group flex justify-center items-center">
                <video className="shadow-md" width="320" height="240" controls preload="none">
                    <source src={secure_url || "/placeholder.svg"} type="video/mp4" />
                    <track
                        src="/path/to/captions.vtt"
                        kind="subtitles"
                        srcLang="en"
                        label="English"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        )
    }
}

