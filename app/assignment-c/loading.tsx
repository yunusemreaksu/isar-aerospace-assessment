import LoadingSpinner from "@/components/loading-spinner";

export default function Loading() {
  return (
    <LoadingSpinner
      type="spinningBubbles"
      color="#357ddd"
      width={100}
      height={100}
      className="pt-10"
    />
  );
}
