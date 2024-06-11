"use client";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { useContext, useEffect, useState } from "react";
import { modalSettings } from "@/utils";
import { redirect, usePathname } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { MdBookmarks } from "react-icons/md";
import { DataContext } from "@/app/data-provider";

export function LoginForm() {
  const supabase = createClient();
  // const [user, setUser] = useState(serverUser);
  // const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const pathname = usePathname();

  const {
    state: { user },
    dispatch,
  } = useContext(DataContext);

  const signOut = async () => {
    // const { error } = await supabase.auth.signOut();
    await fetch("/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: pathname }),
    });
  };

  return (
    <>
      {!user ? (
        <>
          <Button onClick={() => onOpen()}>Sign in</Button>
          <Modal
            id="auth-modal"
            backdrop="opaque"
            isOpen={isOpen}
            onClose={onClose}
            placement="top"
            closeButton={false}
            size="5xl"
            motionProps={modalSettings.motionProps}
            classNames={{
              // body: "m-4",
              // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
              base: "m-4",
              // header: "border-b-[1px] border-[#292f46]",
              // footer: "border-t-[1px] border-[#292f46]",
              // closeButton: "hidden",
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody>
                    {!user ? (
                      <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        providers={["google", "facebook", "twitter", "github"]}
                      />
                    ) : (
                      <Button
                        // variant="light"
                        size="sm"
                        className="rounded-full min-w-fit"
                        onPress={() => dispatch({ type: "SHOW_BOOKMARKS" })}
                      >
                        <span className="hidden sm:inline">My tools</span>
                        <MdBookmarks />
                      </Button>
                    )}
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Button
          isIconOnly
          radius="full"
          variant="ghost"
          onClick={() => signOut()}
        >
          <Avatar
            radius="full"
            showFallback
            name={user.email.slice(0, 1)}
            className="w-full h-full"
          />
        </Button>
      )}
    </>
  );
}
