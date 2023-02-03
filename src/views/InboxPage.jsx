export default function InboxPage() {
  const inboxData = "asdfadsfasdfadsf".split("");
  return (
    <>
      <section className="border-2 rounded-xl p-4 mt-4">
        <div className=" font-light overflow-y-auto h-[400px]">
          <table className="w-full text-center">
            <tr className="border-b-2 border-b-theme-1 bg-white">
              <th className="py-2">No</th>
              <th className="py-2">Title</th>
              <th className="py-2">Date</th>
              <th className="py-2">Sender</th>
              <th className="py-2">Organization</th>
              <th className="py-2">Status</th>
            </tr>
            {inboxData.map((el, i) => {
              return (
                <tr className="border-b-2">
                  <td className="py-2">{i + 1}</td>
                  <td className="py-2">Surat Tanda Tangan</td>
                  <td className="py-2">01-02-2023</td>
                  <td className="py-2">Raymond Dale</td>
                  <td className="py-2">PT Sumber Makmur Sentosa</td>
                  <td className="py-2">Unsigned</td>
                  <td className="py-2">
                    <span className="material-symbols-outlined">edit</span>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </section>
    </>
  );
}
