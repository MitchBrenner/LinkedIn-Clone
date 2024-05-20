'use client'

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import createPostAction from "@/actions/createPostAction";

function PostForm() {
    const { user } = useUser();
    const ref = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handlePostAction = async (formData: FormData) => {
        const formDataCopy = formData;
        ref.current?.reset();

        const text = formDataCopy.get("postInput") as string;

        if(!text.trim()){
            throw new Error("Post cannot be empty");
        }

        setPreview(null);

        try {
            await createPostAction(formDataCopy);
        } catch (error) {
            console.log("Error creating post: ", error);
        }

    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

  return (
    <div className="mb-2">
        <form 
            action={(formData) => {
            // handle form submission with server action
                handlePostAction(formData);
            // toast notification basedd on promise above
            }} 
            ref={ref} 
            className="p-3 rounded-log bg-white rounded-lg"
        >
            <div className="flex items-center space-x-2">
            <Avatar>
                {
                user?.id ? (
                    <AvatarImage src={user?.imageUrl} />
                ) : (
                    <AvatarImage src="https://github.com/shadcn.png" />
                )
                }
                <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
            </Avatar>

            <input 
                type="text"
                name="postInput"
                placeholder="Start writing a post..."
                className="flex-1 outline-none rounded-full py-3 px-4 border"
            />

            <input                 
                ref={fileInputRef} 
                type="file" 
                name="image" 
                accept="image/*" 
                hidden 
                onChange={handleImageChange}
            />

            <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-full" >
                Post
            </button>

            </div>

            {/* Preview conditional check */}
            {
                preview && (
                    <div className="mt-3">
                        <img src={preview} alt="preview" className="object-cover w-full" />
                    </div>
                )
            }
            <div className="flex justify-end mt-2 space-x-2">
                <Button type="button" onClick={() => fileInputRef.current?.click()}>
                    <ImageIcon className="mr-2" size={16} color="currentColor" />
                    {preview ? "Change" : "Add"} image
                </Button>

                {/* add a remove preview button */}
                {
                    preview && (
                        <Button type="button" onClick={() => setPreview(null)} variant="outline">
                            <XIcon className="mr-2" size={16} color="currentColor" />
                            Remove image
                        </Button>
                    )
                }
            </div>
        </form>

        <hr className="my-5 border-gray-200"/>
    </div>
  )
}

export default PostForm