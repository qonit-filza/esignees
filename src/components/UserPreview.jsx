export default function UserPreview() {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-theme-3 flex items-center justify-center text-white">
          <p className="font-semibold">JC</p>
        </div>
        <div>
          <p className="font-semibold tracking-wide">John Claymore</p>
          <p className="text-xs">Hacktiv 8</p>
        </div>
      </div>
    </>
  );
}
