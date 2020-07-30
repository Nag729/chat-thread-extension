window.onload = () => {
	const headers = [];
	document.querySelectorAll('[role="heading"]').forEach((el) => {
		const label = el.ariaLabel;
		if (label) {
			headers.push(label);
		}
	});
	console.log(headers);
};
