'use client'

import { SearchIcon } from '@/components/layout/icons'
import { Input } from '@/components/ui/input'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
const SearchBar = () => {

    const [search, setSearch] = useState<string>("")

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(search)
    }

    // useEffect(() => {
    //     console.log(search)
    // }, [search])

    return (
        <form onSubmit={handleSearch} className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    placeholder="Search products..."
                    type="search"
                />
            </div>
        </form>
    )
}

export default SearchBar