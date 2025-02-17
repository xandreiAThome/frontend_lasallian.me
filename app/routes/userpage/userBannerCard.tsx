import {
  Ellipsis,
  Images,
  BadgeInfo,
  House,
  Linkedin,
  Instagram,
  Facebook,
  UserRound,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

export default function UserBannerCard() {
  return (
    <div className="bg-custom-postcard-white rounded-b-xl flex flex-col">
      <div className="w-full h-56 bg-gray-300 flex items-center justify-center bg-center bg-cover bg-[url(https://media.licdn.com/dms/image/v2/D5622AQEsK-oYd5t4kw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1731159674567?e=1741219200&v=beta&t=9JwhuJS7mHnFRLGm0RWZTnCvKU-sTloY2hPatPBm5sM)]"></div>

      <div className="">
        <div className="relative flex px-6 py-4">
          <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQGX6mTlbYpJ1Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724656907874?e=1744243200&v=beta&t=pSFTZRJhVVUqZ1RMqZyaieh6TzH0qAE49KIUIa4xoLE"
              alt=""
              className="rounded-full"
            />
          </div>

          <div className="pl-36 flex flex-col flex-grow">
            <div className="flex justify-between">
              <p className=" text-xl font-bold">Sean Denzel Robenta (zel)</p>

              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger className="ml-auto text-gray-500">
                    <button>
                      <Ellipsis />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DialogTrigger>
                      {" "}
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuItem className="text-red-500">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent>
                  <div className="h-full w-full bg-custom-postcard-white flex flex-col">
                    <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                      <button type="button" className="flex gap-1">
                        <Images className="text-lasalle-green" />
                        <p className="font-semibold text-lasalle-green">
                          Add Cover Photo
                        </p>
                      </button>
                    </div>
                    <div className="pb-6">
                      <div className="relative flex p-6">
                        <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
                          <button
                            type="button"
                            className="flex flex-col items-center"
                          >
                            <Images className="text-lasalle-green"></Images>
                            <p className="text-lasalle-green font-bold">
                              + Display Photo{" "}
                            </p>
                          </button>
                        </div>

                        <div className="pl-36 flex flex-col flex-1">
                          <div className="flex justify-between">
                            <p className="text-custom-text-black">
                              Basic Account Information
                            </p>

                            <button type="button">
                              <Ellipsis
                                className="text-custom-text-black"
                                size={24}
                              ></Ellipsis>
                            </button>
                          </div>

                          <div className="flex flex-col gap-2 flex-1 max-w-80">
                            <Input
                              placeholder="@username"
                              className="bg-slate-100"
                              name="username"
                            />
                            <Input placeholder="Bio" className="bg-slate-100" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col px-12 pb-2">
                        <p className="text-custom-text-black">
                          About <span className="font-bold">YOU!</span> Ipakita
                          mo kung sino ka.
                        </p>
                        <div className="max-w-80 flex gap-2 flex-col">
                          <Input
                            className="bg-slate-100 "
                            placeholder="First Name *"
                          ></Input>
                          <Input
                            className="bg-slate-100 "
                            placeholder="Last Name *"
                          ></Input>
                        </div>
                      </div>

                      <div className="flex gap-2 px-12 items-center">
                        <Select>
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Id Number</SelectLabel>
                              <SelectItem value="apple">120</SelectItem>
                              <SelectItem value="banana">121</SelectItem>
                              <SelectItem value="blueberry">122</SelectItem>
                              <SelectItem value="grapes">123</SelectItem>
                              <SelectItem value="pineapple">124</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <Input
                          className="max-w-80 bg-slate-100"
                          placeholder="Degree Program"
                        ></Input>
                      </div>

                      <div className="px-12 py-4">
                        <p className="text-custom-text-black">
                          <span className="font-bold">MORE</span>. Link other
                          accounts to boost reach! (optional)
                        </p>
                        <div className="flex gap-2 flex-col">
                          <div className="flex relative">
                            <Input
                              className="bg-slate-100 max-w-80 pl-9"
                              placeholder="https://facebook.com/..."
                            ></Input>
                            <Facebook className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                          </div>

                          <div className="flex relative">
                            <Input
                              className="bg-slate-100 max-w-80 pl-9"
                              placeholder="@juandelacruz..."
                            ></Input>
                            <Instagram className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                          </div>

                          <div className="flex relative">
                            <Input
                              className="bg-slate-100 max-w-80 pl-9"
                              placeholder="https://linkedin.com/in/..."
                            ></Input>
                            <Linkedin className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                          </div>
                        </div>
                      </div>

                      <div className="px-12 flex flex-col items-baseline gap-2">
                        <Button
                          type="submit"
                          className="bg-lasalle-green rounded-2xl text-base py-5 px-16"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg text-gray-400">@zelkimm23</p>
              <div className="flex gap-2 flex-wrap">
                <p className="">
                  <span className="px-2 bg-[#220088] text-white text-sm font-semibold">
                    LSCS
                  </span>
                  <span className="px-2 bg-[#313131] text-white text-sm font-semibold">
                    VP
                  </span>
                </p>

                <p>
                  <span className="px-2 bg-[#220088] text-white text-sm font-semibold">
                    LSCS
                  </span>
                  <span className="px-2 bg-[#313131] text-white text-sm font-semibold">
                    RND
                  </span>
                </p>
                <p>
                  {" "}
                  <span className="px-2 bg-[#FFCD05] text-white text-sm font-semibold">
                    GDSC
                  </span>
                  <span className="px-2 bg-[#313131] text-white text-sm font-semibold">
                    MKT
                  </span>
                </p>
                <p>
                  <span className="px-2 bg-lasalle-green text-white text-sm font-semibold">
                    TLS
                  </span>
                  <span className="px-2 bg-[#313131] text-white text-sm font-semibold">
                    WEB
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 gap-2 pb-4">
        <div className="flex gap-2">
          <p className="text-sm">
            <span className="font-bold">3.6k</span> Followers
          </p>
          <p className="text-sm">
            <span className="font-bold">386</span> Followers
          </p>
        </div>

        <p className="text-sm italic">
          Hindi ko alam ano ilalagay sa bio kaya i2 nlng
        </p>

        <div className="text-sm flex gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <BadgeInfo size="16" />
            123
          </span>
          <span className="flex items-center gap-1">
            <House size="16" />
            CCS
          </span>
          <span className="flex items-center gap-1">
            <Linkedin size="16" />
            <span className="text-lasalle-green font-semibold">sdyr</span>
          </span>
          <span className="flex items-center gap-1">
            <Instagram size="16" />
            <span className="text-lasalle-green font-semibold">seandvv</span>
          </span>
          <span className="flex items-center gap-1">
            <Facebook size="16" />
            <span className="text-lasalle-green font-semibold">
              Sean Denzel Yu Robenta
            </span>
          </span>
        </div>
        <span className="flex items-center gap-1 font-bold">
          <UserRound size={16} />
          BS Computer Science, Major in Software Technology
        </span>
        <span className="flex gap-1 items-center">
          <ExternalLink size={16} />
          <span className="text-lasalle-green font-semibold">robenta.tech</span>
        </span>
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
