import { CollectionService } from "@/entities/collection";
import { useQuery } from "@tanstack/react-query";

function useCasesGrid() {
  const collection = useQuery({
    queryKey: ["collection"],
    queryFn: () => CollectionService.getCollections(),
    refetchOnWindowFocus: false,
    staleTime: 30 * 60 * 1000,
  });

  return collection;
}

export default useCasesGrid;
