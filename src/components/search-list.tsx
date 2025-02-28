import { UserWithRepository } from "@/types/api";
import { Skeleton } from "./ui/skeleton";
import SearchItem from "./search-item";
import { Accordion } from "./ui/accordion";

interface ISearchList {
  isLoading: boolean;
  data: UserWithRepository[];
  q: string;
}

export default function SearchList({ isLoading, data, q }: ISearchList) {
  return (
    <div data-testid="search-list" className="mt-4">
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-[100px] w-full rounded-xl"
              data-testid="skeleton"
            />
          ))}
        </div>
      ) : q && data.length === 0 ? (
        <p className="text-center text-lg my-6">User not Found</p>
      ) : (
        <Accordion type="single" collapsible data-testid="accordion">
          {data.map((user) => (
            <SearchItem data={user} key={user.id} />
          ))}
        </Accordion>
      )}
    </div>
  );
}
