import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Terminal } from "lucide-react";
import CreatePostButton from "./CreatePostButton";

export default function CreateButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lasalle-green rounded-3xl text-lg h-12 px-12">
          + Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreatePostButton />

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
