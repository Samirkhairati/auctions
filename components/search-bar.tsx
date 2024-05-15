import { SearchIcon } from '@/components/icons'
import { Input } from '@/components/ui/input'
const SearchBar = () => {
    return (
        <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    placeholder="Search products..."
                    type="search"
                />
            </div>
        </form>
    )
}

export default SearchBar