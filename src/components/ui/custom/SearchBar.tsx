import { Command, CommandInput } from "@/components/ui/command";

const SearchBar = () => {
  return (
    <Command className="basis-2xl md:basis-7/24 border-1 border-gray-200 focus:border-gray-600" >
        <CommandInput placeholder="Search" />
    </Command>
  )
}

export default SearchBar;