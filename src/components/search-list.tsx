import { UserWithRepository } from "@/types/api";
import { Skeleton } from "./ui/skeleton";
import SearchItem from "./search-item";
import { Fragment } from "react";
import { Accordion } from "./ui/accordion";

interface ISearchList {
  isLoading: boolean;
  data: UserWithRepository[];
}

export default function SearchList({ isLoading, data }: ISearchList) {
  return (
    <Fragment>
      {isLoading ? (
        <div className="flex flex-col gap-4 mt-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-[100px] w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <Accordion type="single" collapsible>
          {data.map((user) => (
            <SearchItem data={user} key={user.id} />
          ))}
        </Accordion>
      )}
    </Fragment>
  );
}
