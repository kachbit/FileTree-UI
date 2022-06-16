class fTree {
    constructor(json, container) {
        container.style.overflow = "scroll"
        container.style.overflowX = "scroll"
        container.style.whiteSpace = "nowrap"

        // call the function with the JSON object
        const tree = this.generateTree(json);
        // append the tree to the body
        container.appendChild(tree);
        container.querySelector('section').style.marginLeft = "18px";
        container.querySelector('section').id = "root";
        container.classList.add('treeContainer')
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
            arrow1.classList.add('treeSpan')
            arrow1.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11" height="11" viewBox="0 0 200 200" style="transform: rotate(-90deg);margin-right:6px;fill:white;background: transparent;" xml:space="preserve"><polygon points="199.404,63.993 171.12,35.709 99.702,107.127 28.284,35.709 0,63.993 99.702,163.695 "/></svg>`;
            arrow1.id = "arrow1";
            node.prepend(arrow1);

            const arrow2 = document.createElement("span");
            arrow2.classList.add('treeSpan')
            arrow2.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11" height="11" viewBox="0 0 200 200" style="margin-right:6px;fill:white;background: transparent;" xml:space="preserve"><polygon points="199.404,63.993 171.12,35.709 99.702,107.127 28.284,35.709 0,63.993 99.702,163.695 "/></svg>`;
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
        section.classList.add('treeSection')
        const keys = Object.keys(json);
        keys.forEach((key) => {
            const span = document.createElement("span");
            span.classList.add('treeSpan');
            span.innerHTML = "<div class='treeDiv'>" + key + "</div>";
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
