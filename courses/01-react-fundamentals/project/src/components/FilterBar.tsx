import FormInput from './FormInput'
import Button from './Button'

interface FilterBarProps {
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
  sortOrder:
    | 'recent'
    | 'high-to-low'
    | 'low-to-high'
    | 'alphabetical'
    | 'due-date'
  onSortChange: (
    sortOrder:
      | 'recent'
      | 'high-to-low'
      | 'low-to-high'
      | 'alphabetical'
      | 'due-date'
  ) => void
  search: string
  onSearchChange: (search: string) => void
  category: string
  categories: string[]
  onCategoryChange: (category: string) => void
}

export default function FilterBar({
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
  search,
  onSearchChange,
  category,
  categories,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div>
      <FormInput
        id="search-input"
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search tasks"
      />

      {search && (
        <Button
          id="clear-search"
          type="button"
          variant="secondary"
          onClick={() => onSearchChange('')}
        >
          Clear search
        </Button>
      )}

      <Button
        type="button"
        variant={filter === 'all' ? 'primary' : 'secondary'}
        onClick={() => onFilterChange('all')}
      >
        All
      </Button>

      <Button
        type="button"
        variant={filter === 'active' ? 'primary' : 'secondary'}
        onClick={() => onFilterChange('active')}
      >
        Active
      </Button>

      <Button
        type="button"
        variant={filter === 'completed' ? 'primary' : 'secondary'}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </Button>

      <select
        id="category-filter"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">All categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        id="sort-order"
        value={sortOrder}
        onChange={(event) =>
          onSortChange(
            event.target.value as
              | 'recent'
              | 'high-to-low'
              | 'low-to-high'
              | 'alphabetical'
              | 'due-date'
          )
        }
      >
        <option value="recent">Recently Added</option>
        <option value="high-to-low">Priority: High to Low</option>
        <option value="low-to-high">Priority: Low to High</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="due-date">Due Date (Soonest First)</option>
      </select>
    </div>
  )
}