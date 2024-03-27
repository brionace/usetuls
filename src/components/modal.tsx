import React from "react";

export default function Modal() {
  return (
    <>
      {/* <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        scrollBehavior="inside"
        className="m-4"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pr-10">
                {headerChildren}
              </ModalHeader>
              <ModalBody className="mb-8">{bodyChildren}</ModalBody>
              <ModalFooter>{footerChildren}</ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  );
}
