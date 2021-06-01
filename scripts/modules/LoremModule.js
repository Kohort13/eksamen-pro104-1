
//Module for generating pseudo-random lorem text via js, used to fill dynamic content
const LoremModule = (function(){

    const loremText = [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, dolore!",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi error repudiandae quidem!",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur.",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus quaerat labore illo provident.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dicta obcaecati ducimus magni praesentium aliquam ipsa debitis corporis facilis quis?",
        "Lorem, ipsum dolor.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore, voluptas sit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut tenetur necessitatibus officiis amet.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus consequuntur nihil harum unde error?"
    ]
    const getLorem = () => {
        const randomIndex = Math.random()*9;
        return loremText[randomIndex.toFixed()];
    }
    return {getLorem}
}());

export default LoremModule;