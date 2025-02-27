import { formatNumberWithSuffix } from "@/lib/utils";
import { Repository } from "@/types/api";
import { Star } from "lucide-react";

interface IRepositoryItem {
  data: Repository;
}

export default function RepositoryItem({ data }: IRepositoryItem) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-4 justify-between">
        <b className="font-bold text-lg line-clamp-1">{data.name}</b>
        <div className="flex gap-1 items-center">
          <span className="text-sm">
            {formatNumberWithSuffix(data.stargazers_count)}
          </span>
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
        </div>
      </div>
      <p className="text-sm text-gray-500 line-clamp-3">
        {data.description ?? "-"}
      </p>
    </div>
  );
}
