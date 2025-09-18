interface LogSearchProps {
  searchValue: string;
  onSearch: (searchValue: string) => void;
}
export default function LogSearch({
  searchValue = "",
  onSearch,
}: LogSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search your log ..."
      value={searchValue}
      onChange={(e) => onSearch(e.target.value)}
      className="w-full max-w-xl focus:outline-primary-500 border border-primary-400 rounded-full px-4 py-2 m-auto transition-transform duration-300 lg:focus:scale-105"
      aria-label="Search log"
    />
  );
}
