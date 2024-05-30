"use client";
import React, { use, useEffect, useState } from "react";
import { Input, Select, SelectItem, Slider } from "@nextui-org/react";
import cars from "./cars.json";
import FuelPump from "./components/fuelPump";
import { Steps } from "../steps";

export default function REfillTank() {
  const steps = 3;
  const [fuelTankSize, setFuelTankSize] = useState(0);
  const [initialFuelLevel, setInitialFuelLevel] = useState(0);
  const [currentFuelLevel, setCurrentFuelLevel] = useState(initialFuelLevel);
  const [models, setModels] = useState<string[]>([]);
  const [variants, setVariants] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [amountToRefill, setAmountToRefilll] = useState(0);
  const [view, setView] = useState("initial");

  useEffect(() => {
    const make = cars.find((car) => car.make === selectedMake);
    const models = make?.models.map((model) => model.model_name);
    if (!models) return;
    setModels(models);
    setFuelTankSize(0); // Initiate fuel tank size
    setVariants([]); // Reset variants
    setSelectedModel(""); // Reset selected model
    setSelectedVariant(""); // Reset selected variant
  }, [selectedMake]);

  useEffect(() => {
    const make = cars.find((car) => car.make === selectedMake);
    const model = make?.models.find(
      (model) => model.model_name === selectedModel
    );

    // If a model has a fuel tank size, set it
    // Otherwise, set the variants
    if (model?.fuel_tank_size) {
      setFuelTankSize(model.fuel_tank_size);
    } else if (model?.variants) {
      const variants = model?.variants.map((variant) => variant.variant_name);
      setVariants(variants);
    }
  }, [selectedModel]);

  useEffect(() => {
    const make = cars.find((car) => car.make === selectedMake);
    const model = make?.models.find(
      (model) => model.model_name === selectedModel
    );
    const variant = model?.variants.find(
      (variant) => variant.variant_name === selectedVariant
    );

    if (variant?.fuel_tank_size) {
      setFuelTankSize(variant.fuel_tank_size);
    }
  }, [selectedVariant]);

  useEffect(() => {
    // setAmountToRefilll(
    //   calculateRefillAmount(initialFuelLevel, currentFuelLevel, fuelTankSize)
    // );
    // setAmountToRefilll(refillFuel(initialFuelLevel, currentFuelLevel));
    setAmountToRefilll(
      calculateFuelUsed(initialFuelLevel, currentFuelLevel, fuelTankSize)
    );
  }, [currentFuelLevel]);

  useEffect(() => {
    setInitialFuelLevel(fuelTankSize / fuelTankSize);
  }, [fuelTankSize]);

  useEffect(() => {
    setCurrentFuelLevel(initialFuelLevel);

    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      #currentFuelLevel [data-slot='track']::before {
        content: '';
        display: block;
        width: ${initialFuelLevel * 100}%;
        height: 100%;
        background: rgba(0,0,0,0.3);
      }
    `;
    document.head.appendChild(styleElement);
  }, [initialFuelLevel]);

  function calculateRefillAmount(
    initialFuelLevel: number,
    currentFuelLevel: number,
    fuelTankSize: number
  ): number {
    // Ensure the fuel levels are within the tank size
    if (initialFuelLevel > fuelTankSize || currentFuelLevel > fuelTankSize) {
      //   throw new Error("Fuel level cannot exceed fuel tank size");
    }

    // Calculate the used fuel
    const usedFuel = initialFuelLevel - currentFuelLevel;

    // Ensure the used fuel is not negative
    if (usedFuel < 0) {
      //   throw new Error("Current fuel level cannot exceed initial fuel level");
    }

    // Calculate the refill amount
    const refillAmount = usedFuel;

    return refillAmount;
  }

  function refillFuel(initialFuelLevel: number, currentFuelLevel: number) {
    let refillAmount = 0;

    while (currentFuelLevel < initialFuelLevel) {
      currentFuelLevel++;
      refillAmount++;
    }

    return initialFuelLevel - refillAmount;
  }

  function calculateFuelUsed(
    initialFuelLevel: number,
    currentFuelLevel: number,
    fuelTankSize: number
  ): number {
    // Calculate the used fuel
    const usedFuelRatio = initialFuelLevel - currentFuelLevel;

    // Ensure the used fuel is not negative
    if (usedFuelRatio < 0) {
      //   throw new Error("Current fuel level cannot exceed initial fuel level");
    }

    // Convert the used fuel ratio to litres
    const usedFuelLitres = usedFuelRatio * fuelTankSize;

    return usedFuelLitres;
    // return initialFuelLevel * fuelTankSize - usedFuelLitres;
  }

  return (
    <div className="text-white bg-black p-6 rounded-2xl">
      <Steps
        error={[
          {
            1: {
              hasError: fuelTankSize === 0,
              message: "Select your vehicle",
            },
          },
        ]}
        style={{ action: ["self-center", "text-green"] }}
      >
        <div className="flex flex-col self-center w-full max-w-[400px] gap-3">
          <Select
            labelPlacement="inside"
            placeholder={selectedMake || "Select vehicle Make"}
            label="Make"
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            {cars.map((car) => (
              <SelectItem key={car.make} value={selectedMake}>
                {car.make}
              </SelectItem>
            ))}
          </Select>
          <Select
            labelPlacement="inside"
            placeholder={selectedModel || "Select vehicle Model"}
            label="Model"
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={!models.length}
          >
            {models.map((model) => (
              <SelectItem key={model} value={selectedModel}>
                {model}
              </SelectItem>
            ))}
          </Select>
          {variants.length ? (
            <Select
              labelPlacement="inside"
              placeholder={selectedVariant || "Select vehicle Variant"}
              label="Variant"
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {variants.map((variant) => (
                <SelectItem key={variant} value={selectedVariant}>
                  {variant}
                </SelectItem>
              ))}
            </Select>
          ) : null}
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative w-full h-6">
            <div
              className="absolute w-[1px] h-full bg-white"
              style={{
                left: `${initialFuelLevel * 100}%`,
              }}
            ></div>
          </div>
          <Slider
            label="Drag to select initial fuel level"
            color="foreground"
            size="md"
            minValue={0}
            maxValue={1}
            step={0.0125}
            marks={[
              {
                value: 0,
                label: "E",
              },
              {
                value: 0.25,
                label: "|",
              },
              {
                value: 0.5,
                label: "1/2",
              },
              {
                value: 0.75,
                label: "|",
              },
              {
                value: 1,
                label: "F",
              },
            ]}
            defaultValue={initialFuelLevel || 1}
            renderValue={() => (
              <span className="hidden md:inline">{`${
                initialFuelLevel * fuelTankSize
              } L`}</span>
            )}
            onChange={(value) => {
              // const newValue = Number(value);
              // const stepRatio = 1 / (100 - 0);
              // const newFuelLevel = newValue * stepRatio;
              // console.log(newFuelLevel);
              // setInitialFuel(newFuelLevel);
              // setCurrentFuelLevel(newFuelLevel);
              const newValue = Number(value);

              setInitialFuelLevel(newValue);
              setCurrentFuelLevel(newValue);
            }}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative w-full h-6">
            <div
              className="absolute w-[1px] h-full bg-white"
              style={{
                left: `${currentFuelLevel * 100}%`,
              }}
            ></div>
          </div>
          <Slider
            id="currentFuelLevel"
            label="Drag to select current fuel level"
            color="foreground"
            size="md"
            minValue={0}
            maxValue={1}
            step={0.0125}
            marks={[
              {
                value: 0,
                label: "E",
              },
              {
                value: 0.25,
                label: "|",
              },
              {
                value: 0.5,
                label: "1/2",
              },
              {
                value: 0.75,
                label: "|",
              },
              {
                value: 1,
                label: "F",
              },
            ]}
            value={currentFuelLevel}
            renderValue={() => (
              <span className="hidden md:inline">{`${
                currentFuelLevel * fuelTankSize
              } L`}</span>
            )}
            onChange={(value) => {
              const newValue = Number(value);

              if (newValue > initialFuelLevel) return;

              setCurrentFuelLevel(newValue);
            }}
          />
        </div>

        <div className="text-center text-sm text-gray-400">
          Amount to refill (litres)
          <span className="block text-2xl text-gray-50">{amountToRefill}</span>
        </div>
      </Steps>
    </div>
  );
}
