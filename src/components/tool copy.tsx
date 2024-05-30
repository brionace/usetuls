// "use client";
// import { useContext, useEffect, useState } from "react";
// import {
//   Card as NextCard,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Image,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
//   Link,
//   Avatar,
//   Button,
// } from "@nextui-org/react";
// import { DataContext } from "@/app/data-provider";
// import { MdOpenInNew, MdBookmark } from "react-icons/md";
// import { isImageLink, isSVGFormatImage, modalSettings } from "@/utils";
// import { Pin } from "@/components/user-action";
// import { ToolsHeader } from "./tools-header";
// import { ToolsBody } from "./tools-body/";

// type ToolProps = {
//   id: number;
//   favicon: string;
//   title: string;
//   description: string;
//   url: string;
// };

// export default function Tool({
//   icon,
//   title,
//   description,
//   url,
//   children,
// }: {
//   title: string;
//   description: string;
//   url?: string;
//   icon?: React.ReactNode;
//   children?: React.ReactNode;
// }) {
//   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
//   const [toolData, setToolData] = useState<ToolProps | null>(null);
//   const {
//     state: { showTool },
//     dispatch,
//   } = useContext(DataContext);

//   useEffect(() => {
//     if (showTool === null) {
//       onClose();
//       return;
//     }

//     fetchToolData();
//     onOpen();
//   }, [showTool]);

//   useEffect(() => {
//     if (!isOpen) {
//       setToolData(null);
//       dispatch({ type: "HIDE_TOOL" });
//     }
//   }, [isOpen]);

//   async function fetchToolData() {
//     try {
//       const response = await fetch("/api/tools/?slug=" + showTool);
//       const {
//         data: { tools },
//       } = await response.json();

//       setToolData(tools[0]);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   if (!toolData) return null;

//   // const { favicon, title, description, url } = toolData;

//   // const faviconUrl = `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FAVICON_URL}/${favicon}`;
//   // const SVGImage = () => {
//   //   if (!isSVGFormatImage(faviconUrl)) {
//   //     return null;
//   //   }
//   //   return faviconUrl;
//   // };

//   return (
//     <Modal
//       backdrop="opaque"
//       isOpen={isOpen}
//       onClose={onClose}
//       placement="top"
//       closeButton={false}
//       size="full"
//       motionProps={modalSettings.motionProps}
//       classNames={{
//         // body: "m-4",
//         // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
//         base: "m-4",
//         // header: "border-b-[1px] border-[#292f46]",
//         // footer: "border-t-[1px] border-[#292f46]",
//         closeButton: "hidden",
//       }}
//     >
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ToolsHeader icon={icon} title={title} onClose={onClose}>
//               <Button
//                 as={Link}
//                 href={url}
//                 size="sm"
//                 isExternal
//                 color="default"
//                 variant="light"
//                 isIconOnly
//                 className="flex flex-column justify-center w-[30px] h-[30px] rounded-full !bg-transparent hover:!bg-default"
//               >
//                 <MdOpenInNew />
//               </Button>
//               <Pin id={toolData.id} />
//             </ToolsHeader>
//             {children ? (
//               children
//             ) : (
//               <ToolsBody>
//                 <div className="flex flex-col md:flex-row justify-between gap-3">
//                   <p className="max-w-[500px]">{description}</p>
//                   <p className="flex gap-3">
//                     <strong>Go to page</strong>
//                     <a href={url} target="_blank">
//                       {url}
//                     </a>
//                   </p>
//                 </div>
//               </ToolsBody>
//             )}
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// }
