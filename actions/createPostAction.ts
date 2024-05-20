'use server'
import { currentUser } from "@clerk/nextjs/server";

 // tell nextjs this is a server action

export default async function createPostAction(formData: FormData) {
    const user = await currentUser();

    if(!user){
        throw new Error("User not authenticated");
    }

    // get the post input and image from the form data
    const postInput = formData.get("postInput") as string;
    const image = formData.get("image") as File;
    let imageUrl: string | undefined;

    if (!postInput) {
        throw new Error("Post cannot be empty");
    }

    //define user

    // uploade image if there is one

    // create post in database

    // revalidatePath '/ -home page
}