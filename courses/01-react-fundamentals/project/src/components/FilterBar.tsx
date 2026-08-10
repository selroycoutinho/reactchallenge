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
      <input
        id="search-input"
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search tasks"
      />

      {search && (
        <button
          id="clear-search"
          type="button"
          onClick={() => onSearchChange('')}
        >
          Clear search
        </button>
      )}

      <button
        type="button"
        data-active={filter === 'all'}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>

      <button
        type="button"
        data-active={filter === 'active'}
        onClick={() => onFilterChange('active')}
      >
        Active
      </button>

      <button
        type="button"
        data-active={filter === 'completed'}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>

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