import React, { useState } from 'react'
import axios from 'axios'
import "./searchBox.scss"

const SearchByTitle = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("")

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }


  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const res = await axios.post("http://localhost:5000/posts/search", { title: searchText }, { withCredentials: true })
        onSearch(res.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <>
      <div className="search-box">
        <input type="text" name="search" id="search" placeholder='Search post' value={searchText} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </>
  )
}

export default SearchByTitle