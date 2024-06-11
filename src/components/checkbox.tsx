import React, { useEffect } from "react";
import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";
import { MdCheck } from "react-icons/md";

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        content: "text-primary-foreground pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export default function Checkbox({
  value,
  children,
  onChange,
}: {
  value: number | string;
  children: React.ReactNode;
  onChange: (value: number) => void;
}) {
  const {
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    defaultSelected: false,
  });

  const styles = checkbox({ isSelected, isFocusVisible });
  const { ref, ...labelProps } = getLabelProps();

  useEffect(() => {
    onChange(value);
  }, [isSelected]);

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        startContent={isSelected ? <MdCheck className="ml-1" /> : null}
        variant="faded"
        {...labelProps}
      >
        {children}
      </Chip>
    </label>
  );
}
