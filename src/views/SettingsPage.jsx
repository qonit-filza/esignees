
export default function SettingsPage() {
  return (
    <>
      <div className="mt-4 flex gap-6 h-[70vh]">
        <div className="flex flex-col gap-4 border-2 p-6 rounded-xl relative pt-8">
          <button className="absolute top-2 right-2">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <div className="w-36 h-36 overflow-hidden rounded-full ring-2 ring-theme-1 ring-offset-2 self-center mb-6">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="profile_photo"
            />
          </div>
          <div>
            <p className="text-sm">Full Name</p>
            <p className="text-lg">John Claymore</p>
          </div>
          <div>
            <p className="text-sm">Organization</p>
            <p className="text-lg">PT Sumber Makmur Sentosa</p>
          </div>
          <div>
            <p className="text-sm">Email Address</p>
            <p className="text-lg">johnclaymore@mail.com</p>
          </div>
          <div>
            <p className="text-sm">Phone Number</p>
            <p className="text-lg">+6288080898</p>
          </div>
        </div>
        <div className="border-2 rounded-xl px-6 py-4 h-fit relative">
          <button className="absolute top-2 right-2">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <p className="text-xl text-center mb-2">Signature</p>
          <div className="w-[240px] p-4 rounded-xl">
            <img
              src="https://static.cdn.wisestamp.com/wp-content/uploads/2020/08/Oprah-Winfrey-Signature-1.png"
              alt="user_signature"
            />
          </div>
        </div>
      </div>
    </>
  );
}
