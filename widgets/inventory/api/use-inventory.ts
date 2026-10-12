"use client";

import { UserService } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";
import { useSortInventory } from "./sort-inventory.store";
import { ChangeEvent, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";

function useInventory() {
  const { view, setView, filterByName, filteredItems } = useSortInventory();

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      filterByName(searchValue);
      console.log(searchValue);
    }, 300),
    [filterByName],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const updateSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const inventory = useQuery({
    queryKey: ["inventory"],
    queryFn: () => UserService.getInventory(),
    refetchOnWindowFocus: false,
  });

  return { inventory, view, setView, updateSearchValue, filteredItems };
}

export default useInventory;
