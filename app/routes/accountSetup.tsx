import Logo from "~/components/ui/logo.svg";

export default function AccountSetup() {
  return (
    <div className="flex h-full p-12 bg-custom-bg-white">
      <div className="basis-96 flex flex-col items-baseline justify-between">
        <img src={Logo} alt="logo" className="h-16" />
        <div>
          <h1 className="text-2xl text-lasalle-dark-green font-bold">
            setup your account!
          </h1>
          <p className="text-2xl text-lasalle-green">
            let other archers know who they're dealing with.
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-lasalle-dark-green font-bold">
            invest in yourself!
          </h1>
          <p className="text-2xl text-lasalle-green">
            have an archive of the things you did during your time in
            univeristy!
          </p>
        </div>
      </div>

      <main className="flex-1 flex justify-center">
        <div className="basis-[600px] max-w-[740px] shrink-0 grow h-full bg-custom-postcard-white"></div>
      </main>

      <div className="basis-96 flex justify-center flex-col">
        <h1 className="text-lasalle-dark-green font-bold text-2xl">
          your data is safe with us!
        </h1>
        <p className="text-lasalle-green text-2xl">
          We wont save what you dont want us to save.
        </p>
      </div>
    </div>
  );
}
