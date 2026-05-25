import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<main>Loading...</main>}>
      <SuccessClient />
    </Suspense>
  );
}