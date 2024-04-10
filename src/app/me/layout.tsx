import { Navbar } from "@/components/Navbar";

const MeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MeLayout;
