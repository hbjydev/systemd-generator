import Link from "next/link";
import type { PropsWithChildren } from "react";

export const Shell: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <main className="container mx-auto bg-gray-50">
                <div className="flex flex-col items-center gap-3 py-6">
                    <h1 className="text-3xl font-bold">
                        systemd Unit Generator
                    </h1>
                    <ul>
                        <li>
                            <Link href="/">Services & Timer</Link>
                        </li>
                    </ul>
                </div>

                {children}
            </main>
            <p className="container mx-auto text-center">
                Made by Hayden Young on{" "}
                <a
                className="font-bold text-blue-500 underline"
                href="https://github.com/hbjydev/systemd-generator"
                >
                GitHub
                </a>
            </p>
        </>
    );
}