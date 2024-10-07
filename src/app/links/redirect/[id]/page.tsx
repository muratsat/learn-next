import { type Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const imageSizes = [
    { width: 500, height: 600 },
    { width: 1000, height: 600 },
    { width: 1500, height: 600 },
  ];

  const title = `Post ${params.id}`;
  const description = `You're looking for post ${params.id}`;

  return {
    title,
    description: description,
    openGraph: {
      images: imageSizes.map((size) => ({
        url: `https://via.placeholder.com/${size.width}x${size.height}?text=${description}`,
        width: size.width,
        height: size.height,
        alt: title,
      })),
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  redirect("/posts/" + params.id);
  // const title = `Post ${params.id}`;
  // const description = `You're looking for post ${params.id}`;

  // return (
  //   <div>
  //     <h1>{title}</h1>
  //     <p>{description}</p>
  //   </div>
  // );
}
