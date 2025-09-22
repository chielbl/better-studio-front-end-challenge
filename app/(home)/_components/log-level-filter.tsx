interface LogLevelFilterProps {
  levels: string[];
  selectedLevel: string;
  levelOnClick: (level: string) => void;
}
export default function LogLevelFilter({
  levels,
  selectedLevel,
  levelOnClick,
}: LogLevelFilterProps) {
  return (
    <div className="flex border border-solid border-primary-400 rounded-full overflow-hidden">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => levelOnClick(level)}
          className={`px-2 py-1 overflow-hidden cursor-pointer hover:bg-primary-400 hover:text-primary-50 transition-colors duration-300 ${
            level === selectedLevel && "bg-primary-600 text-primary-50"
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
}
