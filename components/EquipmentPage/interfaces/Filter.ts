interface IFilter {
  filterType: "checkbox" | "switch";
  filterTitle: string;
  filterKey: string;
  filterOptions: { filterOprionTitle: string; filterOptionId: number }[] | null;
}

export default IFilter;
