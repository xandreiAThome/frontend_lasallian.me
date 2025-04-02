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

export default function OrgBannerCard() {
  return (
    <div className="bg-custom-postcard-white rounded-b-xl flex flex-col">
      <div
        className={`w-full h-56 bg-gray-300 flex items-center justify-center bg-center bg-cover bg-[url("https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/462689548_937370231755893_3437674587473298092_n.png?stp=dst-png_s960x960&_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFLL2prEC1nJZXDstDXEOn8jpvq_CYPt2uOm-r8Jg-3a5HUT2lqMMpaSbhsqA6Af9Dz4BMfU7ofnXW0i2wOO_i8&_nc_ohc=OrznZH9cwhUQ7kNvgE1aN0L&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=ADJcTr_86BOn_ihmfN5OS7L&oh=00_AYBgmK7SJxj-gEyC920-Ifl5xzZOujgdS1fjGI7X1sW4eA&oe=67A49DF8")]`}
      ></div>

      <div className="">
        <div className="relative flex px-6 py-4">
          <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
            <img
              src="https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/462565143_937343991758517_3934195989556103177_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGGbE7Od2YXhbz9jf3eIuqarIUjDCvDYLmshSMMK8Nguc3iKvUacKK6cpIGTPMga9YV-e6q8B5gSJX6wv4WJQIj&_nc_ohc=OjgONZiRuRYQ7kNvgGgZDct&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=A2cv8zhImmDfn3rpo5xa-oA&oh=00_AYCUAK0P2aHKGID5eWeiIXF3vxrYf-dYJiTQdZ8eNh1-HQ&oe=67A4A2A4"
              alt=""
              className="rounded-full"
            />
          </div>

          <div className="pl-36 flex flex-col flex-grow">
            <div className="flex justify-between">
              <p className=" text-xl font-bold">La Salle Computer Society</p>

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
                  CSO
                </span>
                <span className="px-2 bg-[#313131] text-white text-sm font-semibold">
                  #2
                </span>
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <p className="text-sm">
                <span className="font-bold">204</span> Officers
              </p>
              <p className="text-sm">
                <span className="font-bold">784</span> Members
              </p>
              <p className="text-sm">
                <span className="font-bold">5.4k</span> Followers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 gap-2 pb-4">
        <p className="text-sm italic">
          Living Yesterday's Vision, Setting Today's Trends, Inspiring
          Tomorrow's Leaders.
        </p>

        <div className="text-sm flex gap-2 flex-wrap">
          <span className="flex items-center gap-1">
            <BadgeInfo size="16" />
            1985
          </span>
          <span className="flex items-center gap-1">
            <House size="16" />
            CCS
          </span>
          <span className="flex items-center gap-1">
            <Linkedin size="16" />
            <span className="text-lasalle-green font-semibold">dlsulscs</span>
          </span>
          <span className="flex items-center gap-1">
            <Instagram size="16" />
            <span className="text-lasalle-green font-semibold">dlsu_lscs</span>
          </span>
          <span className="flex items-center gap-1">
            <Facebook size="16" />
            <span className="text-lasalle-green font-semibold">
              La Salle Computer Society
            </span>
          </span>
        </div>
        <span className="flex items-center gap-1 font-bold">
          <UserRound size={16} />
          Council of Student Organizations
        </span>
        <span className="flex gap-1 items-center">
          <ExternalLink size={16} />
          <span className="text-lasalle-green font-semibold">
            www.dlsu-lscs.org
          </span>
        </span>

        {/* Admin Panel */}
        <div className="w-full border-solid border-[1px] rounded-lg p-2 flex items-center gap-4">
          <h1 className="font-bold">Admin Actions</h1>
          <Button className="bg-lasalle-green rounded-xl p-2 text-white">
            Create Post
          </Button>
          <ManageMembersDialog />
          <Button className="bg-custom-bg-white text-lasalle-green border-[1px] rounded-xl p-2">
            Edit Details
          </Button>
        </div>

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

function ManageMembersDialog() {
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
          <Select name="college">
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
          </Select>
        </div>

        <Table className="">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Committee</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">
                <MemberSettingDropDown />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button className="bg-lasalle-green w-32 rounded-xl">Add Member</Button>
      </DialogContent>
    </Dialog>
  );
}

function MemberSettingDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto text-gray-500" asChild>
        <button>
          <Ellipsis />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="w-full text-red-500">
          Remove Member
        </DropdownMenuItem>
        <DropdownMenuItem>Change Position</DropdownMenuItem>
        <DropdownMenuItem>Change Committee</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
