import { fetchYoutubeResults } from "@/services/youtubeService";
import { YoutubeResult } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import NumOfResultsSelect from "../select/numOfResultsSelect";
import SearchForm from "./searchForm";
import SearchResults from "./searchResults";

const SearchSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [numberOfResults, setNumberOfResults] = useState("1");
  const queryClient = useQueryClient();

  const mutation = useMutation<
    YoutubeResult,
    Error,
    { searchValue: string; numberOfResults: string }
  >({
    mutationFn: ({ searchValue, numberOfResults }) =>
      fetchYoutubeResults(searchValue, numberOfResults),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["youtubeResults", { searchValue, numberOfResults }],
        data
      );
    },
  });

  /**
   * Fetch video's title on the youtbe API if value is defined and not an empty string
   * @param e Form Event
   * @returns void
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() === "") return;
    mutation.mutate({ searchValue, numberOfResults });
  };

  return (
    <div className="flex flex-col gap-y-2 h-full">
      <SearchForm handleSubmit={handleSubmit} setSearchValue={setSearchValue} />
      <span className="self-end">
        Display <NumOfResultsSelect setNumberOfResults={setNumberOfResults} />
        first results
      </span>
      <SearchResults mutation={mutation} />
    </div>
  );
};

export default SearchSection;
