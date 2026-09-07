export const Footer = () => {
  return (
    <footer className="bg-[#18181B] text-white w-full mx-auto min-h-auto lg:h-[650px] flex flex-col">
      <div className="flex mt-8 sm:mt-15 px-4 sm:pl-25 gap-6 sm:gap-10.4 bg-[#EF4444] h-14 sm:h-23 w-full items-center justify-start sm:justify-between text-white text-sm sm:text-lg font-bold overflow-hidden whitespace-nowrap">
        <p>Fresh fast delivered</p>
        <p className="hidden sm:block">Fresh fast delivered</p>
        <p className="hidden md:block">Fresh fast delivered</p>
        <p className="hidden lg:block">Fresh fast delivered</p>
        <p className="hidden xl:block">Fresh fast delivered</p>
      </div>

      <div className="px-4 sm:pl-22 pt-10 sm:pt-19 flex flex-col lg:flex-row lg:justify-center gap-10 lg:gap-25">
        <div className="flex flex-col gap-2 shrink-0">
          <img
            src="/icons/BrandLogo.svg"
            alt="logoFood"
            width={46}
            height={37}
          />
          <div>
            <p className="font-inter text-white p-0 m-0 leading-tight font-bold">
              Nom<span className="text-[#EF4444]">Nom</span>
            </p>
            <p className="text-xs font-medium text-white mt-1">
              Swift delivery
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-18">
          <div className="flex flex-col gap-1 text-white text-sm sm:text-base">
            <p className="font-bold text-[#71717A] mb-1">NOMNOM</p>
            <p>Home</p>
            <p>Contact us</p>
            <p>Delivery zone</p>
          </div>
          <div className="flex flex-col gap-1 text-white text-sm sm:text-base">
            <p className="font-bold text-[#71717A] mb-1">MENU</p>
            <p>Appetizers</p>
            <p>Salads</p>
            <p>Pizzas</p>
            <p>Main dishes</p>
            <p>Desserts</p>
          </div>
          <div className="flex flex-col gap-1 text-white text-sm sm:text-base">
            <p className="font-bold text-transparent mb-1 hidden sm:block">.</p>
            <p>Slice dish</p>
            <p>Brunch</p>
            <p>Desserts</p>
            <p>Beverages</p>
            <p>Fish & Sea foods</p>
          </div>
          <div className="flex flex-col gap-1 text-white text-sm sm:text-base">
            <p className="font-bold text-[#71717A] mb-1">FOLLOW US</p>
            <div className="flex flex-row gap-2">
              <img src="/icons/Social icon.svg" alt="facebookLogo" />
              <img src="/icons/instagram.png" alt="instagramLogo" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-12 sm:mt-26 px-4 sm:px-22 w-full">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 w-full py-6 sm:py-8 border-t border-[#F4F4F566] text-xs sm:text-sm">
          <div className="flex gap-1 flex-wrap">
            <p>Copy right 2024</p>
            <p>©</p>
            <p>Nomnom LLC</p>
          </div>
          <p>Privacy policy</p>
          <p>Terms of service</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </footer>
  );
};
