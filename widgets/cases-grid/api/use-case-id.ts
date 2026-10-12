"use client";

import { CollectionService, useCaseStore } from "@/entities/collection";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function useCaseById(id: string) {
  const { setCaseData } = useCaseStore();
  const case_id = useQuery({
    queryKey: [`collection/${id}`],
    queryFn: () => CollectionService.getCollectionById(id),
    staleTime: 30 * 60 * 1000,
  });

  useEffect(() => {
    if (case_id.data) {
      setCaseData(case_id.data);
    }
  }, [case_id.data, setCaseData]);

  return case_id;
}

export default useCaseById;
