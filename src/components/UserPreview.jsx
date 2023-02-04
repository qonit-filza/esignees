export default function UserPreview({ name, company }) {
  let nameInitial = name;
  if (nameInitial) {
    nameInitial = nameInitial
      .split(" ")
      .map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null))
      .join("");
  }

  return (
    <>
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-9 h-9 rounded-full bg-theme-3 flex items-center justify-center text-white">
          <p className="font-semibold">{nameInitial}</p>
        </div>
        <div>
          <p className="font-semibold tracking-wide">
            {name || "John Claymore"}
          </p>
          <p className="text-xs">{company || "Hacktiv8"}</p>
        </div>
      </div>
    </>
  );
}
