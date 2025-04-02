import {
  BadgeInfo,
  Ellipsis,
  ExternalLink,
  Facebook,
  House,
  Instagram,
  Linkedin,
  UserRound,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { orgDataInterface, orgMemberInterface } from "~/lib/interfaces";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import profileImgDefault from "~/components/assets/profile.jpg";

export default function OrgBannerCard({
  info,
  vanity,
  members,
}: orgDataInterface) {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const loaderData = useLoaderData();
  const currUserOrgData = members.find(
    (orgMember: orgMemberInterface) =>
      orgMember.author._id === loaderData.user._id
  );

  useEffect(() => {
    async function getImg() {
      if (vanity.display_photo) {
        try {
          const response = await fetch(`${vanity.display_photo}`, {
            headers: {
              Authorization: `Bearer ${loaderData.userToken}`,
            },
            method: "get",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          setProfileImg(URL.createObjectURL(blob));
        } catch (error) {
          console.log("error:", error);
        }
      }

      if (vanity.cover_photo) {
        try {
          const response = await fetch(`${vanity.cover_photo}`, {
            headers: {
              Authorization: `Bearer ${loaderData.userToken}`,
            },
            method: "get",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          setCoverImg(URL.createObjectURL(blob));
        } catch (error) {
          console.log("error:", error);
        }
      }
    }
    getImg();
  }, [vanity.cover_photo, vanity.display_photo]);

  return (
    <div className="bg-custom-postcard-white rounded-b-xl flex flex-col">
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        {coverImg && (
          <img src={coverImg} alt="" className="w-full h-48 object-cover" />
        )}
      </div>

      <div className="">
        <div className="relative flex px-6 py-4">
          <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
            <Avatar className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 ">
              <AvatarImage alt="@shadcn" src={profileImg ?? ""} />
              <AvatarFallback className="flex flex-col bg-gray-300">
                <img src={profileImgDefault} alt="" />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="pl-36 flex flex-col flex-grow">
            <div className="flex justify-between">
              <p className=" text-xl font-bold">{info.name}</p>

              <button type="button" className="ml-auto">
                <Ellipsis
                  className="text-custom-text-black"
                  size={24}
                ></Ellipsis>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <p className="">
                <span className="px-2 bg-[#220088] text-white text-sm font-semibold">
                  {info.college}
                </span>
                <span className="px-2 bg-[#313131] text-white text-sm font-semibold">
                  #1
                </span>
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <p className="text-sm">
                <span className="font-bold">0</span> Officers
              </p>
              <p className="text-sm">
                <span className="font-bold">{members.length}</span> Members
              </p>
              <p className="text-sm">
                <span className="font-bold">0</span> Followers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 gap-2 pb-4">
        <p className="text-sm italic">{info.bio}</p>

        <div className="text-sm flex gap-2 flex-wrap">
          <span className="flex items-center gap-1">
            <BadgeInfo size="16" />
            9999
          </span>
          <span className="flex items-center gap-1">
            <House size="16" />
            {info.college}
          </span>
          <span className="flex items-center gap-1">
            <Linkedin size="16" />
            <span className="text-lasalle-green font-semibold">
              placeholder
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Instagram size="16" />
            <span className="text-lasalle-green font-semibold">
              placeholder
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Facebook size="16" />
            <span className="text-lasalle-green font-semibold">
              {info.name}
            </span>
          </span>
        </div>
        <span className="flex items-center gap-1 font-bold">
          <UserRound size={16} />
          {info.office}
        </span>
        <span className="flex gap-1 items-center">
          <ExternalLink size={16} />
          <span className="text-lasalle-green font-semibold">placeholder</span>
        </span>

        {/* Admin Panel */}
        {currUserOrgData?.position === "PRES" && (
          <div className="w-full border-solid border-[1px] rounded-lg p-2 flex items-center gap-4">
            <h1 className="font-bold">Admin Actions</h1>
            <Button className="bg-lasalle-green rounded-xl p-2 text-white">
              Create Post
            </Button>
            <ManageMembersDialog members={members} />
            <Button className="bg-custom-bg-white text-lasalle-green border-[1px] rounded-xl p-2">
              Edit Details
            </Button>
          </div>
        )}

        <div className="flex gap-2 mt-2">
          <Button className="bg-lasalle-green rounded-3xl text-lg font-bold">
            + Follow
          </Button>
          <Button
            variant="outline"
            className="rounded-3xl text-lasalle-green text-lg font-bold"
          >
            Message
          </Button>
        </div>
      </div>
    </div>
  );
}

interface memberProps {
  members: orgMemberInterface[];
}
function ManageMembersDialog(props: memberProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-custom-bg-white border-solid border-[1px] text-lasalle-green rounded-xl p-2">
          Manage Members
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>
            La Salle Computer Society{" "}
            <span className="font-normal">| Members</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input placeholder="Filter email..." name="filter"></Input>
          {/* <Select name="college">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                <SelectItem value="CCS">Committee</SelectItem>
                <SelectItem value="CLA">Position</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>

        <Table className="">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Committee</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.members.map(({ author, position }: orgMemberInterface) => {
              return (
                <TableRow>
                  <TableCell className="font-medium">
                    {author.info.name.first} {author.info.name.last}
                  </TableCell>
                  <TableCell>{author.info.username}</TableCell>
                  <TableCell>{position}</TableCell>
                  <TableCell className="text-right">
                    <MemberSettingDropDown />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Button className="bg-lasalle-green w-32 rounded-xl">Add Member</Button>
      </DialogContent>
    </Dialog>
  );
}

function MemberSettingDropDown() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto text-gray-500" asChild>
          <button>
            <Ellipsis />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <>
            <DropdownMenuItem
              className="w-full"
              onClick={() => setOpenDialog("changePosition")}
            >
              Change Position
            </DropdownMenuItem>

            <DropdownMenuItem
              className="w-full"
              onClick={() => setOpenDialog("changeCommittee")}
            >
              Change Committee
            </DropdownMenuItem>

            <DropdownMenuItem
              className="w-full text-red-500"
              onClick={() => setOpenDialog("remove")}
            >
              Remove Member
            </DropdownMenuItem>
          </>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={openDialog === "changePosition"}
        onOpenChange={(open) => {
          if (!open) setOpenDialog(null);
        }}
      >
        <DialogContent className="sm:max-w-[640px]">
          <form>
            <DialogHeader>
              <DialogTitle>
                <h1 className="text-2xl">Edit</h1>
                <h4 className="text-base font-normal"></h4>
              </DialogTitle>
            </DialogHeader>
            <div className="flex gap-4 py-4 flex-col"></div>
            <DialogFooter className="sm:justify-between items-center">
              <DialogClose asChild>
                <Button
                  className="bg-lasalle-green rounded-3xl text-lg px-6"
                  type="submit"
                  name="save"
                >
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDialog === "changeCommittee"}
        onOpenChange={(open) => {
          if (!open) setOpenDialog(null);
        }}
      >
        <DialogContent className="sm:max-w-[640px]">
          <form>
            <DialogHeader>
              <DialogTitle>
                <h1 className="text-2xl">Edit</h1>
                <h4 className="text-base font-normal"></h4>
              </DialogTitle>
            </DialogHeader>
            <div className="flex gap-4 py-4 flex-col"></div>
            <DialogFooter className="sm:justify-between items-center">
              <DialogClose asChild>
                <Button
                  className="bg-lasalle-green rounded-3xl text-lg px-6"
                  type="submit"
                  name="save"
                >
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={openDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) setOpenDialog(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the post and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <form>
                <button type="submit" name="delete">
                  Delete
                </button>
              </form>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
