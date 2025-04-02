import { type ReactElement } from "react";
import { useNavigate } from "react-router";
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type ResetPasswordDialogProps = {
    setOpen?: (open: boolean) => void; // for if this dialog is on top of another dialog
    buttonProp: ReactElement;
    message: string;
}

export default function ResetPasswordDialog({
    setOpen,
    buttonProp,
    message,
}: ResetPasswordDialogProps) {
    const navigate = useNavigate();
    return(
    <Dialog>
      {" "}
      <DialogTrigger asChild>{buttonProp}</DialogTrigger>
      <DialogContent className="sm:max-w-[640px] overflow-y-auto max-h-screen justify-center">
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-2xl">Password Reset Link Sent!</h1>
            <h4 className="text-base font-normal">
              Posting with{" "}
            </h4>
          </DialogTitle>
        </DialogHeader>{" "}
        <DialogFooter>
        <Button
            className="text-white w-full rounded-3xl mt-6 bg-lasalle-green text-lg h-12"
            onClick={() => {navigate("/")}}
            >
            OK!
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    );
}