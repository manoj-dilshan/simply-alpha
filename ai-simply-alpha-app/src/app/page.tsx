import Image from "next/image";
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
     <>
      <Navbar  />
      <div className="bg-primary text-primary-foreground">Hello</div>
    </>
    
  );
}