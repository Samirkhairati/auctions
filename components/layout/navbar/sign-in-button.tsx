import { Button } from "@/components/ui/button"
import Link from "next/link"

function SignInButton() {
    return (
        <Button variant="outline">
            <Link href="/login">
                Sign In
            </Link>
        </Button>

    )
}

export default SignInButton