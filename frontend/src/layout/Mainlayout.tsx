import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import LeftSidebar from "@/layout/LeftSidebar";
import { Outlet } from "react-router-dom"
import Rightsidebar from "./Rightsidebar";
import AudioPlayer from "@/components/ui/Audiocomp/AudioPlayer";
import PlayBack from "./PlayBack";
import { useEffect, useState } from "react";


function Mainlayout() {
  const [isMobile,setMobile]=useState<boolean>();
  
  useEffect(()=>{
    const checkMobile=()=>{
      setMobile(window.innerWidth<600);
    };
    checkMobile();

    window.addEventListener("resize",checkMobile);
    return()=>window.removeEventListener("resize",checkMobile);
  },[])

  return (
    <div className="h-screen bg-black text-white flex flex-col">
            <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
                <ResizablePanel defaultSize={20} minSize={isMobile?0:10} maxSize={30}>

                  <AudioPlayer/>

                   <LeftSidebar/>
                </ResizablePanel>

            <ResizableHandle className="bg-black- w-2 rounded-ig transition-colors" />

                <ResizablePanel defaultSize={isMobile?80:60}>
                    <Outlet></Outlet>
                </ResizablePanel>

            <ResizableHandle className="bg-black- w-2 rounded-ig transition-colors"/>

               {!isMobile && ( <ResizablePanel defaultSize={20} minSize={0} maxSize={30} collapsedSize={0}>
                  <Rightsidebar/>
                </ResizablePanel>)}
            </ResizablePanelGroup>
            <PlayBack/>
    </div>
  )
}

export default Mainlayout   