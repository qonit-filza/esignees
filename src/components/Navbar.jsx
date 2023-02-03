import UserPreview from './UserPreview';

export default function Navbar() {
  return (
    <>
      <section className="flex justify-between items-center p-4 fixed left-[220px] right-0 m-4">
        <div>
          <p className="text-3xl font-semibold">Welcome Back, John</p>
          <p>Here is the information about all your orders</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined">search</span>
          <span className="material-symbols-outlined">notifications</span>
          <UserPreview />
        </div>
      </section>
    </>
  );
}
