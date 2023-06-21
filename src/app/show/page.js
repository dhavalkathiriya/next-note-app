import Note from "../../../model/Note";
import Delete from "../components/Delete";
import Link from "next/link";
import { redirect } from 'next/navigation'
import dbConnect from "../dbConnect";

export default async function show() {
  dbConnect()
  const notes = await Note.find();

  async function deleteNote(data) {
    "use server";
    let id = JSON.parse(data.get("id")?.valueOf());

    await Note.deleteOne({ _id: id });
    redirect("/show");
  }

  return (
    <main className="m-10 space-y-5">
      <h1 className="text-xl font-bold">Notes</h1>
      <div className=" flex justify-center gap-3 flex-wrap ">
  
        {notes.map((element) => {
          return (
            <>
              <div key={element._id} className="w-[300px] min-h-fit shadow-lg flex flex-col p-5 gap-5 rounded-md ">
                <h1 className="font-bold">Title : <span className="font-medium">{element.title}</span></h1>
                <p className=" font-bold">Note :  <span className="font-medium">{element.note}</span></p>
                {/* <li className=""> */}
                  <div className="flex gap-3">
                    <form action={deleteNote}>
                        <input type="hidden" value={JSON.stringify(element._id)} name="id"/>
                      <button type="submit"className="p-2 rounded-md bg-red-600 text-white hover:cursor-pointer">Delete</button>
                    </form>

                    {/* <Delete id={element._id}/> */}
                    <Link href={"/Edit/" + element._id}>
                      <button className="p-2 rounded-md  bg-blue-600 text-white hover:cursor-pointer">
                        Edit
                      </button>
                    </Link>
                  </div>
                {/* </li> */}
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </main>
  );
}