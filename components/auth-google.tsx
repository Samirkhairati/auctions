'use client'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCallback, useState } from "react"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"

type Variant = "login" | "register";


export default function AuthGoogle() {

  const [variant, setVariant] = useState<Variant>("login")
  const [loading, setLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"))
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (variant === "login") {
      // login logic
    }
    if (variant === "register") {
      // register logic
    }

  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="m@example.com" required type="email" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link className="ml-auto inline-block text-sm underline" href="#">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
            <Button className="w-full" variant="outline">
              Login with Google
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Don&#39t have an account?
          <Link className="underline" href="#">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
