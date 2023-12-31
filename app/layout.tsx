import IsarIcon from "@/icons/isar";
import { Button, Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Isar Aerospace App",
  description: "Isar Aerospace App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Theme
          accentColor="mint"
          grayColor="gray"
          panelBackground="solid"
          scaling="100%"
          radius="full"
        >
          <nav className="flex items-center justify-between border-b-2 bg-slate-300 p-4">
            <IsarIcon />
            <Flex
              justify={"between"}
              align={"center"}
              direction={"row"}
              gap={"3"}
            >
              <Link href={"/assignment-a"}>
                <Button color="ruby" className="hover:cursor-pointer">
                  Assignment A
                </Button>
              </Link>
              <Link href={"/assignment-b"}>
                <Button color="cyan" className="hover:cursor-pointer">
                  Assignment B
                </Button>
              </Link>
              <Link href={"/assignment-c"}>
                <Button color="grass" className="hover:cursor-pointer">
                  Assignment C
                </Button>
              </Link>
            </Flex>
          </nav>
          {children}
        </Theme>
      </body>
    </html>
  );
}
