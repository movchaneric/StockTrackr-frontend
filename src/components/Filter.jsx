import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField);

  function handleFilterClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      <FilterButton
        variation="secondary"
        onClick={() => handleFilterClick(options[0].value)}
        disabled={
          searchParams.get(filterField) === options[0].label.toLowerCase()
        }
        active={
          searchParams.get(filterField) === options[0].label.toLowerCase()
        }
      >
        {options[0].label}
      </FilterButton>
      <FilterButton
        variation="secondary"
        onClick={() => handleFilterClick(options[1].value)}
        disabled={
          searchParams.get(filterField) ===
          options[1].label.toLowerCase().replace(" ", "-")
        }
        active={
          searchParams.get(filterField) ===
          options[1].label.toLowerCase().replace(" ", "-")
        }
      >
        {options[1].label}
      </FilterButton>
      <FilterButton
        variation="secondary"
        onClick={() => handleFilterClick(options[2].value)}
        disabled={
          searchParams.get(filterField) ===
          options[2].label.toLowerCase().replace(" ", "-")
        }
        active={
          searchParams.get(filterField) ===
          options[2].label.toLowerCase().replace(" ", "-")
        }
      >
        {options[2].label}
      </FilterButton>
      <FilterButton
        variation="secondary"
        onClick={() => handleFilterClick(options[3].value)}
        disabled={
          searchParams.get(filterField) ===
          options[3].label.toLowerCase().replace(" ", "-")
        }
        active={
          searchParams.get(filterField) ===
          options[3].label.toLowerCase().replace(" ", "-")
        }
      >
        {options[3].label}
      </FilterButton>
      <FilterButton
        variation="secondary"
        onClick={() => handleFilterClick(options[4].value)}
        disabled={
          searchParams.get(filterField) ===
          options[4].label.toLowerCase().replace(" ", "-")
        }
        active={
          searchParams.get(filterField) ===
          options[4].label.toLowerCase().replace(" ", "-")
        }
      >
        {options[4].label}
      </FilterButton>
    </StyledFilter>
  );
};

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  padding: 0.4rem;
  display: flex;
  gap: 1rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 550;
  font-size: 1.5rem;
  padding: 0.2rem;
  margin: 0 0.5rem 0 0.8rem;
  transition: all 0.4s;

  &:hover {
    background-color: var(--color-brand-600);
    color: white;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}
`;

export default Filter;
