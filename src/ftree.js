class fTree {
    constructor(json, container) {
        container.style.overflow = "scroll"
        container.style.overflowX = "scroll"
        container.style.whiteSpace = "nowrap"

        // call the function with the JSON object
        const tree = this.generateTree(json);
        // append the tree to the body
        container.appendChild(tree);

        // make each div element collapsable
        const divs = container.querySelectorAll("div");
        divs.forEach((div) => {
            div.addEventListener("click", () => {
                div.parentElement.classList.toggle("collapsed");
            });
        });

        const nodes = container.querySelectorAll(".folder");

        nodes.forEach((node) => {
            const arrow1 = document.createElement("span");
            arrow1.innerHTML = "&#9654;";
            node.prepend(arrow1);

            const arrow2 = document.createElement("span");
            arrow2.innerHTML = "&xdtri;";
            arrow2.id = "arrow2";

            node.prepend(arrow2);
            node.onclick = () => {
                arrow1.classList.toggle("hide");
                arrow2.classList.toggle("show");
            };
        });

        // collapse all folders by clicking all folders
        container.querySelectorAll("span").forEach((elem) => {
            elem.classList.add('collapsed')
        });
    }
    generateTree(json) {
        const section = document.createElement("section");
        const keys = Object.keys(json);
        keys.forEach((key) => {
            const span = document.createElement("span");
            span.innerHTML = "<div>" + key + "</div>";
            if (typeof json[key] === "object") {
                span.querySelector("div").classList.add("folder");
                span.appendChild(this.generateTree(json[key]));
            } else {
                span.querySelector("div").classList.add("file");
            }
            section.appendChild(span);
        });
        return section;
    }
}
