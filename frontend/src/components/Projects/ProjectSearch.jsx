import SearchIcon from "../Shared/SearchIcon"

const ProjectSearch = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-between w-9/10 rounded-box border border-gray-300 mb-4">
      <div className="flex items-center gap-2 mx-2">
        <SearchIcon strokeColor="black" />
      </div>
      <input
        className="appearance-none pl-2 flex-1"
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-square join-item bg-red-primary hover:bg-red-secondary rounded-e-box"
      >
        <SearchIcon strokeColor="white" />
      </button>
    </form>
  )
}

export default ProjectSearch