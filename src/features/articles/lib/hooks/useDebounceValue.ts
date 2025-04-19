import { useEffect, useState } from "react";

export const useDebounceValue = <T>(value: T, time = 500): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value)
		}, time);

		return () => {
			clearTimeout(timer)
		}
	}, [value, time])

	return debouncedValue
}