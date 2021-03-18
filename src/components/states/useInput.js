import {useState} from 'react'


const useInput = (initialValues) => {
	const [value,setValue] = useState(initialValues)

	const changeValue = (event) => {
		setValue(event.target.value)		
	}

	return [value,setValue,changeValue]
}

export default useInput