import LoadingSpinner from "@/components/loading-spinner";

export default function Loading() {
  return (
    <LoadingSpinner
      type="spinningBubbles"
      color="#357ddd"
      width={"64%"}
      height={"64%"}
      className="pt-10"
    />
  );
}
