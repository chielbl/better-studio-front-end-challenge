import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type Filters = {
  search: string;
  level: string;
  date: string;
};

export const useFiltersFromSearchParams = (initialFilters?: Filters) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<Filters>({
    search: getInitialValue("search"),
    level: getInitialValue("level"),
    date: getInitialValue("date"),
  });

  // Update URL params if filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.level) params.set("level", filters.level);
    if (filters.date) params.set("date", filters.date);

    router.replace(`?${params.toString()}`);
  }, [filters, router]);

  function getInitialValue(key: keyof Filters) {
    return searchParams.get(key) || initialFilters?.[key] || "";
  }

  function setFilter(key: keyof Filters, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilter() {
    router.replace(window.location.pathname);
    setFilters({
      search: "",
      level: "",
      date: "",
    });
  }

  return {
    filters,
    setFilter,
    resetFilter,
  };
};
