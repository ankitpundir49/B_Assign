import Image from "next/image";
import Link from "next/link";
import './globals.css';

export default function Navbar() {
  return (
    <nav className= "w-[1352px] h-[88px] left-[1px] bg-white">
      <Image
        className="my-element"
        src="/DdsgnrLibrary.png"
        alt="Designer Library"
        width={114.60094451904297}
        height={41}
      />
    </nav>
  );
}

const styles = {
  link: {
    textDecoration: "none",
    fontSize: "1.2rem",
  }
};