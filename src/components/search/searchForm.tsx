import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormEvent, useEffect, useRef } from "react";

const SearchForm = ({
  handleSubmit,
  setSearchValue,
}: {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
}) => {
  type TimeoutRef = ReturnType<typeof setTimeout>;
  const timeoutRef = useRef<TimeoutRef | null>(null);

  /**
   * Set the searchValue with the input value after 250ms
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!value) return;
      const encodedValue = encodeURIComponent(value);
      setSearchValue(encodedValue);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 rounded-full border-gray-200 flex items-center focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-0"
    >
      <Input
        placeholder="Type to search a video..."
        onChange={(e) => handleChange(e)}
        type="search"
        maxLength={100}
        className="py-4 border-0 h-full bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      <Button type="submit" className="py-4 pr-8 border-0 bg-transparent">
        <span className="sr-only">Rechercher</span>
        <SearchIcon className="text-gray-300" />
      </Button>
    </form>
  );
};

export default SearchForm;
