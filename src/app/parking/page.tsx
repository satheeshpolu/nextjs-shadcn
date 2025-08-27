"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { number } from "framer-motion";
import TitleHighlight from "../components/TitleHighlight";

export default function Parking() {
  const [carNotFound, setCarNotFound] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [carNo, setCarNo] = useState("");

  const [parkingSlots, setParkingSlots] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      occupied: false,
      carNo: "",
      // checkInAt: number,
      // checkOutAt: number,
    }))
  );

  const checkAvailability = () => {
    const occupiedSlots = parkingSlots.filter((slot) => slot.occupied);
    if (occupiedSlots.length === parkingSlots.length) {
      setCarNo("");
      setIsFull(true);
      return;
    }
  };

  const handleCheckIn = () => {
    const occupiedSlots = parkingSlots.filter((slot) => slot.occupied);
    if (occupiedSlots.length === parkingSlots.length) {
      setCarNo("");
      setIsFull(true);
      return;
    }
    const availableIndex = parkingSlots.findIndex((slot) => !slot.occupied);
    const noExist = parkingSlots.filter((slot) => slot.carNo === carNo);

    if (noExist.length >= 1) {
      setIsExist(true);
      return;
    }

    if (availableIndex !== -1 && carNo && !isFull) {
      const updatedSlots = [...parkingSlots];
      updatedSlots[availableIndex] = {
        ...updatedSlots[availableIndex],
        occupied: true,
        carNo: carNo.toUpperCase(),
        //   checkInAt: new Date().getTime(),
      };
      setParkingSlots(updatedSlots);
      setCarNo("");
      setCarNotFound(false);
      setIsExist(false);
      setIsFull(false);
      checkAvailability();
    }
  };

  const handleCheckOut = () => {
    const updatedSlots = [...parkingSlots];
    const checkOutCarIndex = updatedSlots.findIndex(
      (slot) => slot.carNo === carNo.toUpperCase()
    );

    if (checkOutCarIndex == -1) {
      setCarNotFound(true);
      return;
    }
    setCarNotFound(false);
    setIsExist(false);
    setCarNo("");
    updatedSlots[checkOutCarIndex] = {
      ...updatedSlots[checkOutCarIndex],
      occupied: false,
      carNo: "",
    };
    setParkingSlots(updatedSlots);
    setIsFull(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-10">
      {/* Left: 70% */}
      <section className="md:col-span-7 p-6 md:p-10">
        <TitleHighlight
          title="Smart Parking System"
          fromGradient="from-white-300"
          viaGradient="via-green-300"
          toGradient="to-white-300"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {parkingSlots.map((slot) => (
            <Card key={slot.id} className="rounded-2xl shadow-sm">
              <CardContent className="flex h-24 p-0">
                {/* Left 70%: Image placeholder */}

                <div
                  className={`w-[60%] flex items-center justify-center ${
                    slot.carNo ? "bg-red-300" : "bg-gray-100"
                  } rounded-r-2xl mr-4`}
                >
                  <span className="text-gray-600">Image</span>
                </div>

                {/* Right 30%: Car number */}
                <div className="w-[40%] flex flex-col items-center justify-center bg-white rounded-r-2xl border-l">
                  <p className="font-medium text-gray-500">
                    {slot.carNo ? slot.carNo : "Free"}
                  </p>
                  <p
                    className={`font-medium text-sm ${
                      slot.carNo ? "text-red-400" : "text-green-500"
                    }`}
                  >
                    Slot {slot.id}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Right: 30% */}
      <aside className="md:col-span-3 p-6 md:p-8 bg-gray-50 border-t md:border-t-0 md:border-l">
        <h2 className="text-xl font-medium mb-4">
          Manage Parking({isFull ? "Not Available" : "Available"})
        </h2>
        <Tabs defaultValue="checkin" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="checkin">Check-In</TabsTrigger>
            <TabsTrigger value="checkout">Check-Out</TabsTrigger>
          </TabsList>

          {/* Check-In Form */}
          <TabsContent value="checkin">
            <Card>
              <CardContent className="space-y-4 p-4">
                <Input
                  placeholder="Car Number"
                  value={carNo}
                  onChange={(e) => setCarNo(e.target.value)}
                />
                {isExist && (
                  <p className="text-red-500 font-medium">
                    This car number already exists. Please check it again.
                  </p>
                )}
                {isFull && (
                  <p className="text-red-500 font-medium">
                    Slots are not available at the moment.
                  </p>
                )}
                <Button
                  className="w-full"
                  onClick={handleCheckIn}
                  disabled={isFull ? true : false}
                >
                  Check In
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Check-Out Form */}
          <TabsContent value="checkout">
            <Card>
              <CardContent className="space-y-4 p-4">
                <Input
                  placeholder="Car Number"
                  value={carNo}
                  onChange={(e) => setCarNo(e.target.value)}
                />
                {carNotFound && (
                  <p className="text-red-500 font-medium">
                    Car number not recognized. Please try again.
                  </p>
                )}
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={handleCheckOut}
                >
                  Check Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </aside>
    </div>
  );
}
