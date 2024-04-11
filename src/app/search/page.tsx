import { Navbar } from "@/components/Navbar";
import { SearchList } from "./SearchList";

const SearchPage = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-5 mt-12">
        <SearchList />
      </div>
    </div>
  );
};

export default SearchPage;
