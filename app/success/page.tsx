import { Suspense } from "react";
import SuccessClient from "./SuccessClient";
import SuccessLoading from "@/components/SuccessLoading";

export default function Page() {
  return (
    <Suspense fallback={<SuccessLoading />}>
      <SuccessClient />
    </Suspense>
  );
}