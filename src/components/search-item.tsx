import { UserWithRepository } from "@/types/api";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import RepositoryItem from "./repository-item";

interface ISearchItem {
  data: UserWithRepository;
}

export default function SearchItem({ data }: ISearchItem) {
  return (
    <AccordionItem value={data.id.toString()}>
      <AccordionTrigger>{data.login}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2">
        {data.repository?.length ? (
          data.repository.map((repo) => (
            <RepositoryItem data={repo} key={repo.id} />
          ))
        ) : (
          <p>This user does not have a repository</p>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
