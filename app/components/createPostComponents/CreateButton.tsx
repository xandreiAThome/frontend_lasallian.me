import { Terminal } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import CreatePostDialog from "./CreatePostDialog";
import { Link } from "react-router";

export default function CreateButton() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-lasalle-green rounded-3xl text-lg h-12 px-12">
          + Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreatePostDialog
            setOpen={setOpen}
            buttonProp={
              <button className="flex gap-4 p-6 border-2 rounded-2xl hover:bg-slate-100 hover:rounded-2xl transition-all">
                <Terminal className="mr-2" size="36" />
                <div>
                  <p className="text-justify text-xl font-bold">Post</p>
                  <p className="text-justify">
                    Share something publicly to{" "}
                    <span className="font-bold">your</span> feed; doesn't need
                    to be professional. This will not be shown to job
                    recruiters.
                  </p>
                </div>
              </button>
            }
          />

          <button className="flex gap-4 p-6 border-2 rounded-2xl hover:bg-slate-100 hover:rounded-2xl transition-all">
            <Terminal className="mr-2" size="36" />
            <div>
              <p className="text-justify text-xl font-bold">Project</p>
              <p className="text-justify">
                Share something <span className="font-bold">you</span> made -
                art, code, research papers, it could be anything! You can choose
                to share this to job recruiters.
              </p>
            </div>
          </button>

          <button className="flex gap-4 p-6 border-2 rounded-2xl hover:bg-slate-100 hover:rounded-2xl transition-all">
            <Terminal className="mr-2" size="36" />
            <div>
              <p className="text-justify text-xl font-bold">Event</p>
              <p className="text-justify">
                Share <span className="font-bold">your</span> organization's
                event on <span className="font-bold">lasallian.me!</span> This
                can choose to show this to members-only or publicly.
              </p>
            </div>
          </button>

          <Link
            to={"/createorg"}
            onClick={() => setOpen(false)}
            className="flex gap-4 p-6 border-2 rounded-2xl hover:bg-slate-100 hover:rounded-2xl transition-all"
          >
            <Terminal className="mr-2" size="22" />
            <div>
              <p className="text-justify text-xl font-bold">Organization</p>
              <p className="text-justify">
                Create an <span className="font-bold">account</span> for your
                organization on <span className="font-bold">lasallian.me!</span>
              </p>
            </div>
          </Link>
        </div>
        <DialogFooter className="sm:justify-start">
          <p className="justify-end">
            Show the world how you do things the Lasallian way.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
