export function Progress({ value, max }) {
  return (
    <div className="w-full bg-gray-300 rounded-lg">
      <div
        className="bg-green-500 text-xs font-medium text-white text-center p-1 leading-none rounded-lg"
        style={{ width: `${(value / max) * 100}%` }}
      >
        {value}%
      </div>
    </div>
  );
}
