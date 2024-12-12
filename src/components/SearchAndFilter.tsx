import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchAndFilterProps {
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  searchValue: string;
  sortValue: string;
}

export function SearchAndFilter({
  onSearchChange,
  onSortChange,
  searchValue,
  sortValue,
}: SearchAndFilterProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-8">
      <div className="brutal-border bg-brutal-white p-4">
        <Input
          placeholder="Search coins..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-2 border-brutal-black"
        />
      </div>
      <div className="brutal-border bg-brutal-white p-4">
        <Select value={sortValue} onValueChange={onSortChange}>
          <SelectTrigger className="border-2 border-brutal-black">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="brutal-border bg-brutal-white">
            <SelectItem value="rank">Rank</SelectItem>
            <SelectItem value="priceAsc">Price (Low to High)</SelectItem>
            <SelectItem value="priceDesc">Price (High to Low)</SelectItem>
            <SelectItem value="changeAsc">Change % (Low to High)</SelectItem>
            <SelectItem value="changeDesc">Change % (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}