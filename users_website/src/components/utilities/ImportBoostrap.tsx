/* eslint-disable @typescript-eslint/no-require-imports */
'use client'
import { useEffect } from "react";

export default function ImportBootstrap() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
}