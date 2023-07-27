function debounce(func: (value: any) => void, duration: number) {
	let timer: NodeJS.Timeout | undefined = undefined;

	return (value: any) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			func(value);
		}, duration);
	};
}

export { debounce };