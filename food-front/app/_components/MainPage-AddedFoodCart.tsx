import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Image from "next/image";

export const FoodDetailModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white overflow-hidden right-6 bottom-12 text-black absolute cursor-pointer">
          <Plus className="w-5 h-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="p-6">
        <div className="w-full h-full gap-6 flex">
          <div className=" h-[412px] w-full">
            <Image
              src="/image/Product Image.svg"
              width={400}
              height={400}
              alt="Product"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-[#EF4444] text-2xl">Sunshine Stackers </p>
            <p className="">
              Fluffy pancakes text-2xlstacked with fruits, cream, syrup, and
              powdered sugar.
            </p>
            <div className="flex">
              {" "}
              <p>
                Total price <br /> $12.99
              </p>
              <div className="flex flex-row">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white overflow-hidden right-6 bottom-12 text-black absolute cursor-pointer">
                  <Plus className="w-4 h-4" />
                </div>
                <p>1</p>
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white overflow-hidden right-6 bottom-12 text-black absolute cursor-pointer">
                  <Plus className="w-4 h-4" />
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
