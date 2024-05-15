'use client'

import { useCallback, useState } from "react"
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form"

type Variant = "login" | "register"

export default function AuthForm() {
    const [variant, setVariant] = useState<Variant>("login")
    const [loading, setLoading] = useState(false)

    const toggleVariant = useCallback(() => {
        setVariant((prev) => (prev === "login" ? "register" : "login"))
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({

    })
}