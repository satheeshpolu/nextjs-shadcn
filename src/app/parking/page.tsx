"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useMemo, useState } from "react";
import { number } from "framer-motion";
import TitleHighlight from "../components/TitleHighlight";
import { FaCarSide } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

export default function Parking() {
  const [carNotFound, setCarNotFound] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [carNo, setCarNo] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [duration, setDuration] = useState(0);
  const [showCheckoutInfo, setShowCheckoutInfo] = useState(false);
  const [parkingSlots, setParkingSlots] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      occupied: false,
      carNo: "",
      in: 0,
      out: 0,
    }))
  );

  const [vehicleInfo, setVehicleInfo] = useState({
    id: 0,
    occupied: false,
    carNo: "",
    in: 0,
    out: 0,
  });
  const checkAvailability = () => {
    const occupiedSlots = parkingSlots.filter((slot) => slot.occupied);
    if (occupiedSlots.length === parkingSlots.length) {
      setCarNo("");
      setIsFull(true);
      return;
    }
  };

  const handleCheckIn = () => {
    if (!carNo) {
      setErrorMsg(true);
      return;
    }
    setErrorMsg(false);
    const occupiedSlots = parkingSlots.filter((slot) => slot.occupied);
    if (occupiedSlots.length === parkingSlots.length) {
      setCarNo("");
      setIsFull(true);
      return;
    }
    const availableIndex = parkingSlots.findIndex((slot) => !slot.occupied);
    const exist = parkingSlots.filter(
      (slot) => slot.carNo === carNo.trim().toUpperCase()
    );
    if (exist.length >= 1) {
      setIsExist(true);
      return;
    }

    if (availableIndex !== -1 && carNo && !isFull) {
      const updatedSlots = [...parkingSlots];
      updatedSlots[availableIndex] = {
        ...updatedSlots[availableIndex],
        occupied: true,
        carNo: carNo.toUpperCase(),
        in: new Date().getTime(),
        out: 0,
      };
      setParkingSlots(updatedSlots);
      setCarNo("");
      setCarNotFound(false);
      setIsExist(false);
      setIsFull(false);
      checkAvailability();
    }
  };

  const findVehicle = () => {
    if (!carNo.trim()) {
      return null;
    }
    const details = parkingSlots.find(
      (ps) => ps.carNo === carNo.trim().toUpperCase()
    );
    return details ? details : null;
  };

  const calculatePrice = (hours: number): number => {
    if (hours > 1 && hours <= 2) return 3;
    if (hours > 3 && hours <= 5) return 5;
    if (hours > 5 && hours <= 12) return 10;
    return 2;
  };

  const durationInfo = useMemo(() => {
    const diffMs = vehicleInfo.out - vehicleInfo.in;
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const diffHours = Math.floor(totalMinutes / 60);

    const remainingMinutes = totalMinutes % 60;
    const remainingSeconds = totalSeconds % 60;

    const _price = calculatePrice(diffHours);

    return {
      duration: `${diffHours}h ${remainingMinutes}m ${remainingSeconds}s`,
      price: _price,
    };
  }, [vehicleInfo.in, vehicleInfo.out]);

  const handleCheckOut = () => {
    const updatedSlots = [...parkingSlots];
    const checkOutCarIndex = updatedSlots.findIndex(
      (slot) => slot.carNo === carNo.trim().toUpperCase()
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
    setShowCheckoutInfo(false);
  };

  const getVehicleDetails = () => {
    if (!carNo) {
      setErrorMsg(true);
      return;
    }
    setErrorMsg(false);
    setShowCheckoutInfo(false);
    const details = findVehicle();
    if (details) {
      const _details = { ...details, out: new Date().getTime() };
      setVehicleInfo(_details);
      setShowCheckoutInfo(true);
      setCarNotFound(false);
    } else {
      setCarNotFound(true);
    }
  };

  const getTime = (time: number): string => {
    return new Date(time).toLocaleString();
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-10">
      {/* Left: 70% */}
      <section className="md:col-span-7 p-6 md:p-10">
        <TitleHighlight
          title="Smart Parking System"
          fromGradient="from-white-300"
          viaGradient="via-purple-300"
          toGradient="to-white-300"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {parkingSlots.map((slot) => (
            <Card key={slot.id} className="rounded-2xl shadow-sm">
              <CardContent className="flex h-24 p-0">
                {/* Left 70%: Image placeholder */}

                <div
                  className={`w-[60%] flex items-center justify-center ${
                    slot.carNo ? "bg-red-100" : "bg-green-100"
                  } rounded-r-2xl mr-4`}
                >
                  {slot.occupied && (
                    <FaCarSide
                      size={90}
                      className="text-red-500 w-50"
                      style={{
                        animation: "drive 3s ease-out forwards",
                      }}
                    />
                  )}
                  {!slot.occupied && (
                    <span className="font-medium text-green-500">Free</span>
                  )}

                  <style>
                    {`
          @keyframes drive {
            from { transform: translateX(-60px); }
            to { transform: translateX(15px); }
          }
        `}
                  </style>
                </div>

                {/* Right 30%: Car number */}
                <div className="w-[40%] flex flex-col items-center justify-center bg-white rounded-r-2xl border-l">
                  <p className="font-medium text-gray-500">
                    {slot.carNo ? slot.carNo : "XX XXXX"}
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
                {errorMsg && (
                  <p className="text-red-500 font-medium">
                    Please provide the vehicle number.
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
                {errorMsg && (
                  <p className="text-red-500 font-medium">
                    Please provide the vehicle number.
                  </p>
                )}
                {carNotFound && (
                  <p className="text-red-500 font-medium">
                    Car number not recognized. Please try again.
                  </p>
                )}
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={getVehicleDetails}
                >
                  Get Details
                </Button>
                {showCheckoutInfo && !errorMsg && (
                  <>
                    <Separator className="border-t-2 border-dashed border-gray-500 my-6" />

                    <div className="grid grid-cols-2 pr-4">
                      <span className="font-bold">Vehicle No</span>
                      <span className="text-right font-bold text-green-500">
                        {vehicleInfo?.carNo}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 pl-4 pr-4">
                      <span>Check In at</span>
                      <span className="text-right font-medium">
                        {getTime(vehicleInfo?.in)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 pl-4 pr-4">
                      <span>Check Out at</span>
                      <span className="text-right font-medium">
                        {getTime(vehicleInfo?.out)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 pl-4 pr-4">
                      <span>Duration</span>
                      <span className="text-right font-medium">
                        {durationInfo.duration}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 pl-4 pr-4">
                      <span>Subtotal</span>
                      <span className="text-right font-medium">
                        €{durationInfo.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 pl-4 pr-4">
                      <span>Tax (7%)</span>
                      <span className="text-right font-medium">
                        €{(durationInfo.price * 7) / 100}
                      </span>
                    </div>
                    <Separator className="border-t border-dashed border-gray-400 my-4" />

                    <div className="grid grid-cols-2 text-base pr-4">
                      <span className="font-bold">Total</span>
                      <span className="text-right font-bold text-red-600">
                        €{durationInfo.price + (durationInfo.price * 7) / 100}
                      </span>
                    </div>

                    <Button
                      className="w-full"
                      variant="destructive"
                      onClick={handleCheckOut}
                    >
                      Pay & Check Out
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </aside>
    </div>
  );
}
