"use client";

import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
import config from "@/lib/config";
import ImageKit from "imagekit";
import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Request failed with status code ${response.status}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (err: any) {
    throw new Error(`Authentication request failed: ${err.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });

  const onError = (err: any) => {
    console.log(err);

    toast.error(`${type} upload failed`, {
      description: `Your image could not be uploaded. Please try again.`,
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast.success(`${type} uploaded successfully`, {
      description: `${res.filePath} uploaded successfully!`,
    });
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
        />
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file?.filePath &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath!}
            path={file.filePath!}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath!}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};
export default FileUpload;
