import React, { useState } from 'react'

const SearchByTitle = () => {
    const [input, setInput] = useState("")

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleKeyDown = () => {

    }
  return (
    <>
        <input type="text" name="search" id="search" value={input} onChange={handleChange} onKeyDown={handleKeyDown}/>
    </>
  )
}

export default SearchByTitle