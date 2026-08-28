"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const FoodDetailModal = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white overflow-hidden right-6 bottom-12 text-black absolute cursor-pointer">
          <Plus className="w-5 h-5" />
        </div>
      </DialogTrigger>
      <DialogContent
        className="
    w-[calc(100%-24px)] h-[30vh] p-6
    max-w-none overflow-hidden
    rounded-[32px] border-none bg-white
    md:w-[40vw] md:h-[15vh]
    xl:w-[50vw] xl:h-[25vh]
  "
      >
        <div className="gap-6 flex">
          <div className="w-full">
            <Image
              src="/image/Product Image.svg"
              width={400}
              height={400}
              alt="Product"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex w-full flex-col overflow-hidden">
            <p className="text-[#EF4444] text-[30px]">Sunshine Stackers </p>
            <p className="text-[16px]">
              Fluffy pancakes text-2xlstacked with fruits, cream, syrup, and
              powdered sugar.
            </p>
            <div className="mt-auto">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                {/* Нийт үнэ */}
                <div>
                  <p className="text-[18px] text-black md:text-[22px]">
                    Total price
                  </p>

                  <p className="text-[36px] font-semibold leading-none text-black md:text-[24px]">
                    {/* ${totalPrice.toFixed(2)} */}12.99
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    //   onClick={}
                    disabled={quantity === 1}
                    className="flex h-13 w-13 items-center justify-center rounded-full border border-[#E4E4E7] text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 md:h-11 md:w-11"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="min-w-5 text-center text-[22px] font-medium text-black">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    //   onClick={increaseQuantity}
                    className="flex h-13 w-13 items-center justify-center rounded-full border border-black text-black transition hover:bg-black hover:text-white md:h-11 md:w-11"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <Button className="bg-black hover:bg-gray-800 w-full text-white">
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
