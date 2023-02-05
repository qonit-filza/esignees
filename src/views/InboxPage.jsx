import emptyTable from "../assets/img/dog_walk.png";
export default function InboxPage() {
  const inboxData = "adsfadsfasdf".split("");
  return (
    <>
      <div className="border-2 rounded-xl p-4 mt-4">
        Order By
        <div className=" font-light overflow-y-auto h-[400px] scrollbar">
          <table className="w-full text-center">
            <tr className="border-b-2 border-b-theme-1 bg-white">
              <th className="py-2"><input type="checkbox" /></th>
              <th className="py-2">Document Title</th>
              <th className="py-2">Date</th>
              <th className="py-2">Sender</th>
              <th className="py-2">Organization</th>
              <th className="py-2">Status</th>
            </tr>
            {!inboxData ? (
              <tr>
                <td colSpan={6}>
                  <div className="flex flex-col justify-center items-center my-4">
                    <img
                      src={emptyTable}
                      alt="image"
                      className="h-[300px] object-contain"
                    />
                    <p>The Inbox is Empty</p>
                  </div>
                </td>
              </tr>
            ) : (
              inboxData.map((el, i) => {
                return (
                  <tr className="border-b-2 hover:bg-sky-50 hover:font-semibold cursor-pointer">
                    <td className="py-2"><input type="checkbox" /></td>
                    <td className="py-2">Surat Tanda Tangan</td>
                    <td className="py-2">01-02-2023</td>
                    <td className="py-2">Raymond Dale</td>
                    <td className="py-2">PT Sumber Makmur Sentosa</td>
                    <td className="py-2">
                      <div className="bg-green-200 w-fit mx-auto px-3 py-1 rounded-md text-xs tracking-wide font-semibold">
                        Signed
                      </div>
                    </td>
                    <td className="w-20">
                      <div className="flex gap-4 w-fit mx-auto">
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </table>
        </div>
      </div>
    </>
  );
}