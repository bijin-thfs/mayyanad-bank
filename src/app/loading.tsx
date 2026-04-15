import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center gap-8">
      <Image
        src="/mrcb-banner.jpg"
        alt="Mayyanad Regional Co-operative Bank"
        width={400}
        height={150}
        priority
        className="max-w-[80vw] h-auto"
      />
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-secondary animate-spin text-3xl">
          progress_activity
        </span>
      </div>
    </div>
  );
}
