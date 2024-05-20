import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";

export default function Home() {
  return (
    <main className="grid grid-cols-8 mt-5 sm:px-5">
      
      <section className="hidden md:inline md:col-span-2">
        {/* UserInformation */}
        <UserInformation />
      </section>

      <section className="col-span-full md:col-span-6 xl:col-span-4">
        {/* Post forom */}
        <PostForm />
        {/* Post feed */}
      </section>

      <section className="hidden xl:inline justify-center col-span-2">
      <div className="bg-blue-400">hello</div>
        {/* widget */}
      </section>

    </main>
  );
}
