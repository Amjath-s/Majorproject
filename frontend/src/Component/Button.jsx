export function Button({ children, onClick, className = "" }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
