import ImageViewer from "react-simple-image-viewer";
import Link from "next/link";
import { useState } from "react";

const Bio = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  return (
    <section
      id={"biografia"}
      className={
        "flex min-h-[440px] w-full flex-1 flex-col items-center justify-center space-y-6 bg-slate-900/50 px-6 py-12 sm:px-16 sm:py-24"
      }
    >
      <h2 className={"text-xl font-light uppercase text-white"}>Biografia</h2>
      <div
        className={"flex w-full flex-col items-center justify-center space-y-4"}
      >
        <p className={"text-justify font-light text-white/70"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu
          commodo metus, eu elementum ipsum. Cras sollicitudin justo aliquam,
          vestibulum metus quis, laoreet elit. Donec finibus, justo eu mollis
          bibendum, risus ligula semper eros, at consectetur tortor magna quis
          dolor. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Maecenas mi purus, porttitor sit amet massa
          id, venenatis auctor lorem. Ut sed sapien massa. Phasellus facilisis
          erat sed felis mollis, nec bibendum tellus placerat. Mauris vel enim
          vitae turpis congue porttitor. Pellentesque ullamcorper tincidunt
          lorem. Phasellus sagittis rutrum leo, ac suscipit dolor commodo non.
        </p>
      </div>
      <div className={"flex flex-col gap-4 sm:flex-row"}>
        {Array.from({ length: 2 }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentImage(i);
              setIsViewerOpen(true);
            }}
          >
            <img
              alt={"Image"}
              src={`https://picsum.photos/300/200?grayscale`}
              className={"h-[200px] w-[300px] rounded object-cover"}
            />
          </button>
        ))}
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={Array.from({ length: 2 }).map(
            (_) => "https://picsum.photos/300/200?grayscale"
          )}
          currentIndex={currentImage}
          closeOnClickOutside={true}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          onClose={() => {
            setCurrentImage(0);
            setIsViewerOpen(false);
          }}
        />
      )}
      <Link className={"text-white underline"} href={"/fotos"}>
        Ver mais
      </Link>
    </section>
  );
};

export default Bio;
