export const scrollToAnchor = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
	  element.scrollIntoView({ behavior: "smooth" });
	}
  };
  