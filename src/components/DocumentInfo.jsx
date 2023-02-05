export default function DocumentInfo() {
  const data = "fa".split("");
  return (
    <>
    <div className="overflow-y-auto scrollbar h-[80vh] pr-4">
      {data.map((el, i) => {
        return (
          <div className=" mt-4 rounded-xl border-2 overflow-hidden">
            <div className="bg-sky-100 p-2 text-theme-3 tracking-wide">
                <p>20/12/2021</p>
            </div>
            <div className="flex justify-between mt-2 px-4">
              <div>
                <p className="text-sm mb-2 text-theme-3">Title</p>
                <p>Surat Tanda Tangan</p>
              </div>
              <div className="text-center">
                <p className="text-sm mb-2 text-theme-3">Upload Date</p>
                <p>20/01/2023 19:00:00</p>
              </div>
              <div className="text-center">
                <p className="text-sm mb-2 text-theme-3">Sender</p>
                <p>Judy Orlando</p>
              </div>
              <div className="text-center">
                <p className="text-sm mb-2 text-theme-3">Receiver</p>
                <p>John Claymore</p>
              </div>
            </div>
            <div className="mt-2 px-4 pb-4">
              <p className="text-sm text-theme-3">Message</p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
                blanditiis repudiandae, doloremque dolorum sed enim tenetur
                nemo, sequi aliquam earum deleniti nostrum modi dignissimos?
                Quisquam, id. Aliquam neque fugit ipsam?
              </p>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}
