import styled from "styled-components";
import Filter from "./Filter";
// import Filter from "./Filter";
// import SortBy from "./SortBy";

const CabinTableOperations = ({ filterOptions, sortByOptions, field }) => {
  return (
    <OperationsContainer>
      <Filter filterField={field} options={filterOptions} />
    </OperationsContainer>
  );
};

const OperationsContainer = styled.div`
  border-radius: 1px solid var(--color-grey-100);
  display: flex;
  gap: 1.2rem;
`;

export default CabinTableOperations;
