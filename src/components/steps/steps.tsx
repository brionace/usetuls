import next from "next";
import React from "react";
import { Button } from "@nextui-org/react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export default function Steps({
  children,
  error,
  style,
}: {
  children: React.ReactNode[];
  error?: Record<number, { hasError: boolean; message: string }>[];
  style?: Record<string, string[]>;
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [nextStepError, setNextStepError] = React.useState(false);
  const [nextStepErrorMessage, setNextStepErrorMessage] = React.useState("");
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);

  React.useEffect(() => {
    // Check if the next step has an error
    const nextStep = activeStep + 1;
    if (error) {
      const errorInNextStep = error?.find((err) => err[nextStep]) as
        | { hasError: boolean; message: string }
        | undefined;

      setNextStepError(errorInNextStep?.[nextStep]?.hasError);
      setNextStepErrorMessage(errorInNextStep?.[nextStep]?.message || "");
    }
  }, [activeStep, error]);

  React.useEffect(() => {
    if (!nextStepError) {
      setShowErrorMessage(false);
    }
  }, [nextStepError]);

  return (
    <div className="flex flex-col gap-6 p-6">
      {children[activeStep]}
      {showErrorMessage && (
        <div className="flex justify-center">
          <p className="text-red-500">{nextStepErrorMessage}</p>
        </div>
      )}
      <div className={`flex gap-3 ${style?.action.join(" ")}`}>
        <Button
          color="primary"
          isDisabled={activeStep === 0}
          onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 0))}
        >
          <MdArrowBack />
        </Button>
        <Button
          color="primary"
          //   isDisabled={nextStepError || activeStep === children?.length - 1}
          isDisabled={activeStep === children?.length - 1}
          onClick={() => {
            if (nextStepError) {
              setShowErrorMessage(true);
              return;
            }

            setShowErrorMessage(false);
            setActiveStep((prev) => (prev + 1) % children?.length);
          }}
        >
          <MdArrowForward />
        </Button>
      </div>
    </div>
  );
}
