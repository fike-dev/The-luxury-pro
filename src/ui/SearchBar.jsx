import styled from "styled-components";
import Input from "./Input";
import { useEffect, useState } from "react";

const StyledSearchBar = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

function SearchBar({ setFilteredActivities, activities }) {
  const [query, setQuery] = useState("");

  useEffect(
    function () {
      if (query.length < 3 || !query) {
        setFilteredActivities(activities);
        return;
      }
      const searchResult = activities.filter((activity) =>
        activity?.guests?.fullName?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredActivities(searchResult);
    },
    [query, activities, setFilteredActivities]
  );

  return (
    <StyledSearchBar>
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search guest by name..."
      />
    </StyledSearchBar>
  );
}

export default SearchBar;
