import { CodeView } from "../code-view";
import { Hints } from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import { convertFilesToTreeItems } from "@/lib/utils";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState, useMemo, useCallback, Fragment, use } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";


import { TreeView } from "./tree-view";

type FileCollection = { [path: string]: string };

function getLanguageFromExtension(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension || "text";
}

interface FileBreadcrumbProps { 
  filePath: string;
 }

const FileBreadcrumb = ({filePath} : FileBreadcrumbProps) => {
  const pathSegments = filePath.split("/");
  const maxSegments = 3; // Maximum segments to display


  const rendererBreadcrumbItems = () => {
    if(pathSegments.length <= maxSegments) {
      // show all segments if 4 or less

      return pathSegments.map((segment, index) =>{
        const isLast = index === pathSegments.length -1;

        return (
          <Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-medium">
                    {segment}
                  </BreadcrumbPage>
                ) : (
                  <span className="text-muted-foreground">
                    {segment}
                  </span>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        )
      })
  } else {
      const firstSegment = pathSegments[0];
      const lastSegment = pathSegments[pathSegments.length - 1];

      return (
        <>
          <BreadcrumbItem>
             <span className="text-muted-foreground">
              {firstSegment}
             </span>
             <BreadcrumbItem>
                <BreadcrumbEllipsis />
             </BreadcrumbItem>
              <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              {lastSegment}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </>
      )
    }
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {rendererBreadcrumbItems()}
      </BreadcrumbList>
    </Breadcrumb>
  )
};

interface FileExplorerProps {
  files: FileCollection;
}

export const FileExplorer = ({ files }: FileExplorerProps) => {

    const [copied, setCopied] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(() => {
        const fileKeys = Object.keys(files);
        return fileKeys.length > 0 ? fileKeys[0] : null; 
    });

    const treeData = useMemo(() => {
      return convertFilesToTreeItems(files);
    }, [files]);

    const handleFileSelect = useCallback((
      filePath: string ) => {

        console.log({filePath})
      // Handle file selection logic here
        if(files[filePath]){
          setSelectedFile(filePath); 
        }
    },[files]) 

    const handleCopy = useCallback(() => {
      if(selectedFile){
        navigator.clipboard.writeText(files[selectedFile]);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        })
      }
    }, [])

  return (
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={30} minSize={30} className="bg-sidebar">
                    <TreeView 
                    data={treeData}
                    value={selectedFile}
                    onSelect={handleFileSelect}
                    />
                </ResizablePanel>
                <ResizableHandle className="hover:bg-primary transition-colors" />

                <ResizablePanel defaultSize={70} minSize={50} className="bg-editor">
                    {selectedFile && files[selectedFile] ? (
                        <div className="h-full w-full flex flex-col">
                            <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">
                                <FileBreadcrumb filePath={selectedFile} />
                                  <Hints text="Copy to Clipboard">
                                    <Button variant="outline" size="icon" className="ml-auto" onClick={handleCopy} disabled={copied}>
                                       {copied ? <CopyCheckIcon /> : <CopyIcon/> }
                                    </Button>
                                  </Hints>
                            </div>
                            <div className="flex-1 overflow-auto ">
                                <CodeView 
                                code={files[selectedFile]} 
                                lang={getLanguageFromExtension(selectedFile)} />
                            </div>
                        </div>
                    ) :(
                        <div className="fles h-full items-center justify-center text-muted-foreground">
                            Select a file to view it&apos;s contents.
                        </div>
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
  )
};
